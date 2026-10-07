import React from "react";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[#e1e8e1] p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-[#f0f5f0]" />
        <div className="w-16 h-6 rounded-full bg-[#f0f5f0]" />
      </div>
      <div className="w-3/4 h-5 rounded-md bg-[#f0f5f0] mb-2" />
      <div className="w-1/3 h-4 rounded-md bg-[#f0f5f0] mb-4" />
      <div className="mt-auto pt-3 border-t border-[#f0f5f0] flex items-center justify-between">
        <div className="w-16 h-4 rounded-md bg-[#f0f5f0]" />
        <div className="w-20 h-5 rounded-md bg-[#f0f5f0]" />
      </div>
    </div>
  );
}
