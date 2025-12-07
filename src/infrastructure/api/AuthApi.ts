import UserRole from "@/domain/enums/UserRole";
import {LoginRequest} from "@/domain/DTO/requests/LoginRequest";
import {RefreshTokensRequest} from "@/domain/DTO/requests/RefreshTokensRequest";
import {LoginResponse} from "@/domain/DTO/responses/LoginResponse";
import {authAPI} from './configs';

export default class AuthApi {
    static async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await authAPI.post('/login', data);
        const rawData = response.data;

        return {
            userId: rawData.userId,
            userRole: UserRole[rawData.userRole as keyof typeof UserRole],
            bearer: rawData.bearer,
            refreshToken: rawData.refreshToken,
        };
    }

    static async GetLoginGoogleSsoURL() {
        return await authAPI.get('/get-google-login-url');
    }

    static async HandleGoogleCallback(code: string): Promise<LoginResponse> {
        const response = await authAPI.get('/google-callback', {params: {code}});
        const rawData = response.data;

        return {
            userId: rawData.userId,
            userRole: UserRole[rawData.userRole as keyof typeof UserRole],
            bearer: rawData.bearer,
            refreshToken: rawData.refreshToken,
        };
    }

    static async RefreshTokens(data: RefreshTokensRequest): Promise<LoginResponse> {
        const response = await authAPI.post('/refresh', data);
        const rawData = response.data;

        return {
            userId: rawData.userId,
            userRole: UserRole[rawData.userRole as keyof typeof UserRole],
            bearer: rawData.bearer,
            refreshToken: rawData.refreshToken,
        };
    }
}