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
import {
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Store,
  DollarSign,
  Scale,
  MapPin,
  Lock,
} from "lucide-react";

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

  // Loading skeleton state while checking auth
  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
        <div className="w-48 h-6 bg-[#f0f5f0] rounded-md" />
        <div className="bg-white rounded-3xl border border-[#e1e8e1] p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#f0f5f0]" />
            <div className="space-y-2 flex-1">
              <div className="w-1/3 h-6 bg-[#f0f5f0] rounded-md" />
              <div className="w-1/4 h-4 bg-[#f0f5f0] rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-24 bg-[#f0f5f0] rounded-2xl" />
            <div className="h-24 bg-[#f0f5f0] rounded-2xl" />
            <div className="h-24 bg-[#f0f5f0] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Not logged in prompt if redirecting
  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#fdeeed] text-[#d03739] flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#1d271f] mb-2">
          সুরক্ষিত পৃষ্ঠা
        </h2>
        <p className="text-sm text-[#64748b] mb-6">
          এই পণ্যের বিস্তারিত বাজার দর দেখতে হলে আপনাকে সাইন ইন করতে হবে।
        </p>
        <Link
          href={`/signin?callbackUrl=/product/${slug}`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#05893e] text-white font-bold text-sm shadow-xs hover:bg-[#047f39] transition-all"
        >
          সাইন ইন পেজে যান
        </Link>
      </div>
    );
  }

  // If product is not found
  if (!product) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-[#1d271f] mb-2">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-[#64748b] mb-6">
          দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা ডাটাবেজে উপস্থিত নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] text-white font-bold text-sm shadow-xs hover:bg-[#047f39] transition-all"
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
  const minMarket = markets.find((m) => m.min === minPrice)?.market || "প্রধান বাজার";

  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const maxMarket = markets.find((m) => m.max === maxPrice)?.market || "প্রধান বাজার";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#64748b]">
        <Link href="/" className="hover:text-[#05893e] transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#05893e] transition-colors"
        >
          {product.categoryNameBn || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#1d271f]">{product.nameBn}</span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#f0f5f0]">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-4xl shrink-0 shadow-inner">
              {product.categoryIcon || product.image || "🛒"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f0f5f0] text-[#1d271f]">
                  {formatUnitBn(product.unit)}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#e8f7ee] text-[#05893e]">
                  {product.categoryNameBn}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 flex items-center gap-1.5">
                {diffYesterday > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-[#05893e]" />
                    <span>
                      গতকালের তুলনায় আজ দাম বেড়েছে ·{" "}
                      {toBengaliNumber(diffYesterday)} টাকা
                    </span>
                  </>
                ) : diffYesterday < 0 ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-[#d03739]" />
                    <span>
                      গতকালের তুলনায় আজ দাম কমেছে ·{" "}
                      {toBengaliNumber(Math.abs(diffYesterday))} টাকা
                    </span>
                  </>
                ) : (
                  <span>গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে</span>
                )}
              </p>
            </div>
          </div>

          {/* Today's Price Display */}
          <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 text-right flex flex-col items-end">
            <span className="text-xs text-[#64748b] font-medium mb-1">
              আজকের দাম
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-[#1d271f]">
                {toBengaliNumber(product.today)}
              </span>
              <span className="text-sm font-bold text-[#64748b]">
                টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "liter" ? "লিটার" : "একক"}
              </span>
            </div>
            <div
              className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isUp
                  ? "bg-[#e8f7ee] text-[#05893e]"
                  : isDown
                  ? "bg-[#fdeeed] text-[#d03739]"
                  : "bg-[#f1f5f9] text-[#64748b]"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
              <span>
                {toBengaliNumber(Math.abs(product.change?.pct || 0).toFixed(1))}%
              </span>
            </div>
          </div>
        </div>

        {/* Price Summary (3 Cards) */}
        <div className="mt-6">
          <h2 className="text-base font-bold text-[#1d271f] mb-3">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Price */}
            <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748b]">সর্বনিম্ন দাম</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#e8f7ee] text-[#05893e]">
                  কম
                </span>
              </div>
              <p className="text-xl font-black text-[#05893e]">
                {toBengaliCurrency(minPrice)}
              </p>
              <p className="text-[11px] text-[#64748b] mt-1 truncate">
                সবচেয়ে কম দামের বাজার: <span className="font-semibold text-[#1d271f]">{minMarket}</span>
              </p>
            </div>

            {/* Max Price */}
            <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748b]">সর্বাধিক দাম</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#fdeeed] text-[#d03739]">
                  বেশি
                </span>
              </div>
              <p className="text-xl font-black text-[#d03739]">
                {toBengaliCurrency(maxPrice)}
              </p>
              <p className="text-[11px] text-[#64748b] mt-1 truncate">
                সবচেয়ে বেশি দামের বাজার: <span className="font-semibold text-[#1d271f]">{maxMarket}</span>
              </p>
            </div>

            {/* Avg Price */}
            <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#64748b]">গড় দাম</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#f0f5f0] text-[#1d271f]">
                  গড়
                </span>
              </div>
              <p className="text-xl font-black text-[#1d271f]">
                {toBengaliCurrency(avgPrice)}
              </p>
              <p className="text-[11px] text-[#64748b] mt-1">
                {formatUnitBn(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market-wise Price Table (বাজারভিত্তিক আজকের দাম) */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#f0f5f0]">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#05893e]" />
            <h2 className="text-xl font-bold text-[#1d271f]">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>
          <span className="text-xs text-[#64748b]">
            মোট {toBengaliNumber(markets.length)}টি বাজার
          </span>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f0f5f0] text-[#1d271f] font-bold rounded-xl">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4 text-center">সর্বনিম্ন</th>
                  <th className="py-3 px-4 text-center">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f5f0]">
                {markets.map((m, idx) => {
                  const itemAvg = (m.min + m.max) / 2;
                  const itemAvgStr = itemAvg % 1 === 0 ? itemAvg.toFixed(0) : itemAvg.toFixed(2);

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-[#fafcfa] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-[#1d271f] flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#05893e] shrink-0" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#64748b]">{m.division}</td>
                      <td className="py-3.5 px-4 text-center font-medium text-[#05893e]">
                        {toBengaliCurrency(m.min)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-medium text-[#d03739]">
                        {toBengaliCurrency(m.max)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#1d271f]">
                        {toBengaliNumber(itemAvgStr)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-[#64748b] text-center py-6">
            কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        )}
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
