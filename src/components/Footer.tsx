import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e1e8e1] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Text */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <p className="text-sm font-semibold text-[#1d271f]">
              বাজার দর — <span className="font-normal text-[#64748b]">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
            </p>
          </div>

          {/* Right Text */}
          <div className="text-xs text-[#64748b] italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#f0f5f0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#94a3b8]">
          <p>© ২০২৬ বাজার দর (Bazar-Dor) • সকল অধিকার সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#05893e] transition-colors">
              হোম
            </Link>
            <Link href="/category/chal" className="hover:text-[#05893e] transition-colors">
              ক্যাটাগরি
            </Link>
            <Link href="/signin" className="hover:text-[#05893e] transition-colors">
              লগইন
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
