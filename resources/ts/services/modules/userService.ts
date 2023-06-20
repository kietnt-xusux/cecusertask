import {service} from "../index";
import apiUrl from "@/constants/url";

export const userService = {
    async index(params: any = {}) {
        const url = apiUrl.USERS.INDEX

        return service.getList(url, params)
    },
    async create(params: any = {}) {
        const url = apiUrl.USERS.CREATE

        return service.post(url, params)
    },
    async getUser(params: any = {}) {
        const url = apiUrl.USERS.SHOW;
        // const url = apiUrl.USERS.UPDATE.replace('{id}', id);

        return service.get(url, params)
    },

    async update(params: any = {}, id: string) {
        const url = apiUrl.USERS.UPDATE.replace('{id}', id);

        return service.post(url, params)
    },

    async delete(params: any = {}) {
        const url = apiUrl.USERS.DELETE.replace('{id}', params.id);

        return service.post(url)
    },

    async logout() {
        const url = apiUrl.LOGOUT;

        return service.post(url)
    },
};
