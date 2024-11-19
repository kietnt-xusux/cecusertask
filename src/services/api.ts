'use client';

import axios, { AxiosHeaders } from 'axios';
import { useStore } from '@/stores/auth.storage';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return process.env.APP_URL;
};

let base = getBaseUrl() + '/api/';

axios.defaults.baseURL = base;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['X-Request-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
    async function (config: any) {
        let state = useStore(state => state);
        if (state.user) {
            config.headers.Authorization = `Bearer ${state.user.access_token}`;
        }
        return config;
    },
    function (err: any) {
        return Promise.reject(err);
    }
);

const api = {
    async request(method: string, url: any, params: {} | null, data: {}, headers = {}, config = {}) {
        if (params && Object.keys(params).length > 0) params = { ...params };
        if (data && Object.keys(data).length > 0) data = { ...data };
        try {
            const res = await axios.request({ ...config, url, params, data, method: method, headers });
            return res.data;
        } catch (e: any) {
            if (e && typeof e === 'object' && e.response && e.response.status === 401) {
                useStore(state => state).logout();
            }
            return Promise.reject(e.response?.data ?? { status: 500, message: e.message });
        }
    },

    get(url: string, params: any = {}, config = {}) {
        return this.request('get', url, params, {}, {}, config);
    },

    post(url: string, data: any, headers = {}, config = {}) {
        return this.request('post', url, {}, data, headers, config);
    },

    put(url: string, data: any, headers = {}, config = {}) {
        return this.request('put', url, {}, data, headers, config);
    },

    delete(url: string, data = {}, config = {}) {
        return this.request('delete', url, {}, data, {}, config);
    },

    postData(url: string, data: any, headers = {}, config = {}) {
        headers = {
            ...headers,
            'Content-Type': 'multipart/form-data'
        };
        return this.request('post', url, {}, data, headers, config);
    }
};

export default api;
