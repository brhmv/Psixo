import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  Radio,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Users,
  Search
} from 'lucide-react';
import { WEBINARS_DATA } from '../../data/mockData';

export const DashboardWebinarsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'attended' | 'recorded'>('upcoming');

  const filteredWebinars = WEBINARS_DATA.filter((web) => {
    if (activeTab === 'upcoming') return web.type === 'live';
    if (activeTab === 'attended') return web.type === 'recorded' && web.registeredCount > 300;
    if (activeTab === 'recorded') return web.type === 'recorded';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Vebinarlarım</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Qeydiyyatdan keçdiyiniz canlı psixoloji vebinarlar və video yazılar arxivi.
          </p>
        </div>

        <Link
          to="/vebinarlar"
          className="px-5 py-3 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Search className="w-4 h-4 text-[#CADFFD]" />
          <span>Vebinarları Kəşf Et</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Qarşıdakı ({WEBINARS_DATA.filter((w) => w.type === 'live').length})
        </button>

        <button
          onClick={() => setActiveTab('attended')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'attended'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          İştirak etdiklərim
        </button>

        <button
          onClick={() => setActiveTab('recorded')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'recorded'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Yazılmış ({WEBINARS_DATA.filter((w) => w.type === 'recorded').length})
        </button>
      </div>

      {/* Webinar Grid */}
      {filteredWebinars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWebinars.map((web) => (
            <div
              key={web.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video">
                  <img
                    src={web.coverImage}
                    alt={web.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-[#251D4B] text-white shadow-md">
                      {web.type === 'live' ? 'Canlı Qeydiyyat Aktivdir' : 'Video Qeyd Mövcuddur'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-[#251D4B]">
                      <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                      {web.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {web.time} ({web.durationMinutes} dəq)
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[#251D4B] line-clamp-2">
                    {web.title}
                  </h3>

                  <div className="flex items-center gap-2.5 pt-1">
                    <img
                      src={web.speaker.photo}
                      alt={web.speaker.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#251D4B]">{web.speaker.name}</div>
                      <div className="text-[10px] text-slate-400">{web.speaker.title}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to={`/dashboard/vebinarlar/${web.id}`}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs font-bold text-center bg-[#251D4B] text-white hover:bg-[#1a1435] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <PlayCircle className="w-4 h-4 text-[#CADFFD]" />
                  <span>{web.type === 'live' ? 'Vebinara qoşul' : 'Yenidən izlə'}</span>
                </Link>

                <Link
                  to={`/vebinarlar/${web.id}`}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                >
                  Təfərrüat
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Video className="w-8 h-8" />
          </div>
          <h3 className="text-base font-black text-[#251D4B]">
            Hələ heç bir vebinara qeydiyyatdan keçməmisiniz.
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Platformamızda keçirilən ən son canlı və video vebinarları kəşf edin.
          </p>
          <Link
            to="/vebinarlar"
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold inline-block"
          >
            Vebinarları kəşf et
          </Link>
        </div>
      )}

    </div>
  );
};
