import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#e1e8e1] p-8 sm:p-10 text-center shadow-xs">
        <div className="w-20 h-20 rounded-3xl bg-[#fdeeed] text-[#d03739] flex items-center justify-center mx-auto mb-5 shadow-xs">
          <SearchX className="w-10 h-10" />
        </div>

        <span className="text-4xl font-black text-[#05893e]">৪০৪</span>
        <h1 className="text-2xl font-bold text-[#1d271f] mt-2 mb-2">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-6">
          দুঃখিত, আপনি যে পৃষ্ঠাটি বা পণ্যটি খুঁজছেন তা পাওয়া যায়নি অথবা লিংকটি সরানো হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
