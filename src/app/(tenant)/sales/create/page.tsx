"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { useCreateSale } from "@/hooks/use-sales";
import SaleForm from "@/components/sales/sale-form";
import { Button } from "@/components/ui/button";

export default function CreateSalePage() {
  const router = useRouter();
  const createSaleMutation = useCreateSale();

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Navigation & Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="-ml-2 text-muted-foreground hover:text-violet-600 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Sales
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Sale</h1>
          <p className="text-muted-foreground mt-1 text-base">
            Process a new transaction, apply discounts, and manage payments.
          </p>
        </div>
      </div>

      {/* Main Form Component */}
      <div className="bg-background rounded-2xl shadow-sm border border-muted/40 p-1">
        <SaleForm
          onSubmitAction={async (payload) => {
            const response = await createSaleMutation.mutateAsync(payload);
            const saleId = response?.data?.id;

            // Redirect to the newly created sale detail or the list
            if (saleId) {
              router.push(`/sales/${saleId}`);
            } else {
              router.push("/sales");
            }
          }}
        />
      </div>
    </div>
  );
}
