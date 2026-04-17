"use client";

import { logout } from "@/modules/auth/auth.api";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/modules/auth/auth.keys";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Rocket, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn("Logout API failed");
    } finally {
      await queryClient.removeQueries({
        queryKey: authKeys.me,
      });

      toast.success("Logged out");
      router.replace("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[520px]"
      >
        {/* Visual Header */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="h-20 w-20 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-200 dark:shadow-none relative z-10">
              <CreditCard className="h-10 w-10 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -inset-3 border-2 border-dashed border-violet-200 dark:border-violet-900 rounded-full opacity-50"
            />
          </div>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:bg-slate-900/50 overflow-hidden">
          {/* Theme Gradient Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500" />

          <CardHeader className="pt-10 pb-6 px-10 text-center">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Subscription Inactive
            </CardTitle>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Your organization’s access has been paused. To continue using the
              platform features, please select a subscription plan.
            </p>
          </CardHeader>

          <CardContent className="px-10 pb-12">
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-5 mb-8 border border-slate-100 dark:border-slate-800">
              <ul className="space-y-3">
                {[
                  "Restore access to all project data",
                  "Unlock enterprise-grade security",
                  "24/7 Priority support access",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-violet-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex-1 h-12 border-slate-200 font-bold gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Logout
              </Button>
              <Button
                onClick={() => alert("Plans page coming next")}
                className="flex-[1.5] h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-[0.98] gap-2"
              >
                <Rocket className="h-4 w-4" />
                View Upgrade Options
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Need help with billing?{" "}
          <a href="#" className="text-violet-600 hover:underline font-bold">
            Talk to our Sales team
          </a>
        </p>
      </motion.div>
    </div>
  );
}
