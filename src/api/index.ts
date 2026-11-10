import { Api } from './Api'

export const TOKEN_KEY = 'pediatric_dose_token'

export const api = new Api({
    baseURL: '/api',
    securityWorker: (token) =>
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
})

export const applyToken = (token: string | null) => {
    api.setSecurityData(token)

    if (token) {
        api.instance.defaults.headers.common.Authorization = `Bearer ${token}`
        return
    }

    delete api.instance.defaults.headers.common.Authorization
}
