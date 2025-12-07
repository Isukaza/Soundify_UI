export default abstract class AbstractAuthManager {
    abstract getGoogleSsoUrl(): Promise<string | null>;

    abstract loginWithEmail(email: string, password: string): Promise<boolean>;

    abstract handleGoogleCallback(code: string): Promise<boolean>;

    abstract jwtRefresh(): Promise<boolean>;

    abstract clearAuthData(): void;

    abstract isAuthDataValid(): boolean;
}