export type UserRole =
  | "ORG_SUPER_ADMIN"
  | "ORG_ADMIN"
  | "SHOP_ADMIN"
  | "STAFF"
  | "PLATFORM_SUPER_ADMIN";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  organizationName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};
