import AbstractHostedService from "@/app/di/Base/AbstractHostedService";
import Injectable from "@/app/di/Base/InjectableBase";
import LifecycleScope from "@/app/di/Base/LifecycleScope";

export type AbstractConstructor<T = any> = Function & { prototype: T };
export type ImplConstructor<T = any> = new (...args: any[]) => T;

type ServiceRecord<T = any> = {
    abstract: AbstractConstructor<T>;
    implementation: ImplConstructor<T>;
    inject?: AbstractConstructor[];
    scope: LifecycleScope;
};

const log = {
    info: (...args: any[]) => console.info('[DI:INFO]', ...args),
    warn: (...args: any[]) => console.warn('[DI:WARN]', ...args),
    error: (...args: any[]) => console.error('[DI:ERROR]', ...args),
};

const services = new Map<string, ServiceRecord>();
const instances = new Map<string, any>();
const resolutionStack = new Set<string>();
const pendingResolutions = new Map<string, Promise<any>>();

async function resolveService<T>(key: string, record: ServiceRecord<T>): Promise<T> {
    try {
        const deps = record.inject ?? [];

        if (deps.length > 0) {
            log.info(`Resolving dependencies for ${key}: ${deps.map(d => d.name).join(", ")}`);
        } else {
            log.info(`No dependencies for ${key}`);
        }

        const resolvedDeps = await Promise.all(deps.map(dep => DIContainer.get(dep)));

        log.info(`All dependencies resolved for ${key}`);
        const instance = new record.implementation(...resolvedDeps);
        instances.set(key, instance);

        log.info(`Instantiated: ${key}`);
        return instance;
    } finally {
        pendingResolutions.delete(key);
        resolutionStack.delete(key);
        log.info(`Popped ${key} from resolution stack`);
        log.info(`Current resolution stack (after pop): ${[...resolutionStack].join(" -> ")}`);
    }
}

const DIContainer = {
    register<A extends Injectable, I extends A>(
        abstract: AbstractConstructor<A>,
        impl: ImplConstructor<I>,
        scope: LifecycleScope
    ): void {
        const key = abstract.name;
        const inject = (impl as any).inject ?? [];
        services.set(key, {abstract, implementation: impl, inject, scope});
        log.info(`Registered service: ${key} with scope: ${scope}`);
    },

    async get<T>(abstract: AbstractConstructor<T>): Promise<T> {
        const key = abstract.name;

        if (instances.has(key)) {
            log.info(`Resolved from cache: ${key}`);
            return instances.get(key);
        }

        if (pendingResolutions.has(key)) {
            log.warn(`Waiting for in-progress instantiation of ${key}`);
            return pendingResolutions.get(key) as Promise<T>;
        }

        const record = services.get(key);
        if (!record) {
            log.error(`Service ${key} not registered`);
            throw new Error(`Service ${key} not registered`);
        }

        log.info(`Resolving: ${key}`);
        log.info(`Current resolution stack (before push): ${[...resolutionStack].join(" -> ")}`);
        resolutionStack.add(key);

        const promise = resolveService(key, record);
        pendingResolutions.set(key, promise);

        return promise;
    },

    getScope(abstract: AbstractConstructor): LifecycleScope | null {
        const record = services.get(abstract.name);
        return record ? record.scope : null;
    },

    async backTaskRun(scope: LifecycleScope): Promise<void> {
        log.info(`Starting HostedServices in scope: ${scope}...`);
        for (const [key, record] of services.entries()) {
            if (record.scope !== scope)
                continue;

            if (AbstractHostedService.prototype.isPrototypeOf(record.abstract.prototype)) {
                try {
                    const instance: AbstractHostedService = await DIContainer.get(record.abstract);
                    await instance.start();
                    log.info(`HostedService started: ${key}`);
                } catch (err) {
                    log.warn(`Failed to start HostedService: ${key}`, err);
                }
            }
        }
    },

    async stopScope(scope: LifecycleScope): Promise<void> {
        log.info(`Stopping services in scope: ${scope}...`);

        for (const [key, instance] of Array.from(instances.entries())) {
            const record = services.get(key);
            if (!record || record.scope !== scope)
                continue;

            if (typeof instance.stop === 'function')
                try {
                    await instance.stop();
                    log.info(`Stopped: ${key}`);
                } catch (err) {
                    log.warn(`Failed to stop service: ${key}`, err);
                }

            instances.delete(key);
        }
    },

    async stopAll(): Promise<void> {
        await this.stopScope(LifecycleScope.Session);
        await this.stopScope(LifecycleScope.Application);
        services.clear();
        resolutionStack.clear();
        pendingResolutions.clear();
        log.info('DIContainer fully cleared');
    }
};

export default DIContainer;