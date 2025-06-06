import UserRole  from '@/domain/models/enums/UserRole';

export interface LoginResponse {
    userId: string;
    userRole: UserRole;
    bearer: string;
    refreshToken: string;
}

export default LoginResponse;