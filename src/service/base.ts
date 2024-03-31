import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getCookie } from '@/utils/cookie'

interface CommonResponse<T> {
    traceId: string,
    spanId: string,
    code: number,
    message: string,
    data: T
}

class BaseApiService {
    http: AxiosInstance

    constructor() {
        this.http = axios.create({
            baseURL: "http://api.wechat.bangshang.net.cn",
            timeout: 5000,
            headers: {
                'Authorization': getCookie('token')
            }
        })
        this.http.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // 一般会请求拦截里面加token，用于后端的验证
                const token = localStorage.getItem("token") as string
                if (token) {
                    config.headers!.Authorization = token;
                }

                return config
            },
            (err: any) => {
                return Promise.reject(err)
            },
        )
    }

    async get<ResponseData>(uri: string): Promise<ResponseData> {
        return this.http.get(uri)
    }

    // 经过封装的 post 方法，接口入参和出参都具备公共参数
    async post<RequestData, ResponseData>(uri: string, data: RequestData): Promise<AxiosResponse<CommonResponse<ResponseData>>> {
        return this.http.post(uri, data)
    }
}

export default BaseApiService
