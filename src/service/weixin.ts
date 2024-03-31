import axios from "axios"
import BaseApiService from "./base"
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface GetPrePayParamsRequest {
    amount: number,
    openid: string
}

class WeixinService extends BaseApiService {
    weixinHttp: AxiosInstance

    constructor() {
        super()
        this.weixinHttp = axios.create({
            url: `https://open.weixin.qq.com/connect/oauth2/authorize`,
            timeout: 5000,
        })
    }

    async getPrePayParams(data: GetPrePayParamsRequest) {
        return this.http.post<GetPrePayParamsRequest>('/pay/wechat-jsapi-pay', data)
    }

    async authorize(state: number) {
        return this.weixinHttp.get(`?appid=wx844b3963c0aa164e&redirect_uri=http%3A%2F%2Fapi.wechat.bangshang.net.cn%2Fauth%2Fwechat-callback&response_type=code&scope=snsapi_base&state=` + state + `#wechat_redirect`)
    }
}

export default WeixinService