"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useForm, type Resolver, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Shield,
  Image as ImageIcon,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";

import {
  createStaffSchema,
  updateStaffSchema,
} from "@/modules/staff/staff.schema";
import type {
  CreateStaffPayload,
  Staff,
  UpdateStaffPayload,
} from "@/modules/staff/staff.types";
import { parseApiError } from "@/lib/error-parser";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShopSelect from "@/components/sales/shop-select";

type StaffFormProps = {
  mode: "create" | "edit";
  defaultValues?: Partial<Staff>;
  onSubmitAction: (
    payload: CreateStaffPayload | UpdateStaffPayload,
  ) => Promise<void>;
  submitText?: string;
};

type StaffFormValues = {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: "ORG_ADMIN" | "SHOP_ADMIN" | "STAFF";
  shopId: string;
};

const staffFieldNames: FieldPath<StaffFormValues>[] = [
  "name",
  "email",
  "password",
  "phone",
  "role",
  "shopId",
];

function getDefaultImageUrl(staff?: Partial<Staff>) {
  if (!staff?.image) return "";
  if (typeof staff.image === "string") return staff.image;
  return staff.image.url || "";
}

export default function StaffForm({
  mode,
  defaultValues,
  onSubmitAction,
  submitText = "Save Staff",
}: StaffFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [removedImage, setRemovedImage] = useState(false);

  const previewUrl = useMemo(() => {
    if (selectedImage) return URL.createObjectURL(selectedImage);
    if (removedImage) return "";
    return getDefaultImageUrl(defaultValues);
  }, [selectedImage, removedImage, defaultValues]);

  useEffect(() => {
    return () => {
      if (selectedImage && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedImage, previewUrl]);

  const schema = mode === "create" ? createStaffSchema : updateStaffSchema;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(schema) as Resolver<StaffFormValues>,
    defaultValues: {
      name: defaultValues?.name || defaultValues?.user?.name || "",
      email: defaultValues?.email || defaultValues?.user?.email || "",
      password: "",
      phone: defaultValues?.phone || defaultValues?.user?.phone || "",
      role: defaultValues?.role || "STAFF",
      shopId: defaultValues?.shopId || "",
    },
  });

  const selectedShopId = watch("shopId");

  const onSubmit = async (data: StaffFormValues) => {
    try {
      const payload =
        mode === "create"
          ? ({
              name: data.name,
              email: data.email,
              password: data.password || "",
              phone: data.phone,
              role: data.role,
              shopId: data.shopId,
              image: selectedImage,
            } satisfies CreateStaffPayload)
          : ({
              name: data.name,
              email: data.email,
              phone: data.phone,
              role: data.role,
              shopId: data.shopId,
              image: selectedImage,
            } satisfies UpdateStaffPayload);

      await onSubmitAction(payload);
      toast.success("Staff saved successfully");
    } catch (error) {
      const parsed = parseApiError(error);

      parsed.fieldErrors.forEach((err) => {
        if (staffFieldNames.includes(err.path as FieldPath<StaffFormValues>)) {
          setError(err.path as FieldPath<StaffFormValues>, {
            message: err.message,
          });
        }
      });

      toast.error(parsed.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          icon={<User className="h-4 w-4" />}
          label="Name"
          error={errors.name?.message}
        >
          <Input
            placeholder="Staff name"
            {...register("name")}
            className="h-12 rounded-2xl bg-slate-50"
          />
        </Field>

        <Field
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          error={errors.email?.message}
        >
          <Input
            type="email"
            placeholder="staff@example.com"
            {...register("email")}
            className="h-12 rounded-2xl bg-slate-50"
          />
        </Field>

        {mode === "create" ? (
          <Field
            icon={<Shield className="h-4 w-4" />}
            label="Password"
            error={errors.password?.message}
          >
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="h-12 rounded-2xl bg-slate-50"
            />
          </Field>
        ) : null}

        <Field
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          error={errors.phone?.message}
        >
          <Input
            placeholder="Phone number"
            {...register("phone")}
            className="h-12 rounded-2xl bg-slate-50"
          />
        </Field>

        <Field
          icon={<Shield className="h-4 w-4" />}
          label="Role"
          error={errors.role?.message}
        >
          <select
            {...register("role")}
            className="h-12 w-full rounded-2xl border bg-slate-50 px-3 font-medium"
          >
            <option value="ORG_ADMIN">ORG_ADMIN</option>
            <option value="SHOP_ADMIN">SHOP_ADMIN</option>
            <option value="STAFF">STAFF</option>
          </select>
        </Field>

        <div className="space-y-2">
          <ShopSelect
            value={selectedShopId}
            onChange={(value) =>
              setValue("shopId", value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            disabled={isSubmitting}
          />

          {errors.shopId?.message ? (
            <p className="text-sm text-red-500">
              {String(errors.shopId.message)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
          <ImageIcon className="h-4 w-4 text-violet-500" />
          Profile Image
        </div>

        <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/30 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border bg-white shadow-sm">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Staff preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-violet-400" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Upload staff profile photo
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG or WEBP. Recommended square image.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-2xl bg-violet-600 px-4 text-xs font-black uppercase text-white shadow-sm transition-colors hover:bg-violet-700">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setSelectedImage(e.target.files?.[0] || null);
                      setRemovedImage(false);
                    }}
                  />
                </label>

                {previewUrl ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-2xl border-red-200 bg-red-50 text-xs font-black uppercase text-red-600 hover:bg-red-100"
                    onClick={() => {
                      setSelectedImage(null);
                      setRemovedImage(true);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                ) : null}
              </div>

              {selectedImage ? (
                <p className="text-xs font-medium text-violet-700">
                  Selected: {selectedImage.name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-2xl bg-violet-600 px-6 font-black uppercase shadow-lg hover:bg-violet-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
};

function Field({ label, icon, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
        <span className="text-violet-500">{icon}</span>
        {label}
      </div>

      {children}

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
