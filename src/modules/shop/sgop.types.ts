export type Shop = {
  id: string;
  name: string;
  status?: "ACTIVE" | "INACTIVE";
};

export type ShopsListResponse = {
  success: true;
  message: string;
  data: Shop[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};
