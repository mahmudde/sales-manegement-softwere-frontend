import {
  BarChart3,
  Boxes,
  Building2,
  Headphones,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";

export const publicStats = [
  { label: "Operational modules", value: "9" },
  { label: "Role-based dashboards", value: "5" },
  { label: "Inventory movements tracked", value: "100%" },
  { label: "Agency onboarding support", value: "1:1" },
];

export const publicFeatures = [
  {
    title: "Sales operations",
    description:
      "Create invoices, collect partial payments, monitor dues, and keep every sale connected to the correct shop and staff member.",
    icon: ShoppingCart,
  },
  {
    title: "Inventory control",
    description:
      "Track stock by shop, storage, product, and movement type so teams always know what is available before they sell.",
    icon: Warehouse,
  },
  {
    title: "Product catalog",
    description:
      "Manage categories, images, pricing, SKU codes, and stock status from a single organized product workspace.",
    icon: PackageCheck,
  },
  {
    title: "Team permissions",
    description:
      "Separate platform, organization, shop admin, and staff workflows so each person sees the right tools.",
    icon: Users,
  },
  {
    title: "Business analytics",
    description:
      "Review sales trends, top products, low-stock alerts, and operational summaries from dynamic dashboards.",
    icon: BarChart3,
  },
  {
    title: "Subscription billing",
    description:
      "Offer plans, payment history, billing status, and Stripe-powered subscription management for growing teams.",
    icon: ShieldCheck,
  },
];

export const publicServices = [
  {
    title: "Implementation and setup",
    description:
      "We configure shops, storages, roles, billing plans, and starter inventory so your team starts with a clean system.",
  },
  {
    title: "Data migration",
    description:
      "Move product catalogs, customer-ready pricing, and stock records from spreadsheets into a managed workflow.",
  },
  {
    title: "Workflow consulting",
    description:
      "Map your sales, return, and stock movement rules into a repeatable operating process for staff and managers.",
  },
  {
    title: "Ongoing support",
    description:
      "Get help with onboarding, account setup, payment issues, reports, and new branch rollout planning.",
  },
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 1900,
    interval: "monthly",
    category: "Small team",
    description:
      "For single-shop teams that need organized products, inventory, and daily sales tracking.",
    features: [
      "1 shop workspace",
      "Up to 3 staff users",
      "Product and category management",
      "Sales and due tracking",
      "Basic dashboard analytics",
    ],
    media: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 4900,
    interval: "monthly",
    category: "Growing business",
    description:
      "For multi-shop businesses that need role-based management and deeper inventory controls.",
    features: [
      "Up to 5 shops",
      "Up to 20 staff users",
      "Storage-wise inventory",
      "Payment history and returns workflow",
      "Priority support",
    ],
    media: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: 9900,
    interval: "monthly",
    category: "Multi-branch team",
    description:
      "For operators managing several branches, recurring billing, and advanced operational reporting.",
    features: [
      "Unlimited shops",
      "Unlimited staff users",
      "Advanced dashboards",
      "Billing and subscription controls",
      "Dedicated onboarding session",
    ],
    media: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    ],
    popular: false,
  },
  {
    id: "agency",
    name: "Agency Managed",
    price: 14900,
    interval: "monthly",
    category: "Managed service",
    description:
      "For businesses that want the software plus agency support for setup, training, and process improvement.",
    features: [
      "Everything in Scale",
      "Monthly operations review",
      "Data import assistance",
      "Custom report planning",
      "Dedicated success contact",
    ],
    media: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    ],
    popular: false,
  },
];

export const workflowSteps = [
  {
    title: "Discover",
    description:
      "Customers explore features, pricing, and support options before requesting a demo or creating an account.",
  },
  {
    title: "Onboard",
    description:
      "Admins configure organization details, shops, storage locations, products, categories, and staff roles.",
  },
  {
    title: "Operate",
    description:
      "Staff process sales, managers monitor stock, and owners review analytics and billing from one system.",
  },
];

export const testimonials = [
  {
    name: "Nusrat Trading House",
    role: "Wholesale electronics distributor",
    quote:
      "M ITSales gave our sales team one shared source of truth for stock, payments, and shop performance.",
  },
  {
    name: "Urban Mart",
    role: "Retail chain",
    quote:
      "The role-based dashboard helped our branch managers work independently while head office kept visibility.",
  },
  {
    name: "Prime Accessories",
    role: "Mobile accessories seller",
    quote:
      "We moved away from scattered spreadsheets and now review stock movement before every large sale.",
  },
];

export const faqs = [
  {
    question: "Can customers use the software without agency support?",
    answer:
      "Yes. Teams can self-register, but the managed plans include onboarding, migration help, and workflow consulting.",
  },
  {
    question: "Does it support multiple shops?",
    answer:
      "Yes. Organization admins can manage multiple shops, storage locations, staff users, and inventory movements.",
  },
  {
    question: "Can staff members have limited access?",
    answer:
      "Yes. The dashboard supports platform admin, organization admin, shop admin, and staff-level workflows.",
  },
  {
    question: "Is billing connected to subscriptions?",
    answer:
      "Yes. The existing billing module is designed for subscription status, payment history, and Stripe payments.",
  },
];

export const audienceCards = [
  {
    title: "Retail owners",
    description:
      "Track stock, staff, sales, dues, and branch performance without switching between disconnected tools.",
    icon: Building2,
  },
  {
    title: "Shop managers",
    description:
      "Manage daily sales, product availability, storage movement, and team activity from a focused workspace.",
    icon: Boxes,
  },
  {
    title: "Support teams",
    description:
      "Use public inquiries, support tickets, and demo requests to keep customer communication organized.",
    icon: Headphones,
  },
];
