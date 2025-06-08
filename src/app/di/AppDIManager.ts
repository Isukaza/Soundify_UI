import LifecycleScope from "@/app/di/Base/LifecycleScope";

import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import AbstractAppManager from "@/domain/managers/Base/AbstractAppManager";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";
import AlbumManager from "@/domain/managers/AlbumManager";
import AppManager from "@/domain/managers/AppManager";
import AudioPlayerManager from "@/domain/managers/AudioPlayerManager";
import AuthManager from "@/domain/managers/AuthManager";
import TrackManager from "@/domain/managers/TrackManager";
import AbstractAudioPlayerService from "@/domain/services/types/AbstractAudioPlayerService";
import AbstractAuthService from "@/domain/services/types/AbstractAuthService";
import AudioPlayerService from "@/domain/services/AudioPlayerService";
import AuthService from "@/domain/services/AuthService";

import DIContainer from './DIContainer';

export default class AppDIManager {
    private static initialized = false;

    static registerAll(): void {
        DIContainer.register(AbstractAppManager, AppManager, LifecycleScope.Application);
        DIContainer.register(AbstractAuthManager, AuthManager, LifecycleScope.Application);

        DIContainer.register(AbstractAlbumManager, AlbumManager, LifecycleScope.Session);
        DIContainer.register(AbstractAudioPlayerManager, AudioPlayerManager, LifecycleScope.Session);
        DIContainer.register(AbstractAudioPlayerService, AudioPlayerService, LifecycleScope.Session);
        DIContainer.register(AbstractAuthService, AuthService, LifecycleScope.Session);
        DIContainer.register(AbstractTrackManager, TrackManager, LifecycleScope.Session);
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