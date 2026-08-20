import React, { useState } from 'react';
import { Psychologist, BookedAppointment } from '../types';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2, ShieldCheck, User, Phone, Mail, FileText, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  psychologist: Psychologist | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (appointment: BookedAppointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  psychologist,
  isOpen,
  onClose,
  onConfirmBooking
}) => {
  if (!isOpen || !psychologist) return null;

  // Next 7 days calculation
  const dates = [
    { day: 'Bu gün', dateStr: '19 Avqust', fullDate: '2026-08-19' },
    { day: 'Sabah', dateStr: '20 Avqust', fullDate: '2026-08-20' },
    { day: 'Cümə', dateStr: '21 Avqust', fullDate: '2026-08-21' },
    { day: 'Şənbə', dateStr: '22 Avqust', fullDate: '2026-08-22' },
    { day: 'Bazar', dateStr: '23 Avqust', fullDate: '2026-08-23' },
    { day: 'Bazar ertəsi', dateStr: '24 Avqust', fullDate: '2026-08-24' }
  ];

  const [selectedFormat, setSelectedFormat] = useState<'online' | 'in_person'>(
    psychologist.consultationTypes === 'in_person' ? 'in_person' : 'online'
  );
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].dateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(psychologist.timeSlots[0] || '14:00');
  
  // Patient details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTimeSlot) {
        setErrorMsg('Zəhmət olmasa tarix və saat seçin');
        return;
      }
      setErrorMsg('');
      setStep(2);
    } else if (step === 2) {
      if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
        setErrorMsg('Zəhmət olmasa ad, telefon və e-poçt məlumatlarınızı doldurun');
        return;
      }
      setErrorMsg('');

      const newAppointment: BookedAppointment = {
        id: `apt-${Date.now()}`,
        psychologistId: psychologist.id,
        psychologistName: psychologist.name,
        psychologistTitle: psychologist.title,
        psychologistPhoto: psychologist.photo,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        format: selectedFormat,
        location: selectedFormat === 'online' ? 'Onlayn Qorunan Zoom Otağı' : psychologist.location,
        price: psychologist.pricePerSession,
        clientName,
        clientEmail,
        clientPhone,
        notes,
        status: 'təsdiqləndi',
        meetingLink: selectedFormat === 'online' ? 'https://meet.dayaq.az/room/' + Math.random().toString(36).substring(7) : undefined,
        createdAt: new Date().toISOString()
      };

      onConfirmBooking(newAppointment);
      setStep(3);
    }
  };

  const handleFinish = () => {
    setStep(1);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#251D4B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border border-white/20"
            />
            <div>
              <div className="text-xs text-[#CADFFD] font-semibold uppercase tracking-wider">
                Randevu Qeydiyyatı
              </div>
              <h3 className="text-lg font-bold text-white">{psychologist.name}</h3>
              <p className="text-xs text-slate-300">{psychologist.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Step indicator */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${step >= 1 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'}`}>
                1
              </span>
              <span className={`text-xs font-bold ${step >= 1 ? 'text-[#251D4B]' : 'text-slate-400'}`}>
                Tarix və Format
              </span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${step >= 2 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'}`}>
                2
              </span>
              <span className={`text-xs font-bold ${step >= 2 ? 'text-[#251D4B]' : 'text-slate-400'}`}>
                Məlumatlarınız
              </span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${step === 3 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'}`}>
                3
              </span>
              <span className={`text-xs font-bold ${step === 3 ? 'text-[#251D4B]' : 'text-slate-400'}`}>
                Təsdiq
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Format, Date, Slot */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Format selection */}
              <div>
                <label className="block text-xs font-bold text-[#251D4B] uppercase tracking-wider mb-2">
                  1. Görüş Formatını Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={psychologist.consultationTypes === 'in_person'}
                    onClick={() => setSelectedFormat('online')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedFormat === 'online'
                        ? 'border-[#251D4B] bg-[#CADFFD]/30 ring-2 ring-[#251D4B]'
                        : 'border-slate-200 hover:border-slate-300'
                    } ${psychologist.consultationTypes === 'in_person' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <div className="p-2 rounded-lg bg-[#251D4B] text-white mt-0.5">
                      <Video className="w-4 h-4 text-[#CADFFD]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#251D4B]">Onlayn Video Seans</div>
                      <div className="text-[11px] text-slate-500">Məxfi Zoom / Dayaq Otağı</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={psychologist.consultationTypes === 'online'}
                    onClick={() => setSelectedFormat('in_person')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedFormat === 'in_person'
                        ? 'border-[#251D4B] bg-[#CADFFD]/30 ring-2 ring-[#251D4B]'
                        : 'border-slate-200 hover:border-slate-300'
                    } ${psychologist.consultationTypes === 'online' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <div className="p-2 rounded-lg bg-[#251D4B] text-white mt-0.5">
                      <MapPin className="w-4 h-4 text-[#CADFFD]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#251D4B]">Əyani Konsultasiya</div>
                      <div className="text-[11px] text-slate-500">Bakı mərkəz kabineti</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-xs font-bold text-[#251D4B] uppercase tracking-wider mb-2">
                  2. Tarixi Seçin
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate === d.dateStr
                          ? 'border-[#251D4B] bg-[#251D4B] text-white shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-medium opacity-80">{d.day}</div>
                      <div className="text-xs font-bold mt-0.5">{d.dateStr}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-[#251D4B] uppercase tracking-wider mb-2">
                  3. Uyğun Saat Seçin (50 dəqiqə)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {psychologist.timeSlots.map((time, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`py-2 px-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        selectedTimeSlot === time
                          ? 'bg-[#CADFFD] border-[#251D4B] text-[#251D4B] ring-1 ring-[#251D4B]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Clock className="w-3 h-3 inline mr-1 text-[#251D4B]" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price summary badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  Konsultasiya haqqı (50 dəqiqəlik fərdi seans):
                </div>
                <div className="text-base font-extrabold text-[#251D4B]">
                  {psychologist.pricePerSession} AZN
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Patient Form */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#CADFFD]/50 border border-[#CADFFD] flex items-center justify-between text-xs text-[#251D4B]">
                <div className="font-semibold">
                  Seçilmiş vaxt: <strong>{selectedDate}, saat {selectedTimeSlot}</strong> ({selectedFormat === 'online' ? 'Onlayn Video' : 'Əyani'})
                </div>
                <button onClick={() => setStep(1)} className="font-bold underline">
                  Dəyiş
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    Adınız və Soyadınız *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Məs: Ayan Əhmədova"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    Əlaqə Nömrəsi (WhatsApp) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+994 (50) 000-00-00"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Elektron Poçt (E-mail) *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Görüş linki və təsdiq mesajı bu ünvana göndəriləcək.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Qısa Müraciət Səbəbi / Qeydlər (İstəyə bağlı)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Məs: Son həftələrdə gərginlik və yuxu pozuntusu keçirirəm..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#251D4B] shrink-0 mt-0.5" />
                <span>
                  Bütün məlumatlarınız beynəlxalq tibbi və psixoloji etik kodeksə uyğun olaraq <strong>100% məxfi</strong> saxlanılır.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmation Screen */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-extrabold text-[#251D4B]">
                Randevunuz Uğurla Qeydə Alındı!
              </h4>

              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Hörmətli <strong>{clientName}</strong>, <strong>{psychologist.name}</strong> ilə görüşünüz <strong>{selectedDate}, saat {selectedTimeSlot}</strong> üçün təsdiqləndi.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mütəxəssis:</span>
                  <span className="font-bold text-[#251D4B]">{psychologist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-bold text-[#251D4B]">
                    {selectedFormat === 'online' ? 'Onlayn Video Seans (Zoom)' : 'Əyani Seans (Bakı)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Məkan / Link:</span>
                  <span className="font-bold text-[#251D4B]">
                    {selectedFormat === 'online' ? 'E-poçtunuza göndərildi' : psychologist.location}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Ödəniş məbləği:</span>
                  <span className="font-extrabold text-sm text-[#251D4B]">{psychologist.pricePerSession} AZN</span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Görüş haqqında təlimatlar <strong>{clientEmail}</strong> və <strong>{clientPhone}</strong> ünvanına göndərildi.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Davam et</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Randevunu Təsdiqlə</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CADFFD]" />
              </button>
            </>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors"
            >
              Tamamla və Randevularıma Keç
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
