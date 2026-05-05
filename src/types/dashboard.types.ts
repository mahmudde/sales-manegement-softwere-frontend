export type DashboardOverview = {
  summary: {
    totalShops: number;
    totalStaff: number;
    totalProducts: number;
    totalStorages: number;
    totalInventoryRecords: number;
    lowStockProducts: number;
  };
  sales: {
    todaySalesCount: number;
    todaySalesAmount: number;
    monthlySalesCount: number;
    monthlySalesAmount: number;
  };
  recentSales?: unknown[];
  recentInventoryTransactions?: unknown[];
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
