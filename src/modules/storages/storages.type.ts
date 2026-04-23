export type StorageStatus = "ACTIVE" | "INACTIVE";

export type Storage = {
  id: string;
  name: string;
  address?: string;
  shopId?: string;
  shopName?: string;
  status?: StorageStatus;
  createdAt?: string;
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

export type SingleStorageResponse = {
  success: true;
  message: string;
  data: Storage;
};

export type CreateStoragePayload = {
  name: string;
  address?: string;
  shopId: string;
  status?: StorageStatus;
};

export type UpdateStoragePayload = Partial<CreateStoragePayload>;
