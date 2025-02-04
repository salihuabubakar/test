export * from "./user";
export * from "./slices";
export type EnvVar = {
  apiBaseUrl: string;
  authBaseUrl: string;
};

export type StringNull = string | null;

export type CustomError =
  | any
  | {
      data?: {
        message?: string;
      };
    };
