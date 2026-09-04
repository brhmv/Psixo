import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  Search,
  LogIn,
  UserPlus,
  Menu,
  X,
  User,
  ShieldCheck,
  Briefcase,
  LayoutDashboard,
  Calendar,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Psixoloqlar', path: '/psixoloqlar' },
    { name: 'Vebinarlar', path: '/vebinarlar' },
    { name: 'Təlimlər', path: '/telimler' },
    { name: 'Məqalələr', path: '/meqaleler' },
    { name: 'Qiymətlər', path: '/qiymetler' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="DAYAQ Ana Səhifə"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#251D4B] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-6 h-6 text-[#CADFFD]" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-[#251D4B] leading-none">
                DAYAQ
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
                Psixologiya & Təlim
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#CADFFD]/60 text-[#251D4B]'
                      : 'text-slate-700 hover:text-[#251D4B] hover:bg-[#CADFFD]/20'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Search Nav Item */}
            <NavLink
              to="/axtaris"
              className={({ isActive }) =>
                `p-2.5 rounded-xl border text-slate-700 hover:text-[#251D4B] hover:bg-slate-50 transition-colors ${
                  isActive ? 'border-[#251D4B] bg-[#CADFFD]/30 text-[#251D4B]' : 'border-slate-200'
                }`
              }
              title="Qlobal Axtarış"
            >
              <Search className="w-4 h-4" />
            </NavLink>

            {/* Quick Portal Switcher (User / Psychologist / Admin) */}
            <div className="relative">
              <button
                onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] hover:bg-slate-50 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#251D4B]" />
                <span>Kabinetlər</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isPortalDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsPortalDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sürətli Keçid
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsPortalDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#CADFFD]/40 hover:text-[#251D4B]"
                  >
                    <User className="w-4 h-4 text-[#251D4B]" />
                    <span>Müştəri Dashboardı</span>
                  </Link>
                  <Link
                    to="/psixoloq/dashboard"
                    onClick={() => setIsPortalDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#CADFFD]/40 hover:text-[#251D4B]"
                  >
                    <Briefcase className="w-4 h-4 text-[#251D4B]" />
                    <span>Psixoloq Portalı</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setIsPortalDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#CADFFD]/40 hover:text-[#251D4B]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#251D4B]" />
                    <span>Admin Panel</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Daxil ol Button */}
            <NavLink
              to="/daxil-ol"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#251D4B] border border-[#251D4B] bg-white hover:bg-[#CADFFD]/20 transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-[#251D4B]" />
              <span>Daxil ol</span>
            </NavLink>

            {/* Qeydiyyatdan keç Button */}
            <NavLink
              to="/qeydiyyat"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-all flex items-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#CADFFD]" />
              <span>Qeydiyyatdan keç</span>
            </NavLink>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <NavLink
              to="/axtaris"
              className="p-2 rounded-xl border border-slate-200 text-slate-700"
            >
              <Search className="w-4 h-4" />
            </NavLink>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Menyunu Aç"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive
                      ? 'bg-[#CADFFD] text-[#251D4B]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Portallar və Kabinetlər
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-[#251D4B]"
              >
                Müştəri
              </Link>
              <Link
                to="/psixoloq/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-[#251D4B]"
              >
                Psixoloq
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-[#251D4B]"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/daxil-ol"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center text-xs font-bold text-[#251D4B] border border-[#251D4B]"
            >
              Daxil ol
            </Link>
            <Link
              to="/qeydiyyat"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center text-xs font-bold text-white bg-[#251D4B]"
            >
              Qeydiyyatdan keç
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
