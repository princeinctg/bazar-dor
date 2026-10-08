"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut, ArrowLeft, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে আগে সাইন ইন করুন");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });
      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা যায়নি");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে ত্রুটি ঘটেছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="w-48 h-8 bg-[#f0f5f0] rounded-xl" />
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-80" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1d271f]">আমার প্রোফাইল</h1>
        <p className="text-xs text-[#64748b]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User details (Figma image 4 exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#f0f5f0] border border-[#e5e7eb] shrink-0">
            <Image
              src={session.user.image || "/avatar.webp"}
              alt={session.user.name || "User Avatar"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1d271f]">
              {session.user.name || "Rezwan Ahmed"}
            </h2>
            <p className="text-xs text-[#64748b]">
              {session.user.email}
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d03739] text-[#d03739] hover:bg-[#fdeeed] font-semibold text-xs transition-colors cursor-pointer"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Card 2: তথ্য / Information update (Figma image 4 exact match) */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-[#1d271f]">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748b] mb-1">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
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
                <span>তথ্য আপডেট হচ্ছে...</span>
              </>
            ) : (
              <span>আপডেট</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
