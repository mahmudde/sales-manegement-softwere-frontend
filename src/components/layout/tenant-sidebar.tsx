"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tenantNavigation } from "@/config/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export default function TenantSidebar() {
  const pathname = usePathname();
  const { data, isLoading } = useCurrentUser();

  // TypeScript now understands this structure thanks to our new types!
  const user = data?.data;
  const role = user?.organizationMembers?.[0]?.role;

  // Filter items based on role
  const navItems = role
    ? tenantNavigation.filter((item) => item.roles.includes(role))
    : [];

  if (isLoading) {
    return (
      <aside className="hidden md:flex md:w-64 md:flex-col border-r bg-background h-screen sticky top-0">
        <div className="h-16 border-b px-6 flex items-center">
          <h2 className="text-lg font-bold text-primary">M ITSales</h2>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-full bg-muted/60 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r bg-background h-screen sticky top-0">
      <div className="h-16 border-b px-6 flex items-center">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          M ITSales
        </h2>
      </div>

      <div className="px-6 pt-6 pb-2">
        <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/70 uppercase">
          Main Menu
        </p>
      </div>

      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {navItems.length === 0 ? (
          <div className="px-3 py-2 bg-muted/30 rounded-lg border border-dashed mt-2">
            <p className="text-xs text-muted-foreground text-center">
              No menu items for your role.
            </p>
          </div>
        ) : (
          navItems.map((item) => {
            // Updated: Matches exact path OR if the current path starts with item.href
            // (Prevents "Products" from losing focus when creating/editing)
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })
        )}
      </nav>

      {/* Optional: Add a logout or user profile trigger here later */}
    </aside>
  );
}
