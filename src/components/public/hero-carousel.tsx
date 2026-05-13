"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const slides = [
  {
    title: "Lead to revenue workflow",
    subtitle: "Capture demo requests, then convert in the dashboard.",
    bars: [38, 54, 49, 70, 64, 82, 75],
    items: [
      "Demo inquiry qualified",
      "Proposal shared with client",
      "Subscription activated",
    ],
  },
  {
    title: "Inventory-first operations",
    subtitle: "Prevent stock issues before they block sales teams.",
    bars: [26, 41, 57, 60, 72, 79, 92],
    items: [
      "Low-stock alert resolved",
      "Storage transfer completed",
      "Shop availability updated",
    ],
  },
  {
    title: "Multi-branch visibility",
    subtitle: "Track branch performance in one place.",
    bars: [31, 48, 52, 66, 74, 86, 90],
    items: [
      "Branch report synced",
      "Due payment collected",
      "Weekly sales target reached",
    ],
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 text-white dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Live agency console</p>
            <h2 className="text-xl font-black">{slide.title}</h2>
            <p className="mt-1 text-xs text-slate-300">{slide.subtitle}</p>
          </div>
          <ShieldCheck className="h-8 w-8 text-emerald-300" />
        </div>
        <div className="mt-5 h-44 rounded-xl bg-gradient-to-t from-violet-600/50 to-emerald-300/20 p-4">
          <div className="flex h-full items-end gap-3">
            {slide.bars.map((height) => (
              <span
                key={height}
                className="flex-1 rounded-t-lg bg-white/80 transition-all duration-500"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {slide.items.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-7 bg-violet-300" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
