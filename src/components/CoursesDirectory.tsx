import React, { useState } from 'react';
import { TrainingCourse } from '../types';
import { BookOpen, Star, Clock, Users, Award, PlayCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface CoursesDirectoryProps {
  courses: TrainingCourse[];
  onSelectCourse: (course: TrainingCourse) => void;
  onEnrollCourse: (course: TrainingCourse) => void;
}

export const CoursesDirectory: React.FC<CoursesDirectoryProps> = ({
  courses,
  onSelectCourse,
  onEnrollCourse
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Bütün Kurslar' },
    { id: 'Emosional Sağlamlıq', label: 'Emosional Sağlamlıq' },
    { id: 'Münasibətlər & İnkişaf', label: 'Münasibətlər & Şəxsi İnkişaf' },
    { id: 'Uşaq Psixologiyası', label: 'Valideynlik & Uşaq' },
    { id: 'Peşəkar İnkişaf', label: 'Stres & Karyera' }
  ];

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === 'all') return true;
    return course.category === selectedCategory;
  });

  return (
    <section id="courses-section" className="py-12 lg:py-16 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Psixologiya Təlimləri və Masterklasslar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#251D4B] tracking-tight">
              Peşəkar Psixologiya Kursları
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Özünüzü daha dərindən anlamaq, emosiyalarınızı idarə etmək və münasibətlərinizi yaxşılaşdırmaq üçün
              sübuta əsaslanan onlayn video kurslar və rəsmi sertifikat proqramları.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Ümumi:</span>
            <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#251D4B]">
              {courses.length} İxtisaslaşmış Proqram
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#251D4B] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-[#CADFFD]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_20px_rgba(37,29,75,0.03)] hover:shadow-[0_8px_30px_rgba(37,29,75,0.08)] hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badge & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#CADFFD] text-[#251D4B]">
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#251D4B] text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#CADFFD]" />
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Course Title & Subtitle */}
                <h3
                  onClick={() => onSelectCourse(course)}
                  className="text-xl font-extrabold text-[#251D4B] mt-3 hover:text-slate-700 cursor-pointer transition-colors leading-snug"
                >
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {course.subtitle}
                </p>

                {/* Instructor Block */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <img
                    src={course.instructor.photo}
                    alt={course.instructor.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#251D4B]">{course.instructor.name}</div>
                    <div className="text-[11px] text-slate-500">{course.instructor.title}</div>
                  </div>
                </div>

                {/* Meta details (Duration, Lessons, Rating, Students) */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#251D4B]" />
                    <span>{course.durationHours} saat dərslər</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <PlayCircle className="w-3.5 h-3.5 text-[#251D4B]" />
                    <span>{course.lessonsCount} video dərs</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-[#251D4B]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.enrolledStudents})</span>
                  </div>
                </div>

                {/* Learning outcomes preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="text-xs font-bold text-[#251D4B]">Kursda nələri öyrənəcəksiniz:</div>
                  {course.learningOutcomes.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Actions Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#251D4B]">{course.price} AZN</span>
                  {course.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      {course.originalPrice} AZN
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Outline Button: Sillabusa bax */}
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white border border-[#251D4B] text-[#251D4B] hover:bg-[#CADFFD]/30 transition-colors"
                  >
                    Dərslər & Plan
                  </button>

                  {/* Secondary/Primary Button: Kursa Qatıl */}
                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B] hover:bg-[#bad4fc] transition-colors"
                  >
                    Kursa Qoşul
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
