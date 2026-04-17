import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Subtle top accent gradient that appears on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-[13px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </CardTitle>

        {/* Icon Container with soft background tint */}
        {icon && (
          <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            {value}
          </div>

          {trend && (
            <span
              className={cn(
                "text-[11px] font-bold px-1.5 py-0.5 rounded-md",
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
