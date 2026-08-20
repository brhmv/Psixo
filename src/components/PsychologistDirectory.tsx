import React, { useState, useMemo } from 'react';
import { Psychologist } from '../types';
import { PsychologistCard } from './PsychologistCard';
import { Search, SlidersHorizontal, UserCheck, Video, MapPin, Sparkles, RefreshCw } from 'lucide-react';

interface PsychologistDirectoryProps {
  psychologists: Psychologist[];
  onBook: (psychologist: Psychologist) => void;
  onViewProfile: (psychologist: Psychologist) => void;
  searchSpecialty: string;
  setSearchSpecialty: (val: string) => void;
  filterFormat: 'all' | 'online' | 'in_person';
  setFilterFormat: (val: 'all' | 'online' | 'in_person') => void;
  onOpenTest: () => void;
}

export const PsychologistDirectory: React.FC<PsychologistDirectoryProps> = ({
  psychologists,
  onBook,
  onViewProfile,
  searchSpecialty,
  setSearchSpecialty,
  filterFormat,
  setFilterFormat,
  onOpenTest
}) => {
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price_asc' | 'price_desc'>('rating');

  const specialtyFilters = [
    { id: 'all', label: 'Bütün Sahələr' },
    { id: 'Təşviş və Panik Atak', label: 'Təşviş & Panik' },
    { id: 'Depressiya', label: 'Depressiya' },
    { id: 'Ailə Münasibətləri', label: 'Ailə & Cütlük' },
    { id: 'Uşaq və Yeniyetmə', label: 'Uşaq & Yeniyetmə' },
    { id: 'Koqnitiv Davranış Terapiyası', label: 'CBT Terapiyası' },
    { id: 'Tükənmişlik (Burnout)', label: 'İş Stresi & Burnout' }
  ];

  const filteredPsychologists = useMemo(() => {
    return psychologists
      .filter((psy) => {
        // Free text search (name, specializations, title)
        if (searchSpecialty.trim()) {
          const q = searchSpecialty.toLowerCase();
          const matchName = psy.name.toLowerCase().includes(q);
          const matchTitle = psy.title.toLowerCase().includes(q);
          const matchSpecs = psy.specializations.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchSpecs) return false;
        }

        // Tag filter
        if (selectedSpecialtyFilter !== 'all') {
          if (!psy.specializations.includes(selectedSpecialtyFilter)) return false;
        }

        // Format filter
        if (filterFormat !== 'all') {
          if (filterFormat === 'online' && psy.consultationTypes === 'in_person') return false;
          if (filterFormat === 'in_person' && psy.consultationTypes === 'online') return false;
        }

        // Language filter
        if (selectedLanguage !== 'all') {
          if (!psy.languages.includes(selectedLanguage)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'price_asc') return a.pricePerSession - b.pricePerSession;
        if (sortBy === 'price_desc') return b.pricePerSession - a.pricePerSession;
        return 0;
      });
  }, [psychologists, searchSpecialty, selectedSpecialtyFilter, filterFormat, selectedLanguage, sortBy]);

  const handleResetFilters = () => {
    setSearchSpecialty('');
    setSelectedSpecialtyFilter('all');
    setFilterFormat('all');
    setSelectedLanguage('all');
    setSortBy('rating');
  };

  return (
    <section id="psychologists-section" className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Yoxlanılmış Mütəxəssislər</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#251D4B] tracking-tight">
              Sertifikatlı Psixoloqlarımız
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Hər bir psixoloqun diplomu, beynəlxalq sertifikatları və klinik təcrübəsi yoxlanılmışdır.
              Məxfi onlayn və ya Bakıdakı rahat kabinetlərimizdə əyani seanslar.
            </p>
          </div>

          {/* Test Suggestion Mini Card */}
          <div className="bg-[#CADFFD]/40 border border-[#CADFFD] rounded-2xl p-4 flex items-center gap-3 shrink-0 max-w-sm">
            <div className="w-10 h-10 rounded-xl bg-[#251D4B] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#CADFFD]" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#251D4B]">Hansı psixoloqu seçməli?</div>
              <div className="text-slate-600 mt-0.5">3 dəqiqəlik testlə sizə ən uyğun mütəxəssisi tapın.</div>
              <button
                onClick={onOpenTest}
                className="mt-1 font-bold text-[#251D4B] hover:underline"
              >
                Testə başla →
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          {/* Specialty Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {specialtyFilters.map((tab) => {
              const isSelected = selectedSpecialtyFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSpecialtyFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#251D4B] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search, Format, Language, Sort Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <input
                type="text"
                placeholder="Ada, ixtisasa və ya açar sözə görə axtarış..."
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Format Filter */}
            <div className="lg:col-span-3 flex rounded-xl border border-slate-200 p-1 bg-slate-50">
              <button
                onClick={() => setFilterFormat('all')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterFormat === 'all' ? 'bg-[#251D4B] text-white shadow-xs' : 'text-slate-600 hover:text-[#251D4B]'
                }`}
              >
                Hamısı
              </button>
              <button
                onClick={() => setFilterFormat('online')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  filterFormat === 'online' ? 'bg-[#251D4B] text-white shadow-xs' : 'text-slate-600 hover:text-[#251D4B]'
                }`}
              >
                <Video className="w-3 h-3" /> Onlayn
              </button>
              <button
                onClick={() => setFilterFormat('in_person')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  filterFormat === 'in_person' ? 'bg-[#251D4B] text-white shadow-xs' : 'text-slate-600 hover:text-[#251D4B]'
                }`}
              >
                <MapPin className="w-3 h-3" /> Əyani
              </button>
            </div>

            {/* Language Selection */}
            <div className="lg:col-span-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-[#251D4B] bg-white focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
              >
                <option value="all">Bütün Dillər</option>
                <option value="Azərbaycan">Azərbaycan dili</option>
                <option value="İngilis">İngilis dili</option>
                <option value="Rus">Rus dili</option>
                <option value="Türk">Türk dili</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-[#251D4B] bg-white focus:outline-none focus:ring-2 focus:ring-[#251D4B]"
              >
                <option value="rating">Reytinqə görə</option>
                <option value="experience">Təcrübəyə görə</option>
                <option value="price_asc">Qiymət: Ucuzdan bahaya</option>
                <option value="price_desc">Qiymət: Bahadan ucuza</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Tag state */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <div>
            Tapılan mütəxəssislər: <strong className="text-[#251D4B] font-bold">{filteredPsychologists.length} nəfər</strong>
          </div>
          {(searchSpecialty || selectedSpecialtyFilter !== 'all' || filterFormat !== 'all' || selectedLanguage !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-[#251D4B] font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Filtrləri sıfırla</span>
            </button>
          )}
        </div>

        {/* Psychologist Grid */}
        {filteredPsychologists.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPsychologists.map((psychologist) => (
              <PsychologistCard
                key={psychologist.id}
                psychologist={psychologist}
                onBook={onBook}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-[#CADFFD] text-[#251D4B] flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              0
            </div>
            <h3 className="text-lg font-bold text-[#251D4B]">Seçilmiş parametrlərə uyğun mütəxəssis tapılmadı</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Axtarış sözünü dəyişməyi və ya filtrləri sıfırlamağı yoxlayın.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#251D4B] text-white hover:bg-[#181333] transition-colors"
            >
              Bütün psixoloqları göstər
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
