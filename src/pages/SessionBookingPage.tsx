import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PSYCHOLOGISTS_DATA } from '../data/mockData';
import { Psychologist, BookedAppointment } from '../types';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CreditCard
} from 'lucide-react';

export const SessionBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPsychologistId = searchParams.get('psychologistId') || PSYCHOLOGISTS_DATA[0].id;
  const initialServiceName = searchParams.get('service') || '';

  const [selectedPsyId, setSelectedPsyId] = useState(initialPsychologistId);
  const psychologist: Psychologist =
    PSYCHOLOGISTS_DATA.find((p) => p.id === selectedPsyId) || PSYCHOLOGISTS_DATA[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [format, setFormat] = useState<'online' | 'in_person'>(
    psychologist.consultationTypes === 'in_person' ? 'in_person' : 'online'
  );

  const dates = [
    { label: 'Bu gün', value: 'Bu gün (19 Avq)' },
    { label: 'Sabah', value: 'Sabah (20 Avq)' },
    { label: 'Cümə', value: '21 Avqust' },
    { label: 'Şənbə', value: '22 Avqust' },
    { label: 'Bazar ertəsi', value: '24 Avqust' }
  ];

  const [selectedDate, setSelectedDate] = useState(dates[1].value);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(psychologist.timeSlots[0] || '14:00');

  // Client Details
  const [clientName, setClientName] = useState('Ayan Əhmədova');
  const [clientEmail, setClientEmail] = useState('ayan@example.com');
  const [clientPhone, setClientPhone] = useState('+994 50 234 56 78');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newAppointment: BookedAppointment = {
      id: `apt-${Date.now()}`,
      psychologistId: psychologist.id,
      psychologistName: psychologist.name,
      psychologistTitle: psychologist.title,
      psychologistPhoto: psychologist.photo,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      format,
      location: format === 'online' ? 'Onlayn Zoom / Dayaq Otağı' : psychologist.location,
      price: psychologist.pricePerSession,
      clientName,
      clientEmail,
      clientPhone,
      notes,
      status: 'təsdiqləndi',
      meetingLink: format === 'online' ? `https://meet.dayaq.az/room/${psychologist.id}-${Date.now().toString().slice(-4)}` : undefined,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('dayaq_appointments') || '[]');
      localStorage.setItem('dayaq_appointments', JSON.stringify([newAppointment, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/seanslar');
    }, 600);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Psixoloqlar', path: '/psixoloqlar' },
              { label: 'Seans Rezervasiyası' }
            ]}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 1 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              1
            </div>
            <span className="text-xs font-bold text-[#251D4B] hidden sm:inline">Format & Vaxt</span>
          </div>

          <div className="h-0.5 w-12 sm:w-24 bg-slate-200" />

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 2 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              2
            </div>
            <span className="text-xs font-bold text-[#251D4B] hidden sm:inline">Şəxsi Məlumatlar</span>
          </div>

          <div className="h-0.5 w-12 sm:w-24 bg-slate-200" />

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 3 ? 'bg-[#251D4B] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              3
            </div>
            <span className="text-xs font-bold text-[#251D4B] hidden sm:inline">Təsdiq & Ödəniş</span>
          </div>
        </div>

        {/* Selected Psychologist Banner */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#251D4B]">{psychologist.name}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xs text-slate-500">{psychologist.title}</div>
              <div className="text-xs text-[#251D4B] font-bold mt-0.5">
                Seans qiyməti: {psychologist.pricePerSession} AZN (50 dəqiqə)
              </div>
            </div>
          </div>

          <div className="text-right">
            <select
              value={selectedPsyId}
              onChange={(e) => setSelectedPsyId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-white"
            >
              {PSYCHOLOGISTS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 1: Format and Time Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in">
            {/* Consultation Format */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#251D4B] uppercase tracking-wider">
                1. Görüş Formatını Seçin:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormat('online')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    format === 'online'
                      ? 'border-[#251D4B] bg-[#CADFFD]/30 ring-2 ring-[#251D4B]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Video className="w-5 h-5 text-[#251D4B]" />
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Tövsiyə olunur
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#251D4B]">Onlayn Video Seans</div>
                  <p className="text-xs text-slate-500 mt-1">
                    Məxfi Zoom / Dayaq video otağı vasitəsilə evinizin rahatlığında.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('in_person')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    format === 'in_person'
                      ? 'border-[#251D4B] bg-[#CADFFD]/30 ring-2 ring-[#251D4B]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="w-5 h-5 text-[#251D4B]" />
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      Kabinetdə
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#251D4B]">Əyani (Ofisdə) Görüş</div>
                  <p className="text-xs text-slate-500 mt-1">
                    {psychologist.location}
                  </p>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#251D4B] uppercase tracking-wider">
                2. Tarixi Seçin:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(d.value)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedDate === d.value
                        ? 'border-[#251D4B] bg-[#251D4B] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-[#CADFFD]/20'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className={`text-[11px] mt-0.5 ${selectedDate === d.value ? 'text-slate-300' : 'text-slate-500'}`}>
                      {d.value.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#251D4B] uppercase tracking-wider">
                3. Saatı Seçin:
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {psychologist.timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      selectedTimeSlot === slot
                        ? 'border-[#251D4B] bg-[#251D4B] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-[#CADFFD]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center gap-2"
              >
                <span>Növbəti: Şəxsi Məlumatlar</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Client Info */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-[#251D4B]">
              Əlaqə və Müraciət Məlumatları
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Adınız və Soyadınız *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    E-poçt Ünvanı *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    Telefon Nömrəsi *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Müraciət səbəbi və ya terapevt üçün qısa qeyd (Könüllü)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Məs: Son vaxtlar yüksək iş gərginliyi və yuxusuzluq yaşayıram..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] flex items-center gap-2"
              >
                <span>Növbəti: Təsdiq & Ödəniş</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation and Payment */}
        {step === 3 && (
          <form onSubmit={handleCompleteBooking} className="space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-[#251D4B]">
              Rezervasiya Xülasəsi və Təsdiq
            </h3>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Mütəxəssis:</span>
                <strong className="text-[#251D4B]">{psychologist.name} ({psychologist.title})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <strong className="text-[#251D4B]">
                  {format === 'online' ? 'Onlayn Video Seans (Zoom)' : `Kabinetdə: ${psychologist.location}`}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tarix & Saat:</span>
                <strong className="text-[#251D4B]">{selectedDate}, saat {selectedTimeSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pasiyent:</span>
                <strong className="text-[#251D4B]">{clientName} ({clientPhone})</strong>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
                <span className="font-bold text-[#251D4B]">Yekun Ödəniş Məbləği:</span>
                <span className="font-extrabold text-[#251D4B] text-base">{psychologist.pricePerSession} AZN</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#251D4B]">
                Ödəniş Metodu:
              </label>
              <div className="p-4 rounded-xl border border-[#251D4B] bg-[#CADFFD]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-bold text-[#251D4B]">
                  <CreditCard className="w-4 h-4" />
                  <span>Bank Kartı ilə Onlayn Təhlükəsiz Ödəniş (3D Secure)</span>
                </div>
                <span className="text-xs font-bold text-emerald-700">Aktivdir</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Görüşdən 12 saat əvvələdək seansı Dashboard bölməsindən tam ödənişsiz dəyişə və ya ləğv edə bilərsiniz.</span>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Rezervasiya olunur...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#CADFFD]" />
                    <span>Seansı Təsdiqlə və Rezerv Et</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
