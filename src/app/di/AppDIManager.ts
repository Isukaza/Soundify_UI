import DIContainer from './DIContainer';
import AudioPlayerService from "@/domain/services/AudioPlayerService";
import AuthService from '@/domain/services/AuthService';

export default class AppDIManager {
    private static initialized = false;

    static async start() {
        if (this.initialized)
            return;

        await DIContainer.register(AuthService, {eager: true});
        await DIContainer.register(AudioPlayerService);

        this.initialized = true;
    }

    static async stop() {
        if (!this.initialized)
            return;

        await DIContainer.stopAll();

        this.initialized = false;
    }

    static isInitialized(): boolean {
        return this.initialized;
    }
}