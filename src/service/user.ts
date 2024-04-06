import BaseApiService from "./base";

interface getUserInfoResponse {
    token: string,
    user: userInfo
}

interface userInfo {
    email: string,
    id: number,
    name: string,
    lastLoginAt: string,
    phone: number
}

class UserService extends BaseApiService {
    getUserInfo() {
        return this.get<getUserInfoResponse>('/users/userinfo')
    }
}

export default UserService