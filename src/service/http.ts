import AuthService from "./auth"
import UserService from "./user"
import WeixinService from "./weixin"

export const api = {
    auth: new AuthService(),
    user: new UserService(),
    weixin:  new WeixinService(),
}