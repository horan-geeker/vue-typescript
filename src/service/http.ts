import AuthService from "./auth"
import NotifyService from "./notify"
import UserService from "./user"
import WeixinService from "./weixin"

export default {
    auth: new AuthService(),
    user: new UserService(),
    weixin:  new WeixinService(),
    notify: new NotifyService(),
}