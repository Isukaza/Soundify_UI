import BackTaskBase from "@/domain/services/types/BackTaskBase";

export default abstract class AuthServiceBase extends BackTaskBase {
    abstract forceRefreshNow(): Promise<void>;
    abstract isRunning(): boolean;
}