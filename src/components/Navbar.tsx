"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBengaliDate, toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
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
  const [banglaDate, setBanglaDate] = useState<string>("বুধবার, ৭ অক্টোবর, ২০২৬");

  useEffect(() => {
    setBanglaDate(getBengaliDate());

    // Fetch products for ticker
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTickerProducts(data.slice(0, 15));
        }
      })
      .catch(() => {
        // Fallback endpoint
        fetch("https://api.abcz.workers.dev/api/bazardor/products")
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setTickerProducts(data.slice(0, 15));
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#e1e8e1] shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#f0f5f0] border border-[#e1e8e1] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#1d271f]">
                  বাজার দর
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#05893e] animate-pulse"></span>
              </div>
              <p className="text-xs text-[#64748b] font-medium">{banglaDate}</p>
            </div>
          </Link>

          {/* Desktop Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-[#f0f5f0] rounded-lg animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#e1e8e1] hover:border-[#05893e] bg-[#fafcfa] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e1e8e1] relative">
                    <Image
                      src={session.user.image || "/avatar.webp"}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#1d271f] max-w-[120px] truncate">
                    {session.user.name || "ব্যবহারকারী"}
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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e1e8e1] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
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
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#d03739] hover:bg-[#fdeeed] transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>↩ সাইন আউট</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-[#1d271f] hover:text-[#05893e] border border-[#e1e8e1] hover:border-[#05893e] rounded-xl transition-all"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] rounded-xl shadow-xs transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#e1e8e1] space-y-2">
            <div className="grid grid-cols-4 gap-1.5 pb-3 border-b border-[#e1e8e1]">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center p-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                    pathname === `/category/${cat.slug}`
                      ? "bg-[#05893e] text-white"
                      : "bg-[#f0f5f0] text-[#1d271f] hover:bg-[#e1e8e1]"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate w-full mt-0.5">{cat.nameBn}</span>
                </Link>
              ))}
            </div>

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
                    className="text-center py-2 text-sm font-semibold border border-[#e1e8e1] rounded-xl text-[#1d271f]"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-sm font-semibold bg-[#05893e] text-white rounded-xl"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Second Row: Desktop Category Chips */}
        <div className="hidden md:flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar border-t border-[#f0f5f0]">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#05893e] text-white shadow-xs scale-105"
                    : "bg-[#f0f5f0] text-[#1d271f] hover:bg-[#e1e8e1] hover:text-[#05893e]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Price Ticker / Marquee Below Navbar */}
      <div className="bg-[#1d271f] text-white py-2 overflow-hidden border-t border-black/10 select-none">
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
                    className="inline-flex items-center gap-2 mx-4 text-xs hover:text-[#4ade80] transition-colors cursor-pointer group"
                  >
                    <span className="text-sm">{prod.categoryIcon || "🛒"}</span>
                    <span className="font-semibold text-neutral-100 group-hover:underline">
                      {prod.nameBn}
                    </span>
                    <span className="text-neutral-300">
                      {toBengaliNumber(prod.today)} টাকা/{unitBn}
                    </span>
                    <span
                      className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        isUp
                          ? "bg-[#05893e]/30 text-[#4ade80]"
                          : isDown
                          ? "bg-[#d03739]/30 text-[#f87171]"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                      {toBengaliNumber(Math.abs(prod.change?.pct || 0))}%
                    </span>
                    <span className="text-neutral-600 ml-2">•</span>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="px-6 text-xs text-neutral-300">
              বাজারের সর্বশেষ তথ্য লোড হচ্ছে...
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
