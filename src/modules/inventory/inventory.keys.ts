export const inventoryKeys = {
  all: ["inventory"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["inventory", "list", params] as const,
  transactions: (params: Record<string, string | number | undefined>) =>
    ["inventory", "transactions", params] as const,
};
