export const dashboardKeys = {
  overview: ["dashboard", "overview"] as const,
  salesAnalytics: (period: "daily" | "monthly") =>
    ["dashboard", "sales-analytics", period] as const,
  topProducts: ["dashboard", "top-products"] as const,
  lowStock: ["dashboard", "low-stock"] as const,
};
