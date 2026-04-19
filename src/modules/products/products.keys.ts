export const productsKeys = {
  all: ["products"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["products", "list", params] as const,
  detail: (id: string) => ["products", "detail", id] as const,
};
