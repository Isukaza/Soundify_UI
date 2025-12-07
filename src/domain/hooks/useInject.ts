import {appContainer} from "@/app/di/inversify.config";
import {getSessionContainer} from "@/app/di/session.scope";
import {useStore} from "@/stores";
import {useMemo} from "react";

export default function useInject<T>(token: symbol): T {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);

    return useMemo(() => {
        const sessionContainer = isAuthenticated ? getSessionContainer() : null;
        const container = sessionContainer ?? appContainer;
        if (!container.isBound(token))
            throw new Error(
                `[useInject] Dependency not bound for token: ${String(token.toString())}`
            );

        return container.get<T>(token);
    }, [isAuthenticated, token]);
}