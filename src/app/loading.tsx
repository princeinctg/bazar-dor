import React from "react";
import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-[#f0f5f0] rounded-3xl h-64 sm:h-80 w-full" />

      {/* Section Skeleton */}
      <div className="space-y-4">
        <div className="w-48 h-8 bg-[#f0f5f0] rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="w-48 h-8 bg-[#f0f5f0] rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
