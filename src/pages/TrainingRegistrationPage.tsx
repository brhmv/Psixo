import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COURSES_DATA } from '../data/mockData';
import { TrainingCourse } from '../types';
import {
  BookOpen,
  PlayCircle,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  HelpCircle,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Tag,
  Check,
  Copy,
  Layers,
  Star,
  Users
} from 'lucide-react';

export const TrainingRegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Find initial course from URL param, query param, or fallback to first
  const initialCourseId = id || searchParams.get('courseId') || COURSES_DATA[0].id;
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);

  const course: TrainingCourse =
    COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  // Step 1: Package & Format State
  const [packageType, setPackageType] = useState<'standard' | 'vip'>('standard');
  const [studyMode, setStudyMode] = useState<'self_paced' | 'cohort'>('self_paced');

  // Step 2: Client/Student Information
  const [fullName, setFullName] = useState('Nigar Rzayeva');
  const [email, setEmail] = useState('nigar.rzayeva@example.com');
  const [phone, setPhone] = useState('+994 50 456 78 90');
  const [profession, setProfession] = useState('Praktik Psixoloq / Tələbə');
  const [expectations, setExpectations] = useState('');

  // Step 3: Payment & Promo
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Price calculations
  const basePrice = course.price;
  const vipAddon = packageType === 'vip' ? 35 : 0;
  const subtotal = basePrice + vipAddon;
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const finalPrice = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const cleaned = promoCode.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === 'DAYAQ10') {
      setAppliedPromo({ code: 'DAYAQ10', discountPercent: 10 });
    } else if (cleaned === 'TEHSIL20') {
      setAppliedPromo({ code: 'TEHSIL20', discountPercent: 20 });
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
    const generatedOrderCode = `ENR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(generatedOrderCode);

    // Save to dayaq_enrolled_courses
    const enrollmentData = {
      id: generatedOrderCode,
      courseId: course.id,
      courseTitle: course.title,
      instructorName: course.instructor.name,
      price: finalPrice,
      packageType,
      studyMode,
      studentName: fullName,
      studentEmail: email,
      studentPhone: phone,
      profession,
      expectations,
      enrolledAt: new Date().toISOString()
    };

    // Save to dayaq_transactions
    const transactionData = {
      id: `txn-${Date.now()}`,
      date: new Date().toLocaleDateString('az-AZ', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: `Təlim Qeydiyyatı: ${course.title} (${packageType === 'vip' ? 'VIP Mentor Dəstəkli' : 'Standart Paket'})`,
      amount: finalPrice,
      paymentMethod: paymentMethod === 'card' ? 'Bank Kartı (3D Secure)' : 'Apple Pay',
      status: 'tamamlandı',
      type: 'telim'
    };

    try {
      const existingEnrollments = JSON.parse(localStorage.getItem('dayaq_enrolled_courses') || '[]');
      localStorage.setItem('dayaq_enrolled_courses', JSON.stringify([enrollmentData, ...existingEnrollments]));

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Təlimlər & Kurslar', path: '/telimler' },
              { label: course.title, path: `/telimler/${course.id}` },
              { label: 'Təlimə Qeydiyyat və Ödəniş' }
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
                <Sparkles className="w-3.5 h-3.5" />
                Rəsmi Təlim Qeydiyyatı
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Təlimə Qeydiyyat və Ödəniş
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                İstədiyiniz təlim paketini seçin, şəxsi məlumatlarınızı doldurun və dərhal öyrənməyə başlayın.
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
                    <div className="text-xs font-bold">Paket & Format</div>
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
                    <div className="text-xs font-bold">Şəxsi Məlumatlar</div>
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
                    <div className="text-xs font-bold">Təsdiq & Ödəniş</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Training Overview Banner with Dropdown Switcher */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-20 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#CADFFD]/60 text-[#251D4B]">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {course.durationHours} saat · {course.lessonsCount} dərs
                      </span>
                    </div>
                    <h2 className="font-bold text-base sm:text-lg text-[#251D4B] leading-snug">
                      {course.title}
                    </h2>
                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <span>Təlimçi: <strong>{course.instructor.name}</strong></span>
                      <span>·</span>
                      <span className="text-amber-600 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Switcher Dropdown */}
                <div className="w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Başqa təlim seçmək:
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => {
                      setSelectedCourseId(e.target.value);
                      navigate(`/telimler/${e.target.value}/qeydiyyat`, { replace: true });
                    }}
                    className="w-full sm:w-64 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
                  >
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.price} AZN)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 1: Package & Learning Mode */}
            {step === 1 && (
              <div className="space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                {/* 1. Package Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#251D4B] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#251D4B]" />
                      <span>1. Tədris Paketini Seçin</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Bütün paketlərdə sertifikat daxildir</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Standard Package */}
                    <div
                      onClick={() => setPackageType('standard')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        packageType === 'standard'
                          ? 'border-[#251D4B] bg-[#CADFFD]/15 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-150 bg-slate-100 text-[#251D4B]">
                            Standart Paket
                          </span>
                          <span className="text-lg font-black text-[#251D4B]">{basePrice} AZN</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#251D4B] mb-1">
                          Özünütədris & Tam Çıxış
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                          Bütün video dərslərə ömürlük çıxış və rəsmi QR-kodlu bitirmə sertifikatı.
                        </p>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{course.durationHours} saatlıq bütün video modullar</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Yüklənə bilən tədris vəsaitləri & slaydlar</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Rəsmi təsdiqlənmiş bitirmə sertifikatı</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Ömürlük limitsiz təkrar izləmə imkanı</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">
                          {packageType === 'standard' ? '✓ Seçilib' : 'Seçmək üçün klikləyin'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            packageType === 'standard' ? 'border-[#251D4B] bg-[#251D4B]' : 'border-slate-300'
                          }`}
                        >
                          {packageType === 'standard' && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>

                    {/* VIP Mentor Package */}
                    <div
                      onClick={() => setPackageType('vip')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                        packageType === 'vip'
                          ? 'border-[#251D4B] bg-[#CADFFD]/25 shadow-sm ring-2 ring-[#251D4B]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#251D4B] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Tövsiyə Olunur
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#251D4B] text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>VIP Mentor Dəstəkli</span>
                          </span>
                          <div>
                            <span className="text-lg font-black text-[#251D4B]">{basePrice + 35} AZN</span>
                            <span className="text-[10px] text-slate-400 block text-right">(+35 AZN)</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-[#251D4B] mb-1">
                          Fərdi Kurator & Mentorluq
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                          Bütün Standart imkanlara əlavə olaraq fərdi təlimçi yoxlanışı və istiqamətləndirmə.
                        </p>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2 font-bold text-[#251D4B]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Bütün Standart paket imkanları</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Praktik ev tapşırıqlarının fərdi yoxlanması və rəy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>1-ə 1 Mentorla 30 dəqiqəlik onlayn sual-cavab</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Şəxsi karyera və inkişaf yol xəritəsi</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#251D4B]">
                          {packageType === 'vip' ? '✓ Seçilib' : 'Seçmək üçün klikləyin'}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            packageType === 'vip' ? 'border-[#251D4B] bg-[#251D4B]' : 'border-slate-300'
                          }`}
                        >
                          {packageType === 'vip' && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Study Mode */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-black text-[#251D4B] uppercase tracking-wider">
                    2. Tədris Rejimini Seçin
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setStudyMode('self_paced')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        studyMode === 'self_paced'
                          ? 'border-[#251D4B] bg-[#CADFFD]/20 ring-2 ring-[#251D4B]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="font-bold text-xs sm:text-sm text-[#251D4B] flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#251D4B]" />
                          <span>Öz Tempinizdə (Sərbəst Qrafik)</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                          Dərhal Giriş
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Bütün dərslər dərhal açılır. İstədiyiniz vaxt, öz sürətinizlə keçin.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudyMode('cohort')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        studyMode === 'cohort'
                          ? 'border-[#251D4B] bg-[#CADFFD]/20 ring-2 ring-[#251D4B]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="font-bold text-xs sm:text-sm text-[#251D4B] flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#251D4B]" />
                          <span>Həftəlik Kurator Cədvəli</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          Qrup İntizamı
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Modullar həftəlik açılır. Həftəsonu qrup canlı sual-cavabına qoşulun.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/telimler/${course.id}`}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Təlim Səhifəsinə Qayıt
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>Növbəti: Şəxsi Məlumatlar</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="space-y-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-[#251D4B]">
                    Tələbə və Sertifikat Məlumatları
                  </h3>
                  <p className="text-xs text-slate-500">
                    Qeyd etdiyiniz ad və soyad rəsmi bitirmə sertifikatınızın üzərində əks olunacaqdır.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                      Adınız və Soyadınız (Sertifikat üçün tam) *
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
                        E-poçt Ünvanı (Dərslərə giriş üçün) *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nigar@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                        Əlaqə Nömrəsi (SMS bildirişlər) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+994 50 123 45 67"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                      Peşə Sahəsi / Hazırkı Məşğuliyyət
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Məs: Klinik psixoloq, Tələbə, HR menecer, Sahibkar..."
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] font-medium focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Expectations */}
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1.5">
                      Təlimdən Əsas Gözləntiləriniz və ya Təlimçiyə Qeyd (Könüllü)
                    </label>
                    <div className="relative">
                      <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={3}
                        value={expectations}
                        onChange={(e) => setExpectations(e.target.value)}
                        placeholder="Məs: Panik atak pasiyentləri ilə işləyərkən praktik texnikaları dərindən mənimsəmək istəyirəm..."
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
                    <span>Geri: Paket Seçimi</span>
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
                    <span>Növbəti: Təsdiq & Ödəniş</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation, Promo & Payment */}
            {step === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-6 animate-in fade-in">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <h3 className="text-base font-black text-[#251D4B]">
                    Sifariş Xülasəsi və Yekun Ödəniş
                  </h3>

                  {/* Summary Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3.5 text-xs text-slate-700">
                    <div className="flex justify-between items-start pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-slate-400 font-medium">Seçilmiş Təlim:</span>
                        <div className="font-bold text-[#251D4B] text-sm mt-0.5">{course.title}</div>
                      </div>
                      <span className="font-bold text-[#251D4B] text-sm">{basePrice} AZN</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Təlimçi / Tədrisçi:</span>
                      <strong className="text-[#251D4B]">{course.instructor.name}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Paket Növü:</span>
                      <strong className="text-[#251D4B]">
                        {packageType === 'vip' ? 'VIP Mentor Dəstəkli (+35 AZN)' : 'Standart Paket'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Tədris Rejimi:</span>
                      <strong className="text-[#251D4B]">
                        {studyMode === 'self_paced' ? 'Öz Tempinizdə (Dərhal Çıxış)' : 'Həftəlik Kurator Cədvəli'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Tələbə:</span>
                      <strong className="text-[#251D4B]">{fullName} ({email})</strong>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                        <span>Promo-kod Endirimi ({appliedPromo.code} - {appliedPromo.discountPercent}%):</span>
                        <span>-{discountAmount} AZN</span>
                      </div>
                    )}

                    <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center text-sm">
                      <span className="font-black text-[#251D4B]">Yekun Ödəniləcək Məbləğ:</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#251D4B]">{finalPrice} AZN</span>
                      </div>
                    </div>
                  </div>

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
                        placeholder="Məs: DAYAQ10 və ya TEHSIL20"
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
                        <span>'{appliedPromo.code}' promo-kodu uğurla tətbiq olundu ({appliedPromo.discountPercent}% endirim)!</span>
                      </div>
                    )}

                    {promoError && (
                      <p className="text-xs text-rose-600 font-medium">{promoError}</p>
                    )}

                    <p className="text-[11px] text-slate-500">
                      Sınaq üçün aktiv promo-kodlar: <strong>DAYAQ10</strong> (10%), <strong>TEHSIL20</strong> (20%)
                    </p>
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
                            <div className="text-[11px] text-slate-500">1-kliklə sürətli ödəniş</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Sürətli
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Dayaq platformasının <strong>İstifadəçi Qaydaları</strong> və{' '}
                      <strong>Tədris Məxfilik Siyasəti</strong> ilə tanış oldum və razıyam.
                    </span>
                  </label>

                  {/* Security badge */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ödəniş 256-bit SSL və 3D Secure bank şifrələnməsi ilə tam təhlükəsiz şəkildə həyata keçirilir.</span>
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
                      <span>Geri: Şəxsi Məlumatlar</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !agreedToTerms}
                      className="px-8 py-3.5 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Ödəniş icra olunur...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#CADFFD]" />
                          <span>Ödənişi Tamamla ({finalPrice} AZN)</span>
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
                Qeydiyyat Uğurla Tamamlandı
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Təbrik edirik, Təlimə Qəbul Olundunuz!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Ödənişiniz uğurla qəbul edildi. Bütün dərslərə və materiallara dərhal çıxış əldə etdiniz.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-400 font-medium">Sifariş / Qəbz Kodu:</span>
                <div className="flex items-center gap-1.5 font-black text-[#251D4B]">
                  <span>{orderCode}</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1 rounded hover:bg-slate-200 transition-colors"
                    title="Kodu kopyala"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Təlim Kursu:</span>
                <strong className="text-[#251D4B]">{course.title}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Paket:</span>
                <strong className="text-[#251D4B]">
                  {packageType === 'vip' ? 'VIP Mentor Dəstəkli' : 'Standart Paket'}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Tələbə:</span>
                <strong className="text-[#251D4B]">{fullName}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Ödənilən Məbləğ:</span>
                <strong className="text-emerald-700 font-black text-sm">{finalPrice} AZN</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Tarix:</span>
                <strong className="text-slate-700">{new Date().toLocaleDateString('az-AZ')}</strong>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/telimler/${course.id}/dersler`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#251D4B] hover:bg-[#191333] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <PlayCircle className="w-4 h-4 text-[#CADFFD]" />
                <span>Dərhal Dərslərə Başla</span>
              </Link>

              <Link
                to="/dashboard/telimler"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#251D4B] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Şəxsi Kabinetə Keç</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
