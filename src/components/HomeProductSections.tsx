"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";

interface HomeProductSectionsProps {
  products: Product[];
  risers: Product[];
  fallers: Product[];
}

const CATEGORY_TABS = [
  { slug: "all", nameBn: "সব", icon: "🛒" },
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

type SortOption = "default" | "price-asc" | "price-desc";

export default function HomeProductSections({
  products,
  risers,
  fallers,
}: HomeProductSectionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Filter and sort for Section C (সব পণ্য)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Sort by numeric value 
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="space-y-12 py-8">
      {/* SECTION A: আজ দাম বেড়েছে ▲ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#05893e] text-base font-bold">▲</span>
          <h2 className="text-base sm:text-lg font-bold text-[#1d271f]">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {/* 3 Columns Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION B: আজ দাম কমেছে ▼ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#d03739] text-base font-bold">▼</span>
          <h2 className="text-base sm:text-lg font-bold text-[#1d271f]">
            আজ দাম কমেছে
          </h2>
        </div>

        {/* 3 Columns Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION C: সব পণ্য (id="সব-পণ্য") */}
      <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <h2 className="text-base sm:text-lg font-bold text-[#1d271f] mb-3">
          সব পণ্য
        </h2>

        {/* Search, Category Tabs, Sort Bar Container */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-3 sm:p-4 mb-3 flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full lg:w-48">
            <input
              type="text"
              placeholder="পণ্যের নাম লিখুন…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-xs text-[#1d271f] focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full lg:w-auto justify-start lg:justify-center">
            {CATEGORY_TABS.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#05893e] text-white"
                      : "text-[#1d271f] hover:bg-[#f0f5f0]"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <span className="text-xs text-[#64748b] whitespace-nowrap">
              সাজান
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border border-[#e5e7eb] rounded-lg px-2.5 py-1 text-xs text-[#1d271f] bg-white cursor-pointer focus:outline-hidden focus:border-[#05893e]"
              aria-label="সাজান"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Count Line */}
        <p className="text-xs text-[#64748b] mb-4">
          মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Cards Grid  */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e5e7eb] p-8">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-base font-bold text-[#1d271f] mb-1">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto mb-4">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য খুঁজে পাওয়া যায়নি।
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortOption("default");
              }}
              className="px-4 py-1.5 rounded-lg bg-[#05893e] text-white text-xs font-semibold hover:bg-[#047f39]"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
