import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  PlusCircle,
  Users,
  Calendar,
  Clock,
  DollarSign,
  ChevronRight,
  Eye,
  Edit,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { PSYCHOLOGIST_WEBINARS_MOCK, PsychologistWebinarItem } from '../../data/psychologistMockData';

export const PsychologistWebinarsPage: React.FC = () => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState<PsychologistWebinarItem[]>(PSYCHOLOGIST_WEBINARS_MOCK);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'draft' | 'under_review'>('upcoming');
  const [selectedWebinarParticipants, setSelectedWebinarParticipants] = useState<PsychologistWebinarItem | null>(null);

  const filteredWebinars = webinars.filter((w) => {
    if (activeTab === 'upcoming') return w.status === 'upcoming' || w.status === 'active';
    if (activeTab === 'completed') return w.status === 'completed';
    if (activeTab === 'draft') return w.status === 'draft';
    if (activeTab === 'under_review') return w.status === 'under_review';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Vebinarlarım</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Canlı onlayn psixoloji seminarlarınızı, iştirakçı siyahısını və bilet satışlarını idarə edin.
          </p>
        </div>

        <Link
          to="/psixoloq/vebinarlar/yeni"
          className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold flex items-center gap-2 shadow-xs self-start sm:self-auto transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-[#CADFFD]" />
          <span>Yeni Vebinar Yarat</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'upcoming', label: 'Aktiv / Qarşıdakı', count: webinars.filter((w) => w.status === 'upcoming' || w.status === 'active').length },
          { id: 'under_review', label: 'Yoxlamada', count: webinars.filter((w) => w.status === 'under_review').length },
          { id: 'completed', label: 'Tamamlanmış', count: webinars.filter((w) => w.status === 'completed').length },
          { id: 'draft', label: 'Qaralamalar', count: webinars.filter((w) => w.status === 'draft').length }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-[#CADFFD] text-[#251D4B]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWebinars.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Video className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#251D4B]">Bu kateqoriyada vebinar tapılmadı</h3>
              <p className="text-xs text-slate-500">Geniş auditoriyaya çatmaq üçün yeni vebinar təşkil edə bilərsiniz.</p>
            </div>
            <Link
              to="/psixoloq/vebinarlar/yeni"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              <PlusCircle className="w-4 h-4 text-[#CADFFD]" />
              <span>Yeni vebinar yarat</span>
            </Link>
          </div>
        ) : (
          filteredWebinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#CADFFD] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Cover with Status Badge */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={webinar.coverImage}
                    alt={webinar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#251D4B]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                      {webinar.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold ${
                        webinar.status === 'upcoming'
                          ? 'bg-emerald-500 text-white'
                          : webinar.status === 'under_review'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {webinar.status === 'upcoming'
                        ? 'Qarşıdakı'
                        : webinar.status === 'under_review'
                        ? 'Yoxlamada'
                        : 'Tamamlanıb'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-xs text-[#251D4B] text-xs font-black shadow-xs">
                      {webinar.isFree ? 'Ödənişsiz' : `₼${webinar.price}`}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-black text-sm text-[#251D4B] line-clamp-2 leading-snug">
                    {webinar.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{webinar.registeredParticipants} / {webinar.maxParticipants} iştirakçı</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Gəlir: ₼{webinar.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => setSelectedWebinarParticipants(webinar)}
                  className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] hover:bg-[#b8d4fc] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>İştirakçıları gör</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to="/vebinarlar"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="İctimai baxış"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/psixoloq/vebinarlar/yeni"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="Redaktə et"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Participant Management Modal */}
      {selectedWebinarParticipants && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-sm text-[#251D4B]">İştirakçıların İdarə Edilməsi</h3>
                <div className="text-xs text-slate-500 font-medium truncate max-w-md">
                  {selectedWebinarParticipants.title}
                </div>
              </div>
              <button
                onClick={() => setSelectedWebinarParticipants(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Qeydiyyat</div>
                <div className="text-base font-black text-[#251D4B]">
                  {selectedWebinarParticipants.registeredParticipants} nəfər
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Yer Limiti</div>
                <div className="text-base font-black text-[#251D4B]">
                  {selectedWebinarParticipants.maxParticipants} yer
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Doluluq</div>
                <div className="text-base font-black text-emerald-700">
                  {Math.round((selectedWebinarParticipants.registeredParticipants / selectedWebinarParticipants.maxParticipants) * 100)}%
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Toplanan Gəlir</div>
                <div className="text-base font-black text-[#251D4B]">
                  ₼{selectedWebinarParticipants.revenue}
                </div>
              </div>
            </div>

            {/* Participant Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">İştirakçı</th>
                    <th className="py-3 px-4">Qeydiyyat Tarixi</th>
                    <th className="py-3 px-4">Ödəniş</th>
                    <th className="py-3 px-4">İştirak Statusu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedWebinarParticipants.participantsList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        Bu vebinar üçün hələ iştirakçı qeydiyyatı yoxdur.
                      </td>
                    </tr>
                  ) : (
                    selectedWebinarParticipants.participantsList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#251D4B]">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{p.registeredAt}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {p.paymentStatus === 'paid' ? 'Ödənilib' : 'Ödənişsiz'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {p.attendanceStatus === 'registered' ? 'Qeydiyyatda' : 'İştirak etdi'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedWebinarParticipants(null)}
                className="px-5 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
