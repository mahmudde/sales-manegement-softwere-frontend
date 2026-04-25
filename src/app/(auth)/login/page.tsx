"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/modules/auth/auth.keys";
import { getPlatformUser, login } from "@/modules/auth/auth.api";
import { parseApiError } from "@/lib/error-parser";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  Zap,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setGlobalError(null);

    try {
      await login(data);

      try {
        const platformUser = await getPlatformUser();

        if (platformUser?.data?.platformRole === "PLATFORM_SUPER_ADMIN") {
          await queryClient.invalidateQueries({
            queryKey: authKeys.platformMe,
          });

          router.replace("/platform/dashboard");
          return;
        }
      } catch {
        // Not a platform admin. Continue as tenant user.
      }

      await queryClient.invalidateQueries({
        queryKey: authKeys.me,
      });

      router.replace("/dashboard");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (err.path === "email" || err.path === "password") {
          setError(err.path as keyof FormValues, {
            message: err.message,
          });
        }
      });

      setGlobalError(parsed.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] dark:bg-[#020617] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[400px]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-200 dark:shadow-none">
            <Zap className="h-6 w-6 text-white fill-white/20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            M IT
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium text-center">
            Sign in to manage your platform
          </p>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-900/50 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          <CardHeader className="pt-8 pb-4 px-8">
            <CardTitle className="text-xl font-bold text-center tracking-tight">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p className="font-medium">{globalError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Business Email
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

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mx-0.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-[13px] font-bold text-violet-600 hover:text-violet-700"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 shadow-md shadow-violet-200 dark:shadow-none mt-2 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in to Console"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-[13px] text-slate-400">
            Secure login for registered administrators only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
