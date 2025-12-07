export default abstract class AbstractHostedService {
    abstract start(): Promise<void>;
    abstract stop(): Promise<void>;
}