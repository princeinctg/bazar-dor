import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 sm:p-12 lg:p-14 shadow-xs min-h-85 md:min-h-95 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Text */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            {/* Pill */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#e8f7ee] text-[#05893e] text-xs sm:text-sm font-bold tracking-wide">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1d271f] tracking-tight leading-tight sm:leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#64748b] leading-relaxed max-w-2xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[#05893e] text-[#05893e] hover:bg-[#05893e] hover:text-white font-bold text-sm sm:text-base transition-all shadow-xs cursor-pointer"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-64 h-52 sm:w-80 sm:h-64 lg:w-96 lg:h-72 flex items-center justify-center">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর ফলমূল ও সবজির ঝুড়ি"
                width={380}
                height={300}
                priority
                className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
