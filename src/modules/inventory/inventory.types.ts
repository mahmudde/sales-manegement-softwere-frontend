export type InventoryItem = {
  id: string;
  productId: string;
  productName?: string;
  product?: {
    id: string;
    name: string;
    sku?: string;
    price?: number;
    salePrice?: number;
    sellingPrice?: number;
    unitPrice?: number;
    mrp?: number;
  };
  shopId?: string;
  shopName?: string;
  shop?: {
    id: string;
    name: string;
  };
  storageId?: string;
  storageName?: string;
  storage?: {
    id: string;
    name: string;
  };
  quantity?: number;
  stock?: number;
  availableQuantity?: number;
  lowStockThreshold?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type InventoryTransactionType =
  | "STOCK_IN"
  | "STOCK_OUT"
  | "SALE"
  | "RETURN"
  | "ADJUSTMENT";

export type InventoryTransaction = {
  id: string;

  productId?: string;
  productName?: string;
  product?: {
    id: string;
    name: string;
    sku?: string;
  };

  shopId?: string;
  shopName?: string;
  shop?: {
    id: string;
    name: string;
  };

  storageId?: string;
  storageName?: string;
  storage?: {
    id: string;
    name: string;
  };

  createdById?: string;
  createdBy?: {
    id: string;
    name?: string;
    email?: string;
  };

  type?: InventoryTransactionType | string;
  quantity?: number;
  note?: string | null;
  createdAt?: string;
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

export type InventoryTransactionsResponse = {
  success: true;
  message: string;
  data: InventoryTransaction[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

export type StockInPayload = {
  shopId: string;
  storageId: string;
  productId: string;
  quantity: number;
  note?: string;
};

export type StockOutPayload = {
  shopId: string;
  storageId: string;
  productId: string;
  quantity: number;
  note?: string;
};
