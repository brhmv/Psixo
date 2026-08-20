import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PlusCircle,
  Users,
  Star,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Award,
  X,
  CheckCircle2,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { PSYCHOLOGIST_COURSES_MOCK, PsychologistCourseItem } from '../../data/psychologistMockData';

export const PsychologistTrainingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<PsychologistCourseItem[]>(PSYCHOLOGIST_COURSES_MOCK);
  const [activeTab, setActiveTab] = useState<'published' | 'under_review' | 'draft' | 'rejected'>('published');
  const [selectedCourseStudents, setSelectedCourseStudents] = useState<PsychologistCourseItem | null>(null);

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'published') return c.status === 'published';
    if (activeTab === 'under_review') return c.status === 'under_review';
    if (activeTab === 'draft') return c.status === 'draft';
    if (activeTab === 'rejected') return c.status === 'rejected';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Təlimlərim</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Video və modul əsaslı psixoloji kurslarınızı, tələbə irəliləyişlərini və sertifikatları idarə edin.
          </p>
        </div>

        <Link
          to="/psixoloq/telimler/yeni"
          className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold flex items-center gap-2 shadow-xs self-start sm:self-auto transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-[#CADFFD]" />
          <span>Yeni Təlim Yarat</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'published', label: 'Yayımlanan', count: courses.filter((c) => c.status === 'published').length },
          { id: 'under_review', label: 'Yoxlamada', count: courses.filter((c) => c.status === 'under_review').length },
          { id: 'draft', label: 'Qaralamalar', count: courses.filter((c) => c.status === 'draft').length },
          { id: 'rejected', label: 'Rədd edilənlər', count: courses.filter((c) => c.status === 'rejected').length }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-[#CADFFD] text-[#251D4B]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#251D4B]">Bu kateqoriyada təlim yoxdur</h3>
              <p className="text-xs text-slate-500">Müştəriləriniz üçün video dərslər və testlərdən ibarət kurs qura bilərsiniz.</p>
            </div>
            <Link
              to="/psixoloq/telimler/yeni"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              <PlusCircle className="w-4 h-4 text-[#CADFFD]" />
              <span>Yeni təlim yarat</span>
            </Link>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#CADFFD] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Cover */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#251D4B]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                      {course.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold ${
                        course.status === 'published'
                          ? 'bg-emerald-500 text-white'
                          : course.status === 'under_review'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {course.status === 'published'
                        ? 'Yayımlanıb'
                        : course.status === 'under_review'
                        ? 'Yoxlamada'
                        : 'Qaralama'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-xs text-[#251D4B] text-xs font-black shadow-xs">
                      ₼{course.price}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <h3 className="font-black text-sm text-[#251D4B] line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{course.enrolledStudentsCount} tələbə</span>
                    </div>
                    {course.rating > 0 && (
                      <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating} / 5</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5 text-[#251D4B]" />
                      <span>{course.lessonsCount} dərs • {course.durationHours} saat</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Gəlir: ₼{course.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => setSelectedCourseStudents(course)}
                  className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] hover:bg-[#b8d4fc] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Tələbələrə bax</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/telimler`}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="İctimai baxış"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/psixoloq/telimler/yeni"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="Redaktə et"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Student Management Modal */}
      {selectedCourseStudents && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-sm text-[#251D4B]">Qeydiyyatlı Tələbələr və İrəliləyiş</h3>
                <div className="text-xs text-slate-500 font-medium truncate max-w-md">
                  {selectedCourseStudents.title}
                </div>
              </div>
              <button
                onClick={() => setSelectedCourseStudents(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Students Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Tələbə</th>
                    <th className="py-3 px-4">Qoşulma Tarixi</th>
                    <th className="py-3 px-4">İrəliləyiş</th>
                    <th className="py-3 px-4">Sertifikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCourseStudents.studentsList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        Bu kurs üçün hələ qeydiyyatdan keçmiş tələbə yoxdur.
                      </td>
                    </tr>
                  ) : (
                    selectedCourseStudents.studentsList.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#251D4B]">{st.name}</div>
                          <div className="text-[11px] text-slate-400">{st.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{st.enrolledAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${st.progressPercent}%` }}
                              />
                            </div>
                            <span className="font-bold text-[10px] text-slate-700">{st.progressPercent}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {st.certificateIssued ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <Award className="w-3 h-3 text-emerald-600" />
                              Verilib
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Gözləyir</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCourseStudents(null)}
                className="px-5 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
