import apiUrl from "@/constants/url";
import ApiService from "../api";
import {ServiceProps} from "@/helper/type";

const authService: ServiceProps = {
    async login(params: any = {}) {
        try {
            const result = await ApiService.post(apiUrl.LOGIN, params);

            return {
                statusCode: result.status ? result.status : null,
                status: result.data.status ? result.data.status : null,
                data: result.data ? result.data : null,
            };
        } catch (e: any) {
            let errorCode = e.response ? e.response.status : 500;

            return {
                status: false,
                statusCode: errorCode,
                data: e.response ? e.response.data.errors : "error",
                errors: e.response.data.errors,
            };
        }
    }
};

export default authService;
