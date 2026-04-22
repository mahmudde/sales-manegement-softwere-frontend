export type Storage = {
  id: string;
  name: string;
  status?: "ACTIVE" | "INACTIVE";
  shopId?: string;
};

export type StoragesListResponse = {
  success: true;
  message: string;
  data: Storage[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};
