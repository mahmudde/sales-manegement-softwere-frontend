# M ITSales Frontend

Next.js frontend for an open agency-style sales management platform. The app now has a public customer-facing website plus a protected role-based dashboard.

## Public Experience

- `/` public landing page with navbar, hero, feature sections, pricing preview, testimonials, FAQ, and CTA.
- `/features`, `/services`, `/pricing`, `/pricing/[id]`, `/about`, `/contact`, `/support`, `/blog`, `/privacy`, and `/terms`.
- Pricing cards include visual area, title, description, price metadata, filters, sorting, and details pages.
- Contact and support forms submit to backend customer interaction APIs.
- Light/dark theme toggle for public and dashboard UI.

## Dashboard Experience

- Role-based tenant dashboard.
- Products, categories, shops, staff, storages, inventory, sales, billing, settings, and customer leads.
- `/leads` lets admins review contact messages, demo requests, and support tickets.
- `/products/[id]` product details page.
- Sale details now include payment history and sale return creation/history.

## Local Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

The frontend runs at `http://localhost:3000`.

## Environment

```txt
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace
```

## Demo Credentials

```txt
Platform Admin
Email: platformadmin@gmail.com
Password: 12345678

Organization Admin
Email: admin@mitsales.demo
Password: 12345678

Staff
Email: staff@mitsales.demo
Password: 12345678
```

The login page includes demo buttons that autofill these credentials.

## Submission Links

Frontend repository:
https://github.com/mahmudde/sales-manegement-softwere-frontend.git

Backend repository:
https://github.com/mahmudde/sales-manegement-softwere-backend.git

Live URL:
Add the deployed frontend URL here after deployment.

Backend API URL:
Add the deployed backend URL here after deployment.
