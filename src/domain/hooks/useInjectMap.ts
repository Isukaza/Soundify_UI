import {useEffect, useMemo, useRef, useState} from "react";
import LifecycleScope from "@/app/di/Base/LifecycleScope";
import DIContainer from "@/app/di/DIContainer";
import {useStore} from "@/stores";

type Constructor<T = any> = Function & { prototype: T };
type InstanceTypeMap<T extends Record<string, Constructor>> = {
    [K in keyof T]: T[K] extends Constructor<infer R> ? R | null : never;
};

export default function useInjectMap<T extends Record<string, Constructor>>(abstractMap: T) {
    const [state, setState] = useState<{
        instances: InstanceTypeMap<T>;
        loading: boolean;
    }>({
        instances: {} as InstanceTypeMap<T>,
        loading: true
    });

    const isAuthenticated = useStore(state => state.auth.isAuthenticated);
    const memoizedMap = useMemo(() => abstractMap, []);
    const effectRunIdRef = useRef(0);

    useEffect(() => {
        let mounted = true;
        const currentRunId = ++effectRunIdRef.current;

        const loadInstances = async () => {
            setState(prev => ({
                ...prev,
                loading: true
            }));

            const newInstances = {} as InstanceTypeMap<T>;
            const keys = Object.keys(memoizedMap) as (keyof T)[];
            for (const key of keys) {
                const abstract = memoizedMap[key];
                const scope = DIContainer.getScope(abstract);

                if (scope === LifecycleScope.Session && !isAuthenticated) {
                    newInstances[key] = null as InstanceTypeMap<T>[typeof key];
                    continue;
                }

                try {
                    newInstances[key] = await DIContainer.get(abstract);
                } catch (err) {
                    console.error(`[useInjectMap] Error for ${abstract.name}:`, err);
                    newInstances[key] = null as InstanceTypeMap<T>[typeof key];
                }

                if (effectRunIdRef.current !== currentRunId || !mounted)
                    return;
            }

            if (mounted && effectRunIdRef.current === currentRunId) {
                setState({
                    instances: newInstances,
                    loading: false
                });
            }
        };

        loadInstances();

        return () => {
            mounted = false;
        };
    }, [memoizedMap, isAuthenticated]);

    return state;
}