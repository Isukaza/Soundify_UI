import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";

import AppManager from "@/application/managers/AppManager";
import AlbumManager from "@/application/managers/AlbumManager";
import TrackManager from "@/application/managers/TrackManager";
import AudioPlayerManager from "@/application/managers/AudioPlayerManager";
import AuthManager from "@/application/managers/AuthManager";

import AuthService from "@/application/services/AuthService";
import AudioPlayerService from "@/application/services/AudioPlayerService";

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