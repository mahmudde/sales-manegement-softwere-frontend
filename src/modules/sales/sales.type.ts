export type SalePaymentMethod = "CASH" | "CARD" | "BANK" | "MOBILE_BANKING";

export type SalePaymentStatus = "PAID" | "PARTIAL" | "UNPAID";

export type SaleItemInput = {
  productId: string;
  quantity: number;
};

export type CreateSalePayload = {
  shopId: string;
  storageId: string;
  paymentMethod: SalePaymentMethod;
  discount: number;
  paidAmount: number;
  note?: string;
  items: SaleItemInput[];
};

export type SaleItem = {
  id: string;
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice?: number;
  subtotal?: number;
  totalPrice?: number;
  product?: {
    id: string;
    name?: string;
  };
};

export type Sale = {
  id: string;
  invoiceNo?: string;
  invoiceNumber?: string;
  shopId?: string;
  shop?: {
    id: string;
    name?: string;
  };
  shopName?: string;
  storageId?: string;
  storageName?: string;
  paymentMethod?: SalePaymentMethod;
  discount?: number;
  paidAmount?: number;
  dueAmount?: number;
  totalAmount?: number;
  paymentStatus?: SalePaymentStatus;
  note?: string;
  status?: string;
  items?: SaleItem[];
  createdAt?: string;
};

export type SalesListResponse = {
  success: true;
  message: string;
  data: Sale[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

export type SingleSaleResponse = {
  success: true;
  message: string;
  data: Sale;
};

export type AddSalePaymentPayload = {
  amount: number;
  paymentMethod: SalePaymentMethod;
  note?: string;
};

export type CreateSaleReturnPayload = {
  storageId: string;
  note?: string;
  items: {
    saleItemId: string;
    quantity: number;
  }[];
};

export type CancelSalePayload = {
  note?: string;
};

export type SaleReturn = {
  id: string;
  saleId: string;
  refundAmount?: number;
  status?: string;
  note?: string;
  storage?: {
    id: string;
    name?: string;
  };
  returnedBy?: {
    id: string;
    name?: string;
  };
  items: {
    saleItemId: string;
    quantity: number;
    totalPrice?: number;
    product?: {
      id: string;
      name?: string;
    };
  }[];
  createdAt: string;
};

export type SalePayment = {
  id: string;
  amount: number;
  paymentMethod: SalePaymentMethod;
  note?: string;
  createdAt?: string;
};

export type SalePaymentsResponse = {
  success: true;
  message: string;
  data: SalePayment[];
};
