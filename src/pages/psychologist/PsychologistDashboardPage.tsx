import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Video,
  BookOpen,
  Wallet,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  CalendarDays,
  UserCheck,
  ExternalLink,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import {
  PSYCHOLOGIST_PROFILE_MOCK,
  PSYCHOLOGIST_SESSIONS_MOCK,
  PSYCHOLOGIST_WEBINARS_MOCK,
  PSYCHOLOGIST_COURSES_MOCK
} from '../../data/psychologistMockData';

export const PsychologistDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [revenueFilter, setRevenueFilter] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  // Filter today's and upcoming sessions
  const todaySessions = PSYCHOLOGIST_SESSIONS_MOCK.filter((s) => s.status === 'today');
  const upcomingSessions = PSYCHOLOGIST_SESSIONS_MOCK.filter((s) => s.status === 'confirmed');

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & Verification Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B] tracking-tight">
              Xoş gəlmisiniz, Dr. {PSYCHOLOGIST_PROFILE_MOCK.name} 👋
            </h1>
          </div>
          <p className="text-sm text-slate-600 font-medium">
            Bugünkü fəaliyyətinizə və peşəkar göstəricilərinizə ümumi baxış.
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span>Profiliniz Təsdiqlənib</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-[11px] text-emerald-700">
              Bütün xidmətləriniz ictimai axtarışda aktivdir
            </div>
          </div>
        </div>
      </div>

      {/* 4 Primary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Bugünkü seanslar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-[#CADFFD] transition-colors">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bugünkü seanslar
            </div>
            <div className="text-3xl font-black text-[#251D4B]">
              {todaySessions.length}
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Növbəti seans: 10:00</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#CADFFD]/40 text-[#251D4B] flex items-center justify-center shrink-0">
            <Calendar className="w-7 h-7" />
          </div>
        </div>

        {/* Card 2: Qarşıdakı vebinarlar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-[#CADFFD] transition-colors">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Qarşıdakı vebinarlar
            </div>
            <div className="text-3xl font-black text-[#251D4B]">
              2
            </div>
            <div className="text-[11px] font-semibold text-[#251D4B] flex items-center gap-1">
              <Video className="w-3.5 h-3.5" />
              <span>184 qeydiyyatlı iştirakçı</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Video className="w-7 h-7" />
          </div>
        </div>

        {/* Card 3: Aktiv tələbələr */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-[#CADFFD] transition-colors">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Aktiv tələbələr
            </div>
            <div className="text-3xl font-black text-[#251D4B]">
              148
            </div>
            <div className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>2 aktiv video təlim</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        {/* Card 4: Bu ayın gəliri */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-[#CADFFD] transition-colors">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bu ayın gəliri
            </div>
            <div className="text-3xl font-black text-[#251D4B]">
              ₼2,450
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18% ötən aydan çox</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Wallet className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* Main Grid: Today's Sessions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Today's Sessions & Upcoming */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 5: Today's Sessions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-[#251D4B]">
                  Bugünkü Seanslar
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bugün üçün cədvəlinizdə təyin olunmuş 4 konsultasiya görüşü
                </p>
              </div>
              <Link
                to="/psixoloq/seanslar"
                className="text-xs font-bold text-[#251D4B] hover:underline flex items-center gap-1"
              >
                <span>Hamısını gör</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {todaySessions.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500">Bugün üçün planlaşdırılmış seans yoxdur.</p>
                <Link
                  to="/psixoloq/teqvim"
                  className="mt-3 inline-block px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold"
                >
                  Təqvimə bax
                </Link>
              </div>
            ) : (
              <div className="space-y-3.5">
                {todaySessions.map((ses) => (
                  <div
                    key={ses.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-[#CADFFD] hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={ses.clientPhoto}
                        alt={ses.clientName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-[#251D4B]">
                            {ses.clientName}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Təsdiqlənib
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {ses.sessionType}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                          <span className="font-bold text-[#251D4B] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#251D4B]" />
                            {ses.timeSlot}
                          </span>
                          <span>•</span>
                          <span>{ses.durationMinutes} dəqiqə</span>
                          <span>•</span>
                          <span className="capitalize">{ses.format === 'online' ? 'Onlayn Video' : 'Əyani Ofis'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      {ses.format === 'online' && ses.meetingLink ? (
                        <a
                          href={ses.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#251D4B] hover:bg-[#1b1536] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                        >
                          <Video className="w-4 h-4 text-[#CADFFD]" />
                          <span>Seansa qoşul</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => navigate('/psixoloq/seanslar')}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Məkan & Detal</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate('/psixoloq/seanslar')}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600"
                        title="Ətraflı məlumat"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 6: Upcoming Appointments */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-[#251D4B]">
                  Qarşıdakı Seanslar
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Növbəti günlər üçün təsdiqlənmiş görüşlər
                </p>
              </div>
              <Link
                to="/psixoloq/seanslar"
                className="text-xs font-bold text-[#251D4B] hover:underline flex items-center gap-1"
              >
                <span>Bütün seanslara bax</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingSessions.slice(0, 3).map((ses) => (
                <div
                  key={ses.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#CADFFD] flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={ses.clientPhoto}
                      alt={ses.clientName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-xs text-[#251D4B]">{ses.clientName}</div>
                      <div className="text-[11px] text-slate-500">{ses.sessionType}</div>
                      <div className="text-[10px] text-slate-600 font-semibold pt-0.5">
                        {ses.date} • {ses.timeSlot}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold">
                      ₼{ses.price}
                    </span>
                    <button
                      onClick={() => navigate('/psixoloq/seanslar')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B]"
                    >
                      Bax
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/psixoloq/seanslar"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#251D4B] hover:underline"
              >
                <span>Bütün seanslara bax →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Quick Actions, Revenue Overview & Profile Completion */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Section 7: Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-[#251D4B]">
              Sürətli Əməliyyatlar
            </h2>

            <div className="grid grid-cols-1 gap-2.5">
              <Link
                to="/psixoloq/vebinarlar/yeni"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-[#CADFFD]/20 border border-slate-200 hover:border-[#CADFFD] text-[#251D4B] flex items-center justify-between text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <span>Yeni vebinar yarat</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#251D4B] transition-colors" />
              </Link>

              <Link
                to="/psixoloq/telimler/yeni"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-[#CADFFD]/20 border border-slate-200 hover:border-[#CADFFD] text-[#251D4B] flex items-center justify-between text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Yeni təlim yarat</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#251D4B] transition-colors" />
              </Link>

              <Link
                to="/psixoloq/teqvim"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-[#CADFFD]/20 border border-slate-200 hover:border-[#CADFFD] text-[#251D4B] flex items-center justify-between text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <span>Təqvimi idarə et</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#251D4B] transition-colors" />
              </Link>

              <Link
                to="/psixoloq/profil"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-[#CADFFD]/20 border border-slate-200 hover:border-[#CADFFD] text-[#251D4B] flex items-center justify-between text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span>Profilimi redaktə et</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#251D4B] transition-colors" />
              </Link>
            </div>
          </div>

          {/* Section 8: Revenue Overview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-[#251D4B]">
                Gəlir Statistikası
              </h2>
              
              {/* Filter Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[10px] font-bold">
                <button
                  onClick={() => setRevenueFilter('weekly')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    revenueFilter === 'weekly' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Həftəlik
                </button>
                <button
                  onClick={() => setRevenueFilter('monthly')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    revenueFilter === 'monthly' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Aylıq
                </button>
                <button
                  onClick={() => setRevenueFilter('yearly')}
                  className={`px-2 py-1 rounded-lg transition-colors ${
                    revenueFilter === 'yearly' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  İllik
                </button>
              </div>
            </div>

            {/* Total Revenue Box */}
            <div className="p-4 rounded-2xl bg-[#251D4B] text-white space-y-1">
              <div className="text-[11px] font-semibold text-[#CADFFD]">Cəmi Gəlir (Bu Ay)</div>
              <div className="text-2xl font-black text-white">₼2,450</div>
              <div className="text-[10px] text-slate-300">Bank hesabına növbəti köçürmə: 01 Sentyabr</div>
            </div>

            {/* Revenue Sources Breakdown */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#251D4B]" />
                  <span className="text-slate-600 font-medium">Seanslar</span>
                </div>
                <span className="font-bold text-[#251D4B]">₼1,650</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#251D4B] rounded-full" style={{ width: '67%' }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600 font-medium">Vebinarlar</span>
                </div>
                <span className="font-bold text-[#251D4B]">₼500</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '21%' }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-slate-600 font-medium">Təlimlər</span>
                </div>
                <span className="font-bold text-[#251D4B]">₼300</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/psixoloq/gelirler"
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ətraflı gəlir statistikasına bax</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Section 9: Profile Completion Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-[#251D4B]">
                Profilin Tamamlanması
              </h2>
              <span className="text-xs font-black text-[#251D4B]">
                {PSYCHOLOGIST_PROFILE_MOCK.profileCompletionPercent}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${PSYCHOLOGIST_PROFILE_MOCK.profileCompletionPercent}%` }}
              />
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Çatışmayan bəndlər:
              </div>
              {PSYCHOLOGIST_PROFILE_MOCK.missingItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/psixoloq/profil"
                className="w-full py-2.5 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Profili tamamla</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
