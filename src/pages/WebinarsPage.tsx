import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WEBINARS_DATA } from '../data/mockData';
import {
  Video,
  Calendar,
  Clock,
  Search,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Radio
} from 'lucide-react';

export const WebinarsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'live' | 'recorded' | 'free'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: 'Bütün Vebinarlar' },
    { id: 'upcoming', label: 'Qarşıdakı vebinarlar' },
    { id: 'live', label: 'Canlı Yayım' },
    { id: 'recorded', label: 'Yazılmış (Video)' },
    { id: 'free', label: 'Pulsuz' }
  ];

  const filteredWebinars = useMemo(() => {
    return WEBINARS_DATA.filter((w) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'free' ? w.isFree : w.type === activeTab);

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Header Container */}
      <div className="bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Vebinarlar' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight">
              Vebinarlar
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Psixologiyanın aktual mövzularında peşəkar mütəxəssislərlə canlı seminarlar, sual-cavab və video yazılar.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Vebinarın mövzusu, spikerin adı (məs: Stress, Dr. Leyla, Uşaq)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-[#251D4B] placeholder:text-slate-400 shadow-xs focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-100 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
              }`}
            >
              {tab.id === 'live' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Webinar Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWebinars.map((web) => (
            <div
              key={web.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover with badge */}
                <div className="relative aspect-video">
                  <img
                    src={web.coverImage}
                    alt={web.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      web.isFree ? 'bg-emerald-600 text-white' : 'bg-[#251D4B] text-white'
                    }`}>
                      {web.isFree ? 'Ödənişsiz' : `${web.price} AZN`}
                    </span>

                    {web.type === 'live' && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white flex items-center gap-1">
                        <Radio className="w-3 h-3 animate-pulse" />
                        <span>Canlı</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-[#251D4B] bg-[#CADFFD]/50 px-2 py-0.5 rounded-md">
                      {web.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {web.registeredCount} iştirakçı
                    </span>
                  </div>

                  <Link to={`/vebinarlar/${web.id}`} className="block group">
                    <h3 className="font-bold text-lg text-[#251D4B] group-hover:text-slate-700 transition-colors leading-snug line-clamp-2">
                      {web.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {web.subtitle}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
                    <div className="flex items-center gap-2 font-semibold text-[#251D4B]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{web.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{web.time} ({web.durationMinutes} dəqiqə)</span>
                    </div>
                  </div>

                  {/* Speaker info */}
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={web.speaker.photo}
                      alt={web.speaker.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#251D4B]">{web.speaker.name}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-1">{web.speaker.title}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <Link
                  to={`/vebinarlar/${web.id}`}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Ətraflı Bax & Qeydiyyat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 mt-6 p-8">
            <h3 className="font-bold text-lg text-[#251D4B]">Vebinar tapılmadı</h3>
            <p className="text-xs text-slate-500 mt-1">Axtarış sözünü dəyişməyi yoxlayın.</p>
          </div>
        )}

      </div>

    </div>
  );
};
