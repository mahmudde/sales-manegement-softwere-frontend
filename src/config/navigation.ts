import {
  LayoutDashboard,
  Package,
  Tags,
  Store,
  Users,
  Warehouse,
  ClipboardList,
  BadgeDollarSign,
  CreditCard,
  Settings,
  LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/types/auth.types";

export type NavItem = {
  label: string;
  href: string;
  roles: UserRole[];
  icon: LucideIcon; // Added this field
};

export const tenantNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN", "STAFF"],
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/products",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN"],
    icon: Package,
  },
  {
    label: "Categories",
    href: "/categories",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN"],
    icon: Tags,
  },
  {
    label: "Shops",
    href: "/shops",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN"],
    icon: Store,
  },
  {
    label: "Staff",
    href: "/staff",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN"],
    icon: Users,
  },
  {
    label: "Storages",
    href: "/storages",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN"],
    icon: Warehouse,
  },
  {
    label: "Inventory",
    href: "/inventory",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN", "STAFF"],
    icon: ClipboardList,
  },
  {
    label: "Sales",
    href: "/sales",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN", "SHOP_ADMIN", "STAFF"],
    icon: BadgeDollarSign,
  },
  {
    label: "Billing",
    href: "/billing",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN"],
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    roles: ["ORG_SUPER_ADMIN", "ORG_ADMIN"],
    icon: Settings,
  },
];
