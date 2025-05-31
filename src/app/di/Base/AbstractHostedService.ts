import InjectableBase from "@/app/di/Base/InjectableBase";

export default abstract class AbstractHostedService extends InjectableBase {
    abstract start(): Promise<void>;
    abstract stop(): Promise<void>;
}