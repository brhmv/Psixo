import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Eye,
  CalendarCheck,
  Award,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ShieldAlert,
  Percent
} from 'lucide-react';

export const PsychologistAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30days' | '90days' | '1year'>('30days');

  const monthlyData = [
    { month: 'Mart', revenue: 1650, sessions: 33 },
    { month: 'Aprel', revenue: 1900, sessions: 38 },
    { month: 'May', revenue: 2150, sessions: 43 },
    { month: 'İyun', revenue: 2300, sessions: 46 },
    { month: 'İyul', revenue: 2200, sessions: 44 },
    { month: 'Avqust (Cari)', revenue: 2450, sessions: 49 }
  ];

  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue));

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Analitika və Statistika</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Profil ziyarətləri, müştəri konversiyası, seans statistikası və gəlir dinamikası.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              timeRange === '30days' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            Son 30 gün
          </button>
          <button
            onClick={() => setTimeRange('90days')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              timeRange === '90days' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            Son 3 ay
          </button>
          <button
            onClick={() => setTimeRange('1year')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              timeRange === '1year' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            1 il
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Profilə Baxış</span>
            <Eye className="w-4 h-4 text-[#251D4B]" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">1,420</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24% əvvəlki dövrə görə</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Konversiya Faizi</span>
            <Percent className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">18.4%</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Yüksək maraq göstəricisi</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Seans Tamamlanması</span>
            <CalendarCheck className="w-4 h-4 text-[#251D4B]" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">97.8%</div>
          <div className="text-[11px] text-slate-500 font-medium">Yalnız 2.2% ləğv nisbəti</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Müştəri Qayıdışı</span>
            <Users className="w-4 h-4 text-[#251D4B]" />
          </div>
          <div className="text-2xl font-black text-emerald-700">76%</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Təkrar seans alan müştərilər</span>
          </div>
        </div>

      </div>

      {/* Revenue & Growth Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-sm text-[#251D4B]">Aylıq Gəlir və Seans Sayı Dinamikası</h2>
              <p className="text-xs text-slate-500">Son 6 ayın müqayisəli artım tempi</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#251D4B]" />
              <span className="text-xs font-semibold text-slate-600">Gəlir (AZN)</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-2">
            {monthlyData.map((d) => {
              const heightPercent = Math.round((d.revenue / maxRevenue) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-[#251D4B] opacity-0 group-hover:opacity-100 transition-opacity">
                    ₼{d.revenue}
                  </span>
                  <div
                    className="w-full bg-[#251D4B] group-hover:bg-[#CADFFD] rounded-2xl transition-all duration-300 relative overflow-hidden"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute top-2 left-0 right-0 text-center text-[9px] text-[#CADFFD] group-hover:text-[#251D4B] font-bold">
                      {d.sessions} seans
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 truncate">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Ümumi 6 aylıq qazanc: <strong>₼12,650</strong></span>
            <span>Orta aylıq seans: <strong>42 seans</strong></span>
          </div>
        </div>

        {/* Breakdown by Service */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-black text-sm text-[#251D4B]">Xidmət Növlərinə Görə Paylanma</h2>
            <p className="text-xs text-slate-500">Müştəri müraciətlərinin mənbəyi</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#251D4B]">Fərdi Onlayn Terapiya</span>
                <span className="text-slate-700">62% (₼1,520)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#251D4B] rounded-full w-[62%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#251D4B]">Əyani Seanslar (Ofis)</span>
                <span className="text-slate-700">22% (₼540)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#CADFFD] rounded-full w-[22%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#251D4B]">Vebinarlar</span>
                <span className="text-slate-700">10% (₼245)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[10%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#251D4B]">Video Kurslar & Təlimlər</span>
                <span className="text-slate-700">6% (₼145)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[6%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            💡 <strong>Tövsiyə:</strong> Axşam saatlarında onlayn seanslara tələbat 40% daha yüksəkdir. Cədvəlinizi axşam saatlarına genişləndirməklə gəlirinizi artıra bilərsiniz.
          </div>
        </div>

      </div>

    </div>
  );
};
