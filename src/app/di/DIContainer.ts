import HostedService from '@/domain/services/types/HostedService';

type HostedServiceConstructor = new () => HostedService;

const DIContainer = {
    services: new Map<string, HostedServiceConstructor>(),
    instances: new Map<string, HostedService>(),

    async register(Service: HostedServiceConstructor, options?: { eager?: boolean }) {
        const key = Service.name;
        if (!this.services.has(key)) {
            this.services.set(key, Service);

            if (options?.eager)
                await this.get(Service);
        }
    },

    async get<T extends HostedService>(Service: new () => T): Promise<T> {
        const key = Service.name;

        if (!this.instances.has(key)) {
            const service = this.services.get(key);
            if (!service)
                throw new Error(`Service ${key} is not registered`);

            const instance = new service();
            await instance.start();

            this.instances.set(key, instance);
        }

        return this.instances.get(key)! as T;
    },

    async stopAll(): Promise<void> {
        for (const instance of this.instances.values()) {
            await instance.stop();
        }

        this.instances.clear();
        this.services.clear();
    },
};

export default DIContainer;