import { API_URL } from "@/constants/api-url";
import { ROUTES } from "@/constants/route";
import toastState, { IToast } from "@/stores/toast";
import { LocalStorageService } from "@/utils/storage";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import { setRecoil } from "recoil-nexus";

const publishApi: Array<string> = [API_URL.LOGIN, API_URL.REGISTER];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30 * 1000,
  });

  instance.interceptors.request.use(
    (config) => {
      const url = config.url;
      if (url && publishApi.includes(url)) {
        return config;
      }
      const accessToken = LocalStorageService.getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<unknown>) => {
      const errorResponse = error?.response as any;
      if (
        errorResponse?.data?.detail === "Could not validate credentials" &&
        errorResponse.status === 401
      ) {
        setRecoil<IToast>(toastState, {
          message: "Could not validate credentials",
          type: "error",
        });
        LocalStorageService.deleteAccessToken();
        Router.push(ROUTES.LOGIN);
        return;
      }
      return Promise.reject(error?.response || error);
    }
  );

  return instance;
};
const api = createAxiosInstance();

export default api;
