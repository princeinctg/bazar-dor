"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import { User, LogOut, ChevronDown, Menu, X, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

const CATEGORIES = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products for ticker
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTickerProducts(data);
        }
      })
      .catch(() => {
        fetch("https://api.abcz.workers.dev/api/bazardor/products")
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setTickerProducts(data);
            }
          })
          .catch(() => {});
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      setDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#05893e] flex items-center justify-center text-white shadow-xs">
              <ShoppingCart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#1d271f] block leading-tight">
                বাজার দর
              </span>
              <p className="text-xs text-[#64748b]">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </p>
            </div>
          </Link>

          {/* Desktop Auth State */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-[#f0f5f0] rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-full hover:bg-[#f0f5f0] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e1e8e1] relative border border-[#e1e8e1]">
                    <Image
                      src={session.user.image || "/avatar.webp"}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#1d271f] max-w-[120px] truncate">
                    {session.user.name?.split(" ")[0] || "Rezwan"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e1e8e1] py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-[#f0f5f0]">
                        <p className="text-xs text-[#64748b]">লগইন আছেন</p>
                        <p className="text-sm font-bold text-[#1d271f] truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-[#64748b] truncate">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1d271f] hover:bg-[#f3fbf4] hover:text-[#05893e] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#05893e]" />
                        <span>👤 আমার প্রোফাইল</span>
                      </Link>

                      <div className="border-t border-[#f0f5f0] my-1" />

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#d03739] hover:bg-[#fdeeed] transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>↩ সাইন আউট</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="px-5 py-1.5 text-sm font-semibold text-[#05893e] border border-[#05893e] hover:bg-[#e8f7ee] rounded-lg transition-all"
                >
                  সাইন ইন
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[#e1e8e1] text-[#1d271f]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Chips Bar (Centered row like Figma) */}
        <div className="flex items-center justify-center gap-2 md:gap-3 py-2.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#05893e] text-white shadow-xs"
                    : "text-[#1d271f] hover:text-[#05893e]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#e1e8e1] space-y-2">
            <div className="pt-2">
              {session?.user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f3fbf4] text-[#05893e] font-semibold text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>আমার প্রোফাইল ({session.user.name})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fdeeed] text-[#d03739] font-semibold text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold border border-[#05893e] text-[#05893e] rounded-lg"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold bg-[#05893e] text-white rounded-lg"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ticker Strip (White background with top/bottom subtle border) */}
      <div className="bg-white border-y border-[#e5e7eb] py-2 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {tickerProducts.length > 0 ? (
            <>
              {tickerProducts.concat(tickerProducts).map((prod, idx) => {
                const isUp = prod.change?.dir === "up";
                const isDown = prod.change?.dir === "down";
                const unitBn =
                  prod.unit === "kg"
                    ? "কেজি"
                    : prod.unit === "liter"
                    ? "লিটার"
                    : prod.unit === "dozen"
                    ? "ডজন"
                    : "পিস";

                return (
                  <Link
                    key={`${prod.id}-${idx}`}
                    href={`/product/${prod.slug}`}
                    className="inline-flex items-center gap-2 mx-4 text-xs hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <span className="text-sm">{prod.categoryIcon || "🛒"}</span>
                    <span className="font-semibold text-[#1d271f]">
                      {prod.nameBn}
                    </span>
                    <span className="text-[#64748b]">
                      {toBengaliNumber(prod.today)} টাকা/{unitBn}
                    </span>
                    <span
                      className={`inline-flex items-center text-xs font-bold gap-0.5 ${
                        isUp
                          ? "text-[#d03739]"
                          : isDown
                          ? "text-[#05893e]"
                          : "text-[#64748b]"
                      }`}
                    >
                      <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                      <span>{toBengaliNumber(Math.abs(prod.change?.pct || 0).toFixed(1))}%</span>
                    </span>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="px-6 text-xs text-[#64748b]">
              বাজারের সর্বশেষ তথ্য লোড হচ্ছে...
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
