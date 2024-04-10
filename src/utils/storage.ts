import { STORAGE_KEY } from "@/constants/storage-key";

export class LocalStorageService {
  static setAccessToken(accessToken: string) {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
  }

  static getAccessToken() {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  }

  static deleteAccessToken() {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
  }
}
