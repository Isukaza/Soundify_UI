import InjectableBase from "@/app/di/Base/InjectableBase";

export default abstract class AbstractAuthManager extends InjectableBase {
    abstract loginWithEmail(email: string, password: string): Promise<boolean>;

    abstract getGoogleSsoUrl(): Promise<string | null>;

    abstract handleGoogleCallback(code: string): Promise<boolean>;

    abstract forceRefresh(): Promise<boolean>;

    abstract getRefreshedAuthTokens(): Promise<{ userId: string; jwt: string; refresh: string } | null>;

    abstract applyTokens(userId: string, jwt: string, refresh: string): number;

    abstract clearAuthData(): void;

    abstract isAuthDataValid(): boolean;
}