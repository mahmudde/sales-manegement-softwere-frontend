export type UserRole =
  | "ORG_SUPER_ADMIN"
  | "ORG_ADMIN"
  | "SHOP_ADMIN"
  | "STAFF"
  | "PLATFORM_SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface OrganizationInfo {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  isActive: boolean;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  organization: OrganizationInfo;
}

export interface ShopAssignment {
  id: string;
  userId: string;
  shopId: string;
  role: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string | null;
  status: UserStatus;
  platformRole: string | null;
  organizationMembers: OrganizationMember[];
  shopAssignments: ShopAssignment[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  organizationName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
