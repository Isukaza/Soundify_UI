import DIContainer from '@/app/di/DIContainer';
import AudioPlayerService from '@/domain/services/AudioPlayerService';
import AuthService from '@/domain/services/AuthService';

export default class AppDIManager {
    private static initialized = false;

    static start() {
        if (this.initialized)
            return;

        this.initialized = true;

        DIContainer.register('authService', AuthService);
        DIContainer.register('audioPlayerService', AudioPlayerService);
    }

    static stop() {
        if (!this.initialized)
            return;

        this.initialized = false;

        DIContainer.reset();
    }

    static isInitialized(): boolean {
        return this.initialized;
    }
}