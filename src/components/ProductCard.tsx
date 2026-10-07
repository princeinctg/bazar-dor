"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliCurrency, toBengaliNumber, formatUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#e1e8e1] hover:border-[#05893e] hover:shadow-md transition-all duration-200 p-5 relative overflow-hidden"
    >
      {/* Top Row: Emoji & Change Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-12 h-12 rounded-xl bg-[#f0f5f0] group-hover:bg-[#e4ede4] flex items-center justify-center text-2xl transition-colors">
          {product.categoryIcon || product.image || "🛒"}
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-[#e8f7ee] text-[#05893e]"
              : isDown
              ? "bg-[#fdeeed] text-[#d03739]"
              : "bg-[#f1f5f9] text-[#64748b]"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBengaliNumber(pct.toFixed(1))}%</span>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="text-base font-bold text-[#1d271f] group-hover:text-[#05893e] transition-colors line-clamp-1 mb-1">
        {product.nameBn}
      </h3>

      {/* Unit Line */}
      <p className="text-xs text-[#64748b] mb-4 font-medium">
        {formatUnitBn(product.unit)}
      </p>

      {/* Price Row */}
      <div className="mt-auto pt-3 border-t border-[#f0f5f0] flex items-center justify-between">
        <span className="text-xs text-[#64748b] font-medium">আজকের দাম</span>
        <span className="text-base font-bold text-[#1d271f]">
          {toBengaliCurrency(product.today)}
        </span>
      </div>
    </Link>
  );
}
