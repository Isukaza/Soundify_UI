import audioPlayerService from '@/services/AudioPlayerService';
import authService from '@/services/AuthService';

type Services = {
    authService: typeof authService;
    audioPlayerService: typeof audioPlayerService;
};

let container: Partial<Services> = {};

export const ServiceLocator = {
    register<K extends keyof Services>(key: K, service: Services[K]) {
        container[key] = service;
    },

    get<K extends keyof Services>(key: K): Services[K] {
        const service = container[key];
        if (!service) {
            throw new Error(`[ServiceLocator] '${key}' is not registered`);
        }
        return service;
    },

    reset() {
        container = {};
    },
}