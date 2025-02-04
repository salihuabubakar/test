import { CustomError } from "@/types";

export const localStorageManager = {
  get: (key: string): string | null => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key) ?? null;
    }

    return null;
  },

  set: (key: string, value: unknown): void => {
    if (typeof window !== "undefined") {
      let payload = value;

      if (typeof value !== "string") payload = JSON.stringify(value);

      window.localStorage.setItem(key, payload as string);
    }
  },

  remove: (key: string): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

export function handleTokenExpired(exp?: number) {
  if (!exp) return;

  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  const expiredTimer = window.setTimeout(() => {
    // console.log('expired');
    // You can do what ever you want here, like show a notification
    // Can show modal to logout
  }, timeLeft);

  window.clearTimeout(expiredTimer);
}

export function handleError(error: CustomError): string {
  const message = error.response?.data?.message;

  // if (message?.includes("invalid authentication details supplied")) {
  //   return "Incorrect Membership ID / Password";
  // }

  // if (message?.includes("Internal Server Error")) {
  //   return "An error occurred";
  // }

  // if (message?.includes("Please specify correct authorization header")) {
  //   return "Session expired, please login again";
  // }

  // if (message?.includes("Invalid token")) {
  //   return "Session expired, please login again";
  // }

  return message || "An error occurred";
}
