"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, ArrowLeft, Loader2, Zap, KeyRound } from "lucide-react";

import { forgotPassword } from "@/modules/auth/auth.api";
import { parseApiError } from "@/lib/error-parser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(data);
      toast.success("OTP sent to your email address.");
      router.push("/reset-password");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (err.path === "email") {
          setError("email", {
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
        className="w-full max-w-[400px]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-200 dark:shadow-none">
            <KeyRound className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 text-center">
            Reset Password
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium text-center px-4">
            Enter your email and we’ll send you an OTP to access your account.
          </p>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-900/50 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          <CardHeader className="pt-8 pb-4 px-8">
            <CardTitle className="text-xl font-bold text-center tracking-tight text-slate-900 dark:text-slate-50">
              Recover Account
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 shadow-md shadow-violet-200 dark:shadow-none mt-2 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  "Send OTP Code"
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
            Back to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}
