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
      className="group flex flex-col justify-between bg-white rounded-2xl border border-[#e5e7eb] hover:border-[#05893e] hover:shadow-sm transition-all p-4 sm:p-5"
    >
      {/* Top Part: Icon + Title + Unit */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-[#f0f5f0] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
          {product.categoryIcon || product.image || "🛒"}
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#1d271f] group-hover:text-[#05893e] transition-colors line-clamp-1">
            {product.nameBn}
          </h3>
          <p className="text-xs text-[#64748b]">
            {formatUnitBn(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Part: Price + Change */}
      <div className="flex items-end justify-between pt-2 border-t border-[#f0f5f0]">
        <div>
          <span className="text-[11px] text-[#64748b] block">আজকের দাম</span>
          <span className="text-sm sm:text-base font-bold text-[#1d271f]">
            {toBengaliCurrency(product.today)}
          </span>
        </div>

        {/* Change Indicator */}
        <div
          className={`flex items-center gap-0.5 text-xs font-bold ${
            isUp
              ? "text-[#d03739]"
              : isDown
              ? "text-[#05893e]"
              : "text-[#64748b]"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBengaliNumber(pct.toFixed(1))}%</span>
        </div>
      </div>
    </Link>
  );
}
