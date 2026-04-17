"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

type SalesAnalyticsChartProps = {
  data: {
    label: string;
    totalSales: number;
    totalRevenue: number;
  }[];
};

export default function SalesAnalyticsChart({
  data,
}: SalesAnalyticsChartProps) {
  return (
    <div className="h-[350px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="dark:stroke-slate-800"
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              padding: "12px",
            }}
            itemStyle={{ fontSize: "12px", fontWeight: 700 }}
            labelStyle={{
              color: "#64748b",
              marginBottom: "4px",
              fontWeight: 600,
            }}
          />

          {/* Area under the line for depth */}
          <Area
            type="monotone"
            dataKey="totalRevenue"
            stroke="none"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />

          {/* Main Revenue Line */}
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{ r: 4, fill: "#7c3aed", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />

          {/* Secondary Sales Line (Dashed) */}
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
