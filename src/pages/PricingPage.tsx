import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  CheckCircle2,
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
  ChevronDown,
  Wallet,
  Coins,
  Send,
  Lock,
  Layers
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  // Tab state: 'psychologist' | 'client'
  const [activeTab, setActiveTab] = useState<'psychologist' | 'client'>('psychologist');

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const psychologistFaqs = [
    {
      q: 'Mütəxəssis (psixoloq/təlimçi) kimi qeydiyyat və paylaşım üçün hər hansı pul ödəməliyəmmi?',
      a: 'Qətiyyən xeyr! Psixoloq və mütəxəssislər üçün platformaya qoşulmaq, profil açmaq, fərdi seans cədvəli qurmaq, canlı vebinar və ya video təlim paylaşmaq 100% PULSUZDUR (0 ₼ abunə haqqı). Heç bir ilkin xərc və ya risk yoxdur.'
    },
    {
      q: 'Ödəniş və 10% komissiya mexanizmi necə işləyir?',
      a: 'Siz seans, vebinar və ya təliminizi istədiyiniz qiymətlə paylaşırsınız. İstifadəçi ona qoşulmaq üçün saytda bank kartı ilə anlıq ödəniş etdikdə, məbləğin 10%-i platforma xidmət haqqı kimi tutulur, qalan 90%-i isə birbaşa sizin şəxsi kabinet balansınıza yatırılır.'
    },
    {
      q: 'Balansımdakı qazancı bank kartıma və ya hesabıma necə çıxarıram?',
      a: 'Balansınızda toplanan xalis vəsait hər həftə avtomatik olaraq profilinizdə qeyd etdiyiniz istənilən Azərbaycan bankının IBAN hesabına köçürülür. Həmçinin istədiyiniz an şəxsi kabinetdən "Çıxarış Sorğusu" göndərə bilərsiniz.'
    },
    {
      q: 'Müştəri seansı ləğv etdikdə və ya seansa gəlmədikdə nə baş verir?',
      a: 'Əgər seans qaydalara uyğun vaxtında ləğv edilərsə və ya mütəxəssis tərəfindən təxirə salınarsa, heç bir komissiya tutulmur və məbləğ müştəriyə qaytarılır. Müştəri xəbərdarlıq etmədən seansa qoşulmadıqda isə platforma qaydalarına uyğun təzminat mütəxəssisə ödənilir.'
    },
    {
      q: 'Vebinar və video kursların satışında da komissiya eynidirmi?',
      a: 'Bəli, DAYAQ platformasında bütün xidmətlər (fərdi konsultasiyalar, qrup vebinarları və video təlimlər) üçün vahid və şəffaf 10% komissiya siyasəti tətbiq olunur. Siz hər satışdan xalis 90% gəlir əldə edirsiniz.'
    }
  ];

  const clientFaqs = [
    {
      q: 'Müştərilər üçün seans ödənişinə əlavə gizli xidmət haqqı və ya komissiya varmı?',
      a: 'Xeyr, qətiyyən! Müştərilər və pasiyentlər üçün heç bir gizli xərc və ya əlavə komissiya yoxdur. Saytda gördüyünüz seans, vebinar və kurs qiyməti ödəyəcəyiniz son və yekun məbləğdir.'
    },
    {
      q: 'Ödəniş anlıqdırmı və necə təmin edilir?',
      a: 'Bəli, seansı təyin etdiyiniz və ya təlimə qeydiyyatdan keçdiyiniz an ödəniş 3D Secure təhlükəsizlik sistemi ilə bank kartınız vasitəsilə dərhal həyata keçirilir və təsdiq qəbzi şəxsi kabinetinizə göndərilir.'
    },
    {
      q: 'Ödəniş etdiyim seansı dəyişə və ya ləğv edə bilərəmmi?',
      a: 'Seansın başlamasına ən azı 12 saat qalmış şəxsi kabinetinizdən görüşün vaxtını ödənişsiz dəyişə və ya tam məbləğdə geri qaytarılma ilə ləğv edə bilərsiniz.'
    },
    {
      q: 'Korporativ şirkətlər üçün əməkdaş dəstək paketləri mövcuddurmu?',
      a: 'Bəli! Şirkətlər üçün B2B müqavilələr, işçilər üçün fərdi psixoloji dəstək və komanda treninqləri təşkil edirik.'
    }
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24">
      
      {/* Top Hero Section */}
      <div className="bg-white border-b border-slate-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Qiymətlər və Ödəniş Sistemi' }]} />

          <div className="mt-6 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CADFFD]/40 text-[#251D4B] text-xs font-bold border border-[#CADFFD]">
              <Sparkles className="w-3.5 h-3.5 text-[#251D4B]" />
              <span>Şəffaf Komissiya və Anlıq Ödəniş Modeli</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-[#251D4B] tracking-tight leading-tight">
              Mütəxəssis Pul Ödəmir. Yalnız Satışdan 10% Komissiya.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Seanslarınızı, vebinarlarınızı və təlimlərinizi <strong>0 ₼ ödənişsiz paylaşın</strong>. İstifadəçilər qoşulduqda anlıq ödəniş edir — <strong>90% birbaşa sizə</strong>, 10% platformaya ayrılır.
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

        {/* ---------------- SECTION 1: PSYCHOLOGIST & SPECIALIST VIEW ---------------- */}
        {activeTab === 'psychologist' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* 4-Step Process Cards */}
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                  Sistem Necə İşləyir?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Sadə, avtomatlaşdırılmış və mütəxəssis üçün 100% risksiz ödəniş axını
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Step 1 */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs relative space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-[#251D4B]">Pulsuz Paylaş</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Profilinizi açın, fərdi seans qəbulu saatlarını, canlı vebinarlarınızı və video təlimlərinizi <strong>0 ₼ ödənişsiz</strong> yerləşdirin.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs relative space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-[#251D4B]">Müştəri Anlıq Ödəyir</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    İstifadəçi seansı rezerv edəndə və ya təlimə yazılanda bank kartı ilə <strong>dərhal və anlıq</strong> ödəniş həyata keçirir.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-3xl border-2 border-[#251D4B] p-6 shadow-md relative space-y-3 bg-[#CADFFD]/10">
                  <div className="w-10 h-10 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center font-black text-sm">
                    3
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#251D4B]">Anlıq 90% / 10% Bölgü</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      90% Sizin
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ödəniş daxil olan saniyədə <strong>90% birbaşa sizin balansınıza</strong> oturur, cəmi 10% platforma komissiyası tutulur.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs relative space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-black text-sm">
                    4
                  </div>
                  <h3 className="font-bold text-sm text-[#251D4B]">Kartınıza Çıxarış</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Toplanan xalis vəsait hər həftə avtomatik olaraq Azərbaycan banklarındakı <strong>IBAN hesabınıza və ya kartınıza</strong> köçürülür.
                  </p>
                </div>

              </div>
            </div>

            {/* Split Highlight Hero Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>0 ₼ Abunə Haqqı · 0 ₼ Məcburi Xərc</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-[#251D4B] leading-tight">
                  Siz Sadəcə Seansınızı və Təliminizi Paylaşın. Bütün Qalan İşi Biz Edirik.
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  DAYAQ platformasında mütəxəssislərdən heç vaxt aylıq abunə haqqı və ya reklam pulu alınmır. Biz yalnız siz pasiyent qəbul edib və ya təlim satıb gəlir əldə etdikdə xidmət haqqı (10%) qazanırıq.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>HD Məxfi Video Otaq</strong> və təqvim pulsuz verilir</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Avtomatik SMS və E-poçt</strong> bildiriş sistemi</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Təhlükəsiz Bank Şlüzü</strong> və 3D Secure inteqrasiyası</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Həftəlik Bank Çıxarışı</strong> heç bir əlavə cəriməsiz</span>
                  </div>
                </div>
              </div>

              {/* Visual Percentage Breakdown Display */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#251D4B] to-[#171135] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Hər 100 AZN Ödənişin Bölgüsü
                  </div>
                  <div className="text-3xl font-black text-white">Avtomatik Şəffaf Şlüz</div>
                </div>

                <div className="space-y-4">
                  {/* 90% Specialist */}
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-emerald-300 flex items-center gap-1.5">
                        <Wallet className="w-4 h-4" />
                        <span>Sizin Xalis Qazancınız:</span>
                      </span>
                      <span className="text-xl font-black text-emerald-400">90% (90 ₼)</span>
                    </div>
                    <div className="w-full bg-black/30 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[90%] rounded-full" />
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Anında balansınıza oturur və birbaşa bank hesabınıza çıxarılır.
                    </div>
                  </div>

                  {/* 10% Platform */}
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-200 flex items-center gap-1.5">
                        <Percent className="w-4 h-4 text-[#CADFFD]" />
                        <span>DAYAQ Platforma Haqqı:</span>
                      </span>
                      <span className="text-base font-bold text-[#CADFFD]">10% (10 ₼)</span>
                    </div>
                    <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#CADFFD] h-full w-[10%] rounded-full" />
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Server, video otaq infrastrukturu, bank prosessinq və marketinq üçün.
                    </div>
                  </div>
                </div>

                <Link
                  to="/qeydiyyat"
                  className="block w-full py-3.5 rounded-xl bg-white text-[#251D4B] text-center text-xs font-black hover:bg-[#CADFFD] transition-colors shadow-md"
                >
                  Ödənişsiz Qeydiyyatdan Keç
                </Link>
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
                Bütün xidmətlərdə 0% gizli komissiya. Gördüyünüz məbləğ anlıq ödəyəcəyiniz yekun məbləğdir.
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
              Maliyyə, ödəniş təhlükəsizliyi və 10% komissiya qaydaları haqqında əsas məlumatlar.
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
            DAYAQ Platformasında Fəaliyyətinizə İndi Başlayın
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            0 ₼ abunə haqqı, seans və təlimlərinizi ödənişsiz paylaşma imkanı və 90% xalis qazanc zəmanəti.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/qeydiyyat"
              className="px-6 py-3.5 rounded-xl bg-white text-[#251D4B] hover:bg-slate-100 text-xs font-black shadow-md transition-all flex items-center gap-2"
            >
              <span>Mütəxəssis Kimi Ödənişsiz Başla</span>
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
