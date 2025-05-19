import {LoginRequest} from "@/models/requests/LoginRequest";
import {RefreshTokensRequest} from "@/models/requests/RefreshTokensRequest";
import {authAPI} from './configs';

export default class AuthApi {
    static async login(data: LoginRequest) {
        return await authAPI.post('/login', data);
    }

    static async GetLoginGoogleSsoURL() {
        return await authAPI.get('/get-google-login-url');
    }

    static async HandleGoogleCallback(code: string) {
        return await authAPI.get('/google-callback', {
            params: {code},
        });
    }

    static async RefreshTokens(data: RefreshTokensRequest) {
        return await authAPI.post('/refresh', data);
    }
}