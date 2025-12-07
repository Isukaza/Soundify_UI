import {injectable} from "inversify";
import AbstractAppManager from "@/domain/Base/AbstractAppManager";
import {useStore} from "@/stores";

@injectable()
export default class AppManager extends AbstractAppManager {
    override updateSearchQuery(searchQuery: string) {
        useStore.getState().app.setSearchQuery(searchQuery);
    }
}