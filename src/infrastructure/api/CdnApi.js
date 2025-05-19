import {cdnAPI} from './configs.js';

export default class CdnApi {
    static async GetLinkToListenAsync(objectKey) {
        return await cdnAPI.get('/get-signed-url', {
            params: {objectKey},
        });
    }
}