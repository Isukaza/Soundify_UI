import {Container} from "inversify";
import {appContainer} from "./inversify.config";
import {TYPES} from "./types";

import AlbumManager from "@/domain/managers/AlbumManager";
import TrackManager from "@/domain/managers/TrackManager";
import AudioPlayerManager from "@/domain/managers/AudioPlayerManager";

import AuthService from "@/domain/services/AuthService";
import AudioPlayerService from "@/domain/services/AudioPlayerService";

let sessionContainer: Container | null = null;

export function createSessionScope() {
    sessionContainer = new Container({defaultScope: "Singleton"});

    sessionContainer = new Container({
        defaultScope: "Singleton",
        parent: appContainer
    });

    sessionContainer.bind(TYPES.AlbumManager).to(AlbumManager);
    sessionContainer.bind(TYPES.TrackManager).to(TrackManager);
    sessionContainer.bind(TYPES.AudioPlayerManager).to(AudioPlayerManager);

    sessionContainer.bind(TYPES.AuthService).to(AuthService);
    sessionContainer.bind(TYPES.AudioPlayerService).to(AudioPlayerService);

    sessionContainer.bind(TYPES.HostedService).to(AuthService);
    sessionContainer.bind(TYPES.HostedService).to(AudioPlayerService);

    return sessionContainer;
}

export function getSessionContainer(): Container | null {
    return sessionContainer;
}

export function destroySessionScope() {
    if (sessionContainer) {
        sessionContainer.unbindAll();
        sessionContainer = null;
    }
}