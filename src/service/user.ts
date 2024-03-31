import BaseApiService from "./base";

class UserService extends BaseApiService {
    getUserInfo() {
        return this.get('/users/userinfo')
    }
}

export default UserService