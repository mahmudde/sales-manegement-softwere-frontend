export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
    REFRESH_TOKEN: "/auth/refresh-token",
    CHANGE_PASSWORD: "/auth/change-password",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  ORGANIZATION: {
    ME: "/organizations/me",
  },

  DASHBOARD: {
    OVERVIEW: "/dashboard/overview",
    SALES_ANALYTICS: "/dashboard/sales-analytics",
    TOP_PRODUCTS: "/dashboard/top-products",
    LOW_STOCK: "/dashboard/low-stock",
  },

  BILLING: {
    PLANS: "/billing/plans",
    CREATE_PAYMENT_INTENT: "/billing/create-payment-intent",
    STATUS: "/billing/status",
    HISTORY: "/billing/history",
  },

  PLATFORM: {
    DASHBOARD: "/platform/dashboard",
    ORGANIZATIONS: "/platform/organizations",
    ORGANIZATION_DETAILS: (id: string) => `/platform/organizations/${id}`,
    UPDATE_ORG_STATUS: (id: string) => `/platform/organizations/${id}/status`,
  },

  SALES: {
    LIST: "/sales",
    CREATE: "/sales",
    DETAILS: (id: string) => `/sales/${id}`,
    PAYMENTS: (id: string) => `/sales/${id}/payments`,
    RETURNS: (id: string) => `/sales/${id}/returns`,
    CANCEL: (id: string) => `/sales/${id}/cancel`,
  },
} as const;
