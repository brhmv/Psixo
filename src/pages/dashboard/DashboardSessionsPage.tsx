import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Plus,
  Bell,
  RefreshCw,
  X,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { USER_MOCK_APPOINTMENTS } from '../../data/mockData';
import { BookedAppointment } from '../../types';

export const DashboardSessionsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<BookedAppointment[]>(USER_MOCK_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [rescheduleApt, setRescheduleApt] = useState<BookedAppointment | null>(null);
  const [cancelApt, setCancelApt] = useState<BookedAppointment | null>(null);
  const [newSelectedDate, setNewSelectedDate] = useState('26 Avqust 2026');
  const [newSelectedTime, setNewSelectedTime] = useState('16:00');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'upcoming') return apt.status === 'təsdiqləndi' || apt.status === 'gözləyir';
    if (activeTab === 'completed') return apt.status === 'tamamlandı';
    if (activeTab === 'cancelled') return apt.status === 'ləğv_edildi';
    return true;
  });

  const handleRescheduleSubmit = () => {
    if (!rescheduleApt) return;
    setAppointments(
      appointments.map((a) =>
        a.id === rescheduleApt.id
          ? { ...a, date: newSelectedDate, timeSlot: newSelectedTime }
          : a
      )
    );
    setRescheduleApt(null);
    showToast('Seansın vaxtı uğurla dəyişdirildi!');
  };

  const handleCancelSubmit = () => {
    if (!cancelApt) return;
    setAppointments(
      appointments.map((a) =>
        a.id === cancelApt.id ? { ...a, status: 'ləğv_edildi' } : a
      )
    );
    setCancelApt(null);
    showToast('Seans uğurla ləğv edildi və vəsait kartınıza geri qaytarılacaq.');
  };

  const hasUpcomingNow = appointments.some((a) => a.status === 'təsdiqləndi');

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#251D4B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 16. SESSION REMINDER BANNER */}
      {hasUpcomingNow && (
        <div className="rounded-3xl bg-gradient-to-r from-[#251D4B] to-[#362B6B] text-white p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#CADFFD]/20 text-[#CADFFD] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-[#CADFFD] animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#CADFFD]">
                  Seansınız yaxınlaşır
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="text-sm sm:text-base font-black mt-0.5">
                Seansınız 30 dəqiqə sonra başlayacaq.
              </h2>
            </div>
          </div>

          <a
            href="https://meet.dayaq.az/room/cbt-leyla-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-2xl bg-[#CADFFD] hover:bg-white text-[#251D4B] text-xs font-black transition-all shadow-xs shrink-0 flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-[#251D4B]" />
            <span>Seansa qoşul</span>
          </a>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Seanslarım</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Psixoloqlarınızla planlaşdırılmış və keçirilmiş bütün fərdi görüşlərin siyahısı.
          </p>
        </div>

        <Link
          to="/dashboard/psixoloqlar"
          className="px-5 py-3 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#CADFFD]" />
          <span>Yeni Seans Rezerv Et</span>
        </Link>
      </div>

      {/* Tabs: Qarşıdakı, Tamamlanmış, Ləğv edilmiş */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Qarşıdakı ({appointments.filter((a) => a.status === 'təsdiqləndi' || a.status === 'gözləyir').length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tamamlanmış ({appointments.filter((a) => a.status === 'tamamlandı').length})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'cancelled'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Ləğv edilmiş ({appointments.filter((a) => a.status === 'ləğv_edildi').length})
        </button>
      </div>

      {/* Appointment Cards List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-5">
          {filteredAppointments.map((apt) => {
            const isUpcoming = apt.status === 'təsdiqləndi';

            return (
              <div
                key={apt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Psychologist Info & Meta */}
                <div className="flex items-start gap-4">
                  <img
                    src={apt.psychologistPhoto}
                    alt={apt.psychologistName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-base text-[#251D4B]">{apt.psychologistName}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          apt.status === 'təsdiqləndi'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : apt.status === 'tamamlandı'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {apt.status === 'təsdiqləndi'
                          ? 'Təsdiqlənib'
                          : apt.status === 'tamamlandı'
                          ? 'Tamamlandı'
                          : 'Ləğv edildi'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium">{apt.psychologistTitle}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1.5 font-bold text-[#251D4B]">
                        <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {apt.timeSlot} (50 dəq)
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                        {apt.format === 'online' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-blue-600" />
                            <span>Onlayn Video</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            <span>Əyani</span>
                          </>
                        )}
                      </span>
                      <span className="font-black text-[#251D4B]">₼{apt.price}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {isUpcoming && (
                    <a
                      href={apt.meetingLink || 'https://meet.dayaq.az'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5 text-[#CADFFD]" />
                      <span>Seansa qoşul</span>
                    </a>
                  )}

                  <Link
                    to={`/dashboard/seanslar/${apt.id}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251D4B] text-xs font-bold transition-colors"
                  >
                    Ətraflı bax
                  </Link>

                  {isUpcoming && (
                    <>
                      <button
                        onClick={() => setRescheduleApt(apt)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Vaxtı dəyiş
                      </button>

                      <button
                        onClick={() => setCancelApt(apt)}
                        className="px-3.5 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors"
                      >
                        Ləğv et
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-base font-black text-[#251D4B]">
            {activeTab === 'upcoming'
              ? 'Qarşıdakı seansınız yoxdur.'
              : activeTab === 'completed'
              ? 'Tamamlanmış seansınız yoxdur.'
              : 'Ləğv edilmiş seans yoxdur.'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Yeni psixoloji dəstək seansı rezerv etmək üçün mütəxəssislər kataloquna baxa bilərsiniz.
          </p>
          <Link
            to="/dashboard/psixoloqlar"
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold inline-block"
          >
            Psixoloq tap
          </Link>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-[#251D4B]">Seans vaxtını dəyiş</h3>
              <button
                onClick={() => setRescheduleApt(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>Mütəxəssis: <strong>{rescheduleApt.psychologistName}</strong></p>
              <p>Cari vaxt: <span className="text-slate-500">{rescheduleApt.date}, {rescheduleApt.timeSlot}</span></p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Yeni Tarix Seçin</label>
                <select
                  value={newSelectedDate}
                  onChange={(e) => setNewSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                >
                  <option value="26 Avqust 2026">26 Avqust 2026 (Çərşənbə)</option>
                  <option value="27 Avqust 2026">27 Avqust 2026 (Cümə axşamı)</option>
                  <option value="29 Avqust 2026">29 Avqust 2026 (Şənbə)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Yeni Saat Seçin</label>
                <select
                  value={newSelectedTime}
                  onChange={(e) => setNewSelectedTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                >
                  <option value="11:00">11:00 - 11:50</option>
                  <option value="14:00">14:00 - 14:50</option>
                  <option value="16:00">16:00 - 16:50</option>
                  <option value="18:30">18:30 - 19:20</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
              Qeyd: Seans vaxtını görüşdən ən azı 12 saat əvvəl ödənişsiz olaraq dəyişə bilərsiniz.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setRescheduleApt(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={handleRescheduleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-colors"
              >
                Təsdiq et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-rose-600">Seansı ləğv etmək istəyirsiniz?</h3>
              <button
                onClick={() => setCancelApt(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>{cancelApt.psychologistName}</strong> ilə <strong>{cancelApt.date}, saat {cancelApt.timeSlot}</strong> tarixindəki seansınızı ləğv etmək üzrəsiniz.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-[#251D4B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ləğvetmə və Geri Ödəniş Qaydası</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Seans 12 saatdan çox qalmış ləğv edildikdə ödənilmiş <strong>₼{cancelApt.price}</strong> məbləğ 1-3 iş günü ərzində tam olaraq bank kartınıza geri qaytarılır.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancelApt(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Geri qayıt
              </button>
              <button
                onClick={handleCancelSubmit}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                Seansı ləğv et
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
