"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Fingerprint,
} from "lucide-react";

import { resetPassword } from "@/modules/auth/auth.api";
import { parseApiError } from "@/lib/error-parser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const resetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().min(4, "OTP is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(data);
      toast.success("Password reset successful. Please sign in.");
      router.push("/login");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        const path = err.path as keyof ResetPasswordFormValues;
        if (path === "email" || path === "otp" || path === "newPassword") {
          setError(path, {
            message: err.message,
          });
        }
      });

      toast.error(parsed.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-200 dark:shadow-none">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-center">
            Finalize Reset
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium text-center px-4">
            Verify your identity with the OTP and set your new secure password.
          </p>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-900/50 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          <CardHeader className="pt-8 pb-4 px-8">
            <CardTitle className="text-xl font-bold text-center tracking-tight text-slate-900 dark:text-slate-50">
              New Credentials
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Confirm Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="name@company.com"
                    className="pl-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* OTP */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Verification Code (OTP)
                </label>
                <div className="relative group">
                  <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("otp")}
                    placeholder="123456"
                    className="pl-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30 font-mono tracking-widest"
                  />
                </div>
                {errors.otp && (
                  <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  New Secure Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("newPassword")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 shadow-md shadow-violet-200 dark:shadow-none mt-4 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Updating Access...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/login")}
            className="group flex items-center justify-center gap-2 w-full text-sm font-bold text-slate-500 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Cancel and Return
          </button>
        </div>
      </motion.div>
    </div>
  );
}
