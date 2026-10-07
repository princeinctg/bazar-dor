"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("তথ্য আপডেট করতে অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile/update");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "নাম খালি রাখা যাবে না";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      // BetterAuth updateUser API (Challenge C3)
      // Documentation: https://better-auth.com/docs/concepts/users-accounts#update-user
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const msg = res.error.message || "তথ্য আপডেট করা যায়নি";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      const msg = error?.message || "তথ্য আপডেট করতে ত্রুটি ঘটেছে";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="w-48 h-8 bg-[#f0f5f0] rounded-xl" />
        <div className="bg-white rounded-3xl border border-[#e1e8e1] p-8 h-80" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Update Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="text-center sm:text-left mb-6 pb-4 border-b border-[#f0f5f0]">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] text-[#05893e] flex items-center justify-center text-xl mb-3">
            ✏️
          </div>
          <h1 className="text-2xl font-black text-[#1d271f]">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            আপনার অ্যাকাউন্টের তথ্যাবলী সংশোধন ও সংরক্ষণ করুন।
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#fdeeed] border border-[#d03739]/20 text-[#d03739] text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (Read only) */}
          <div>
            <label className="block text-xs font-bold text-[#64748b] mb-1.5">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] bg-[#f0f5f0] text-sm text-[#64748b] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Name Field (Challenge C3) */}
          <div>
            <label className="block text-xs font-bold text-[#1d271f] mb-1.5">
              নাম
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e1e8e1] focus:border-[#05893e] focus:outline-hidden text-sm text-[#1d271f] bg-[#fafcfa]"
              />
            </div>
          </div>

          {/* Update Button (Challenge C3) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>তথ্য আপডেট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>আপডেট তথ্য সংরক্ষণ করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
