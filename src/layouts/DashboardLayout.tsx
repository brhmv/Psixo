import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  LayoutDashboard,
  Search,
  Calendar,
  Video,
  BookOpen,
  Award,
  Heart,
  MessageSquare,
  Bell,
  CreditCard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { MOCK_USER, USER_MOCK_NOTIFICATIONS } from '../data/mockData';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(USER_MOCK_NOTIFICATIONS);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const navSections = [
    {
      title: 'ƏSAS',
      items: [
        { name: 'İdarə paneli', path: '/dashboard', icon: LayoutDashboard, exact: true },
        { name: 'Psixoloq tap', path: '/dashboard/psixoloqlar', icon: Search },
        { name: 'Seanslar', path: '/dashboard/seanslar', icon: Calendar }
      ]
    },
    {
      title: 'ÖYRƏNMƏ',
      items: [
        { name: 'Vebinarlarım', path: '/dashboard/vebinarlar', icon: Video },
        { name: 'Təlimlərim', path: '/dashboard/telimler', icon: BookOpen },
        { name: 'Sertifikatlar', path: '/dashboard/sertifikatlar', icon: Award }
      ]
    },
    {
      title: 'ŞƏXSİ',
      items: [
        { name: 'Seçilmişlər', path: '/dashboard/secilmisler', icon: Heart },
        { name: 'Mesajlar', path: '/dashboard/mesajlar', icon: MessageSquare },
        { name: 'Bildirişlər', path: '/dashboard/bildirisler', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
        { name: 'Ödənişlər', path: '/dashboard/odenisler', icon: CreditCard }
      ]
    },
    {
      title: 'HESAB',
      items: [
        { name: 'Profilim', path: '/dashboard/profil', icon: User },
        { name: 'Tənzimləmələr', path: '/dashboard/tenzimlemeler', icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#251D4B] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Menyunu aç"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#CADFFD] flex items-center justify-center text-[#251D4B] font-bold">
              <HeartHandshake className="w-4 h-4 text-[#251D4B]" />
            </div>
            <span className="font-black text-sm tracking-wide">DAYAQ</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white/10 relative text-slate-200"
            aria-label="Bildirişlər"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <Link
            to="/"
            className="px-2.5 py-1.5 rounded-xl bg-white/10 text-[11px] font-bold text-[#CADFFD] flex items-center gap-1 hover:bg-white/20 transition-colors"
          >
            <span>Sayt</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Sidebar Backdrop on Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Dedicated Client Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#251D4B] text-white flex flex-col justify-between z-50 transition-transform duration-200 ease-in-out shrink-0 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-5">
          
          {/* Brand Logo & Switch Link */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-2xl bg-[#CADFFD] flex items-center justify-center text-[#251D4B] font-bold shadow-xs group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-5 h-5 text-[#251D4B]" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white leading-none">DAYAQ</div>
                <div className="text-[10px] uppercase font-bold text-[#CADFFD] tracking-widest mt-1">
                  Müştəri Portalı
                </div>
              </div>
            </Link>
          </div>

          {/* User Profile Snippet */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-2xl object-cover border-2 border-[#CADFFD]/40"
            />
            <div className="flex-1 min-w-0">
              <div className="font-black text-xs text-white truncate">{MOCK_USER.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-[#CADFFD]">{MOCK_USER.title}</span>
              </div>
            </div>
            <Link
              to="/dashboard/profil"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              title="Profilə bax"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grouped Navigation */}
          <nav className="space-y-4">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-[#CADFFD]/60 tracking-wider uppercase">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact
                      ? location.pathname === item.path
                      : location.pathname === item.path || location.pathname.startsWith(item.path + '/');

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#CADFFD] text-[#251D4B] shadow-xs'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#251D4B]' : 'text-slate-300'}`} />
                          <span>{item.name}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-[#251D4B] text-white' : 'bg-rose-500 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
          <Link
            to="/"
            className="w-full py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center justify-between transition-colors font-medium"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#CADFFD]" />
              <span>Əsas Sayta Qayıt</span>
            </span>
          </Link>

          <button
            onClick={() => navigate('/daxil-ol')}
            className="w-full py-2 px-3.5 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıxış</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Şəxsi Məxfi Məkan</span>
            </div>
            <span className="text-xs text-slate-500">Bütün seans və qeydləriniz tam şifrələnmişdir.</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Find CTA */}
            <Link
              to="/dashboard/psixoloqlar"
              className="px-3.5 py-2 rounded-xl bg-[#CADFFD]/40 hover:bg-[#CADFFD] text-[#251D4B] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Psixoloq axtar</span>
            </Link>

            {/* Notification Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
                aria-label="Bildirişlər mərkəzi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold flex items-center justify-center text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 z-50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-bold text-xs text-[#251D4B]">Bildirişlər ({unreadCount})</div>
                    <button
                      onClick={markAllRead}
                      className="text-[10px] text-slate-500 hover:text-[#251D4B] font-bold"
                    >
                      Oxunmuş et
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 4).map((n) => (
                      <Link
                        key={n.id}
                        to={n.link || '/dashboard/bildirisler'}
                        onClick={() => setShowNotifications(false)}
                        className="block pt-2 hover:bg-slate-50 p-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-[#251D4B]">{n.title}</h4>
                          <span className="text-[9px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/dashboard/bildirisler"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-[#251D4B] hover:underline"
                    >
                      Bütün bildirişlərə bax
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Quick Link */}
            <Link
              to="/dashboard/profil"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-xl object-cover"
              />
              <span className="text-xs font-bold text-[#251D4B] max-w-[120px] truncate">
                {MOCK_USER.name}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2 z-40 flex items-center justify-around shadow-lg">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-[#251D4B]' : 'text-slate-400'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Ana səhifə</span>
        </NavLink>

        <NavLink
          to="/dashboard/seanslar"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-[#251D4B]' : 'text-slate-400'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span>Seanslar</span>
        </NavLink>

        <NavLink
          to="/dashboard/telimler"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-[#251D4B]' : 'text-slate-400'
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          <span>Öyrən</span>
        </NavLink>

        <NavLink
          to="/dashboard/bildirisler"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold relative ${
              isActive ? 'text-[#251D4B]' : 'text-slate-400'
            }`
          }
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-[8px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span>Bildirişlər</span>
        </NavLink>

        <NavLink
          to="/dashboard/profil"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-[#251D4B]' : 'text-slate-400'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profil</span>
        </NavLink>
      </div>

    </div>
  );
};
