import type { AuthUser, UserRole } from "@/types/auth.types";

export function getAuthRole(user?: AuthUser | null): UserRole | undefined {
  return (user?.role ||
    user?.platformRole ||
    user?.organizationMembers?.[0]?.role) as UserRole | undefined;
}

export function isPlatformAdmin(user?: AuthUser | null) {
  return getAuthRole(user) === "PLATFORM_SUPER_ADMIN";
}

export function isTenantUser(user?: AuthUser | null) {
  return Boolean(user?.organizationMembers?.length);
}
