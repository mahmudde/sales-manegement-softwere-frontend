"use client";

import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Calendar,
  Tag as TagIcon,
} from "lucide-react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/modules/categories/categories.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  return (
    <div className="rounded-[2rem] border-none bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
          <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
            <TableHead className="w-[400px] font-black uppercase text-[10px] tracking-[0.2em] text-slate-400 pl-8">
              Category Identity
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">
              Visibility
            </TableHead>
            <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">
              Created Date
            </TableHead>
            <TableHead className="w-[100px] text-right pr-8"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-40 text-center">
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <TagIcon className="h-8 w-8 mb-2 opacity-20" />
                  <p className="font-bold">No categories found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow
                key={category.id}
                className="group border-slate-50 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
              >
                {/* Name & Icon */}
                <TableCell className="pl-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                      <TagIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">
                        {category.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        ID: {category.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-lg px-2 py-0.5 text-[10px] font-black border-none shadow-none",
                      category.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800",
                    )}
                  >
                    {category.status}
                  </Badge>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                    <Calendar className="h-3.5 w-3.5 opacity-40" />
                    {category.createdAt
                      ? format(new Date(category.createdAt), "MMM dd, yyyy")
                      : "No date"}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-lg hover:bg-white dark:hover:bg-slate-800 shadow-sm"
                      >
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-xl border-slate-100 dark:border-slate-800 shadow-xl"
                    >
                      <DropdownMenuItem className="gap-2 font-bold text-xs cursor-pointer rounded-lg">
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-bold text-xs cursor-pointer rounded-lg text-rose-500 focus:text-rose-500 focus:bg-rose-50">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function for conditional classes if not already imported
export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
