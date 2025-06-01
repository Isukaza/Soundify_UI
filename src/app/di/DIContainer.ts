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

const services = new Map<string, ServiceRecord>();
const instances = new Map<string, any>();
const resolutionStack = new Set<string>();
const pendingResolutions = new Map<string, Promise<any>>();

async function resolveService<T>(key: string, record: ServiceRecord<T>): Promise<T> {
    try {
        const deps = record.inject ?? [];
        const resolvedDeps = await Promise.all(deps.map(dep => DIContainer.get(dep)));
        const instance = new record.implementation(...resolvedDeps);
        instances.set(key, instance);
        return instance;
    } finally {
        pendingResolutions.delete(key);
        resolutionStack.delete(key);
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
    },

    async get<T>(abstract: AbstractConstructor<T>): Promise<T> {
        const key = abstract.name;

        if (instances.has(key))
            return instances.get(key);


        if (pendingResolutions.has(key))
            return pendingResolutions.get(key) as Promise<T>;

        const record = services.get(key);
        if (!record) {
            console.error(`Service ${key} not registered`);
            throw new Error(`Service ${key} not registered`);
        }

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
        for (const [key, record] of services.entries()) {
            if (record.scope !== scope)
                continue;

            if (AbstractHostedService.prototype.isPrototypeOf(record.abstract.prototype))
                try {
                    const instance: AbstractHostedService = await DIContainer.get(record.abstract);
                    await instance.start();
                } catch (err) {
                    console.error(`Failed to start HostedService: ${key}`, err);
                }
        }
    },

    async stopScope(scope: LifecycleScope): Promise<void> {
        for (const [key, instance] of Array.from(instances.entries())) {
            const record = services.get(key);
            if (!record || record.scope !== scope)
                continue;

            if (typeof instance.stop === 'function')
                try {
                    await instance.stop();
                } catch (err) {
                    console.error(`Failed to stop service: ${key}`, err);
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
    }
};

export default DIContainer;