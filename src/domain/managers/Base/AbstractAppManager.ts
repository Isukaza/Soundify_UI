import InjectableBase from "@/app/di/Base/InjectableBase";

export default abstract class AbstractAppManager extends InjectableBase{
    abstract updateSearchQuery(searchQuery: string): void;
}