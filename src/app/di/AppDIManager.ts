import {ServiceLocator} from '@/app/di/ServiceLocator';
import AudioPlayerService from '@/domain/services/AudioPlayerService';
import AuthService from '@/domain/services/AuthService';

export default class AppDIManager {
    private static initialized = false;

    static start() {
        if (this.initialized)
            return;

        this.initialized = true;

        ServiceLocator.register('authService', AuthService);
        ServiceLocator.register('audioPlayerService', AudioPlayerService);
    }

    static stop() {
        if (!this.initialized)
            return;

        this.initialized = false;

        ServiceLocator.reset();
    }

    static isInitialized(): boolean {
        return this.initialized;
    }
}