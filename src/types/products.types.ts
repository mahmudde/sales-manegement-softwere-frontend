export type ProductStatus = "ACTIVE" | "INACTIVE";

export type ProductImage = {
  url: string;
  publicId?: string;
};

export type Product = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  sku?: string;
  price: number;
  costPrice?: number;
  categoryId?: string;
  categoryName?: string;
  category?: {
    id: string;
    name?: string;
  };
  status?: ProductStatus;
  image?: ProductImage | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductsListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ProductsListResponse = {
  success: true;
  message: string;
  data: Product[];
  meta?: ProductsListMeta;
};

export type SingleProductResponse = {
  success: true;
  message: string;
  data: Product;
};

export type CreateProductPayload = {
  name: string;
  sku?: string;
  price: number;
  costPrice?: number;
  categoryId: string;
  status?: ProductStatus;
  image?: File | null;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;
