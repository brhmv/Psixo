import React, { useState } from 'react';
import { BookedAppointment } from '../types';
import { X, Calendar, Clock, Video, MapPin, Trash2, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: BookedAppointment[];
  onCancelAppointment: (id: string) => void;
  onFindTherapist: () => void;
}

export const AppointmentsDrawer: React.FC<AppointmentsDrawerProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onFindTherapist
}) => {
  if (!isOpen) return null;

  const [activeMeetingRoom, setActiveMeetingRoom] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-[#251D4B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#CADFFD]" />
              <div>
                <h3 className="font-bold text-base text-white">Şəxsi Randevularım</h3>
                <p className="text-xs text-slate-300">Təyin olunmuş psixoloji seanslar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            
            {/* Live Virtual Video Room Mockup if active */}
            {activeMeetingRoom && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs text-[#CADFFD]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <strong>Canlı Terapiya Otağı Aktivdir</strong>
                  </span>
                  <button onClick={() => setActiveMeetingRoom(null)} className="hover:text-white">
                    Çıxış ✕
                  </button>
                </div>
                <div className="aspect-video bg-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-center border border-white/10">
                  <Video className="w-10 h-10 text-[#CADFFD] animate-bounce mb-2" />
                  <p className="text-xs font-bold text-white">Məxfi Video Seansa Qoşuldunuz</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Kamera və mikrofona icazə verildi. Mütəxəssis seansdadır.
                  </p>
                </div>
              </div>
            )}

            {appointments.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#CADFFD] text-[#251D4B] flex items-center justify-center mx-auto">
                  <Calendar className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-[#251D4B]">Aktiv Randevunuz Yoxdur</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Psixoloqlar kataloqumuza nəzər salaraq sizə uyğun vaxta konsultasiya təyin edə bilərsiniz.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onFindTherapist();
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435]"
                >
                  Psixoloq Seçin
                </button>
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.psychologistPhoto}
                        alt={apt.psychologistName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#251D4B]">{apt.psychologistName}</div>
                        <div className="text-xs text-slate-500">{apt.psychologistTitle}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      Təsdiqləndi
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>Tarix: <strong>{apt.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>Saat: <strong>{apt.timeSlot}</strong> (50 dəqiqə)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {apt.format === 'online' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          <span>Onlayn Zoom / Qorunan Otaq</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{apt.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions for this appointment */}
                  <div className="flex items-center justify-between pt-1">
                    {apt.format === 'online' ? (
                      <button
                        onClick={() => setActiveMeetingRoom(apt.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#CADFFD] text-[#251D4B] hover:bg-[#b5d3fc] flex items-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Seansa Daxil Ol</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">Kabinetdə qəbul</span>
                    )}

                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs font-medium"
                      title="Randevunu ləğv et"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Ləğv et</span>
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Emergency Crisis Hotline Reminder */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Təcili Psixoloji Yardım</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-normal">
                Kəskin psixoloji krizis və ya həyati təhlükə anında dərhal <strong>112</strong> və ya Təcili Dəstək Xətti ilə əlaqə saxlayın.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs text-slate-500">Məxfilik qorunur</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435]"
            >
              Bağla
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
