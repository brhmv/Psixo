import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COURSES_DATA } from '../data/mockData';
import {
  BookOpen,
  Star,
  Clock,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

export const TrainingsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', label: 'Bütün Təlimlər' },
    { id: 'Psixoterapiya', label: 'Psixoterapiya' },
    { id: 'Şəxsi İnkişaf', label: 'Şəxsi İnkişaf' },
    { id: 'Ailə & Valideynlik', label: 'Ailə & Valideyn' },
    { id: 'Travma & Reabilitasiya', label: 'Travma & EMDR' }
  ];

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Header Container */}
      <div className="bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Təlimlər' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight">
              Təlimlər və Sertifikat Proqramları
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Öz tempinizdə izləyə biləcəyiniz video dərslər, praktik materiallar və rəsmi sertifikatlı ixtisas kursları.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Təlimin adı, instruktor və ya mövzu üzrə axtarın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-[#251D4B] placeholder:text-slate-400 shadow-xs focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#251D4B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Səviyyə:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#251D4B] bg-white focus:outline-none"
            >
              <option value="all">Bütün Səviyyələr</option>
              <option value="Başlanğıc və Hər kəs üçün">Başlanğıc</option>
              <option value="Orta / Peşəkar">Orta / Peşəkar</option>
              <option value="Mütəxəssislər və Valideynlər">Valideynlər</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover with badge */}
                <div className="relative aspect-video">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {course.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#251D4B] text-white">
                        {course.badge}
                      </span>
                    </div>
                  )}
                  {course.certificateIncluded && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>Sertifikat</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-[#251D4B] bg-[#CADFFD]/50 px-2 py-0.5 rounded-md">
                      {course.category}
                    </span>
                    <span>{course.durationHours} saat · {course.lessonsCount} dərs</span>
                  </div>

                  <Link to={`/telimler/${course.id}`} className="block group">
                    <h3 className="font-bold text-lg text-[#251D4B] group-hover:text-slate-700 transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  {/* Rating and Instructor */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.photo}
                        alt={course.instructor.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#251D4B]">{course.instructor.name}</div>
                        <div className="text-[11px] text-slate-400">{course.level}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action and Price */}
              <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Qiymət</span>
                  <div className="text-lg font-black text-[#251D4B]">{course.price} AZN</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/telimler/${course.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Ətraflı
                  </Link>
                  <Link
                    to={`/telimler/${course.id}/qeydiyyat`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Qeydiyyat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 mt-6 p-8">
            <h3 className="font-bold text-lg text-[#251D4B]">Təlim tapılmadı</h3>
            <p className="text-xs text-slate-500 mt-1">Axtarış sözünü dəyişməyi yoxlayın.</p>
          </div>
        )}

      </div>

    </div>
  );
};
