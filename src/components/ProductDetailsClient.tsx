"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/types";
import {
  toBengaliCurrency,
  toBengaliNumber,
  formatUnitBn,
} from "@/lib/utils";
import toast from "react-hot-toast";
import { ArrowLeft, Lock } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailsClient({
  product,
  slug,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasNotified) {
      setHasNotified(true);
      toast.error("বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন");
      router.push(`/signin?callbackUrl=/product/${slug}`);
    }
  }, [isPending, session, slug, router, hasNotified]);

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-pulse">
        <div className="w-48 h-5 bg-[#f0f5f0] rounded-md" />
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-48" />
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-40" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#fdeeed] text-[#d03739] flex items-center justify-center mx-auto mb-4 text-2xl">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#1d271f] mb-2">
          সুরক্ষিত পৃষ্ঠা
        </h2>
        <p className="text-xs text-[#64748b] mb-6">
          এই পণ্যের বিস্তারিত বাজার দর দেখতে হলে আপনাকে সাইন ইন করতে হবে।
        </p>
        <Link
          href={`/signin?callbackUrl=/product/${slug}`}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#05893e] text-[#05893e] hover:bg-[#e8f7ee] font-bold text-xs transition-all"
        >
          সাইন ইন পেজে যান
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-[#1d271f] mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-xs text-[#64748b] mb-6">
          দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা ডাটাবেজে উপস্থিত নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#05893e] text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  // Calculate market stats
  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const diffYesterday = product.today - product.yesterday;
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb (Figma image 5: হোম > চাল > বাটাম সাইজ চাল) */}
      <nav className="text-xs text-[#64748b] flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#05893e] transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#05893e] transition-colors"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-[#1d271f] font-semibold">{product.nameBn}</span>
      </nav>

      {/* Card 1: Top Summary Card (Figma exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-3xl shrink-0">
            {product.categoryIcon || product.image || "🍚"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
              {product.nameBn}
            </h1>
            <p className="text-xs text-[#64748b] mt-1">
              {formatUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs text-[#64748b] mt-1">
              {diffYesterday > 0 ? (
                <>গতকালের তুলনায় আজ দাম বেড়েছে · {toBengaliNumber(diffYesterday)} টাকা</>
              ) : diffYesterday < 0 ? (
                <>গতকালের তুলনায় আজ দাম কমেছে · {toBengaliNumber(Math.abs(diffYesterday))} টাকা</>
              ) : (
                <>গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে</>
              )}
            </p>
          </div>
        </div>

        {/* Right Price Box */}
        <div className="bg-[#f0f5f0] rounded-2xl p-4 sm:p-5 text-center min-w-[150px]">
          <span className="text-xs text-[#64748b] block mb-1">
            আজকের দাম
          </span>
          <div className="text-3xl sm:text-4xl font-black text-[#1d271f]">
            {toBengaliNumber(product.today)}
          </div>
          <span className="text-xs text-[#64748b] block mt-0.5">
            টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "liter" ? "লিটার" : "একক"}
          </span>
          <div
            className={`mt-2 inline-flex items-center gap-0.5 text-xs font-bold ${
              isUp
                ? "text-[#d03739]"
                : isDown
                ? "text-[#05893e]"
                : "text-[#64748b]"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>
              {toBengaliNumber(Math.abs(product.change?.pct || 0).toFixed(1))}%
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: দামের সারসংক্ষেপ (Figma image 5 exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-[#1d271f]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Min */}
          <div className="bg-[#fafcfa] border border-[#e5e7eb] rounded-2xl p-4">
            <span className="text-xs text-[#64748b] block">সর্বনিম্ন দাম</span>
            <p className="text-xl font-bold text-[#05893e] my-1">
              {toBengaliCurrency(minPrice)}
            </p>
            <span className="text-xs text-[#64748b] block">সবচেয়ে কম দামের বাজার</span>
          </div>

          {/* Max */}
          <div className="bg-[#fafcfa] border border-[#e5e7eb] rounded-2xl p-4">
            <span className="text-xs text-[#64748b] block">সর্বাধিক দাম</span>
            <p className="text-xl font-bold text-[#d03739] my-1">
              {toBengaliCurrency(maxPrice)}
            </p>
            <span className="text-xs text-[#64748b] block">সবচেয়ে বেশি দামের বাজার</span>
          </div>

          {/* Avg */}
          <div className="bg-[#fafcfa] border border-[#e5e7eb] rounded-2xl p-4">
            <span className="text-xs text-[#64748b] block">গড় দাম</span>
            <p className="text-xl font-bold text-[#05893e] my-1">
              {toBengaliCurrency(avgPrice)}
            </p>
            <span className="text-xs text-[#64748b] block">প্রতি কেজি-এর হিসাবে</span>
          </div>
        </div>
      </div>

      {/* Card 3: বাজারভিত্তিক আজকের দাম Table (Figma image 5 exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-[#1d271f]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto border border-[#e5e7eb] rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm divide-y divide-[#e5e7eb]">
            <thead className="bg-[#fafcfa] text-[#1d271f] font-semibold divide-x divide-[#e5e7eb]">
              <tr>
                <th className="py-2.5 px-4">বাজার</th>
                <th className="py-2.5 px-4">বিভাগ</th>
                <th className="py-2.5 px-4 text-center">সর্বনিম্ন</th>
                <th className="py-2.5 px-4 text-center">সর্বাধিক</th>
                <th className="py-2.5 px-4 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {markets.map((m, idx) => {
                const itemAvg = (m.min + m.max) / 2;
                const itemAvgStr = itemAvg % 1 === 0 ? itemAvg.toFixed(0) : itemAvg.toFixed(2);

                return (
                  <tr key={idx} className="divide-x divide-[#e5e7eb] hover:bg-[#fafcfa]">
                    <td className="py-3 px-4 text-[#1d271f] font-medium">
                      {m.market}
                    </td>
                    <td className="py-3 px-4 text-[#64748b]">
                      {m.division}
                    </td>
                    <td className="py-3 px-4 text-center text-[#1d271f]">
                      {toBengaliCurrency(m.min)}
                    </td>
                    <td className="py-3 px-4 text-center text-[#1d271f]">
                      {toBengaliCurrency(m.max)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#1d271f]">
                      {toBengaliNumber(itemAvgStr)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
