"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  ArrowLeftRight,
  Info,
  Car,
  Menu,
  X,
  CalendarCheck,
} from "lucide-react";

interface NavbarProps {
  onBookNow?: () => void;
}

export function Navbar({ onBookNow }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50 shadow-sm">
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                Auto<span className="text-amber-500">Shine</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
                Car Wash & Detailing
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              <span>Services</span>
            </a>
            <a
              href="#compare"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-slate-400" />
              <span>Compare</span>
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>About Us</span>
            </a>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={onBookNow}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              <LayoutGrid className="w-4 h-4 text-blue-900" />
              <span>Services</span>
            </a>
            <a
              href="#compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              <ArrowLeftRight className="w-4 h-4 text-blue-900" />
              <span>Compare</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Info className="w-4 h-4 text-blue-900" />
              <span>About Us</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBookNow) onBookNow();
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 text-slate-950 font-semibold py-3 rounded-xl mt-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}