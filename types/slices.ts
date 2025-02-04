import { AuthPayload, ConfirmOtpPayload, StringNull, User, UpdateUserProfilePayload } from ".";

export interface AuthState {
  auth: {
    token: StringNull;
    isInitialized: boolean;
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    error: StringNull;
    message: StringNull;
    setIsInitialized: () => void;
    setLoading: (value: boolean) => void;
    clearError: () => void;
    clearMessage: () => void;
  };
  signUp: (data: AuthPayload) => Promise<void>;
  confirmEmail:(data: ConfirmOtpPayload) => Promise<void>
  login: (data: AuthPayload) => Promise<void>;
  updateUserProfile: (data: UpdateUserProfilePayload) => Promise<void>;
}
