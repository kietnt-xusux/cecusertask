import axios from "axios";
import { store } from '@/store'
// @ts-ignore
let base = baseUrl + "/api/";

axios.defaults.baseURL = base;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Expires'] = 0;
axios.defaults.headers.common['Timezone'] = new Date().getTimezoneOffset();
axios.defaults.headers.common['X-Request-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(async function (config : any) {
    let state = store.getState()
    if (state.authentication.token) {
        config.headers.Authorization = `Bearer ${state.authentication.token}`
    }
    return config
}, function (err: any) {
    return Promise.reject(err)
});

const api = {
    request(method: string, url: any, params: {} | null, data: {}, headers = {}, config = {}) {
        return axios.request({...config, url, params, data, method: method.toLowerCase(), headers});
    },

    get(url: string, params = null, config = {}) {
        return this.request('get', url, params, {}, {}, config)
    },

    post(url: string, data: any, headers = {}, config = {}) {
        return this.request('post', url, {}, data, headers, config)
    },

    put(url: string, data: any, config = {}) {
        return this.request('put', url, {}, data, {}, config)
    },

    delete(url: string, data = {}, config = {}) {
        return this.request('delete', url, {}, data, {}, config)
    },

    // export(url: any, data: any, headers = {}, config = {}) {
    //     config.responseType = 'blob';
    //     return this.request('post', url, {}, data, headers, config)
    // },

    import(url: string, data: any, headers = {}, config = {}) {
        // this.setHeader('Content-Type', 'multipart/form-data');
        return this.request('post', url, {}, data, headers, config)
    },

    // setHeader(key: string, value: string | number | boolean | AxiosHeaders | string[] | null | undefined) {
    //     axios.defaults.headers.common[key] = value
    // }
}

export default api;
