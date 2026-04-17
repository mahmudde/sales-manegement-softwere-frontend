import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SimpleListCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
};

export default function SimpleListCard({
  title,
  children,
  className,
  headerAction,
}: SimpleListCardProps) {
  return (
    <Card
      className={cn(
        "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full",
        className,
      )}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-violet-600/10 dark:bg-violet-500/5" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-5 border-b border-slate-50 dark:border-slate-800/50">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {title}
        </CardTitle>
        {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
