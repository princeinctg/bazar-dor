"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category } from "@/types";
import ProductCard from "./ProductCard";
import { ArrowLeft } from "lucide-react";
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

  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-[#fdeeed] text-[#d03739] rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
          🔍
        </div>
        <h1 className="text-2xl font-bold text-[#1d271f] mb-2">
          ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] mb-6">
          দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#05893e] text-white text-xs font-semibold hover:bg-[#047f39]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* Category Banner Card (Figma exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#f0f5f0] flex items-center justify-center text-3xl shrink-0">
          {category.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1d271f]">
            {category.nameBn}
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Bar (Figma exact match) */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-3 sm:p-4 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748b]">সাজান</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="border border-[#e5e7eb] rounded-lg px-3 py-1.5 text-xs text-[#1d271f] bg-white cursor-pointer focus:outline-hidden focus:border-[#05893e]"
            aria-label="সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Count Line */}
      <p className="text-xs text-[#64748b]">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* 3 Columns Grid (Figma exact match) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={`cat-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
}
