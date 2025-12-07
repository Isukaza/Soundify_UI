export interface IHostedService {
    start(): Promise<void>;
    stop(): Promise<void>;
}