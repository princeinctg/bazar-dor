"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [editedName, setEditedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const name = editedName !== null ? editedName : (session?.user?.name || "");

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
        toast.error("তথ্য আপডেট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        setEditedName(null);
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
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

  const initial = (session.user.name || "U").charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1d271f]">আমার প্রোফাইল</h1>
        <p className="text-xs text-[#64748b]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User details: Avatar, Name, Email, Sign Out */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          {session.user.image ? (
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#e1e8e1] border border-[#e1e8e1] shrink-0">
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-14 h-7 rounded-full bg-[#05893e] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initial}
            </div>
          )}
          <div>
            <h2 className="text-base font-bold text-[#1d271f] leading-snug">
              {session.user.name || "Habib Utsho"}
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
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#d03739]/50 text-[#d03739] hover:bg-[#fdeeed] font-semibold text-xs transition-colors cursor-pointer"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* নাম হালনাগাদ করুন Section */}
      <div className="space-y-4 pt-2">
        <h2 className="text-base font-bold text-[#1d271f]">
          নাম হালনাগাদ করুন
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="max-w-sm">
            <label className="block text-xs font-medium text-[#1d271f] mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="আপনার নাম"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] text-xs sm:text-sm text-[#1d271f] bg-white focus:outline-hidden focus:border-[#05893e]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-[#05893e] hover:bg-[#047f39] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60 shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>হালনাগাদ হচ্ছে...</span>
              </>
            ) : (
              <span>নাম হালনাগাদ করুন</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
