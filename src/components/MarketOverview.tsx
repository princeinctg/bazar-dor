import React from "react";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";

interface MarketOverviewProps {
  products: Product[];
}

export default function MarketOverview({ products }: MarketOverviewProps) {
  // Aggregate unique markets and divisions
  const divisionCount = 6;
  const marketCount = 12;

  // Compute a few featured markets
  const sampleProduct = products[0];
  const sampleMarkets = sampleProduct?.markets?.slice(0, 6) || [];

  return (
    <section id="বাজার-তুলনা" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#f0f5f0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f5f0] text-xs font-bold text-[#1d271f] mb-2">
              <span>⚖️</span>
              <span>বাজারভিত্তিক পর্যালোচনা</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1d271f]">
              বিভাগ ও প্রধান বাজারসমূহের তথ্য
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              বাংলাদেশের প্রধান {toBengaliNumber(divisionCount)}টি বিভাগ ও {toBengaliNumber(marketCount)}টি পাইকারি ও খুচরা বাজারের দামের তথ্য
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#e8f7ee] text-[#05893e] px-3 py-1.5 rounded-full font-bold">
              সরাসরি বাজার থেকে সংগৃহীত
            </span>
          </div>
        </div>

        {/* Division Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "ময়মনসিংহ", "খুলনা", "সিলেট"].map((div) => (
            <div
              key={div}
              className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-3 text-center hover:border-[#05893e] transition-colors"
            >
              <p className="text-xs text-[#64748b]">বিভাগ</p>
              <p className="text-base font-bold text-[#1d271f]">{div}</p>
              <span className="text-[10px] text-[#05893e] font-semibold">২টি প্রধান বাজার</span>
            </div>
          ))}
        </div>

        {/* Sample Market-wise snippet */}
        {sampleMarkets.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f0f5f0] text-[#1d271f] font-bold rounded-xl">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-xl">বাজারের নাম</th>
                  <th className="py-2.5 px-3">বিভাগ</th>
                  <th className="py-2.5 px-3 text-right rounded-r-xl">দাম পরিস্থিতি</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f5f0]">
                {sampleMarkets.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#fafcfa]">
                    <td className="py-3 px-3 font-semibold text-[#1d271f]">{m.market}</td>
                    <td className="py-3 px-3 text-[#64748b]">{m.division}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-xs font-bold text-[#05893e]">
                        {toBengaliNumber(m.min)} - {toBengaliNumber(m.max)} ৳
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
