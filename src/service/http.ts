import axios from 'axios'

axios.defaults.timeout = 50000

axios.interceptors.request.use(config => {
    // ...
    return config
}, error => {
    return Promise.error(error)
})

const paySystemApiDomain = `http://api.wechat.bangshang.net.cn`

function authorize(state: number) {
    return axios.get(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx844b3963c0aa164e&redirect_uri=http%3A%2F%2Fapi.wechat.bangshang.net.cn%2Fauth%2Fwechat-callback&response_type=code&scope=snsapi_base&state=` + state + `#wechat_redirect`)
}

function getPrePayParams(amount: number, openid: string) {
    return axios.post(paySystemApiDomain + `/pay/wechat-jsapi-pay`, {
        "amount": amount,
        "openid": openid
    })
}

export {
    authorize,
    getPrePayParams
}