import React, {useEffect, useState} from 'react';
import AppDIManager from '@/app/di/AppDIManager';
import LoadingPage from "@/presentation/pages/LoadingPage";

export default function AppInitGate({children}: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            AppDIManager.registerAll();
            setReady(true);
        })();
    }, []);

    if (!ready)
        return <LoadingPage/>

    return <>{children}</>;
}