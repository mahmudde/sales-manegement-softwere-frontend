export const staffKeys = {
  all: ["staff"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["staff", "list", params] as const,
  detail: (id: string) => ["staff", "detail", id] as const,
};
