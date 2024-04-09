import BaseService from  './base'

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

interface RegisterResponse {

}

class AuthService extends BaseService {
    async login(data: LoginRequest) {
        return this.post<LoginRequest, LoginResponse>("/auth/login", data)
    }

    async register(data: RegisterRequest) {
        return this.post<RegisterRequest, RegisterResponse>("/users/register", data)
    }
}

export default AuthService