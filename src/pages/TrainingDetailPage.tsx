import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COURSES_DATA } from '../data/mockData';
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  Star,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const TrainingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES_DATA.find((c) => c.id === id) || COURSES_DATA[0];

  const modulesList = course.syllabus || [];
  const learningList = course.learningOutcomes || course.whatYouWillLearn || [];

  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({
    [modulesList[0]?.id || 'mod-1']: true
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Təlimlər', path: '/telimler' },
              { label: course.title }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  Səviyyə: {course.level}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 rounded-md bg-[#251D4B] text-white text-xs font-bold">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#251D4B] tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {course.subtitle}
              </p>

              {/* Quick stats & Instructor */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{course.rating}</span>
                </div>
                <span><strong>{course.enrolledStudents}</strong> tələbə qeydiyyatdan keçib</span>
                <span>Yenilənmə: <strong>2026</strong></span>
              </div>
            </div>

            {/* Cover image */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 aspect-video shadow-xs relative">
              <img
                src={course.coverImage}
                alt={course.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Link
                  to={`/telimler/${course.id}/dersler`}
                  className="w-16 h-16 rounded-full bg-[#CADFFD] text-[#251D4B] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                >
                  <PlayCircle className="w-10 h-10 fill-current text-[#251D4B]" />
                </Link>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Təlim Haqqında
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Bu Təlimdə Nələri Mənimsəyəcəksiniz?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learningList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus / Curriculum with Accordion Modules */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#251D4B]">
                    Tədris Proqramı və Dərslər
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {modulesList.length} modul · {course.lessonsCount} video dərs · {course.durationHours} saat ümumi vaxt
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {modulesList.map((mod, mIdx) => {
                  const isExpanded = !!expandedModules[mod.id];
                  return (
                    <div key={mod.id} className="rounded-2xl border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                      >
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Modul {mIdx + 1}
                          </div>
                          <div className="text-sm font-bold text-[#251D4B] mt-0.5">
                            {mod.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{mod.lessons.length} dərs · {mod.duration}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white space-y-2.5 border-t border-slate-200">
                          {mod.lessons.map((lesson, lIdx) => (
                            <Link
                              key={lesson.id}
                              to={`/telimler/${course.id}/dersler`}
                              className="p-3 rounded-xl hover:bg-[#CADFFD]/20 transition-colors flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <PlayCircle className="w-4 h-4 text-[#251D4B] shrink-0" />
                                <span className="font-semibold text-slate-700">
                                  {mIdx + 1}.{lIdx + 1} {lesson.title}
                                </span>
                              </div>
                              <span className="text-slate-400 font-medium">{lesson.duration}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Profile */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Təlimçi / Tədris Heyəti
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={course.instructor.photo}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div className="space-y-1">
                  <div className="font-bold text-base text-[#251D4B]">{course.instructor.name}</div>
                  <div className="text-xs font-semibold text-slate-600">{course.instructor.title}</div>
                  <p className="text-xs text-slate-600">{course.instructor.bio}</p>
                  {course.instructor.id && (
                    <Link
                      to={`/psixoloqlar/${course.instructor.id}`}
                      className="inline-block text-xs font-bold text-[#251D4B] hover:underline pt-1"
                    >
                      Mütəxəssisin profilinə bax →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Certificate Verification Badge */}
            {course.certificateIncluded && (
              <div className="bg-[#CADFFD]/35 rounded-3xl border border-[#CADFFD] p-6 sm:p-8 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7 text-[#CADFFD]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#251D4B]">
                    Rəsmi QR-Kodlu Bitirmə Sertifikatı
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bütün modulları tamamladıqdan və yekun testi keçdikdən sonra adınıza rəsmi sertifikat təqdim olunur.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Enrollment Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Təlimin qiyməti</div>
                  <div className="text-2xl font-black text-[#251D4B]">
                    {course.price} AZN
                  </div>
                </div>

                {course.originalPrice && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">
                      {course.originalPrice} AZN
                    </span>
                    <div className="text-[11px] font-bold text-emerald-700">Xüsusi Qiymət</div>
                  </div>
                )}
              </div>

              {/* Benefits list */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <PlayCircle className="w-4 h-4 text-[#251D4B]" />
                  <span>{course.durationHours} saatlıq video dərslər</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#251D4B]" />
                  <span>{course.lessonsCount} strukturlaşdırılmış dərs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#251D4B]" />
                  <span>Rəsmi bitirmə sertifikatı</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#251D4B]" />
                  <span>Ömürlük tam çıxış hüququ</span>
                </div>
              </div>

              {/* Primary CTA */}
              <Link
                to={`/telimler/${course.id}/qeydiyyat`}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Təlimə Qeydiyyatdan Keç</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </Link>

              {/* Secondary CTA */}
              <Link
                to={`/telimler/${course.id}/dersler`}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-[#251D4B] bg-[#CADFFD]/30 hover:bg-[#CADFFD]/50 transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4 text-[#251D4B]" />
                <span>Önbaxış Dərslərinə Bax</span>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
