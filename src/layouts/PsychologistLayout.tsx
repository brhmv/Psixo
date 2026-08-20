import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Users,
  Video,
  BookOpen,
  Star,
  Wallet,
  BarChart3,
  MessageSquare,
  Bell,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  ChevronRight,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  PSYCHOLOGIST_PROFILE_MOCK,
  PSYCHOLOGIST_NOTIFICATIONS_MOCK
} from '../data/psychologistMockData';

export const PsychologistLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Page title mapping based on pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/profil')) return 'Profilim';
    if (path.includes('/seanslar')) return 'Seanslar';
    if (path.includes('/teqvim')) return 'Təqvim';
    if (path.includes('/musteriler')) return 'Müştərilər';
    if (path.includes('/vebinarlar/yeni')) return 'Yeni Vebinar Yarat';
    if (path.includes('/vebinarlar')) return 'Vebinarlarım';
    if (path.includes('/telimler/yeni')) return 'Yeni Təlim Yarat';
    if (path.includes('/telimler')) return 'Təlimlərim';
    if (path.includes('/reyler') || path.includes('/reylər')) return 'Rəylər';
    if (path.includes('/gelirler') || path.includes('/gəlirlər')) return 'Gəlirlər';
    if (path.includes('/analitika')) return 'Analitika';
    if (path.includes('/mesajlar')) return 'Mesajlar';
    if (path.includes('/bildirisler')) return 'Bildirişlər';
    if (path.includes('/tenzimlemeler')) return 'Tənzimləmələr';
    return 'İdarə paneli';
  };

  const navGroups = [
    {
      group: 'ƏSAS',
      items: [
        { name: 'İdarə paneli', path: '/psixoloq/dashboard', icon: LayoutDashboard, exact: true },
        { name: 'Seanslar', path: '/psixoloq/seanslar', icon: Calendar, badge: '4' },
        { name: 'Təqvim', path: '/psixoloq/teqvim', icon: CalendarDays },
        { name: 'Müştərilər', path: '/psixoloq/musteriler', icon: Users }
      ]
    },
    {
      group: 'KONTENT',
      items: [
        { name: 'Vebinarlar', path: '/psixoloq/vebinarlar', icon: Video, badge: '2' },
        { name: 'Təlimlər', path: '/psixoloq/telimler', icon: BookOpen }
      ]
    },
    {
      group: 'İDARƏETMƏ',
      items: [
        { name: 'Rəylər', path: '/psixoloq/reyler', icon: Star, badge: '4.9' },
        { name: 'Gəlirlər', path: '/psixoloq/gelirler', icon: Wallet },
        { name: 'Analitika', path: '/psixoloq/analitika', icon: BarChart3 }
      ]
    },
    {
      group: 'ƏLAQƏ',
      items: [
        { name: 'Mesajlar', path: '/psixoloq/mesajlar', icon: MessageSquare, badge: '1' },
        { name: 'Bildirişlər', path: '/psixoloq/bildirisler', icon: Bell, badge: '2' }
      ]
    },
    {
      group: 'HESAB',
      items: [
        { name: 'Profilim', path: '/psixoloq/profil', icon: UserCheck },
        { name: 'Tənzimləmələr', path: '/psixoloq/tenzimlemeler', icon: Settings }
      ]
    }
  ];

  const unreadNotificationsCount = PSYCHOLOGIST_NOTIFICATIONS_MOCK.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans selection:bg-[#CADFFD] selection:text-[#251D4B]">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#251D4B] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            aria-label="Menyu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-tight text-white">DAYAQ</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CADFFD] text-[#251D4B]">
              PSİXOLOQ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearchModal(true)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
          >
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/psixoloq/bildirisler"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
            )}
          </Link>
          <Link to="/psixoloq/profil" className="w-8 h-8 rounded-xl overflow-hidden border border-white/30">
            <img
              src={PSYCHOLOGIST_PROFILE_MOCK.photo}
              alt={PSYCHOLOGIST_PROFILE_MOCK.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Fixed Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#251D4B] text-white flex flex-col justify-between z-50 transition-transform duration-200 shrink-0 shadow-2xl md:shadow-none overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          
          {/* Brand & Platform Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/psixoloq/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#CADFFD] flex items-center justify-center text-[#251D4B] font-black text-lg">
                D
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white leading-none">DAYAQ</div>
                <div className="text-[10px] uppercase font-bold text-[#CADFFD] tracking-widest mt-1">
                  Mütəxəssis Portalı
                </div>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white/10 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Psychologist Profile Snippet Card */}
          <div className="p-4 mx-4 my-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={PSYCHOLOGIST_PROFILE_MOCK.photo}
                  alt={PSYCHOLOGIST_PROFILE_MOCK.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-[#CADFFD]"
                />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#251D4B] absolute -bottom-0.5 -right-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-white truncate">
                  Dr. {PSYCHOLOGIST_PROFILE_MOCK.name} {PSYCHOLOGIST_PROFILE_MOCK.surname}
                </div>
                <div className="text-[11px] text-slate-300 truncate">Psixoloq</div>
                
                {/* Verification Badge */}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold mt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Təsdiqlənmiş</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="px-3 pb-6 space-y-5">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {grp.group}
                </div>
                <div className="space-y-0.5 pt-1">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact
                      ? location.pathname === item.path
                      : location.pathname === item.path || (item.path !== '/psixoloq/dashboard' && location.pathname.startsWith(item.path));

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#CADFFD] text-[#251D4B] font-bold shadow-sm'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#251D4B]' : 'text-[#CADFFD]'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isActive
                                ? 'bg-[#251D4B] text-white'
                                : 'bg-white/10 text-[#CADFFD]'
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

        {/* Bottom Sidebar Controls */}
        <div className="p-4 border-t border-white/10 space-y-2 shrink-0 bg-[#201840]">
          <Link
            to="/"
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-200 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2 font-medium">
              <ExternalLink className="w-3.5 h-3.5 text-[#CADFFD]" />
              <span>Əsas Sayta Keç</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={() => navigate('/daxil-ol')}
            className="w-full py-2.5 px-3 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıxış</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-20 bg-white border-b border-slate-200 px-8 items-center justify-between sticky top-0 z-30 shadow-xs">
          
          {/* Left: Page Title */}
          <div>
            <h1 className="text-xl font-black text-[#251D4B] tracking-tight">
              {getPageTitle()}
            </h1>
            <div className="text-xs text-slate-500 font-medium">
              Dayaq Mütəxəssis İdarəetmə Paneli
            </div>
          </div>

          {/* Right Action Icons & Profile Dropdown */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchModal(true)}
                  placeholder="Seans, müştəri və ya mövzu axtar..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#251D4B] focus:bg-white w-64 transition-all"
                />
              </div>
            </div>

            {/* Quick Action Button */}
            <Link
              to="/psixoloq/teqvim"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B] hover:bg-[#b8d4fc] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#251D4B]" />
              <span>Təqvimi İdarə Et</span>
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors relative"
                aria-label="Bildirişlər"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white absolute top-1.5 right-1.5" />
                )}
              </button>

              {showNotifications && (
                <div
                  className="absolute right-0 mt-2 w-88 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setShowNotifications(false)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-xs text-[#251D4B]">Bildirişlər</span>
                    <Link
                      to="/psixoloq/bildirisler"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] font-bold text-[#251D4B] hover:underline"
                    >
                      Bütün bildirişlərə bax ({PSYCHOLOGIST_NOTIFICATIONS_MOCK.length})
                    </Link>
                  </div>
                  <div className="space-y-2 pt-2 max-h-80 overflow-y-auto">
                    {PSYCHOLOGIST_NOTIFICATIONS_MOCK.slice(0, 4).map((n) => (
                      <Link
                        key={n.id}
                        to={n.actionUrl || '/psixoloq/bildirisler'}
                        onClick={() => setShowNotifications(false)}
                        className={`block text-xs p-3 rounded-xl transition-colors ${
                          !n.read ? 'bg-[#CADFFD]/20 border border-[#CADFFD]/50' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-[#251D4B] flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <div className="text-slate-600 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                          {n.message}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <img
                  src={PSYCHOLOGIST_PROFILE_MOCK.photo}
                  alt={PSYCHOLOGIST_PROFILE_MOCK.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-[#251D4B]">
                    Dr. {PSYCHOLOGIST_PROFILE_MOCK.name} M.
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Psixoloq</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {showProfileDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <div className="font-bold text-xs text-[#251D4B]">
                      Dr. {PSYCHOLOGIST_PROFILE_MOCK.name} {PSYCHOLOGIST_PROFILE_MOCK.surname}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{PSYCHOLOGIST_PROFILE_MOCK.email}</div>
                  </div>

                  <Link
                    to="/psixoloq/profil"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <UserCheck className="w-4 h-4 text-[#251D4B]" />
                    <span>Profilim</span>
                  </Link>

                  <Link
                    to="/psixoloq/tenzimlemeler"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <Settings className="w-4 h-4 text-[#251D4B]" />
                    <span>Tənzimləmələr</span>
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/daxil-ol');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıxış</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Page Content Container */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          <Outlet />
        </main>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-40 shadow-lg">
        <NavLink
          to="/psixoloq/dashboard"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-[#251D4B]' : 'text-slate-500'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>İdarə paneli</span>
        </NavLink>

        <NavLink
          to="/psixoloq/seanslar"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition-colors relative ${
              isActive ? 'text-[#251D4B]' : 'text-slate-500'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span>Seanslar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-2" />
        </NavLink>

        <NavLink
          to="/psixoloq/teqvim"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition-colors ${
              isActive ? 'text-[#251D4B]' : 'text-slate-500'
            }`
          }
        >
          <CalendarDays className="w-5 h-5" />
          <span>Təqvim</span>
        </NavLink>

        <NavLink
          to="/psixoloq/mesajlar"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition-colors relative ${
              isActive ? 'text-[#251D4B]' : 'text-slate-500'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          <span>Mesajlar</span>
          <span className="w-2 h-2 rounded-full bg-[#251D4B] absolute top-1 right-2" />
        </NavLink>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold text-slate-500"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span>Daha çox</span>
        </button>
      </div>

      {/* Mobile Drawer for Extra Links */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end md:hidden animate-in fade-in">
          <div className="w-4/5 max-w-sm bg-[#251D4B] text-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">DAYAQ PSİXOLOQ</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase text-[#CADFFD] tracking-wider">
                  Bütün Bölmələr
                </div>
                <div className="space-y-1">
                  <Link
                    to="/psixoloq/musteriler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Users className="w-4 h-4 text-[#CADFFD]" />
                    <span>Müştərilər</span>
                  </Link>

                  <Link
                    to="/psixoloq/vebinarlar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Video className="w-4 h-4 text-[#CADFFD]" />
                    <span>Vebinarlarım</span>
                  </Link>

                  <Link
                    to="/psixoloq/telimler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <BookOpen className="w-4 h-4 text-[#CADFFD]" />
                    <span>Təlimlərim</span>
                  </Link>

                  <Link
                    to="/psixoloq/reyler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Star className="w-4 h-4 text-[#CADFFD]" />
                    <span>Rəylər (4.9 ★)</span>
                  </Link>

                  <Link
                    to="/psixoloq/gelirler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Wallet className="w-4 h-4 text-[#CADFFD]" />
                    <span>Gəlirlər</span>
                  </Link>

                  <Link
                    to="/psixoloq/analitika"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <BarChart3 className="w-4 h-4 text-[#CADFFD]" />
                    <span>Analitika</span>
                  </Link>

                  <Link
                    to="/psixoloq/bildirisler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Bell className="w-4 h-4 text-[#CADFFD]" />
                    <span>Bildirişlər</span>
                  </Link>

                  <Link
                    to="/psixoloq/profil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <UserCheck className="w-4 h-4 text-[#CADFFD]" />
                    <span>Profilim</span>
                  </Link>

                  <Link
                    to="/psixoloq/tenzimlemeler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 text-xs font-semibold"
                  >
                    <Settings className="w-4 h-4 text-[#CADFFD]" />
                    <span>Tənzimləmələr</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 text-xs font-bold text-center block text-white"
              >
                Əsas Sayta Bax
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/daxil-ol');
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-rose-300 text-center block hover:bg-rose-500/10"
              >
                Çıxış
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Psychologist Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#251D4B] font-bold text-sm">
                <Search className="w-4 h-4 text-[#251D4B]" />
                <span>Kabinet Daxili Axtarış</span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Müştəri adı, seans vaxtı, vebinar və ya təlim başlığı..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#251D4B] focus:bg-white"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Sürətli Keçidlər
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate('/psixoloq/seanslar');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#CADFFD] hover:bg-[#CADFFD]/10 text-left text-xs font-semibold text-[#251D4B] flex items-center justify-between"
                >
                  <span>Bugünkü Seanslar</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate('/psixoloq/teqvim');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#CADFFD] hover:bg-[#CADFFD]/10 text-left text-xs font-semibold text-[#251D4B] flex items-center justify-between"
                >
                  <span>İş Qrafiki & Təqvim</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate('/psixoloq/vebinarlar/yeni');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#CADFFD] hover:bg-[#CADFFD]/10 text-left text-xs font-semibold text-[#251D4B] flex items-center justify-between"
                >
                  <span>Yeni Vebinar Yarat</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    navigate('/psixoloq/telimler/yeni');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#CADFFD] hover:bg-[#CADFFD]/10 text-left text-xs font-semibold text-[#251D4B] flex items-center justify-between"
                >
                  <span>Yeni Təlim Yarat</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
