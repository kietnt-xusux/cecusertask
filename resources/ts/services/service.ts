import ApiService from "./api";
import { setStatus } from '../store/modules/loadingSlice';
import { store } from '../store/store'
// import {getAdminRoute} from "@/helper/utils";
import { redirect } from "react-router-dom";
import {getAdminRoute} from "@/helper/utils";
import commonConstant from "@/constants/common";

const ERROR_CODE_VALIDATE = 422;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_NOT_FOUND = 404;
const adminRoute = getAdminRoute();

const service = {
  async post(url: string, params = {}) {
    try {
      store.dispatch(setStatus(true))
      const result = await ApiService.post(url, params);
      store.dispatch(setStatus(false))

      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.status ? result.status : null,
        data: result.data ? result.data : null,
      };
    } catch (e) {
      return this._setError(e);
    }
  },
  async put(url: string, params: any) {
    try {
      store.dispatch(setStatus(true))
      let result = await ApiService.put(url, params);
      store.dispatch(setStatus(false))

      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.data.status,
        data: result.data.data,
      };
    } catch (e) {
      return this._setError(e);
    }
  },
  async getList(url: string, params: any) {
    try {
      let result = await ApiService.get(url, params);
      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.status,
        data: result.data,
      };
    } catch (e) {
      return this._setError(e);
    }
  },
  async get(url: string, params: any) {
    try {
      let result = await ApiService.get(url, params);
      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.status,
        data: result.data.data,
      };
    } catch (e) {
      return this._setError(e);
    }
  },
  async getWithLoading(url: string, params: any) {
    try {
      store.dispatch(setStatus(true))
      let result = await ApiService.get(url, params);
      store.dispatch(setStatus(false))

      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.status,
        data: result.data.data,
      };
    } catch (e) {
      return this._setError(e);
    }
  },
  async download(url: string, params: any) {
    try {
      let result = await ApiService.get(url, params, { responseType: "blob" });
      return {
        headers: result.headers,
        status: result.status,
        data: result.data,
      };
    } catch (e) {
      return this._setError(e);
    }
  },

  async export(url: any, params: any) {
    try {
    //   const result = await ApiService.export(url, params);

    //   return {
    //     statusCode: result.status ? result.status : null,
    //     status: result.data.status ? result.data.status : null,
    //     data: result.data ? result.data : null,
    //   };
    } catch (e) {
      return this._setError(e);
    }
  },

  async import(url: string, data: any) {
    try {
      const result = await ApiService.import(url, data);

      return {
        statusCode: commonConstant.STATUS_SUCCESS,
        status: result.data.status ? result.data.status : null,
        data: result.data ? result.data : null,
      };
    } catch (e) {
      return this._setError(e);
    }
  },

  async _setError(e: any) {
    store.dispatch(setStatus(false))
    let errorCode = e.response ? e.response.status : 500;

    let responseData = e.response.data;
    // if (
    //   e.request.responseType === "blob" &&
    //   e.response.data instanceof Blob &&
    //   e.response.data.type &&
    //   e.response.data.type.toLowerCase().indexOf("json") != -1
    // ) {
    //   responseData = JSON.parse(await e.response.data.text());
    // }

    switch (errorCode) {
      case ERROR_CODE_VALIDATE:
        return {
          status: false,
          statusCode: commonConstant.STATUS_VALIDATE,
          errors: e.response ? e.response.data.errors : "error",
        };
      case ERROR_CODE_UNAUTHORIZED:
        return redirect(adminRoute + "/login");
        // router.push({ name: "Login" });
        break;
      case ERROR_CODE_NOT_FOUND:
        if (responseData.route_name) {
          return {
            status: false,
            statusCode: errorCode,
            // data: {
            //   routeName: responseData.route_name,
            //   routeParams: responseData.route_params,
            // },
            error: e,
          };
        }
        break;
      default:
        break;
    }
    return e;
  },
};

export default service;
