export type CategoryStatus = "ACTIVE" | "INACTIVE";

export type Category = {
  id: string;
  name: string;
  status?: CategoryStatus;
  createdAt?: string;
};

export type CategoriesListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type CategoriesListResponse = {
  success: true;
  message: string;
  data: Category[];
  meta?: CategoriesListMeta;
};

export type SingleCategoryResponse = {
  success: true;
  message: string;
  data: Category;
};

export type CreateCategoryPayload = {
  name: string;
  status?: CategoryStatus;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;
