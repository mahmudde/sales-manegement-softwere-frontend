export const storagesKeys = {
  all: ["storages"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["storages", "list", params] as const,
};
