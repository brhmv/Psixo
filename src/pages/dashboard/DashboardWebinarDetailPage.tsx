import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  ArrowLeft,
  PlayCircle,
  Download,
  FileText,
  CheckCircle2,
  Users,
  ShieldCheck,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { WEBINARS_DATA } from '../../data/mockData';

export const DashboardWebinarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const webinar = WEBINARS_DATA.find((w) => w.id === id) || WEBINARS_DATA[0];
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-12">
      
      {/* Back link */}
      <Link
        to="/dashboard/vebinarlar"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#251D4B] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Vebinarlarıma qayıt</span>
      </Link>

      {/* Main Webinar Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Cover / Video player */}
        <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
          {isPlayingVideo ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#251D4B] text-white p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#CADFFD]/20 text-[#CADFFD] flex items-center justify-center animate-pulse">
                <PlayCircle className="w-10 h-10" />
              </div>
              <h3 className="font-black text-lg text-white">Yayım Otağı Hazırlanır...</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Təhlükəsiz canlı vebinar axını başladılır. Zəhmət olmasa internet bağlantınızı sabit saxlayın.
              </p>
              <Link
                to={`/vebinarlar/${webinar.id}/canli`}
                className="px-6 py-2.5 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-black shadow-md hover:bg-white transition-colors inline-block"
              >
                Tam Ekran Canlı Otağa Daxil Ol
              </Link>
            </div>
          ) : (
            <>
              <img
                src={webinar.coverImage}
                alt={webinar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-black shadow-sm">
                    {webinar.category}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Qeydiyyat Təsdiqlənib</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {webinar.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                      {webinar.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                      {webinar.time} ({webinar.durationMinutes} dəq)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-300" />
                      {webinar.registeredCount} iştirakçı
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="px-6 py-3 rounded-2xl bg-[#CADFFD] hover:bg-white text-[#251D4B] text-xs font-black transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4 text-[#251D4B]" />
                      <span>{webinar.type === 'live' ? 'Vebinara qoşul' : 'İzləməyə başla'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Speaker Bio */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
            <img
              src={webinar.speaker.photo}
              alt={webinar.speaker.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aparıcı Mütəxəssis</span>
              <h3 className="font-black text-sm text-[#251D4B]">{webinar.speaker.name}</h3>
              <p className="text-xs text-slate-500">{webinar.speaker.title}</p>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">{webinar.speaker.bio}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-base font-black text-[#251D4B]">Vebinar Haqqında</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {webinar.about}
            </p>
          </div>

          {/* What You Will Learn */}
          <div className="space-y-4">
            <h2 className="text-base font-black text-[#251D4B]">Nələr Öyrənəcəksiniz?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {webinar.whatYouWillLearn.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="space-y-4">
            <h2 className="text-base font-black text-[#251D4B]">Vebinar Proqramı (Gündəlik)</h2>
            <div className="space-y-3">
              {webinar.agenda.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {item.timeRange}
                    </span>
                    <h4 className="font-bold text-xs text-[#251D4B]">{item.topic}</h4>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials Section */}
          <div className="p-5 rounded-2xl bg-[#CADFFD]/15 border border-[#CADFFD] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#251D4B]" />
                <h3 className="font-black text-xs text-[#251D4B]">Vebinar Materialları və Təqdimat</h3>
              </div>
              <button
                onClick={() => alert('Vebinar materialı PDF formatında yükləndi.')}
                className="px-3.5 py-1.5 rounded-xl bg-[#251D4B] text-white text-[11px] font-bold hover:bg-[#1a1435] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#CADFFD]" />
                <span>PDF Yüklə</span>
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Vebinarda istifadə olunan slaydlar və praktik tapşırıq vərəqələri iştirakçılar üçün ödənişsiz təqdim olunur.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
