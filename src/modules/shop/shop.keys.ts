export const shopsKeys = {
  all: ["shops"] as const,
  list: (params: Record<string, string | number | undefined>) =>
    ["shops", "list", params] as const,
};
