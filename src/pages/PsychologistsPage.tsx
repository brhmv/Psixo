import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PSYCHOLOGISTS_DATA } from '../data/mockData';
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  Clock,
  Video,
  MapPin,
  Calendar,
  Languages,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ConsultationFormat } from '../types';

export const PsychologistsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState<ConsultationFormat | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'experience'>('rating');

  const specialtiesList = [
    { id: 'all', label: 'Bütün İxtisaslar' },
    { id: 'Təşviş və Panik Atak', label: 'Təşviş & Panik' },
    { id: 'Depressiya', label: 'Depressiya' },
    { id: 'Koqnitiv Davranış Terapiyası', label: 'CBT Terapiya' },
    { id: 'Ailə Münasibətləri', label: 'Ailə & Cütlük' },
    { id: 'Uşaq və Yeniyetmə', label: 'Uşaq & Yeniyetmə' },
    { id: 'Tükənmişlik (Burnout)', label: 'Tükənmişlik' },
    { id: 'Keçmiş Travmalar', label: 'Travma & EMDR' }
  ];

  const filteredPsychologists = useMemo(() => {
    return PSYCHOLOGISTS_DATA.filter((psy) => {
      // Search
      const matchesSearch =
        searchTerm.trim() === '' ||
        psy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        psy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        psy.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      // Specialty
      const matchesSpecialty =
        selectedSpecialty === 'all' || psy.specializations.includes(selectedSpecialty);

      // Format
      const matchesFormat =
        selectedFormat === 'all' ||
        psy.consultationTypes === 'both' ||
        psy.consultationTypes === selectedFormat;

      // Language
      const matchesLanguage =
        selectedLanguage === 'all' || psy.languages.includes(selectedLanguage);

      return matchesSearch && matchesSpecialty && matchesFormat && matchesLanguage;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.pricePerSession - b.pricePerSession;
      if (sortBy === 'price_desc') return b.pricePerSession - a.pricePerSession;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [searchTerm, selectedSpecialty, selectedFormat, selectedLanguage, sortBy]);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Header Container */}
      <div className="bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Psixoloqlar' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight">
              Psixoloqlar
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Sizə uyğun psixoloqu tapın və online seans üçün vaxt seçin.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Psixoloqun adı, ixtisası və ya problemi qeyd edin (məs: Dr. Leyla, Təşviş, CBT)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-[#251D4B] placeholder:text-slate-400 shadow-xs focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Filter & List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Specialty Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {specialtiesList.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSpecialty === spec.id
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
              }`}
            >
              {spec.label}
            </button>
          ))}
        </div>

        {/* Sub Filters Row */}
        <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Format filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-semibold">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-white focus:outline-none"
              >
                <option value="all">Hamısı</option>
                <option value="online">Yalnız Onlayn</option>
                <option value="in_person">Yalnız Kabinetdə (Əyani)</option>
              </select>
            </div>

            {/* Language filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-semibold">Dil:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-white focus:outline-none"
              >
                <option value="all">Bütün Dillər</option>
                <option value="Azərbaycan">Azərbaycan dili</option>
                <option value="İngilis">İngilis dili</option>
                <option value="Rus">Rus dili</option>
                <option value="Türk">Türk dili</option>
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-semibold">Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-white focus:outline-none"
            >
              <option value="rating">Reytinqə görə (Yüksək)</option>
              <option value="price_asc">Qiymət (Ucuzdan bahaya)</option>
              <option value="price_desc">Qiymət (Bahadan ucuza)</option>
              <option value="experience">Təcrübə illərinə görə</option>
            </select>
          </div>

        </div>

        {/* Count results */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <div>
            Tapılan mütəxəssislər: <strong>{filteredPsychologists.length}</strong>
          </div>
        </div>

        {/* Psychologists List Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPsychologists.map((psy) => (
            <div
              key={psy.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start gap-4">
                  <Link to={`/psixoloqlar/${psy.id}`} className="shrink-0">
                    <img
                      src={psy.photo}
                      alt={psy.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 rounded-2xl object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/psixoloqlar/${psy.id}`}
                        className="font-bold text-base text-[#251D4B] hover:underline truncate"
                      >
                        {psy.name}
                      </Link>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Diplom və lisenziyası təsdiqlənib" />
                    </div>

                    <div className="text-xs text-slate-500 line-clamp-1">{psy.title}</div>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-600 mt-1.5">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {psy.rating}
                      </span>
                      <span>·</span>
                      <span>{psy.experienceYears} il təcrübə</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {psy.specializations.slice(0, 3).map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#CADFFD]/40 text-[#251D4B] font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                  {psy.specializations.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                      +{psy.specializations.length - 3}
                    </span>
                  )}
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {psy.bio}
                </p>

                {/* Format & Next Slot */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Video className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{psy.consultationTypes === 'both' ? 'Onlayn & Kabinetdə' : psy.consultationTypes === 'online' ? 'Yalnız Onlayn' : 'Kabinetdə'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {psy.languages.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                    <span className="text-[11px] text-slate-500">Növbəti görüş:</span>
                    <strong className="text-[#251D4B] text-[11px]">{psy.nextAvailableSlot}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Seans qiyməti</div>
                  <div className="font-extrabold text-base text-[#251D4B]">
                    {psy.pricePerSession} AZN
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/psixoloqlar/${psy.id}`}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#251D4B] bg-white border border-[#251D4B] hover:bg-[#CADFFD]/20 transition-colors"
                  >
                    Profilə bax
                  </Link>
                  <Link
                    to={`/seans/rezervasiya?psychologistId=${psy.id}`}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors shadow-xs"
                  >
                    Seans rezerv et
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPsychologists.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 mt-6 p-8">
            <h3 className="font-bold text-lg text-[#251D4B]">Meyarlar üzrə psixoloq tapılmadı</h3>
            <p className="text-xs text-slate-500 mt-1">Axtarış sözünü dəyişməyi və ya filtrləri sıfırlamağı yoxlayın.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('all');
                setSelectedFormat('all');
                setSelectedLanguage('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B]"
            >
              Filtrləri Sıfırla
            </button>
          </div>
        )}

        {/* Pagination bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div>
            Göstərilir: 1 - {filteredPsychologists.length} / {PSYCHOLOGISTS_DATA.length} mütəxəssis
          </div>
          <div className="flex items-center gap-2">
            <button disabled className="p-2 rounded-lg border border-slate-200 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#251D4B] text-white font-bold">1</span>
            <button disabled className="p-2 rounded-lg border border-slate-200 disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
