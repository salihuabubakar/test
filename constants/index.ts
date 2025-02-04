import { EnvVar } from "@/types";

export const envVar: EnvVar = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  authBaseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
};
