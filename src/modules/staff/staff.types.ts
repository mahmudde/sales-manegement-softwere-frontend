export type StaffRole = "ORG_ADMIN" | "SHOP_ADMIN" | "STAFF";
export type StaffStatus = "ACTIVE" | "INACTIVE";

export type Staff = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: StaffRole;
  status?: StaffStatus;
  image?:
    | {
        url: string;
        publicId?: string;
      }
    | string
    | null;

  shopId?: string | null;
  shopName?: string;
  createdAt?: string;

  // actual API response fields
  userId?: string;
  organizationId?: string;
  isActive?: boolean;
  joinedAt?: string;
  updatedAt?: string;

  user?: {
    id: string;
    name?: string;
    email?: string;
    phone?: string | null;
    image?: string | null;
    status?: StaffStatus;
  };

  organization?: {
    id: string;
    name?: string;
    slug?: string;
    email?: string | null;
    phone?: string | null;
  };
};

export type CreateStaffPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: StaffRole;
  shopId?: string;
  image?: File | null;
};

export type UpdateStaffPayload = Partial<Omit<CreateStaffPayload, "password">>;

export type UpdateStaffStatusPayload = {
  status: StaffStatus;
};
