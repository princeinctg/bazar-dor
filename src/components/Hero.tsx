import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            {/* Pill */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#e8f7ee] text-[#05893e] text-xs font-semibold">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1d271f] tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#05893e] text-[#05893e] hover:bg-[#e8f7ee] font-semibold text-xs sm:text-sm transition-colors"
              >
                সব পণ্য দেখুন
              </a>

              <a
                href="#বাজার-তুলনা"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#e5e7eb] text-[#1d271f] hover:bg-[#f0f5f0] font-semibold text-xs sm:text-sm transition-colors"
              >
                <span>⚖️</span>
                <span>বাজার তুলনা</span>
              </a>
            </div>
          </div>

          {/* Right Stats Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#f0f5f0]/80 border border-[#e1e8e1] rounded-2xl p-5 flex items-center justify-around divide-x divide-[#e1e8e1] text-center">
              <div className="px-3 flex-1">
                <p className="text-xs text-[#64748b] mb-1">পণ্য</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#05893e]">
                  ৩৩
                </p>
                <p className="text-[11px] text-[#64748b] mt-1 whitespace-nowrap">
                  টি নিত্যদিনের পণ্য
                </p>
              </div>

              <div className="px-3 flex-1">
                <p className="text-xs text-[#64748b] mb-1">বাজার</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                  ১২
                </p>
                <p className="text-[11px] text-[#64748b] mt-1 whitespace-nowrap">
                  টি বাজার অন্তর্ভুক্ত
                </p>
              </div>

              <div className="px-3 flex-1">
                <p className="text-xs text-[#64748b] mb-1">বিভাগ</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                  ৬
                </p>
                <p className="text-[11px] text-[#64748b] mt-1 whitespace-nowrap">
                  টি বিভাগের তথ্য
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
