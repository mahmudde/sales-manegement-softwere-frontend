export const categoriesKeys = {
  all: ["categories"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["categories", "list", params] as const,
  detail: (id: string) => ["categories", "detail", id] as const,
};
