export type ShopStatus = "ACTIVE" | "INACTIVE";

export type Shop = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  status?: ShopStatus;
  createdAt?: string;
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

export type SingleShopResponse = {
  success: true;
  message: string;
  data: Shop;
};

export type CreateShopPayload = {
  name: string;
  address?: string;
  phone?: string;
  status?: ShopStatus;
};

export type UpdateShopPayload = Partial<CreateShopPayload>;
