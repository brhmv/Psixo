import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WEBINARS_DATA } from '../data/mockData';
import { Webinar } from '../types';
import {
  Video,
  Calendar,
  Clock,
  Radio,
  Users,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Tag,
  Check,
  Copy,
  Bell,
  Ticket,
  ExternalLink,
  Gift
} from 'lucide-react';

export const WebinarRegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Find initial webinar from URL param, query param, or fallback to first
  const initialWebinarId = id || searchParams.get('webinarId') || WEBINARS_DATA[0].id;
  const [selectedWebinarId, setSelectedWebinarId] = useState(initialWebinarId);

  const webinar: Webinar =
    WEBINARS_DATA.find((w) => w.id === selectedWebinarId) || WEBINARS_DATA[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [liveMeetingLink, setLiveMeetingLink] = useState('');

  // Step 1: Ticket Tier & Notifications
  const [ticketType, setTicketType] = useState<'standard' | 'vip'>('standard');
  const [smsReminder, setSmsReminder] = useState(true);
  const [emailReminder, setEmailReminder] = useState(true);

  // Step 2: Participant Info
  const [fullName, setFullName] = useState('Ayan Əhmədova');
  const [email, setEmail] = useState('ayan.ahmadova@example.com');
  const [phone, setPhone] = useState('+994 50 234 56 78');
  const [questionForSpeaker, setQuestionForSpeaker] = useState('');

  // Step 3: Payment & Promo
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Price calculations
  const basePrice = webinar.isFree ? 0 : webinar.price;
  const vipAddon = ticketType === 'vip' ? 15 : 0;
  const subtotal = basePrice + vipAddon;
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const finalPrice = Math.max(0, subtotal - discountAmount);
  const isFreeTotal = finalPrice === 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const cleaned = promoCode.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === 'VEBINAR20') {
      setAppliedPromo({ code: 'VEBINAR20', discountPercent: 20 });
    } else if (cleaned === 'DAYAQ') {
      setAppliedPromo({ code: 'DAYAQ', discountPercent: 15 });
    } else if (cleaned === 'PULSUZ') {
      setAppliedPromo({ code: 'PULSUZ', discountPercent: 100 });
    } else {
      setPromoError('Daxil edilən promo-kod etibarsızdır və ya müddəti bitib.');
    }
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Zəhmət olmasa istifadəçi şərtlərini qəbul edin.');
      return;
    }

    setIsSubmitting(true);
    const generatedTicket = `WEB-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomRoomSuffix = Math.random().toString(36).substring(2, 7);
    const meetingUrl = `https://meet.dayaq.az/live/${webinar.id}-${randomRoomSuffix}`;

    setTicketCode(generatedTicket);
    setLiveMeetingLink(meetingUrl);

    // Save to dayaq_registered_webinars
    const webinarRegData = {
      id: generatedTicket,
      webinarId: webinar.id,
      webinarTitle: webinar.title,
      speakerName: webinar.speaker.name,
      date: webinar.date,
      time: webinar.time,
      ticketType,
      meetingLink: meetingUrl,
      smsReminder,
      emailReminder,
      participantName: fullName,
      participantEmail: email,
      participantPhone: phone,
      questionForSpeaker,
      price: finalPrice,
      registeredAt: new Date().toISOString()
    };

    // Save to dayaq_transactions
    const transactionData = {
      id: `txn-${Date.now()}`,
      date: new Date().toLocaleDateString('az-AZ', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: `Vebinar Rezervasiyası: ${webinar.title} (${ticketType === 'vip' ? 'VIP Arxivli Bilet' : 'Canlı Yayım Bileti'})`,
      amount: finalPrice,
      paymentMethod: isFreeTotal ? 'Pulsuz Qeydiyyat' : paymentMethod === 'card' ? 'Bank Kartı (3D Secure)' : 'Apple Pay',
      status: 'tamamlandı',
      type: 'vebinar'
    };

    try {
      const existingWebinars = JSON.parse(localStorage.getItem('dayaq_registered_webinars') || '[]');
      localStorage.setItem('dayaq_registered_webinars', JSON.stringify([webinarRegData, ...existingWebinars]));

      const existingTransactions = JSON.parse(localStorage.getItem('dayaq_transactions') || '[]');
      localStorage.setItem('dayaq_transactions', JSON.stringify([transactionData, ...existingTransactions]));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveMeetingLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Canlı Vebinarlar', path: '/vebinarlar' },
              { label: webinar.title, path: `/vebinarlar/${webinar.id}` },
              { label: 'Bilet Rezervasiyası və Qeydiyyat' }
            ]}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!isSuccess ? (
          <>
            {/* Header Title */}
            <div className="mb-6 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CADFFD]/60 text-[#251D4B] text-xs font-bold mb-2">
                <Ticket className="w-3.5 h-3.5" />
                Rəsmi Vebinar Giriş Bileti
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Vebinara Bilet Rezervasiyası
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                İştirak formatını seçin, qeydiyyatdan keçin və fərdi canlı otaq linkinizi əldə edin.
              </p>
            </div>

            {/* Step Progress Indicator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs">
              <div className="flex items-center justify-between">
                {/* Step 1 */}
                <button
                  type="button"
                  onClick={() => step > 1 && setStep(1)}
                  className={`flex items-center gap-2.5 text-left transition-colors ${
                    step === 1 ? 'text-[#251D4B]' : step > 1 ? 'text-emerald-700 cursor-pointer' : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      step === 1
                        ? 'bg-[#251D4B] text-white ring-4 ring-[#CADFFD]/40'
                        : step > 1
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mərhələ 1</div>
                    <div className="text-xs font-bold">Bilet & Format</div>
                  </div>
                </button>

                <div className={`h-0.5 flex-1 mx-3 sm:mx-6 rounded-full ${step >= 2 ? 'bg-[#251D4B]' : 'bg-slate-200'}`} />

                {/* Step 2 */}
                <button
                  type="button"
                  onClick={() => step > 2 && setStep(2)}
                  className={`flex items-center gap-2.5 text-left transition-colors ${
                    step === 2 ? 'text-[#251D4B]' : step > 2 ? 'text-emerald-700 cursor-pointer' : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      step === 2
                        ? 'bg-[#251D4B] text-white ring-4 ring-[#CADFFD]/40'
                        : step > 2
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mərhələ 2</div>
                    <div className="text-xs font-bold">İştirakçı Məlumatları</div>
                  </div>
                </button>

                <div className={`h-0.5 flex-1 mx-3 sm:mx-6 rounded-full ${step === 3 ? 'bg-[#251D4B]' : 'bg-slate-200'}`} />

                {/* Step 3 */}
                <div
                  className={`flex items-center gap-2.5 text-left ${
                    step === 3 ? 'text-[#251D4B]' : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      step === 3
                        ? 'bg-[#251D4B] text-white ring-4 ring-[#CADFFD]/40'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    3
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mərhələ 3</div>
                    <div className="text-xs font-bold">Təsdiq & Giriş</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Webinar Overview Banner with Dropdown Switcher */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={webinar.coverImage}
                    alt={webinar.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-20 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#CADFFD]/60 text-[#251D4B]">
                        {webinar.category}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Radio className="w-3 h-3 animate-pulse" />
                        Canlı İnteraktiv Otaq
                      </span>
                    </div>
                    <h2 className="font-bold text-base sm:text-lg text-[#251D4B] leading-snug">
                      {webinar.title}
                    </h2>
                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                      <span>Spiker: <strong>{webinar.speaker.name}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Calendar className="w-3 h-3 text-[#251D4B]" />
                        {webinar.date}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3 h-3 text-[#251D4B]" />
                        {webinar.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Webinar Switcher Dropdown */}
                <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Başqa vebinar seçmək:
                  </label>
                  <select
                    value={selectedWebinarId}
                    onChange={(e) => {
                      setSelectedWebinarId(e.target.value);
                      navigate(`/vebinarlar/${e.target.value}/qeydiyyat`, { replace: true });
                    }}
                    className="w-full sm:w-64 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
                  >
                    {WEBINARS_DATA.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.title} ({w.isFree ? 'Pulsuz' : `${w.price} AZN`})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 1: Ticket Tier & Notifications */}
            {step === 1 && (
              <div className="space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                {/* 1. Ticket Tier Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#251D4B] uppercase tracking-wider flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#251D4B]" />
                      <span>1. Giriş Bilet Növünü Seçin</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Bütün biletlər canlı yayım üçün keçərlidir</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Standard Live Ticket */}
                    <div
                      onClick={() => setTicketType('standard')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        ticketType === 'standard'
                          ? 'border-[#251D4B] bg-[#CADFFD]/15 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-[#251D4B]">
                            Canlı Yayım Bileti
                          </span>
                          <span className="text-lg font-black text-[#251D4B]">
                            {webinar.isFree ? 'Pulsuz (0 AZN)' : `${basePrice} AZN`}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#251D4B] mb-1">
                          Canlı Yayım & İnteraktiv İştirak
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                          Vebinar zamanı canlı yayımda iştirak, ümumi çata çıxış və spikerə sual vermək imkanı.
                        </p>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Fərdi canlı otağa birbaşa giriş</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Canlı çat və səsvermələrdə iştirak</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Spiker üçün canlı Q&A sessiyası</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">
                          {ticketType === 'standard' ? '✓ Seçilib' : 'Seçmək üçün klikləyin'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            ticketType === 'standard' ? 'border-[#251D4B] bg-[#251D4B]' : 'border-slate-300'
                          }`}
                        >
                          {ticketType === 'standard' && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>

                    {/* VIP Archive Ticket */}
                    <div
                      onClick={() => setTicketType('vip')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                        ticketType === 'vip'
                          ? 'border-[#251D4B] bg-[#CADFFD]/25 shadow-sm ring-2 ring-[#251D4B]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#251D4B] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Ən Çox Seçilən
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#251D4B] text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>VIP Arxivli Bilet</span>
                          </span>
                          <div>
                            <span className="text-lg font-black text-[#251D4B]">{basePrice + 15} AZN</span>
                            <span className="text-[10px] text-slate-400 block text-right">(+15 AZN)</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-[#251D4B] mb-1">
                          Canlı Yayım + Ömürlük Video Qeyd
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                          Canlı yayıma əlavə olaraq tam HD video yazı, slaydlar və spikerin əlavə təlimatları.
                        </p>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2 font-bold text-[#251D4B]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Bütün Canlı Yayım imkanları</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Ömürlük HD Video Qeyd (Profilinizdə daimi qalır)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Spikerin təqdimat slaydları və PDF vəsaitləri</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Elektron iştirakçı sertifikatı</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#251D4B]">
                          {ticketType === 'vip' ? '✓ Seçilib' : 'Seçmək üçün klikləyin'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            ticketType === 'vip' ? 'border-[#251D4B] bg-[#251D4B]' : 'border-slate-300'
                          }`}
                        >
                          {ticketType === 'vip' && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Notification Preferences */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-black text-[#251D4B] uppercase tracking-wider flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#251D4B]" />
                    <span>2. Xatırlatma və Bildiriş Parametrləri</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        checked={smsReminder}
                        onChange={(e) => setSmsReminder(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#251D4B]">SMS Xatırlatma (Pulsuz)</div>
                        <p className="text-slate-500 mt-0.5">
                          Vebinar başlamazdan 1 saat əvvəl birbaşa otaq linki telefonunuza SMS göndəriləcək.
                        </p>
                      </div>
                    </label>

                    <label className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        checked={emailReminder}
                        onChange={(e) => setEmailReminder(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#251D4B]">E-poçt & Google Calendar Dəvəti</div>
                        <p className="text-slate-500 mt-0.5">
                          Təqviminizə vebinar qeydi əlavə olunacaq və elektron biletiniz e-poçtunuza göndəriləcək.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/vebinarlar/${webinar.id}`}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Vebinar Səhifəsinə Qayıt
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>Növbəti: İştirakçı Məlumatları</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Participant Information */}
            {step === 2 && (
              <div className="space-y-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-[#251D4B]">
                    İştirakçı Məlumatları və Spikerə Sual
                  </h3>
                  <p className="text-xs text-slate-500">
                    Giriş linkiniz və təsdiq bildirişləri bu əlaqə vasitələrinə göndəriləcəkdir.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                      Adınız və Soyadınız *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Məs: Ayan Əhmədova"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                        E-poçt Ünvanı *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ayan@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                        Telefon Nömrəsi (SMS xatırlatma üçün) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+994 50 234 56 78"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question for Speaker */}
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                      Spiker üçün əvvəlcədən sualınız (Könüllü)
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={3}
                        value={questionForSpeaker}
                        onChange={(e) => setQuestionForSpeaker(e.target.value)}
                        placeholder="Vebinarın Q&A hissəsində spikerin cavablandırmasını istədiyiniz sualı yazın..."
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Geri: Bilet Seçimi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!fullName.trim() || !email.trim() || !phone.trim()) {
                        alert('Zəhmət olmasa tələb olunan bütün ulduzlu (*) sahələri doldurun.');
                        return;
                      }
                      setStep(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>Növbəti: Təsdiq & Giriş</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation, Promo & Payment / Entry */}
            {step === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-6 animate-in fade-in">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <h3 className="text-base font-black text-[#251D4B]">
                    Rezervasiya Xülasəsi və Təsdiq
                  </h3>

                  {/* Summary Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3.5 text-xs text-slate-700">
                    <div className="flex justify-between items-start pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-slate-400 font-medium">Seçilmiş Vebinar:</span>
                        <div className="font-bold text-[#251D4B] text-sm mt-0.5">{webinar.title}</div>
                      </div>
                      <span className="font-bold text-[#251D4B] text-sm">
                        {webinar.isFree ? 'Pulsuz' : `${basePrice} AZN`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Spiker / Aparıcı:</span>
                      <strong className="text-[#251D4B]">{webinar.speaker.name}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Tarix və Saat:</span>
                      <strong className="text-[#251D4B]">{webinar.date} · {webinar.time}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Bilet Növü:</span>
                      <strong className="text-[#251D4B]">
                        {ticketType === 'vip' ? 'VIP Arxivli Bilet (+15 AZN)' : 'Canlı Yayım Bileti'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">İştirakçı:</span>
                      <strong className="text-[#251D4B]">{fullName} ({phone})</strong>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                        <span>Promo-kod Endirimi ({appliedPromo.code} - {appliedPromo.discountPercent}%):</span>
                        <span>-{discountAmount} AZN</span>
                      </div>
                    )}

                    <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center text-sm">
                      <span className="font-black text-[#251D4B]">Yekun Ödəniş Məbləği:</span>
                      <div className="text-right">
                        {isFreeTotal ? (
                          <span className="text-xl font-black text-emerald-700">PULSUZ (0 AZN)</span>
                        ) : (
                          <span className="text-xl font-black text-[#251D4B]">{finalPrice} AZN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Free Webinar Notice OR Payment Section */}
                  {isFreeTotal ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                      <Gift className="w-6 h-6 text-emerald-600 shrink-0" />
                      <div className="text-xs text-emerald-900">
                        <div className="font-bold">Ödəniş Tələb Olunmur!</div>
                        <div>Bu vebinara iştirak tamamilə ödənişsizdir. Bank kartı daxil etmədən dərhal canlı link əldə edə bilərsiniz.</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Promo Code Input */}
                      <div className="p-4 rounded-2xl bg-[#CADFFD]/20 border border-[#CADFFD] space-y-3">
                        <label className="block text-xs font-bold text-[#251D4B] flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Promo-kodunuz var?</span>
                        </label>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              setPromoError('');
                            }}
                            placeholder="Məs: VEBINAR20, DAYAQ və ya PULSUZ"
                            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#191333] transition-colors"
                          >
                            Tətbiq et
                          </button>
                        </div>

                        {appliedPromo && (
                          <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>'{appliedPromo.code}' promo-kodu tətbiq edildi ({appliedPromo.discountPercent}% endirim)!</span>
                          </div>
                        )}

                        {promoError && (
                          <p className="text-xs text-rose-600 font-medium">{promoError}</p>
                        )}
                      </div>

                      {/* Payment Method Selector */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-[#251D4B] uppercase tracking-wider">
                          Ödəniş Metodu:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              paymentMethod === 'card'
                                ? 'border-[#251D4B] bg-[#CADFFD]/20 ring-2 ring-[#251D4B]'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5 text-[#251D4B]" />
                              <div>
                                <div className="text-xs font-bold text-[#251D4B]">Bank Kartı (3D Secure)</div>
                                <div className="text-[11px] text-slate-500">Visa / Mastercard / Birkart</div>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              Təhlükəsiz
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('apple_pay')}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              paymentMethod === 'apple_pay'
                                ? 'border-[#251D4B] bg-[#CADFFD]/20 ring-2 ring-[#251D4B]'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Sparkles className="w-5 h-5 text-[#251D4B]" />
                              <div>
                                <div className="text-xs font-bold text-[#251D4B]">Apple Pay / Google Pay</div>
                                <div className="text-[11px] text-slate-500">1-kliklə dərhal</div>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              Sürətli
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Terms & Conditions Checkbox */}
                  <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Vebinar etikası və Dayaq platformasının <strong>İstifadəçi Qaydaları</strong> ilə razıyam.
                    </span>
                  </label>

                  {/* Security badge */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Qeydiyyatdan sonra şəxsi canlı otaq linki və SMS bildiriş dərhal təqdim olunur.</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Geri: İştirakçı Məlumatları</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !agreedToTerms}
                      className="px-8 py-3.5 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Qeydiyyat tamamlanır...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#CADFFD]" />
                          <span>
                            {isFreeTotal ? 'Qeydiyyatı Tamamla və Link Əldə Et' : `Ödənişi Tamamla (${finalPrice} AZN)`}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Bilet Uğurla Rezerv Edildi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Vebinara Qeydiyyatınız Təsdiqləndi!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Elektron biletiniz hazırlandı. Canlı otağa daxil olmaq üçün fərdi linkiniz aşağıda qeyd olunub.
              </p>
            </div>

            {/* Live Room Meeting Link Box */}
            <div className="p-5 rounded-2xl bg-[#CADFFD]/30 border border-[#CADFFD] text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#251D4B] flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Sizin Fərdi Canlı Otaq Linkiniz:</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded-lg">
                  Aktivdir
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={liveMeetingLink}
                  className="w-full text-xs font-bold text-[#251D4B] bg-transparent outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-[#251D4B] hover:bg-[#191333] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#CADFFD]" />
                      <span>Linki Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-400 font-medium">Elektron Bilet Kodu:</span>
                <div className="flex items-center gap-1.5 font-black text-[#251D4B]">
                  <span>{ticketCode}</span>
                  <button
                    type="button"
                    onClick={handleCopyTicket}
                    className="p-1 rounded hover:bg-slate-200 transition-colors"
                    title="Bilet kodunu kopyala"
                  >
                    {copiedTicket ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Vebinar:</span>
                <strong className="text-[#251D4B]">{webinar.title}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Spiker:</span>
                <strong className="text-[#251D4B]">{webinar.speaker.name}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Tarix & Saat:</span>
                <strong className="text-[#251D4B]">{webinar.date}, {webinar.time}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Bilet:</span>
                <strong className="text-[#251D4B]">
                  {ticketType === 'vip' ? 'VIP Arxivli Bilet' : 'Canlı Yayım Bileti'}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">İştirakçı:</span>
                <strong className="text-[#251D4B]">{fullName}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Ödənilən Məbləğ:</span>
                <strong className="text-emerald-700 font-black text-sm">
                  {isFreeTotal ? '0 AZN (Pulsuz)' : `${finalPrice} AZN`}
                </strong>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/vebinarlar/${webinar.id}/canli`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#251D4B] hover:bg-[#191333] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Video className="w-4 h-4 text-[#CADFFD]" />
                <span>Canlı Otağa Daxil Ol</span>
              </Link>

              <Link
                to="/dashboard/vebinarlar"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#251D4B] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Vebinarlarım Bölməsinə Keç</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
