import React, { useState } from 'react';
import { SelfAssessment, ScoreInterpretation, Psychologist, TrainingCourse } from '../types';
import { Sparkles, HelpCircle, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, ShieldCheck, UserCheck, BookOpen } from 'lucide-react';

interface AssessmentCenterProps {
  assessments: SelfAssessment[];
  psychologists: Psychologist[];
  courses: TrainingCourse[];
  onBookPsychologist: (psychologist: Psychologist) => void;
  onSelectCourse: (course: TrainingCourse) => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({
  assessments,
  psychologists,
  courses,
  onBookPsychologist,
  onSelectCourse
}) => {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(assessments[0].id);
  const activeAssessment = assessments.find((a) => a.id === selectedAssessmentId) || assessments[0];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
    if (currentQuestionIndex < activeAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Compute total score
  const totalScore = (Object.values(answers) as number[]).reduce((acc, p) => acc + p, 0);

  // Find interpretation
  const interpretation: ScoreInterpretation =
    activeAssessment.interpretations.find(
      (inter) => totalScore >= inter.minScore && totalScore <= inter.maxScore
    ) || activeAssessment.interpretations[0];

  // Matched psychologist
  const matchedPsychologist = psychologists.find((p) =>
    p.specializations.some((s) =>
      s.toLowerCase().includes(interpretation.recommendedSpecialty.toLowerCase().split(' ')[0])
    )
  ) || psychologists[0];

  // Matched course
  const matchedCourse = courses[0];

  return (
    <section id="assessment-section" className="py-12 lg:py-16 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Konfidensial & Elmi Əsaslı Özünüqiymətləndirmə</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#251D4B] tracking-tight">
            Emosional Sağlamlıq və Rifah Testləri
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Hisslərinizi, stres dərəcənizi və təşviş səviyyənizi beynəlxalq standartlarla 3 dəqiqə ərzində dəyərləndirin.
          </p>
        </div>

        {/* Assessment Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {assessments.map((ass) => {
            const isSelected = ass.id === selectedAssessmentId;
            return (
              <button
                key={ass.id}
                onClick={() => {
                  setSelectedAssessmentId(ass.id);
                  handleReset();
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#251D4B] bg-[#CADFFD]/30 ring-2 ring-[#251D4B]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold">{ass.category}</span>
                  <span>{ass.estimatedMinutes} dəqiqə · {ass.questionsCount} sual</span>
                </div>
                <div className="font-bold text-sm text-[#251D4B]">{ass.title}</div>
                <div className="text-xs text-slate-600 mt-1 line-clamp-1">{ass.shortDesc}</div>
              </button>
            );
          })}
        </div>

        {/* Test Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-[0_8px_30px_rgba(37,29,75,0.04)]">
          
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Sual {currentQuestionIndex + 1} / {activeAssessment.questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex) / activeAssessment.questions.length) * 100)}% tamamlandı</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#251D4B] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQuestionIndex + 1) / activeAssessment.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Son 2 həftə ərzində nə dərəcədə tez-tez rast gəlmisiniz?
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#251D4B] leading-snug">
                  {activeAssessment.questions[currentQuestionIndex].text}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeAssessment.questions[currentQuestionIndex].options.map((opt, oIdx) => {
                  const isSelected = answers[activeAssessment.questions[currentQuestionIndex].id] === opt.points;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(activeAssessment.questions[currentQuestionIndex].id, opt.points)}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#251D4B] bg-[#251D4B] text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-[#CADFFD]/40 hover:border-[#CADFFD]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-500'}`}>
                        +{opt.points} xal
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation row */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Əvvəlki sual</span>
                </button>

                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#251D4B]" />
                  <span>Cavablarınız anonimdir və qeyd olunmur</span>
                </div>
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-2">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${interpretation.badgeColor}`}>
                  {interpretation.level}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#251D4B]">
                  Nəticəniz: {totalScore} Xal
                </h3>
                <p className="text-xs text-slate-500">
                  {activeAssessment.scientificBasis} standartına əsasən
                </p>
              </div>

              {/* Interpretation Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <p className="font-medium">{interpretation.summary}</p>
              </div>

              {/* Recommendations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#251D4B]">
                  Sizə Məsləhət Görülən Addımlar:
                </h4>
                <div className="space-y-2">
                  {interpretation.recommendations.map((rec, rIdx) => (
                    <div key={rIdx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Psychologist Recommendation Card */}
              <div className="p-5 rounded-2xl bg-[#CADFFD]/40 border border-[#CADFFD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#251D4B] flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>Nəticənizə uyğun tövsiyə olunan psixoloq:</span>
                  </div>
                  <span className="text-xs font-bold text-[#251D4B]">
                    {matchedPsychologist.pricePerSession} AZN / seans
                  </span>
                </div>

                <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-slate-200">
                  <img
                    src={matchedPsychologist.photo}
                    alt={matchedPsychologist.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-[#251D4B]">{matchedPsychologist.name}</div>
                    <div className="text-xs text-slate-500 truncate">{matchedPsychologist.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      İxtisas: {matchedPsychologist.specializations.slice(0, 2).join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => onBookPsychologist(matchedPsychologist)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#191333] transition-colors shrink-0"
                  >
                    Randevu Al
                  </button>
                </div>
              </div>

              {/* Matched Course Recommendation Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-[#251D4B] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Dəstəkləyici Onlayn Təlim Kursu:</span>
                </div>

                <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-bold text-xs text-[#251D4B]">{matchedCourse.title}</div>
                    <div className="text-[11px] text-slate-500">{matchedCourse.durationHours} saat video dərslər · {matchedCourse.price} AZN</div>
                  </div>
                  <button
                    onClick={() => onSelectCourse(matchedCourse)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B] hover:bg-[#b0ceff] transition-colors shrink-0"
                  >
                    Kursu Aç
                  </button>
                </div>
              </div>

              {/* Retake Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#251D4B]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Testi yenidən keç</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
