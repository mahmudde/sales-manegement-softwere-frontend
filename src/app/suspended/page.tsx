"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Mail, ArrowLeft, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuspendedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[500px]"
      >
        {/* Warning Icon with Theme Gradient */}
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-red-200 animate-pulse opacity-20" />
            <ShieldAlert className="h-10 w-10 text-red-600 relative z-10" />
          </div>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-violet-600" />

          <CardHeader className="pt-10 pb-6 px-8 text-center">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Access Restricted
            </CardTitle>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Your organization has been{" "}
              <span className="text-red-600 font-bold">suspended</span> by the
              platform administration. This usually occurs due to policy
              violations or administrative reviews.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-4">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() =>
                  (window.location.href = "mailto:support@nexusai.com")
                }
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="w-full h-12 border-slate-200 hover:bg-slate-50 font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Login
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
              <button className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                <LifeBuoy className="h-4 w-4" />
                View Documentation on Account Holds
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-[13px] font-bold text-slate-400 uppercase tracking-widest">
          Nexus Security Protocol
        </p>
      </motion.div>
    </div>
  );
}
