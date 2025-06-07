import LifecycleScope from "@/app/di/Base/LifecycleScope";

import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import AudioPlayerManager from "@/domain/managers/AudioPlayerManager";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import AuthManager from "@/domain/managers/AuthManager";
import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";
import TrackManager from "@/domain/managers/TrackManager";
import AlbumManager from "@/domain/managers/AlbumManager";

import AbstractAudioPlayerService from "@/domain/services/types/AbstractAudioPlayerService";
import AbstractAuthService from "@/domain/services/types/AbstractAuthService";
import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import AudioPlayerService from "@/domain/services/AudioPlayerService";
import AuthService from "@/domain/services/AuthService";

import DIContainer from './DIContainer';

export default class AppDIManager {
    private static initialized = false;

    static registerAll(): void {
        DIContainer.register(AbstractAuthManager, AuthManager, LifecycleScope.Application);

        DIContainer.register(AbstractAuthService, AuthService, LifecycleScope.Session);
        DIContainer.register(AbstractAudioPlayerManager, AudioPlayerManager, LifecycleScope.Session);
        DIContainer.register(AbstractAudioPlayerService, AudioPlayerService, LifecycleScope.Session);
        DIContainer.register(AbstractTrackManager, TrackManager, LifecycleScope.Session);
        DIContainer.register(AbstractAlbumManager, AlbumManager, LifecycleScope.Session);
    }

    static async start() {
        if (this.initialized)
            return;

        await DIContainer.backTaskRun(LifecycleScope.Session);

        this.initialized = true;
    }

    static async stop() {
        await DIContainer.stopScope(LifecycleScope.Session);
        this.initialized = false;
    }

    static async stopAll() {
        await DIContainer.stopAll();
        this.initialized = false;
    }
}