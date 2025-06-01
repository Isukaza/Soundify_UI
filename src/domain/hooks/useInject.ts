import LifecycleScope from "@/app/di/Base/LifecycleScope";
import {useStore} from "@/stores";
import {useEffect, useState} from "react";
import DIContainer, {AbstractConstructor} from "@/app/di/DIContainer";

export default function useInject<T>(abstract: AbstractConstructor<T>) {
    const [state, setState] = useState<{ instance: T | null, loading: boolean }>({
        instance: null,
        loading: true
    });

    const isAuthenticated = useStore(state => state.auth.isAuthenticated);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const scope = DIContainer.getScope(abstract);

            if (scope === LifecycleScope.Session && !isAuthenticated) {
                if (mounted)
                    setState({instance: null, loading: false});

                return;
            }

            try {
                const instance = await DIContainer.get(abstract);
                if (mounted)
                    setState({instance, loading: false});
            } catch (err) {
                console.error(`[useInjectOne] Error for ${abstract.name}:`, err);
                if (mounted)
                    setState({instance: null, loading: false});
            }
        })();

        return () => {
            mounted = false;
        };
    }, [abstract, isAuthenticated]);

    return state;
}