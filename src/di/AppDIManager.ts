import {AuthCoordinator} from '@/coordinators/AuthCoordinator';
import {ServiceLocator} from '@/di/ServiceLocator';
import AudioPlayerService from '@/services/AudioPlayerService';
import AuthService from '@/services/AuthService';

import {useStore} from '@/stores';

export default class AppDIManager {
    private static initialized = false;

    static start() {
        if (this.initialized)
            return;

        this.initialized = true;

        const exp = useStore.getState().auth.exp;

        ServiceLocator.register('authService', AuthService);
        ServiceLocator.register('audioPlayerService', AudioPlayerService);

        AuthCoordinator.start(exp);
    }

    static stop() {
        if (!this.initialized)
            return;

        this.initialized = false;

        ServiceLocator.reset();
        AuthCoordinator.stop();
    }

    static isStarted(): boolean {
        return this.initialized;
    }
}