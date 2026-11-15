
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  MessageCircle,
  User,
  ChevronDown,
  UserRound,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign Out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="w-full bg-slate-950 text-slate-300 text-xs sm:text-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">

        {/* Opening Hours */}
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open Today: 8:00 AM – 9:00 PM</span>
        </div>

        <div className="flex items-center gap-4 ml-auto">

          {/* Phone */}
          <a
            href="tel:+8801706785160"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call us now: +880170678-5160</span>
          </a>

          <span className="text-slate-700">|</span>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801706785160"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>

          <span className="text-slate-700">|</span>

          {/* Account Section */}
          {isPending ? (
            <div className="w-20 h-6 rounded-md bg-slate-800 animate-pulse" />
          ) : user ? (
            /* Logged In User */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="w-7 h-7 rounded-full object-cover border border-slate-600"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <span className="font-medium max-w-24 truncate">
                  {user.name || "User"}
                </span>

                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 border-b border-slate-100 mb-2">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <UserRound className="w-5 h-5 text-slate-600" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <UserRound className="w-4 h-4" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link
                    href="/dashbord"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <UserRound className="w-4 h-4" />
                    <span className="font-medium">Dashbord</span>
                  </Link>

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out User */
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg font-semibold transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
