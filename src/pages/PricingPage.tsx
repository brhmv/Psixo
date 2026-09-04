import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  CheckCircle2,
  HelpCircle,
  Percent,
  Sparkles,
  Calculator,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Video,
  Calendar,
  Zap,
  ArrowRight,
  Users,
  Award,
  Building,
  Check,
  X,
  ChevronDown,
  Info
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  // Tab state: 'psychologist' | 'client'
  const [activeTab, setActiveTab] = useState<'psychologist' | 'client'>('psychologist');

  // Calculator State for Psychologists
  const [sessionPrice, setSessionPrice] = useState<number>(50);
  const [monthlySessions, setMonthlySessions] = useState<number>(30);
  const [selectedPlanTier, setSelectedPlanTier] = useState<'standard' | 'pro' | 'academy'>('pro');

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Commission Rates
  const commissionRates = {
    standard: 0.15, // 15%
    pro: 0.10,      // 10%
    academy: 0.05   // 5%
  };

  const monthlyFee = {
    standard: 0,
    pro: 29,
    academy: 69
  };

  // Calculator computations
  const grossRevenue = sessionPrice * monthlySessions;
  const currentCommissionRate = commissionRates[selectedPlanTier];
  const commissionAmount = Math.round(grossRevenue * currentCommissionRate);
  const netEarnings = Math.max(0, grossRevenue - commissionAmount - monthlyFee[selectedPlanTier]);
  
  // Potential savings comparing to Standard 15%
  const standardNet = Math.round(grossRevenue * (1 - commissionRates.standard));
  const additionalBenefit = netEarnings - standardNet;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const psychologistFaqs = [
    {
      q: 'DAYAQ platformasında komissiya necə və nə vaxt tutulur?',
      a: 'Komissiya hər bir uğurlu seans, vebinar və ya video kurs satışı baş tutduğu anda avtomatik hesablanır. Sizdən heç vaxt əvvəlcədən nağd və ya riskli ödəniş tələb olunmur; sadəcə qazanılan məbləğdən müvafiq faiz çıxılır və xalis vəsait dərhal çıxarış balansınıza əlavə olunur.'
    },
    {
      q: 'Qazandığım vəsaiti bank kartıma və ya hesabıma necə çıxara bilərəm?',
      a: 'Balansınızdakı vəsait hər həftənin bazar ertəsi avtomatik olaraq profilinizdə qeyd etdiyiniz istənilən Azərbaycan bankının IBAN hesabına köçürülür. Həmçinin istədiyiniz an şəxsi kabinetdən təcili çıxarış sorğusu göndərə bilərsiniz.'
    },
    {
      q: 'Pasiyent seansı ləğv etdikdə komissiya necə tənzimlənir?',
      a: 'Əgər seans pasiyent tərəfindən qaydalara uyğun vaxtında ləğv edilərsə və ya mütəxəssis tərəfindən təxirə salınarsa, heç bir komissiya tutulmur. Pasiyent seansa xəbərdarlıq etmədən gəlmədikdə isə platforma qaydalarına uyğun olaraq müəyyən edilmiş təzminat mütəxəssisin balansına köçürülür.'
    },
    {
      q: 'Aylıq Pro və ya Akademiya tarifini istənilən vaxt dəyişə və ya ləğv edə bilərəmmi?',
      a: 'Bəli! Siz istənilən vaxt şəxsi kabinetinizin "Tənzimləmələr" bölməsindən tarif planınızı Standart (0 ₼/ay) rejimə qaytara və ya digər plana yüksəldə bilərsiniz. Heç bir cərimə və ya gizli öhdəlik yoxdur.'
    },
    {
      q: 'Öz vebinar və video kurslarımı satarkən komissiya fərqlidirmi?',
      a: 'Xeyr, seçdiyiniz tarif planındakı eyni şəffaf komissiya faizi həm fərdi seanslara, həm canlı vebinarlara, həm də video təlimlərin satışına şamil edilir.'
    }
  ];

  const clientFaqs = [
    {
      q: 'Müştərilər üçün seans ödənişinə əlavə gizli xidmət haqqı və ya komissiya varmı?',
      a: 'Xeyr, qətiyyən! Müştərilər və pasiyentlər üçün heç bir gizli xərc və ya platforma komissiyası yoxdur. Saytda gördüyünüz seans, vebinar və kurs qiymətləri son və yekun məbləğdir.'
    },
    {
      q: 'Ödənişlərin təhlükəsizliyinə necə zəmanət verilir?',
      a: 'Bütün ödənişlər 3D Secure təhlükəsizlik protokolu ilə Azərbaycanın aparıcı bank prosessinq sistemləri vasitəsilə qorunur. Kart məlumatlarınız heç bir halda platformada saxlanılmır.'
    },
    {
      q: 'Ödəniş etdiyim seansı təxirə sala və ya geri qaytara bilərəmmi?',
      a: 'Seansın başlanmasına ən azı 12 saat qalmış şəxsi kabinetinizdən görüşün vaxtını ödənişsiz dəyişə və ya tam məbləğdə geri qaytarılma ilə ləğv edə bilərsiniz.'
    },
    {
      q: 'Şirkətlər və korporativ müştərilər üçün xüsusi paketlər mövcuddurmu?',
      a: 'Bəli, əməkdaşların psixoloji rifahını dəstəkləmək istəyən korporativ şirkətlər üçün B2B müqavilələr, fərdi endirimli sessiya paketləri və qrup təlimləri təşkil edirik.'
    }
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24">
      
      {/* Top Breadcrumb & Hero Header */}
      <div className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Qiymətlər və Komissiya' }]} />

          <div className="mt-6 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CADFFD]/40 text-[#251D4B] text-xs font-bold border border-[#CADFFD]">
              <Sparkles className="w-3.5 h-3.5 text-[#251D4B]" />
              <span>Şəffaf və Ədalətli Qiymət Siyasəti</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-[#251D4B] tracking-tight leading-tight">
              Gizli Xərc Yoxdur. Yalnız Nəticəyə Əsaslanan Model.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium">
              DAYAQ platformasında mütəxəssislər yalnız qazandıqları hər ödənişdən şəffaf faiz ödəyir, müştərilər isə 0% əlavə komissiya ilə peşəkar dəstək alır.
            </p>

            {/* Audience Toggle Switch */}
            <div className="pt-4 flex justify-center">
              <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex items-center gap-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab('psychologist')}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'psychologist'
                      ? 'bg-[#251D4B] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#251D4B]'
                  }`}
                >
                  <Percent className="w-4 h-4 text-[#CADFFD]" />
                  <span>Psixoloqlar & Təlimçilər üçün</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('client')}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'client'
                      ? 'bg-[#251D4B] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#251D4B]'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#CADFFD]" />
                  <span>Müştərilər & Pasiyentlər üçün</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">

        {/* ---------------- SECTION 1: PSYCHOLOGIST VIEW ---------------- */}
        {activeTab === 'psychologist' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Mütəxəssislər üçün Komissiya və Abunə Modelləri
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
                Heç bir məcburi ilkin xərc olmadan başlayın. Praktikanız böyüdükcə komissiya dərəcənizi 5%-ə qədər endirin.
              </p>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Card 1: Standard (0 AZN, 15% commission) */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                      Başlanğıc Modeli
                    </span>
                    <h3 className="text-xl font-black text-[#251D4B] mt-3">Standart Mütəxəssis</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Yeni başlayan və ya platformanı risksiz sınamaq istəyən mütəxəssislər üçün.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#251D4B]">0 ₼</span>
                      <span className="text-xs text-slate-500 font-bold">/ aylıq abunə</span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-[#251D4B]" />
                      <span>Hər ödənişdən <strong>15%</strong> komissiya</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-600 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mütəxəssis profili və onlayn təqvim idarəçiliyi</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>HD Məxfi Video Otaq inteqrasiyası</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Təhlükəsiz kart ödənişləri və həftəlik bank çıxarışı</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pasiyentlər üçün avtomatik SMS və E-poçt bildirişləri</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-slate-400">
                      <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      <span>Axtarış nəticələrində TOP önə çıxarılma</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/qeydiyyat"
                    className="block w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-[#251D4B] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Ödənişsiz Qeydiyyat
                  </Link>
                </div>
              </div>

              {/* Card 2: Pro Specialist (29 AZN, 10% commission - POPULAR) */}
              <div className="bg-white rounded-3xl border-2 border-[#251D4B] p-8 shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#251D4B] text-[#CADFFD] px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#CADFFD]" />
                  <span>Ən Çox Seçilən</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-lg bg-[#CADFFD]/50 text-[#251D4B] text-[11px] font-black uppercase tracking-wider">
                      Aktiv Peşəkarlar
                    </span>
                    <h3 className="text-xl font-black text-[#251D4B] mt-3">Pro Mütəxəssis</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Daimi pasiyent axını olan və gəlirini maksimumlaşdırmaq istəyən psixoloqlar.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#CADFFD]/20 border border-[#CADFFD]/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#251D4B]">29 ₼</span>
                      <span className="text-xs text-slate-600 font-bold">/ aylıq</span>
                    </div>
                    <div className="mt-2 text-xs font-black text-emerald-700 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-emerald-600" />
                      <span>Cəmi <strong>10%</strong> endirimli komissiya</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Standart planın bütün üstünlükləri</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>5% daha az komissiya</strong> (hər seansda xalis qənaət)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Kataloqda və axtarışda <strong>TOP Önə Çıxarılma</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>"Verifikasiya Olunmuş Ekspert" xüsusi nişanı</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Gəlir analitikası və pasiyent davranış statistikası</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/qeydiyyat"
                    className="block w-full py-3.5 px-4 rounded-xl text-center text-xs font-black text-white bg-[#251D4B] hover:bg-[#1a1435] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Pro Plana Başla</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Academy & VIP Trainer (69 AZN, 5% commission) */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                      Təlimçi & Kurslar
                    </span>
                    <h3 className="text-xl font-black text-[#251D4B] mt-3">Akademiya & VIP</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Böyük auditoriyası olan, video kurs və kütləvi vebinar təşkil edən mütəxəssislər.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#251D4B]">69 ₼</span>
                      <span className="text-xs text-slate-500 font-bold">/ aylıq</span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-amber-700" />
                      <span>Minimal <strong>5%</strong> komissiya faizi</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-600 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pro planın bütün funksiyaları</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Platforma üzrə <strong>ən aşağı (5%) komissiya</strong></span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Limitsiz video kurs və dərs materialı yükləmə</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Avtomatlaşdırılmış QR-kodlu rəsmi sertifikat təqdimatı</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Fərdi hesab meneceri və texniki prioritet</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/qeydiyyat"
                    className="block w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-[#251D4B] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Akademiya Planını Seç
                  </Link>
                </div>
              </div>

            </div>

            {/* ---------------- INTERACTIVE REVENUE & COMMISSION CALCULATOR ---------------- */}
            <div className="bg-gradient-to-br from-[#251D4B] to-[#161033] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-[#CADFFD]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl space-y-2 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CADFFD] text-xs font-bold border border-white/15">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>İnteraktiv Qazanc və Komissiya Kalkulyatoru</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  DAYAQ-da Nə Qədər Qazanacaqsınız?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Öz seans qiymətinizi və gözlənilən həcmi seçərək xalis gəlirinizi və platforma komissiyasını hesablayın.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Sliders Area */}
                <div className="lg:col-span-7 space-y-6 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xs">
                  
                  {/* Slider 1: Session Price */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                      <span className="text-slate-200">1 Seansın Qiyməti:</span>
                      <span className="text-xl font-black text-[#CADFFD]">{sessionPrice} ₼</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="200"
                      step="5"
                      value={sessionPrice}
                      onChange={(e) => setSessionPrice(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#CADFFD]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>20 ₼</span>
                      <span>100 ₼</span>
                      <span>200 ₼</span>
                    </div>
                  </div>

                  {/* Slider 2: Monthly Sessions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                      <span className="text-slate-200">Aylıq Keçiriləcək Seans Sayı:</span>
                      <span className="text-xl font-black text-[#CADFFD]">{monthlySessions} seans</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={monthlySessions}
                      onChange={(e) => setMonthlySessions(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#CADFFD]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>5 seans</span>
                      <span>50 seans</span>
                      <span>100 seans</span>
                    </div>
                  </div>

                  {/* Plan Tier Selector */}
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-slate-300">Müqayisə üçün Tarif Planı:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPlanTier('standard')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
                          selectedPlanTier === 'standard'
                            ? 'bg-white text-[#251D4B] border-white'
                            : 'border-white/20 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Standart (15%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlanTier('pro')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
                          selectedPlanTier === 'pro'
                            ? 'bg-white text-[#251D4B] border-white'
                            : 'border-white/20 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Pro (10%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlanTier('academy')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-colors ${
                          selectedPlanTier === 'academy'
                            ? 'bg-white text-[#251D4B] border-white'
                            : 'border-white/20 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Akademiya (5%)
                      </button>
                    </div>
                  </div>

                </div>

                {/* Calculation Summary Box */}
                <div className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="space-y-1 border-b border-slate-100 pb-4">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Hesablanmış Aylıq Nəticə
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-700">
                      ₼{netEarnings.toLocaleString()}
                    </div>
                    <div className="text-xs font-bold text-slate-600">
                      Bank hesabınıza köçürüləcək Xalis Gəlir
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Ümumi Seans Dövriyyəsi:</span>
                      <span className="font-bold text-slate-900">₼{grossRevenue.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>DAYAQ Komissiyası ({currentCommissionRate * 100}%):</span>
                      <span className="font-bold text-rose-600">- ₼{commissionAmount.toLocaleString()}</span>
                    </div>

                    {monthlyFee[selectedPlanTier] > 0 && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Aylıq Tarif Haqqı:</span>
                        <span className="font-bold text-slate-700">- ₼{monthlyFee[selectedPlanTier]}</span>
                      </div>
                    )}
                  </div>

                  {/* Savings callout */}
                  {selectedPlanTier !== 'standard' && additionalBenefit > 0 && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standart plana nisbətən hər ay <strong>+₼{additionalBenefit.toLocaleString()}</strong> əlavə xalis qazanc!</span>
                    </div>
                  )}

                  <Link
                    to="/qeydiyyat"
                    className="block w-full py-3 rounded-xl bg-[#251D4B] text-white text-center text-xs font-black hover:bg-[#1a1435] transition-colors shadow-xs"
                  >
                    Mütəxəssis Olaraq Başla
                  </Link>
                </div>

              </div>

            </div>

            {/* Feature Comparison Matrix */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[#251D4B]">Ətraflı Funksionallıq Müqayisəsi</h3>
                <p className="text-xs text-slate-500">Bütün tariflərdə mövcud olan və fərqlənən imkanlar</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[#251D4B]">
                      <th className="py-4 px-4 font-black">Xüsusiyyət</th>
                      <th className="py-4 px-4 font-black text-center">Standart (0 ₼)</th>
                      <th className="py-4 px-4 font-black text-center bg-[#CADFFD]/20 rounded-t-xl">Pro (29 ₼)</th>
                      <th className="py-4 px-4 font-black text-center">Akademiya (69 ₼)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-slate-700">Komissiya Faizi</td>
                      <td className="py-3.5 px-4 text-center font-black text-[#251D4B]">15%</td>
                      <td className="py-3.5 px-4 text-center font-black text-emerald-700 bg-[#CADFFD]/10">10%</td>
                      <td className="py-3.5 px-4 text-center font-black text-amber-700">5%</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Məxfi HD Video Otaq</td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Avtomatlaşdırılmış Qəbul Təqvimi</td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Həftəlik Avtomatik Bank Çıxarışı</td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Axtarış Kataloqunda TOP Önə Çıxma</td>
                      <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Xüsusi "Verifikasiya Olunmuş Ekspert" Nişanı</td>
                      <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Limitsiz Video Kurs və Dərs Paylaşımı</td>
                      <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10">1 Kursa qədər</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-700">Limitsiz</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Avtomatik QR Sertifikat Generatoru</td>
                      <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700">Fərdi Menecer və Prioritet Texniki Dəstək</td>
                      <td className="py-3.5 px-4 text-center"><X className="w-4 h-4 text-slate-300 mx-auto" /></td>
                      <td className="py-3.5 px-4 text-center bg-[#CADFFD]/10">Standart</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-700">24/7 VIP Prioritet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- SECTION 2: CLIENT VIEW ---------------- */}
        {activeTab === 'client' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                Müştərilər üçün Xidmət və Qiymət Standartları
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
                Bütün xidmətlərdə 0% gizli komissiya. Gördüyünüz məbləğ ödədiyiniz yekun məbləğdir.
              </p>
            </div>

            {/* Service Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Service 1: Individual Sessions */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold">
                    <Users className="w-6 h-6 text-[#251D4B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#251D4B]">Fərdi Psixoloq Seansları</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Təşviş, depressiya, münasibət və şəxsi inkişaf mövzularında 50 dəqiqəlik təkbətək görüşlər.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium">Seans üzrə orta qiymət:</div>
                    <div className="text-2xl font-black text-[#251D4B] mt-0.5">35 ₼ – 120 ₼</div>
                    <div className="text-[11px] text-slate-500 mt-1">Mütəxəssisin dərəcəsinə görə</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Onlayn və ya Bakıdakı kabinetlərdə</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>100% Məxfilik və Etik standart</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Görüşdən 12 saat əvvəl ödənişsiz ləğv</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/psixoloqlar"
                  className="w-full py-3 rounded-xl bg-[#251D4B] text-white text-center text-xs font-bold hover:bg-[#191333] transition-colors"
                >
                  Psixoloqları İncələ
                </Link>
              </div>

              {/* Service 2: Interactive Webinars */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold">
                    <Video className="w-6 h-6 text-[#251D4B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#251D4B]">İnteraktiv Vebinarlar</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Peşəkar spikerlərlə canlı yayım, sual-cavab sessiyaları və praktik nümunələr.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium">İştirak haqqı:</div>
                    <div className="text-2xl font-black text-[#251D4B] mt-0.5">15 ₼ – 45 ₼</div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-1">Ödənişsiz vebinarlar da mövcuddur</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Canlı sual vermək imkanı</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Vebinar video yazısına 30 gün çıxış</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Elektron iştirakçı sertifikatı</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/vebinarlar"
                  className="w-full py-3 rounded-xl bg-[#251D4B] text-white text-center text-xs font-bold hover:bg-[#191333] transition-colors"
                >
                  Vebinarlara Bax
                </Link>
              </div>

              {/* Service 3: Video Courses & Certificates */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold">
                    <Award className="w-6 h-6 text-[#251D4B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#251D4B]">Video Təlimlər və Kurslar</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Öz tempinizdə izləyə biləcəyiniz modul dərslər, tapşırıqlar və rəsmi sertifikat.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium">Kurs paketi:</div>
                    <div className="text-2xl font-black text-[#251D4B] mt-0.5">49 ₼ – 220 ₼</div>
                    <div className="text-[11px] text-slate-500 mt-1">Ömürlük tam çıxış hüququ</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>İstənilən cihazda rahat izləmə</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Rəsmi QR kodlu sertifikat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>PDF metodiki vəsaitlər və testlər</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/telimler"
                  className="w-full py-3 rounded-xl bg-[#251D4B] text-white text-center text-xs font-bold hover:bg-[#191333] transition-colors"
                >
                  Təlimləri Kəşf Et
                </Link>
              </div>

            </div>

            {/* Corporate B2B Banner */}
            <div className="bg-[#251D4B] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CADFFD] text-xs font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>Korporativ Tərəfdaşlıq (B2B)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Şirkətiniz və Əməkdaşlarınız üçün Psixoloji Dəstək Paketləri
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Komandanızın emosional tükənmişliyinin qarşısını alın, motivasiya və məhsuldarlığı artırın.
                </p>
              </div>

              <Link
                to="/elaqe"
                className="px-6 py-3 rounded-xl bg-white text-[#251D4B] hover:bg-[#CADFFD] transition-colors text-xs font-black shrink-0"
              >
                Korporativ Təklif Al
              </Link>
            </div>

          </div>
        )}

        {/* ---------------- SECTION 3: FAQ ---------------- */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#251D4B]">
              Tez-Tez Verilən Suallar (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Maliyyə, ödəniş təhlükəsizliyi və komissiya qaydaları haqqında əsas məlumatlar.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-200">
            {(activeTab === 'psychologist' ? psychologistFaqs : clientFaqs).map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-sm font-bold text-[#251D4B] group-hover:text-blue-900 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openFaqIndex === idx ? 'rotate-180 text-[#251D4B]' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- SECTION 4: FINAL BOTTOM CTA ---------------- */}
        <div className="bg-gradient-to-r from-[#251D4B] to-[#1e173e] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            DAYAQ Platformasında Peşəkar Fəaliyyətinizə İndi Başlayın
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            100% şəffaf komissiya sistemi, avtomatlaşdırılmış kabinet və güclü pasiyent auditoriyası ilə praktikanızı zirvəyə daşıyın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/qeydiyyat"
              className="px-6 py-3.5 rounded-xl bg-white text-[#251D4B] hover:bg-slate-100 text-xs font-black shadow-md transition-all flex items-center gap-2"
            >
              <span>Mütəxəssis Kimi Qeydiyyat</span>
              <ArrowRight className="w-4 h-4 text-[#251D4B]" />
            </Link>
            <Link
              to="/psixoloqlar"
              className="px-6 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 text-xs font-bold transition-all"
            >
              Mütəxəssis Kataloquna Bax
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
