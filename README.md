Sales Management Software (Frontend)

A modern multi-tenant SaaS POS & Sales Management System frontend built with Next.js, designed to work with a scalable backend architecture. This system supports role-based access, billing via Stripe, and full business workflows including products, sales, inventory, and platform administration.

Live Demo
Frontend: (add your deployed URL)
Backend API: (add backend URL)
Features
Authentication & Authorization
Cookie-based session authentication (Better Auth)
Role-based UI rendering
Supports:
ORG_SUPER_ADMIN
ORG_ADMIN
SHOP_ADMIN
STAFF
PLATFORM_SUPER_ADMIN
Multi-Tenant Architecture
Each user belongs to an organization
Data is scoped per organization
Platform admin can manage all organizations
Dashboard
Role-based dashboard views
Sales analytics (daily/monthly)
KPI cards:
Revenue
Sales
Products
Inventory alerts
Product & Category Management
Full CRUD operations
Category selection via dropdown
Inline category creation modal
Image upload via Cloudinary
Sales Module
Create sales with multiple items
Payment tracking (partial/full)
Dynamic product selection
Auto total + discount handling
Inventory Module
Stock In / Stock Out
Inventory tracking by shop & storage
Role-based access control
Shop & Storage Management
Multi-shop support
Storage per shop
Used in inventory and sales flows
Staff Management
Create and manage staff
Role assignment
Status toggle (active/inactive)
Billing (Stripe Integration)
Subscription plans
Stripe Payment Element
Payment intent flow
Webhook-based subscription activation
Platform Admin Panel
Separate /platform routes
View all organizations
Suspend/activate organizations
Platform-wide dashboard
Tech Stack
Core
Next.js (App Router)
TypeScript
React Query (@tanstack/react-query)
UI
Tailwind CSS
shadcn/ui
Lucide Icons
Forms & Validation
React Hook Form
Zod
State & Data
React Query for server state
Custom hooks per module
