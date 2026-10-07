"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Edit3, LogOut, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasNotified) {
      setHasNotified(true);
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [isPending, session, router, hasNotified]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="w-48 h-8 bg-[#f0f5f0] rounded-xl" />
        <div className="bg-white rounded-3xl border border-[#e1e8e1] p-8 h-80" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#f0f5f0]">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-[#f0f5f0] border-2 border-[#05893e]/20 shadow-xs shrink-0">
            <Image
              src={session.user.image || "/avatar.webp"}
              alt={session.user.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e8f7ee] text-[#05893e] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>যাচাইকৃত ব্যবহারকারী</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1d271f]">
              {session.user.name || "ব্যবহারকারী"}
            </h1>
            <p className="text-sm text-[#64748b] mt-1">{session.user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            {/* Challenge C3: Update Information Button navigates to another route */}
            <Link
              href="/profile/update"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>তথ্য আপডেট করুন</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#fdeeed] hover:bg-[#fbdcdb] text-[#d03739] text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Account Details Grid */}
        <div className="pt-8">
          <h2 className="text-base font-bold text-[#1d271f] mb-4">
            অ্যাকাউন্টের তথ্য
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-[#05893e]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#64748b]">নাম</p>
                <p className="text-sm font-bold text-[#1d271f]">
                  {session.user.name || "প্রযোজ্য নয়"}
                </p>
              </div>
            </div>

            <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-[#05893e]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#64748b]">ইমেইল</p>
                <p className="text-sm font-bold text-[#1d271f] truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
