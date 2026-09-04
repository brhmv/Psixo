import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  PlayCircle,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  Search,
  Sparkles,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { COURSES_DATA } from '../../data/mockData';

export const DashboardTrainingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');

  // Mock progress state per course
  const coursesWithProgress = [
    {
      course: COURSES_DATA[1] || COURSES_DATA[0], // Emosional Zəka
      progress: 64,
      completedLessons: 9,
      totalLessons: 14,
      status: 'in_progress'
    },
    {
      course: COURSES_DATA[0], // Panik və Təşviş
      progress: 100,
      completedLessons: 12,
      totalLessons: 12,
      status: 'completed',
      certificateIssued: true
    },
    {
      course: COURSES_DATA[2] || COURSES_DATA[0], // Burnout
      progress: 0,
      completedLessons: 0,
      totalLessons: 12,
      status: 'saved'
    }
  ];

  const filtered = coursesWithProgress.filter((item) => item.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Təlimlərim</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Öyrənmə yol xəritəniz, davam edən video dərslər və qazanılmış sertifikatlarınız.
          </p>
        </div>

        <Link
          to="/telimler"
          className="px-5 py-3 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Search className="w-4 h-4 text-[#CADFFD]" />
          <span>Təlimləri Kəşf Et</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'in_progress'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Davam edən ({coursesWithProgress.filter((c) => c.status === 'in_progress').length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tamamlanan ({coursesWithProgress.filter((c) => c.status === 'completed').length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Saxlanılan ({coursesWithProgress.filter((c) => c.status === 'saved').length})
        </button>
      </div>

      {/* Course Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(({ course, progress, completedLessons, totalLessons, certificateIssued, status }) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl text-[11px] font-black bg-[#251D4B] text-white shadow-md">
                      {course.category}
                    </span>
                    {certificateIssued && (
                      <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-400 text-amber-950 flex items-center gap-1 shadow-md">
                        <Award className="w-3.5 h-3.5" />
                        <span>Sertifikat Verilib</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-black text-base text-[#251D4B] line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructor.photo}
                      alt={course.instructor.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs text-slate-600 font-semibold">{course.instructor.name}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Tərəqqi: {completedLessons}/{totalLessons} dərs</span>
                      <span className="text-[#251D4B]">{progress}% tamamlandı</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#251D4B] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.durationHours} saat video material
                    </span>
                    <span className="text-emerald-700 font-bold">QR Sertifikat daxildir</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                {status === 'saved' ? (
                  <Link
                    to={`/telimler/${course.id}/qeydiyyat`}
                    className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#1a1435] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4 text-[#CADFFD]" />
                    <span>Qeydiyyatdan Keç və Başla</span>
                  </Link>
                ) : (
                  <Link
                    to={`/dashboard/telimler/${course.id}`}
                    className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#1a1435] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4 text-[#CADFFD]" />
                    <span>
                      {progress === 100 ? 'Təlimi Təkrar İzlə' : progress > 0 ? 'Təlimə davam et' : 'Təlimə başla'}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-black text-[#251D4B]">
            {activeTab === 'in_progress'
              ? 'Hələ heç bir təlimə başlamamısınız.'
              : activeTab === 'completed'
              ? 'Hələ tamamlanmış təliminiz yoxdur.'
              : 'Saxlanılan təlim siyahınız boşdur.'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Praktik psixoterapiya texnikaları və psixoloji inkişaf kurslarımızı kəşf edin.
          </p>
          <Link
            to="/telimler"
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold inline-block"
          >
            Təlimləri kəşf et
          </Link>
        </div>
      )}

    </div>
  );
};
