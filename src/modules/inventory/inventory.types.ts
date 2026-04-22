export type InventoryItem = {
  id: string;
  productId: string;
  productName?: string;
  product?: {
    id: string;
    name: string;
    price?: number;
    salePrice?: number;
    sellingPrice?: number;
    unitPrice?: number;
    mrp?: number;
  };
  shopId?: string;
  storageId?: string;
  quantity?: number;
  stock?: number;
  availableQuantity?: number;
};

export type InventoryListResponse = {
  success: true;
  message: string;
  data: InventoryItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};
