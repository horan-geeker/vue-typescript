import BaseService from  './base'

interface LoginRequest {
    phone: number
    password?: string
    sms?: number
}

interface LoginResponse {
    uid: number
    name: string
}

class AuthService extends BaseService {
    async login(data: LoginRequest) {
        return this.post<LoginRequest, LoginResponse>("/auth/login", data)
    }
}

export default AuthService