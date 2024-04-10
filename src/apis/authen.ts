import { API_URL } from "@/constants/api-url";

import api from "./config";
import { ILogin, IRegister, IUser } from "@/types/authenticate";
import { ISettings } from "@/types/settings";

export const registerAccount = async (body: IRegister) => {
  const response = await api.post(API_URL.REGISTER, body);
  return response.data;
};

export const loginAccount = async (body: ILogin) => {
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("password", body.password);
  const response = await api.post<{ access_token: string }>(
    API_URL.LOGIN,
    formData
  );
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get<IUser>(API_URL.USER);
  return response.data;
};

export const updateUserInfo = async (body: ISettings) => {
  const response = await api.patch(API_URL.USER, body);
  return response.data;
};
