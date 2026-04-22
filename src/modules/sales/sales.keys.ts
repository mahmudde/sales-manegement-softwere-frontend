export const salesKeys = {
  all: ["sales"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["sales", "list", params] as const,
  detail: (id: string) => ["sales", "detail", id] as const,
  payments: (id: string) => ["sales", "payments", id] as const,
  returns: (id: string) => ["sales", "returns", id] as const,
};
