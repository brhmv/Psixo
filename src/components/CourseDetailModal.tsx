import React, { useState } from 'react';
import { TrainingCourse, CourseEnrollment } from '../types';
import { X, PlayCircle, Clock, BookOpen, Award, CheckCircle2, User, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

interface CourseDetailModalProps {
  course: TrainingCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrollSuccess: (enrollment: CourseEnrollment) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnrollSuccess
}) => {
  if (!isOpen || !course) return null;

  const [activeTab, setActiveTab] = useState<'curriculum' | 'outcomes' | 'enroll'>('curriculum');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Registration state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMsg('Zəhmət olmasa ad və e-poçtunuzu qeyd edin');
      return;
    }
    setErrorMsg('');

    const newEnrollment: CourseEnrollment = {
      id: `enr-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      instructorName: course.instructor.name,
      price: course.price,
      clientName,
      clientEmail,
      enrolledAt: new Date().toISOString()
    };

    onEnrollSuccess(newEnrollment);
    setIsEnrolled(true);
  };

  const handleFinish = () => {
    setIsEnrolled(false);
    setClientName('');
    setClientEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#251D4B] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
              {course.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-200">
              <div>Təlimçi: <strong className="text-white">{course.instructor.name}</strong></div>
              <span>·</span>
              <div>{course.durationHours} Saat Video</div>
              <span>·</span>
              <div>{course.lessonsCount} Dərs</div>
              <span>·</span>
              <div>{course.certificateIncluded ? 'Rəsmi Sertifikatla' : ''}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'curriculum'
                ? 'border-[#251D4B] text-[#251D4B] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Dərs Proqramı (Sillabus)
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'outcomes'
                ? 'border-[#251D4B] text-[#251D4B] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Təlim Məqsədləri & Sertifikat
          </button>
          <button
            onClick={() => setActiveTab('enroll')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'enroll'
                ? 'border-[#251D4B] text-[#251D4B] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Kursa Qeydiyyat ({course.price} AZN)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-5">
              {/* Video Player Mockup if preview clicked */}
              {playingVideo && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#CADFFD]">
                    <span className="font-bold">Ödənişsiz Dərs Nümunəsi: {playingVideo}</span>
                    <button onClick={() => setPlayingVideo(null)} className="hover:text-white">
                      Bağla ✕
                    </button>
                  </div>
                  <div className="aspect-video bg-slate-800 rounded-xl flex flex-col items-center justify-center p-6 text-center border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <div className="text-left">
                        <p className="text-xs text-[#CADFFD] font-bold">Dərsi aparır: {course.instructor.name}</p>
                        <p className="text-sm font-extrabold text-white">{playingVideo}</p>
                      </div>
                    </div>
                    <PlayCircle className="w-16 h-16 text-[#CADFFD] animate-pulse" />
                    <p className="text-xs text-slate-300 mt-2 z-10">
                      Sübuta əsaslanan koqnitiv-psixoloji metodlar və bələdçi təqdimat
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {course.syllabus.map((mod, mIdx) => (
                  <div key={mIdx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between font-bold text-sm text-[#251D4B] pb-3 border-b border-slate-200">
                      <span>{mod.title}</span>
                      <span className="text-xs text-slate-500 font-normal">{mod.duration}</span>
                    </div>

                    <div className="divide-y divide-slate-100 mt-2">
                      {mod.lessons.map((les, lIdx) => (
                        <div key={lIdx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-slate-700">
                            <PlayCircle className="w-4 h-4 text-[#251D4B]" />
                            <span className="font-medium">{les.title}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">{les.duration}</span>
                            {les.freePreview && (
                              <button
                                onClick={() => setPlayingVideo(les.title)}
                                className="px-2 py-0.5 rounded-md bg-[#CADFFD] text-[#251D4B] font-bold text-[11px] hover:bg-[#b5d2fc]"
                              >
                                Ödənişsiz İzlə
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OUTCOMES & CERTIFICATE */}
          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#251D4B] mb-3">Təlimin Təsviri</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{course.description}</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#251D4B] mb-3">Kursdan əldə edəcəyiniz bacarıqlar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((out, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {course.certificateIncluded && (
                <div className="p-5 rounded-2xl bg-[#CADFFD]/40 border border-[#CADFFD] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[#CADFFD]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#251D4B]">Rəsmi QR Kodlu Sertifikat</div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Bütün video dərsləri və yekun praktiki qiymətləndirməni bitirdikdə şəxsi adınıza təsdiqlənmiş sertifikat təqdim edilir.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ENROLL FORM */}
          {activeTab === 'enroll' && (
            <div>
              {isEnrolled ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#251D4B]">Kursa Qeydiyyatınız Təsdiqləndi!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Təbrik edirik! Video dərslərə giriş linki və istifadəçi kabineti məlumatları <strong>{clientEmail}</strong> ünvanına göndərildi.
                  </p>
                  <button
                    onClick={handleFinish}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white"
                  >
                    Dərslərə Başla
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnroll} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-[#CADFFD]/50 border border-[#CADFFD] flex items-center justify-between text-xs text-[#251D4B]">
                    <span className="font-bold">Ödəniləcək Məbləğ:</span>
                    <span className="text-xl font-black">{course.price} AZN</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1">
                      Adınız və Soyadınız *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Məs: Fidan Quliyeva"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1">
                      Elektron Poçt (E-mail) *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="fidan@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Dərslərə ömürlük çıxış bu e-poçta aktivləşəcək.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-[#251D4B] shrink-0" />
                    <span>30 gün ərzində 100% məmnuniyyət və ödənişin geri qaytarılması zəmanəti.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Ödənişsiz Sınaq və Qeydiyyatı Tamamla</span>
                    <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Bağla
          </button>

          {activeTab !== 'enroll' && (
            <button
              onClick={() => setActiveTab('enroll')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center gap-2"
            >
              <span>Kursa Yazıl ({course.price} AZN)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
