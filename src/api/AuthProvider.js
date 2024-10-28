import authAPI from './configs.js';

export default class AuthProvider {
    static async login(email, password) {
        return await authAPI.post('/login', {
            email: email,
            password: password
        });
    }
}