import { envVar } from "@/constants";
import axios, { AxiosInstance } from "axios";
import { handleTokenExpired, localStorageManager } from "./custom";
import { jwtDecode } from "jwt-decode";

const KEY = "accessToken";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: envVar.apiBaseUrl,
  timeout: 10_000,
});

const authInstance: AxiosInstance = axios.create({
  baseURL: envVar.authBaseUrl,
  timeout: 10_000,
});

export function setSession(accessToken?: string, key?: string): void {
  if (!accessToken) {
    localStorageManager.remove(key ? key : KEY);

    delete axiosInstance.defaults.headers.common.Authorization;
    delete authInstance.defaults.headers.common.Authorization;

    return;
  }

  localStorageManager.set(key ? key : KEY, accessToken);

  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  authInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const { exp } = jwtDecode(accessToken);

  handleTokenExpired(exp);
}

export function getSession(): string | null {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(KEY) ?? null;
  }

  return null;
}

export { axiosInstance, authInstance };
