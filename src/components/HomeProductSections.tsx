"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Search, ArrowUpDown, ChevronDown, TrendingUp, TrendingDown, Layers } from "lucide-react";
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

    // Sort by numeric value (Challenge C1)
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="space-y-16 py-12">
      {/* SECTION A: আজ দাম বেড়েছে ▲ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e1e8e1]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e8f7ee] text-[#05893e] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
                আজ দাম বেড়েছে <span className="text-[#05893e]">▲</span>
              </h2>
              <p className="text-xs text-[#64748b]">
                সর্বাধিক মূল্যবৃদ্ধি পাওয়া শীর্ষ ৬টি পণ্য
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#e8f7ee] text-[#05893e]">
            শীর্ষ বৃদ্ধি
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {risers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION B: আজ দাম কমেছে ▼ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e1e8e1]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fdeeed] text-[#d03739] flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2">
                আজ দাম কমেছে <span className="text-[#d03739]">▼</span>
              </h2>
              <p className="text-xs text-[#64748b]">
                মূল্যহ্রাস পাওয়া শীর্ষ ৬টি পণ্য
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#fdeeed] text-[#d03739]">
            শীর্ষ হ্রাস
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION C: সব পণ্য (id="সব-পণ্য") */}
      <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#e1e8e1]">
          <div>
            <div className="flex items-center gap-2 text-[#05893e] mb-1">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                পণ্যের তালিকা
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্যের নাম লিখুন…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] focus:border-[#05893e] focus:outline-hidden text-sm bg-white text-[#1d271f] transition-colors"
              />
            </div>

            {/* Sort Dropdown (Challenge C1) */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-white border border-[#e1e8e1] rounded-xl px-3 py-2 text-sm">
                <ArrowUpDown className="w-4 h-4 text-[#05893e]" />
                <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                  সাজান:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-transparent font-semibold text-xs sm:text-sm text-[#1d271f] focus:outline-hidden cursor-pointer pr-4"
                  aria-label="সাজান"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="price-asc">দাম: কম থেকে বেশি</option>
                  <option value="price-desc">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#05893e] text-white shadow-xs scale-105"
                    : "bg-[#f0f5f0] text-[#1d271f] hover:bg-[#e1e8e1]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e1e8e1] p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-[#1d271f] mb-1">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto mb-4">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য খুঁজে পাওয়া যায়নি। অন্য কিওয়ার্ড চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortOption("default");
              }}
              className="px-4 py-2 rounded-xl bg-[#05893e] text-white text-xs font-semibold hover:bg-[#047f39]"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
