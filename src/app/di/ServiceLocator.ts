import AudioPlayerServiceBase from '@/domain/services/types/AudioPlayerServiceBase';
import AuthServiceBase from '@/domain/services/types/AuthServiceBase';
import BackTaskBase from '@/domain/services/types/BackTaskBase';

type ServiceMap<T extends Record<string, BackTaskBase>> = T;

type Services = ServiceMap<{
    authService: AuthServiceBase;
    audioPlayerService: AudioPlayerServiceBase;
}>;

let container: Partial<Services> = {};

export const ServiceLocator = {
    register<K extends keyof Services>(key: K, service: Services[K]) {
        container[key] = service;
        service.start();
    },

    get<K extends keyof Services>(key: K): Services[K] {
        const service = container[key];
        if (!service) {
            throw new Error(`[ServiceLocator] '${key}' is not registered`);
        }
        return service;
    },

    reset() {
        for (const service of Object.values(container)) {
            service.stop();
        }

        container = {};
    }
}