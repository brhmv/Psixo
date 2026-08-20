import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  Ban,
  CheckCircle2,
  X,
  Lock,
  User,
  Settings,
  Coffee,
  Sun,
  Video
} from 'lucide-react';
import { PSYCHOLOGIST_SESSIONS_MOCK } from '../../data/psychologistMockData';

interface WorkingDay {
  dayName: string;
  isOpen: boolean;
  startTime: string;
  endTime: string;
}

export const PsychologistCalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Working Hours State
  const [workingSchedule, setWorkingSchedule] = useState<WorkingDay[]>([
    { dayName: 'Bazar ertəsi', isOpen: true, startTime: '09:00', endTime: '18:00' },
    { dayName: 'Çərşənbə axşamı', isOpen: true, startTime: '09:00', endTime: '18:00' },
    { dayName: 'Çərşənbə', isOpen: true, startTime: '09:00', endTime: '18:00' },
    { dayName: 'Cümə axşamı', isOpen: true, startTime: '09:00', endTime: '18:00' },
    { dayName: 'Cümə', isOpen: true, startTime: '09:00', endTime: '18:00' },
    { dayName: 'Şənbə', isOpen: false, startTime: '10:00', endTime: '16:00' },
    { dayName: 'Bazar', isOpen: false, startTime: '10:00', endTime: '16:00' }
  ]);

  // Blocked time items
  const [blockedSlots, setBlockedSlots] = useState([
    { id: 'b-1', title: 'Fərdi Fasilə / Nahar', date: '20 Avqust 2026', time: '13:00 — 14:00', reason: 'Fasilə' },
    { id: 'b-2', title: 'Elmi Tədqiqat & CBT Seminarı', date: '22 Avqust 2026', time: '10:00 — 12:00', reason: 'Seminar' }
  ]);

  // Block Form State
  const [blockForm, setBlockForm] = useState({
    title: '',
    date: '2026-08-23',
    time: '14:00 — 16:00',
    reason: 'Şəxsi vaxt'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockForm.title) return;
    setBlockedSlots([
      ...blockedSlots,
      {
        id: `b-${Date.now()}`,
        title: blockForm.title,
        date: blockForm.date,
        time: blockForm.time,
        reason: blockForm.reason
      }
    ]);
    setShowBlockModal(false);
    setBlockForm({ title: '', date: '2026-08-23', time: '14:00 — 16:00', reason: 'Şəxsi vaxt' });
    showToast('Qeyd edilən vaxt aralığı uğurla bloklandı və müştəri bronlaşdırmasına bağlandı.');
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const weekDays = [
    { name: 'B.e', date: '18 Avq', fullDate: '18 Avqust 2026' },
    { name: 'Ç.a', date: '19 Avq', fullDate: '19 Avqust 2026' },
    { name: 'Çər', date: '20 Avq (Bu gün)', fullDate: 'Bu gün, 20 Avqust 2026', isToday: true },
    { name: 'C.a', date: '21 Avq', fullDate: '21 Avqust 2026' },
    { name: 'Cüm', date: '22 Avq', fullDate: '22 Avqust 2026' },
    { name: 'Şən', date: '23 Avq', fullDate: '23 Avqust 2026', isWeekend: true },
    { name: 'Baz', date: '24 Avq', fullDate: '24 Avqust 2026', isWeekend: true }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Təqvim və İş Cədvəli</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Müştəriləriniz üçün aktiv saatları təyin edin, seansları və bloklanmış fasilələri idarə edin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowHoursModal(true)}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] flex items-center gap-1.5 transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>İş Saatları</span>
          </button>

          <button
            onClick={() => setShowBlockModal(true)}
            className="px-4 py-2 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>Vaxtı blokla</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Calendar Controls & Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        
        {/* Navigation Month Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="font-black text-sm text-[#251D4B]">Avqust 2026</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#CADFFD]/50 text-[#251D4B] text-[10px] font-bold">
            Bu həftə
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'day' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            Gün
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'week' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            Həftə
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'month' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
            }`}
          >
            Ay
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
            <span className="text-slate-600">Açıq / Rezervə uyğun</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#251D4B]" />
            <span className="text-slate-600">Rezerv olunub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-200 border border-amber-300" />
            <span className="text-slate-600">Bloklanıb</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
            <span className="text-slate-400">İşləmir</span>
          </div>
        </div>

      </div>

      {/* Week Grid View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs overflow-x-auto">
          <div className="min-w-[760px]">
            
            {/* Day Headers */}
            <div className="grid grid-cols-8 gap-2 pb-4 border-b border-slate-100 text-center">
              <div className="text-xs font-bold text-slate-400">Saat</div>
              {weekDays.map((wd, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-2xl ${
                    wd.isToday ? 'bg-[#251D4B] text-white shadow-xs' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">{wd.name}</div>
                  <div className="text-xs font-black">{wd.date}</div>
                </div>
              ))}
            </div>

            {/* Time Slot Rows */}
            <div className="divide-y divide-slate-100 pt-2 space-y-1">
              {timeSlots.map((hour) => (
                <div key={hour} className="grid grid-cols-8 gap-2 py-2 items-center">
                  
                  <div className="text-xs font-bold text-slate-400 text-center">{hour}</div>

                  {weekDays.map((wd, idx) => {
                    if (wd.isWeekend) {
                      return (
                        <div
                          key={idx}
                          className="h-14 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400"
                        >
                          İşləmir
                        </div>
                      );
                    }

                    // Special Mock Events for visual clarity
                    if (wd.isToday && hour === '10:00') {
                      return (
                        <div
                          key={idx}
                          className="h-14 p-2 rounded-xl bg-[#251D4B] text-white flex flex-col justify-between text-left shadow-xs hover:bg-[#1a1435] transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-[11px] truncate">Nigar Əliyeva</div>
                          <div className="text-[9px] text-[#CADFFD] flex items-center gap-1">
                            <Video className="w-2.5 h-2.5" />
                            <span>Onlayn CBT</span>
                          </div>
                        </div>
                      );
                    }

                    if (wd.isToday && hour === '12:00') {
                      return (
                        <div
                          key={idx}
                          className="h-14 p-2 rounded-xl bg-[#251D4B] text-white flex flex-col justify-between text-left shadow-xs hover:bg-[#1a1435] transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-[11px] truncate">Elvin Qasımov</div>
                          <div className="text-[9px] text-[#CADFFD]">Əyani Ofis</div>
                        </div>
                      );
                    }

                    if (wd.isToday && hour === '13:00') {
                      return (
                        <div
                          key={idx}
                          className="h-14 p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex flex-col justify-between text-left cursor-pointer"
                        >
                          <div className="font-bold text-[10px] flex items-center gap-1">
                            <Coffee className="w-3 h-3" />
                            <span>Nahar Fasiləsi</span>
                          </div>
                          <div className="text-[9px] text-amber-700">Bloklanıb</div>
                        </div>
                      );
                    }

                    if (wd.isToday && hour === '15:00') {
                      return (
                        <div
                          key={idx}
                          className="h-14 p-2 rounded-xl bg-[#251D4B] text-white flex flex-col justify-between text-left shadow-xs hover:bg-[#1a1435] transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-[11px] truncate">Leyla H.</div>
                          <div className="text-[9px] text-[#CADFFD]">Onlayn CBT</div>
                        </div>
                      );
                    }

                    if (wd.isToday && hour === '17:00') {
                      return (
                        <div
                          key={idx}
                          className="h-14 p-2 rounded-xl bg-[#251D4B] text-white flex flex-col justify-between text-left shadow-xs hover:bg-[#1a1435] transition-colors cursor-pointer"
                        >
                          <div className="font-bold text-[11px] truncate">Kamran R.</div>
                          <div className="text-[9px] text-[#CADFFD]">Onlayn CBT</div>
                        </div>
                      );
                    }

                    // Open / Available slot
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setBlockForm({
                            title: 'Fərdi Fasilə',
                            date: '2026-08-20',
                            time: `${hour} — ${parseInt(hour) + 1}:00`,
                            reason: 'Şəxsi vaxt'
                          });
                          setShowBlockModal(true);
                        }}
                        className="h-14 rounded-xl border border-emerald-200/60 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-800 flex items-center justify-center text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Açıq
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Month View Placeholder */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-2">
            <span>B.e</span>
            <span>Ç.a</span>
            <span>Çər</span>
            <span>C.a</span>
            <span>Cüm</span>
            <span>Şən</span>
            <span>Baz</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, d) => {
              const dayNum = d + 1;
              const isToday = dayNum === 20;
              const hasEvents = [18, 20, 21, 22, 25, 27, 28].includes(dayNum);
              return (
                <div
                  key={d}
                  className={`min-h-24 p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? 'border-[#251D4B] bg-[#CADFFD]/15'
                      : 'border-slate-200 hover:border-[#CADFFD] bg-slate-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isToday ? 'text-[#251D4B] font-black' : 'text-slate-700'}`}>
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#251D4B]" />
                    )}
                  </div>
                  {hasEvents && (
                    <div className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#251D4B] text-white truncate">
                      {isToday ? '4 Seans' : '2 Seans'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="font-black text-sm text-[#251D4B] pb-2 border-b border-slate-100">
            20 Avqust 2026 — Bugünkü Cədvəl
          </div>
          <div className="space-y-3">
            {PSYCHOLOGIST_SESSIONS_MOCK.filter((s) => s.status === 'today').map((ses) => (
              <div
                key={ses.id}
                className="p-4 rounded-2xl bg-[#251D4B] text-white flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#CADFFD]" />
                  <div>
                    <div className="font-bold text-xs text-white">{ses.timeSlot} — {ses.clientName}</div>
                    <div className="text-[11px] text-[#CADFFD]">{ses.sessionType}</div>
                  </div>
                </div>
                {ses.meetingLink && (
                  <a
                    href={ses.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold"
                  >
                    Seansa qoşul
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blocked Times Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-[#251D4B]">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Bloklanmış Vaxt İntervalları</span>
          </div>
          <button
            onClick={() => setShowBlockModal(true)}
            className="text-xs font-bold text-[#251D4B] hover:underline"
          >
            + Yeni blok əlavə et
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {blockedSlots.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-950">{b.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                  {b.reason}
                </span>
              </div>
              <div className="text-xs text-amber-800">{b.date} • {b.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Working Hours Settings */}
      {showHoursModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-sm text-[#251D4B]">Həftəlik İş Saatları</h3>
                <p className="text-xs text-slate-500">Müştərilərin sizinlə seans bron edə biləcəyi saat aralıqları</p>
              </div>
              <button onClick={() => setShowHoursModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {workingSchedule.map((day, idx) => (
                <div
                  key={day.dayName}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 w-32">
                    <input
                      type="checkbox"
                      checked={day.isOpen}
                      onChange={(e) => {
                        const updated = [...workingSchedule];
                        updated[idx].isOpen = e.target.checked;
                        setWorkingSchedule(updated);
                      }}
                      className="rounded text-[#251D4B] focus:ring-[#251D4B]"
                    />
                    <span className={`font-bold ${day.isOpen ? 'text-[#251D4B]' : 'text-slate-400'}`}>
                      {day.dayName}
                    </span>
                  </div>

                  {day.isOpen ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) => {
                          const updated = [...workingSchedule];
                          updated[idx].startTime = e.target.value;
                          setWorkingSchedule(updated);
                        }}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                      <span>—</span>
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) => {
                          const updated = [...workingSchedule];
                          updated[idx].endTime = e.target.value;
                          setWorkingSchedule(updated);
                        }}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  ) : (
                    <span className="text-slate-400 font-medium">İşləmir</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowHoursModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Block Time */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleBlockSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#251D4B] font-bold text-sm">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Təqvimdə Vaxtı Blokla</span>
              </div>
              <button type="button" onClick={() => setShowBlockModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bloklama Səbəbi / Başlıq</label>
                <input
                  type="text"
                  value={blockForm.title}
                  onChange={(e) => setBlockForm({ ...blockForm, title: e.target.value })}
                  placeholder="məs: Şəxsi işlər, Məzuniyyət və ya Nahar fasiləsi"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tarix</label>
                <input
                  type="date"
                  value={blockForm.date}
                  onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Saat İntervalı</label>
                <input
                  type="text"
                  value={blockForm.time}
                  onChange={(e) => setBlockForm({ ...blockForm, time: e.target.value })}
                  placeholder="14:00 — 16:00"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Kateqoriya</label>
                <select
                  value={blockForm.reason}
                  onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                >
                  <option value="Şəxsi vaxt">Şəxsi vaxt</option>
                  <option value="Məzuniyyət">Məzuniyyət</option>
                  <option value="Nahar fasiləsi">Nahar fasiləsi</option>
                  <option value="Seminar / Təlim">Seminar / Təlim</option>
                  <option value="Digər">Digər</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBlockModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                İmtina
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Vaxtı blokla
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
