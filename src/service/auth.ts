import BaseService, { type CommonResponse } from  './base'

interface LoginRequest {
    phone: number
    password?: string
    sms?: number
}

interface LoginResponse {
    token: string
    user: userInfo
}

interface userInfo {
    email: string,
    id: number,
    name: string,
    lastLoginAt: string,
    phone: number
}

interface RegisterRequest {
    name: string,
    phone?: number,
    email?: string,
    password: string,
}

interface ResetPasswordRequest {
    phone: number
    sms: number
    password: string
}

class AuthService extends BaseService {
    async login(data: LoginRequest) {
        return this.post<LoginRequest, LoginResponse>("/auth/login", data)
    }

    async register(data: RegisterRequest) {
        return this.post<RegisterRequest, any>("/users/register", data)
    }

    async resetPassword(data: ResetPasswordRequest) {
        return this.post<ResetPasswordRequest, any>("/auth/reset-password", data)
    }
}

export default AuthService