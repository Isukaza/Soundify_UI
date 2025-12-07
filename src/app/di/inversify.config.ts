import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";

import AppManager from "@/domain/managers/AppManager";
import AlbumManager from "@/domain/managers/AlbumManager";
import TrackManager from "@/domain/managers/TrackManager";
import AudioPlayerManager from "@/domain/managers/AudioPlayerManager";
import AuthManager from "@/domain/managers/AuthManager";

import AuthService from "@/domain/services/AuthService";
import AudioPlayerService from "@/domain/services/AudioPlayerService";

export const appContainer = new Container({
    defaultScope: "Singleton"
});

appContainer.bind(TYPES.AppManager).to(AppManager);
appContainer.bind(TYPES.AuthManager).to(AuthManager);
appContainer.bind(TYPES.TrackManager).to(TrackManager);
appContainer.bind(TYPES.AlbumManager).to(AlbumManager);
appContainer.bind(TYPES.AudioPlayerManager).to(AudioPlayerManager);

appContainer.bind(TYPES.AuthService).to(AuthService);
appContainer.bind(TYPES.AudioPlayerService).to(AudioPlayerService);

appContainer.bind(TYPES.HostedService).to(AuthService);
appContainer.bind(TYPES.HostedService).to(AudioPlayerService);