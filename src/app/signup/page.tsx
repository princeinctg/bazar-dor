"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !password || !confirmPassword) {
      const msg = "সকল ঘর পূরণ করা আবশ্যক";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "দুটি পাসওয়ার্ড মিলছে না";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        let msg = "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
        const raw = (res.error.message || "").toLowerCase();
        if (raw.includes("already exists") || res.error.status === 422 || res.error.code === "USER_ALREADY_EXISTS") {
          msg = "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে! অন্য একটি ইমেইল ব্যবহার করুন বা সাইন ইন করুন।";
        } else if (raw.includes("short") || raw.includes("password")) {
          msg = "পাসওয়ার্ডটি খুব ছোট। অনুগ্রহ করে কমপক্ষে ৪টি অক্ষর দিন।";
        } else if (raw.includes("email")) {
          msg = "অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।";
        } else {
          msg = "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
        }
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! স্বাগতম!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      const msg = "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const res = await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
      if (res?.error) {
        toast.error(
          `${provider === "google" ? "Google" : "GitHub"} ক্লায়েন্ট আইডি কনফিগার করা হয়নি। দয়া করে ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ করুন।`
        );
      }
    } catch {
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} ক্লায়েন্ট আইডি কনফিগার করা হয়নি। দয়া করে ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ করুন।`
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Title & Subtitle */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-[#1d271f]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs text-[#64748b]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 space-y-5 shadow-xs">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#fdeeed] border border-[#d03739]/20 text-[#d03739] text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#1d271f] font-medium mb-1">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-xs sm:text-sm text-[#1d271f] focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#1d271f] font-medium mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-xs sm:text-sm text-[#1d271f] focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#1d271f] font-medium mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-xs sm:text-sm text-[#1d271f] focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#1d271f] font-medium mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-xs sm:text-sm text-[#1d271f] focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg border border-[#05893e] text-[#05893e] hover:bg-[#e8f7ee] font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
              </>
            ) : (
              <span>অ্যাকাউন্ট তৈরি করুন</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e7eb]" />
          </div>
          <span className="relative px-3 bg-white text-xs text-[#64748b]">
            অথবা
          </span>
        </div>

        {/* Social Logins */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg border border-[#e5e7eb] hover:bg-[#fafcfa] text-xs font-semibold text-[#1d271f] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg border border-[#e5e7eb] hover:bg-[#fafcfa] text-xs font-semibold text-[#1d271f] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Switch Link */}
        <p className="text-center text-xs text-[#64748b]">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href={`/signin${callbackUrl !== "/" ? `?callbackUrl=${callbackUrl}` : ""}`}
            className="font-bold text-[#05893e] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <div className="text-center">
        <Link
          href="/"
          className="text-xs text-[#64748b] hover:text-[#05893e] transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-white rounded-3xl animate-pulse" />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
