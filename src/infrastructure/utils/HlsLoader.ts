import Hls from "hls.js";
import axios from "axios";
import CdnApi from "@/infrastructure/api/CdnApi.js";
import {parseUrl} from "@/infrastructure/utils/urlUtils.js";

export default class HlsLoader {
    private hlsInstance: Hls | null = null;

    public async loadToAudioElement(audioElement: HTMLAudioElement, musicName: string) {
        if (!audioElement || !musicName)
            return;

        try {
            const res = await CdnApi.GetLinkToListenAsync(`${musicName}/*`);
            if (!res.status)
                throw new Error("Failed to get signed URL");

            const signedURL = res.data;
            const modifiedManifestUrl = await this.prepareModifiedManifest(signedURL, '52164a7d-5ac6-4687-9085-acc5edc487d1');

            if (!modifiedManifestUrl)
                throw new Error("Failed to create modified manifest URL");

            this.hlsInstance = new Hls();
            this.hlsInstance.loadSource(modifiedManifestUrl);
            this.hlsInstance.attachMedia(audioElement);

            this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("HLS manifest parsed successfully");
            });

            this.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS.js error:", data);
                this.destroy();
            });

        } catch (err) {
            // @ts-ignore
            console.error("HlsLoader error:", err.message || err);
        }
    }

    public destroy() {
        if (this.hlsInstance) {
            this.hlsInstance.destroy();
            this.hlsInstance = null;
        }
    }

    private async prepareModifiedManifest(signedURL: string, musicName: string): Promise<string | null> {
        const manifestText = await this.fetchManifest(signedURL, musicName);
        const {path, queryParams} = parseUrl(signedURL);
        return this.modifyManifest(manifestText, path, queryParams);
    }

    private async fetchManifest(url: string, musicName: string): Promise<string> {
        if (!url.includes("*"))
            throw new Error('Invalid URL format: "*" not found in URL');

        const baseManifestURL = url.replace("*", `${musicName}.m3u8`);
        const baseManifestResp = await axios.get(baseManifestURL);
        const baseManifest = baseManifestResp.data.trim().split("\n");

        const finalManifestName = baseManifest[baseManifest.length - 1];
        const finalManifestURL = url.replace("*", finalManifestName);

        const finalManifestResp = await axios.get(finalManifestURL);
        return finalManifestResp.data;
    }

    private modifyManifest(manifestText: string, path: string, queryParams: string): string | null {
        if (!manifestText) return null;

        const modified = manifestText
            .split("\n")
            .map(line => line.endsWith(".aac") ? `${path}${line}${queryParams}` : line)
            .join("\n");

        const blob = new Blob([modified], {type: "application/vnd.apple.mpegurl"});
        return URL.createObjectURL(blob);
    }
}