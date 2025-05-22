import HostedService from "@/domain/services/types/HostedService";

export default abstract class AuthServiceBase extends HostedService {
    abstract forceRefreshNow(): Promise<void>;
    abstract isRunning(): boolean;
}