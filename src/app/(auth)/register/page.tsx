"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Zap,
  AlertCircle,
} from "lucide-react";

import { register as registerUser } from "@/modules/auth/auth.api";
import { parseApiError } from "@/lib/error-parser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      organizationName: "",
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setGlobalError(null);
    try {
      await registerUser(data);
      router.push("/login");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        const path = err.path as keyof RegisterFormValues;
        if (
          ["organizationName", "name", "email", "password", "phone"].includes(
            path,
          )
        ) {
          setError(path, { message: err.message });
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
        className="w-full max-w-[550px]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-200 dark:shadow-none">
            <Zap className="h-6 w-6 text-white fill-white/20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Nexus AI for Teams
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium max-w-xs">
            Set up your organization and centralize your sales management today.
          </p>
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-900/50 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

          <CardHeader className="pt-8 pb-4 px-8">
            <CardTitle className="text-xl font-bold text-center tracking-tight text-slate-900 dark:text-slate-50">
              Create Account
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Organization Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Organization Name
                </label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("organizationName")}
                    placeholder="Nexus AI Corp"
                    className="pl-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                  />
                </div>
                {errors.organizationName && (
                  <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                    {errors.organizationName.message}
                  </p>
                )}
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                    <Input
                      {...register("name")}
                      placeholder="Jane Doe"
                      className="pl-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                    <Input
                      {...register("phone")}
                      placeholder="017XXXXXXXX"
                      className="pl-10 h-11 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all bg-slate-50/30"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs font-semibold text-red-500 mt-1 ml-0.5">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Business Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="jane@company.com"
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
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-0.5">
                  Password
                </label>
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
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
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
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 shadow-md shadow-violet-200 dark:shadow-none mt-4 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating Workspace...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-violet-600 font-bold hover:underline underline-offset-4 decoration-2"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
