import BaseApiService from "./base";

class NotifyService extends BaseApiService {
    
    async sendSMSCode(phone: number) {
        return this.post("/notify/sms", {
            "phone": phone
        })
    }
}

export default NotifyService