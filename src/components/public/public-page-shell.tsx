import type { ReactNode } from "react";

import PublicFooter from "./public-footer";
import PublicNavbar from "./public-navbar";

export default function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <PublicNavbar />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
