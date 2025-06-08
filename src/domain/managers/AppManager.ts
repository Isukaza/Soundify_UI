import AbstractAppManager from "@/domain/managers/Base/AbstractAppManager";
import {useStore} from "@/stores";

export default class AppManager extends AbstractAppManager {
    override updateSearchQuery(searchQuery: string) {
        useStore.getState().app.setSearchQuery(searchQuery);
    }
}