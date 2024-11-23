import authAPI from './configs.js';

export default class AuthProvider {
    static async login(email, password) {
        return await authAPI.post('/login', {
            email: email,
            password: password
        });
    }
    static async GetLoginGoogleSsoURL() {
        return await authAPI.get('/get-google-login-url');
    }
    static async HandleGoogleCallback(code) {
        return await authAPI.get('/google-callback', {
            params: {
                code: code
            }
        })
    }
}