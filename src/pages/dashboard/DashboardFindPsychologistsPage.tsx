import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  MapPin,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Heart,
  CheckCircle2,
  X
} from 'lucide-react';
import { PSYCHOLOGISTS_DATA } from '../../data/mockData';

export const DashboardFindPsychologistsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hamısı');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(['dr-leyla-mammadova']);

  const categories = [
    'Hamısı',
    'Stress',
    'Narahatlıq',
    'Münasibətlər',
    'Ailə',
    'Uşaq psixologiyası',
    'Özünə inam',
    'Travma',
    'Karyera',
    'Şəxsi inkişaf'
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedFavorites.includes(id)) {
      setSavedFavorites(savedFavorites.filter((f) => f !== id));
    } else {
      setSavedFavorites([...savedFavorites, id]);
    }
  };

  const filteredPsychologists = PSYCHOLOGISTS_DATA.filter((p) => {
    // Search query check
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category match
    const matchesCategory =
      selectedCategory === 'Hamısı' ||
      p.specializations.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (selectedCategory === 'Stress' && p.specializations.some((s) => s.toLowerCase().includes('təşviş') || s.toLowerCase().includes('stres'))) ||
      (selectedCategory === 'Narahatlıq' && p.specializations.some((s) => s.toLowerCase().includes('təşviş') || s.toLowerCase().includes('panik'))) ||
      (selectedCategory === 'Ailə' && p.specializations.some((s) => s.toLowerCase().includes('ailə') || s.toLowerCase().includes('cütlük')));

    // Format match
    const matchesFormat =
      selectedFormat === 'all' ||
      p.consultationTypes === 'both' ||
      p.consultationTypes === selectedFormat;

    // Experience match
    const matchesExp =
      selectedExperience === 'all' ||
      (selectedExperience === '5plus' && p.experienceYears >= 5) ||
      (selectedExperience === '10plus' && p.experienceYears >= 10);

    // Language match
    const matchesLang =
      selectedLanguage === 'all' ||
      p.languages.some((l) => l.toLowerCase().includes(selectedLanguage.toLowerCase()));

    // Price match
    const matchesPrice = p.pricePerSession <= maxPrice;

    return matchesSearch && matchesCategory && matchesFormat && matchesExp && matchesLang && matchesPrice;
  });

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
              Sizə uyğun psixoloqu tapın
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Sertifikatlı mütəxəssislərimiz arasından ehtiyaclarınıza ən uyğun olanı seçin və birbaşa seans təyin edin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#CADFFD]/40 text-[#251D4B] text-xs font-bold border border-[#CADFFD]">
              {filteredPsychologists.length} mütəxəssis aktivdir
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Psixoloq, ixtisas və ya mövzu axtarın..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#251D4B] text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#251D4B]" />
            <span>Əlavə Filtrlər</span>
            {(selectedFormat !== 'all' || selectedExperience !== 'all' || selectedLanguage !== 'all' || maxPrice < 100) && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>

        {/* Category Pill Slider */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Advanced Filters Box */}
      {showFilterDrawer && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in">
          {/* Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Seans formatı</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            >
              <option value="all">Bütün formatlar</option>
              <option value="online">Yalnız Onlayn (Video)</option>
              <option value="in_person">Yalnız Əyani (Kabinət)</option>
              <option value="both">Hər ikisi mövcud</option>
            </select>
          </div>

          {/* Experience */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Təcrübə müddəti</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            >
              <option value="all">Bütün təcrübələr</option>
              <option value="5plus">5+ il təcrübə</option>
              <option value="10plus">10+ il təcrübə</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Məsləhət dili</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            >
              <option value="all">Bütün dillər</option>
              <option value="azərbaycan">Azərbaycan dili</option>
              <option value="ingilis">İngilis dili</option>
              <option value="rus">Rus dili</option>
              <option value="türk">Türk dili</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600">
              <span>Maksimum qiymət:</span>
              <span className="text-[#251D4B]">₼{maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#251D4B] mt-2 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Psychologist List / Cards Grid */}
      {filteredPsychologists.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPsychologists.map((psychologist) => {
            const isFav = savedFavorites.includes(psychologist.id);

            return (
              <div
                key={psychologist.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                {/* Top: Avatar & Meta */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={psychologist.photo}
                      alt={psychologist.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100"
                    />
                    {psychologist.verified && (
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#251D4B] text-white flex items-center justify-center border-2 border-white"
                        title="Təsdiqlənmiş mütəxəssis"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#CADFFD]" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm sm:text-base text-[#251D4B] truncate">
                        {psychologist.name}
                      </h3>
                      <button
                        onClick={(e) => toggleFavorite(psychologist.id, e)}
                        className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Seçilmişlərə əlavə et"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {psychologist.title}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 flex-wrap">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{psychologist.rating}</span>
                        <span className="text-slate-400 font-normal">({psychologist.reviewCount})</span>
                      </div>
                      <span>•</span>
                      <span>{psychologist.experienceYears} il təcrübə</span>
                      <span>•</span>
                      <span className="truncate">{psychologist.languages.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {psychologist.specializations.slice(0, 3).map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                  {psychologist.specializations.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-[11px] font-semibold">
                      +{psychologist.specializations.length - 3}
                    </span>
                  )}
                </div>

                {/* Next Available & Price Info Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Növbəti vaxt: <strong className="text-slate-800 font-bold">{psychologist.nextAvailableSlot}</strong></span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-[#251D4B]">₼{psychologist.pricePerSession}</span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ 50 dəq</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link
                    to={`/psixoloqlar/${psychologist.id}`}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-[#251D4B] text-xs font-bold text-center transition-colors"
                  >
                    Profilə bax
                  </Link>

                  <Link
                    to={`/seans/rezervasiya?psychologist=${psychologist.id}`}
                    className="py-2.5 px-4 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                    <span>Seans rezerv et</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Search State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-black text-[#251D4B]">Uyğun psixoloq tapılmadı</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Axtarış sözünü dəyişməyə və ya filtrləri sıfırlamağa cəhd edin.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Hamısı');
              setSelectedFormat('all');
              setSelectedExperience('all');
              setMaxPrice(100);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold inline-block"
          >
            Filtrləri sıfırla
          </button>
        </div>
      )}

    </div>
  );
};
