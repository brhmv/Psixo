import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  X,
  FileText,
  User,
  Phone,
  Mail,
  CalendarDays,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { PSYCHOLOGIST_SESSIONS_MOCK, PsychologistSessionItem } from '../../data/psychologistMockData';

export const PsychologistSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<PsychologistSessionItem[]>(PSYCHOLOGIST_SESSIONS_MOCK);
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'cancelled'>('today');
  const [selectedSession, setSelectedSession] = useState<PsychologistSessionItem | null>(null);
  const [rescheduleModal, setRescheduleModal] = useState<PsychologistSessionItem | null>(null);
  const [newDate, setNewDate] = useState('2026-08-25');
  const [newTime, setNewTime] = useState('14:00 — 14:50');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered sessions
  const filteredSessions = sessions.filter((s) => {
    if (activeTab === 'today') return s.status === 'today';
    if (activeTab === 'upcoming') return s.status === 'confirmed';
    if (activeTab === 'completed') return s.status === 'completed';
    if (activeTab === 'cancelled') return s.status === 'cancelled';
    return true;
  });

  const handleCancelSession = (sessionId: string) => {
    setSessions(
      sessions.map((s) => (s.id === sessionId ? { ...s, status: 'cancelled' as const, paymentStatus: 'refunded' as const } : s))
    );
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
    }
    showToast('Seans uğurla ləğv edildi və müştəriyə bildiriş göndərildi.');
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModal) return;
    setSessions(
      sessions.map((s) =>
        s.id === rescheduleModal.id
          ? {
              ...s,
              date: newDate,
              timeSlot: newTime,
              status: 'confirmed' as const
            }
          : s
      )
    );
    setRescheduleModal(null);
    setSelectedSession(null);
    showToast('Seans vaxtı uğurla dəyişdirildi və müştəriyə təsdiq e-poçtu göndərildi.');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Seanslar</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Fərdi onlayn və əyani konsultasiyalarınızı idarə edin, seanslara qoşulun və cədvəli izləyin.
          </p>
        </div>

        <Link
          to="/psixoloq/teqvim"
          className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc] flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <CalendarDays className="w-4 h-4 text-[#251D4B]" />
          <span>Təqvim Görünüşü</span>
        </Link>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'today', label: 'Bu gün', count: sessions.filter((s) => s.status === 'today').length },
          { id: 'upcoming', label: 'Qarşıdakı', count: sessions.filter((s) => s.status === 'confirmed').length },
          { id: 'completed', label: 'Tamamlanmış', count: sessions.filter((s) => s.status === 'completed').length },
          { id: 'cancelled', label: 'Ləğv edilmiş', count: sessions.filter((s) => s.status === 'cancelled').length }
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

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#251D4B]">Hazırda bu kateqoriyada seansınız yoxdur</h3>
              <p className="text-xs text-slate-500">Yeni rezervasiyalar daxil olduqda bu siyahıda əks olunacaq.</p>
            </div>
            <Link
              to="/psixoloq/teqvim"
              className="inline-block px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              Təqvimə bax
            </Link>
          </div>
        ) : (
          filteredSessions.map((ses) => (
            <div
              key={ses.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-[#CADFFD] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={ses.clientPhoto}
                  alt={ses.clientName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-sm text-[#251D4B]">{ses.clientName}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        ses.status === 'today'
                          ? 'bg-amber-100 text-amber-800'
                          : ses.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ses.status === 'completed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ses.status === 'today'
                        ? 'Bu gün'
                        : ses.status === 'confirmed'
                        ? 'Təsdiqlənib'
                        : ses.status === 'completed'
                        ? 'Tamamlanıb'
                        : 'Ləğv edilib'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#CADFFD]/40 text-[#251D4B] text-[10px] font-bold">
                      {ses.format === 'online' ? 'Onlayn Video' : 'Əyani Ofis'}
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-600 font-semibold">{ses.sessionType}</div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-bold text-[#251D4B]">
                      <Calendar className="w-3.5 h-3.5 text-[#251D4B]" />
                      {ses.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-[#251D4B]">
                      <Clock className="w-3.5 h-3.5 text-[#251D4B]" />
                      {ses.timeSlot} ({ses.durationMinutes} dəq)
                    </span>
                    <span>•</span>
                    <span className="font-bold text-slate-700">₼{ses.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                {ses.status !== 'cancelled' && ses.status !== 'completed' && (
                  <>
                    {ses.format === 'online' && ses.meetingLink ? (
                      <a
                        href={ses.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                      >
                        <Video className="w-4 h-4 text-[#CADFFD]" />
                        <span>Seansa qoşul</span>
                      </a>
                    ) : (
                      <div className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{ses.location || '28 May filialı'}</span>
                      </div>
                    )}
                  </>
                )}

                <button
                  onClick={() => setSelectedSession(ses)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] transition-colors"
                >
                  Ətraflı bax
                </button>

                {ses.status !== 'cancelled' && ses.status !== 'completed' && (
                  <>
                    <button
                      onClick={() => setRescheduleModal(ses)}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                    >
                      Vaxtı dəyiş
                    </button>

                    <button
                      onClick={() => handleCancelSession(ses.id)}
                      className="px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors"
                    >
                      Ləğv et
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#CADFFD]/40 text-[#251D4B] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[#251D4B]">Seans Təfərrüatları</h2>
                  <div className="text-xs text-slate-500">ID: #{selectedSession.id}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedSession.clientPhoto}
                  alt={selectedSession.clientName}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="font-black text-sm text-[#251D4B]">{selectedSession.clientName}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 pt-0.5">
                    <span>{selectedSession.clientEmail}</span>
                    <span>•</span>
                    <span>{selectedSession.clientPhone}</span>
                  </div>
                  <div className="text-[11px] text-[#251D4B] font-bold pt-1">
                    Əvvəlki seans sayı: {selectedSession.previousSessionsCount}
                  </div>
                </div>
              </div>

              <Link
                to="/psixoloq/mesajlar"
                onClick={() => setSelectedSession(null)}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-[#CADFFD]/20 text-[#251D4B]"
                title="Müştəriyə mesaj yaz"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>
            </div>

            {/* Session Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Xidmət Növü</div>
                <div className="font-bold text-[#251D4B]">{selectedSession.sessionType}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Tarix & Vaxt</div>
                <div className="font-bold text-[#251D4B]">{selectedSession.date} • {selectedSession.timeSlot}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Müddət</div>
                <div className="font-bold text-[#251D4B]">{selectedSession.durationMinutes} dəqiqə</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Ödəniş Statusu</div>
                <div className="font-bold text-emerald-600 capitalize">
                  {selectedSession.paymentStatus === 'paid' ? 'Ödənilib (₼' + selectedSession.price + ')' : 'Gözləyir'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Format</div>
                <div className="font-bold text-[#251D4B] capitalize">
                  {selectedSession.format === 'online' ? 'Onlayn Video' : 'Əyani Ofis'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Status</div>
                <div className="font-bold text-[#251D4B] capitalize">{selectedSession.status}</div>
              </div>
            </div>

            {/* Client Case Notes */}
            {selectedSession.clientNotes && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Müştəri Qeydləri & Terapiya Fokusu
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs text-slate-700 leading-relaxed">
                  {selectedSession.clientNotes}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedSession.status !== 'cancelled' && selectedSession.status !== 'completed' && (
                  <>
                    <button
                      onClick={() => {
                        setRescheduleModal(selectedSession);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                    >
                      Vaxtı dəyiş
                    </button>
                    <button
                      onClick={() => handleCancelSession(selectedSession.id)}
                      className="px-4 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-bold"
                    >
                      Görüşü ləğv et
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {selectedSession.format === 'online' && selectedSession.meetingLink && selectedSession.status !== 'cancelled' && (
                  <a
                    href={selectedSession.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <Video className="w-4 h-4 text-[#CADFFD]" />
                    <span>Seansa qoşul</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                >
                  Bağla
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleRescheduleSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#251D4B]">Seans Vaxtını Dəyişdir</h3>
              <button
                type="button"
                onClick={() => setRescheduleModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>{rescheduleModal.clientName}</strong> ilə olan görüşün yeni vaxtını təyin edin. Müştəriyə avtomatik bildiriş göndəriləcək.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Yeni Tarix</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Yeni Saat İntervalı</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                >
                  <option value="10:00 — 10:50">10:00 — 10:50</option>
                  <option value="12:00 — 12:50">12:00 — 12:50</option>
                  <option value="14:00 — 14:50">14:00 — 14:50</option>
                  <option value="16:00 — 16:50">16:00 — 16:50</option>
                  <option value="18:00 — 18:50">18:00 — 18:50</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                İmtina
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Təsdiq et
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
