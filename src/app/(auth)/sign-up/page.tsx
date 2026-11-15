"use client";

import React, { useState } from "react";
import {
  Car,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  image?: File;
}

export default function SignUpPage() {
    const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // শুধু ছবির প্রিভিউ দেখানোর জন্য এই ছোট স্টেটটুকু রাখা হয়েছে
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      image: imagePreview || undefined,
      callbackURL: "/",
    });

    if (data) {
      toast.add({
        type: "success",
        description: `${userData.name} you have signed up successfully.`,
      });
      router.push("/");
    }

    if (error) {
      toast.add({
        type: "error",
        description: error.message || "Failed to sign up.",
      });
    }
  };

  // এখানে আপনার Better Auth বা ব্যাকএন্ডের ফাংশন কল করে দিতে পারেন

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-[#0b1938] px-8 py-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto mb-4">
            <Car className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-blue-200 mt-1">
            Book express washes & track your service history
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 text-sm font-medium text-slate-700 transition-all">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Upload Image</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                required
                placeholder="Nazim Uddin"
                className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0b1938] focus:ring-2 focus:ring-[#0b1938]/10 transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0b1938] focus:ring-2 focus:ring-[#0b1938]/10 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full pl-10 pr-11 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0b1938] focus:ring-2 focus:ring-[#0b1938]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm py-3 rounded-xl shadow-sm transition-all cursor-pointer mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
