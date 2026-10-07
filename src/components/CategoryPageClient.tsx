"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category } from "@/types";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowUpDown, ChevronRight } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

interface CategoryPageClientProps {
  category: Category | null;
  initialProducts: Product[];
  slug: string;
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryPageClient({
  category,
  initialProducts,
  slug,
}: CategoryPageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortOption]);

  // Empty state if category invalid or no products
  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#fdeeed] text-[#d03739] rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-xs">
          🔍
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f] mb-2">
          ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-[#64748b] mb-6">
          দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন তার কোনো পণ্য বর্তমানে উপলব্ধ নেই বা লিংকটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#64748b]">
        <Link href="/" className="hover:text-[#05893e] transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#1d271f]">{category.nameBn}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-3xl shrink-0 shadow-inner">
            {category.icon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f] flex items-center gap-2">
              <span>{category.nameBn}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort dropdown (Challenge C1) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#fafcfa] border border-[#e1e8e1] rounded-xl px-3 py-2 text-sm">
            <ArrowUpDown className="w-4 h-4 text-[#05893e]" />
            <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
              সাজান:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-transparent font-semibold text-xs sm:text-sm text-[#1d271f] focus:outline-hidden cursor-pointer pr-3"
              aria-label="সাজান"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-2 rounded-xl bg-[#f0f5f0] text-[#1d271f]">
            মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য
          </span>
        </div>
      </div>

      {/* Product Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={`cat-${product.id}`} product={product} />
        ))}
      </div>

      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#05893e] hover:text-[#047f39] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
