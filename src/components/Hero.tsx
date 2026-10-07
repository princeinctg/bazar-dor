import React from "react";
import Image from "next/image";
import { ArrowDown, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#f0f5f0]/80 via-white to-white border-b border-[#e1e8e1] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f7ee] text-[#05893e] text-xs font-bold tracking-wide">
              <span>🇧🇩</span>
              <span>নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য তথ্য</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d271f] tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#64748b] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-base shadow-sm hover:shadow transition-all group"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#বাজার-তুলনা"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-bold text-base border border-[#e1e8e1] transition-all"
              >
                <span>⚖️ বাজার তুলনা</span>
              </a>
            </div>

            {/* Key Stats Pill Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#e1e8e1]/70 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#e1e8e1] text-center">
                <p className="text-xs text-[#64748b]">পণ্য</p>
                <p className="text-xl sm:text-2xl font-black text-[#05893e]">৩৩</p>
                <p className="text-[11px] text-[#64748b] truncate">টি নিত্যদিনের পণ্য</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#e1e8e1] text-center">
                <p className="text-xs text-[#64748b]">বাজার</p>
                <p className="text-xl sm:text-2xl font-black text-[#1d271f]">১২</p>
                <p className="text-[11px] text-[#64748b] truncate">টি বাজার অন্তর্ভুক্ত</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#e1e8e1] text-center">
                <p className="text-xs text-[#64748b]">বিভাগ</p>
                <p className="text-xl sm:text-2xl font-black text-[#1d271f]">৬</p>
                <p className="text-[11px] text-[#64748b] truncate">টি বিভাগের তথ্য</p>
              </div>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-[#f0f5f0] rounded-3xl p-6 flex items-center justify-center border border-[#e1e8e1]/80 shadow-xs">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                width={360}
                height={360}
                priority
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
