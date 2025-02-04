export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type AuthPayload = {
  email: string;
  password: string;
};

export type ConfirmOtpPayload = {
  code: string;
};

export type UpdateUserProfilePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
}
