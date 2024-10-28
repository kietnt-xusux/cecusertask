import api from './api';

export const userService = {
    async index(params: any = {}) {
        return api.get('user', params)
    },
    async login(params: any = {}) {
        return api.post('login', params);
    },
    async logout() {
        return api.post('logout', {});
    },
    async me() {
        return api.get('/me');
    },
    async updateProfile(params: any = {}) {
        const formData = new FormData();
        if (params.picture) formData.append('picture', params.picture);
        formData.append('name', params.name);

        return api.postData('/update-profile', formData);
    },
    async updatePublicProfile(params: any = {}) {
        return api.post('/update-profile', params);
    },
    async updatePassword(params: any = {}) {
        return api.post('update-password', params);
    },
    async show(params: any = {}) {
        return api.get(`user/${params.id ?? 0}`, params)
    },
    async create(params: any = {}) {
        return api.post('user', params);
    },
    async update(params: any = {}) {
        return api.put(`user/${params.id ?? 0}`, params);
    },
    async delete(params: any = {}) {
        return api.delete(`user/${params.id ?? 0}`, params);
    },
    async forgotPassword(params: any = {}) {
        return api.post(`forgot-password`, params);
    },
    async checkToken(params: any = {}) {
        return api.put(`forgot-password`, params);
    },
    async resetPassword(params: any = {}) {
        return api.post(`reset-password`, params);
    },
}
