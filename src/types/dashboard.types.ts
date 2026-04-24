export type DashboardOverview = {
  totalSales?: number;
  totalRevenue?: number;
  totalDue?: number;
  totalProducts?: number;
  totalCustomers?: number;
  totalShops?: number;
  totalStaff?: number;
};

export type SalesAnalyticsItem = {
  label: string;
  totalSales: number;
  totalRevenue: number;
};

export type TopProductItem = {
  id: string;
  name: string;
  totalSold: number;
  stock?: number;
};

export type LowStockItem = {
  id: string;
  name: string;
  stock: number;
  shopName?: string;
  storageName?: string;
};

export type DashboardItem = {
  id: string;
  name?: string;
  productName?: string;

  product?: {
    name?: string;
  };

  shop?: {
    name?: string;
  };

  storage?: {
    name?: string;
  };

  shopName?: string;
  storageName?: string;

  quantity?: number;
  stock?: number;
  availableQuantity?: number;
  totalSold?: number;
};
