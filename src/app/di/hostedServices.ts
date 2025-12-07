import {Container} from "inversify";
import {TYPES} from "./types";

export interface IHostedService {
    start(): Promise<void>;
    stop(): Promise<void>;
}

export async function startHostedServices(container: Container): Promise<void> {
    if (!container.isBound(TYPES.HostedService))
        return;

    const hostedServices = container.getAll<IHostedService>(TYPES.HostedService);
    for (const service of hostedServices) {
        try {
            await service.start();
            console.log(`[HostedService] Started: ${service.constructor.name}`);
        } catch (error) {
            console.error(`[HostedService] Failed to start ${service.constructor.name}`, error);
        }
    }
}

export async function stopHostedServices(container: Container): Promise<void> {
    if (!container.isBound(TYPES.HostedService)) return;

    const hostedServices = container.getAll<IHostedService>(TYPES.HostedService);

    for (const service of hostedServices) {
        try {
            await service.stop();
            console.log(`[HostedService] Stopped: ${service.constructor.name}`);
        } catch (error) {
            console.error(`[HostedService] Failed to stop ${service.constructor.name}`, error);
        }
    }
}