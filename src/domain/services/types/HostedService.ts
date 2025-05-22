export default abstract class HostedService {
    abstract start(): Promise<void>;
    abstract stop(): Promise<void>;
}