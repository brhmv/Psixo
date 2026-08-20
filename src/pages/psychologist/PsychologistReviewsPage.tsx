import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  CheckCircle2,
  Send,
  CornerDownRight,
  Filter,
  Search,
  ThumbsUp,
  Sparkles
} from 'lucide-react';
import { PSYCHOLOGIST_REVIEWS_MOCK, PsychologistReviewItem } from '../../data/psychologistMockData';

export const PsychologistReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<PsychologistReviewItem[]>(PSYCHOLOGIST_REVIEWS_MOCK);
  const [activeTab, setActiveTab] = useState<'all' | 'unreplied' | 'replied'>('all');
  const [replyInput, setReplyInput] = useState<{ [reviewId: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === 'unreplied') return !r.reply;
    if (activeTab === 'replied') return !!r.reply;
    return true;
  });

  const handleSendReply = (reviewId: string) => {
    const text = replyInput[reviewId];
    if (!text || !text.trim()) return;

    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              reply: {
                date: 'Bu gün, 20 Avqust 2026',
                text: text.trim()
              }
            }
          : r
      )
    );

    setReplyInput({ ...replyInput, [reviewId]: '' });
    setReplyingTo(null);
    showToast('Rəyə rəsmi peşəkar cavabınız əlavə olundu.');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Rəylər və Qiymətləndirmələr</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Müştərilərinizin təəssüratlarını oxuyun, məmnuniyyət göstəricilərini izləyin və rəyləri cavablandırın.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#CADFFD]/30 border border-[#CADFFD] text-xs font-bold text-[#251D4B]">
          <Star className="w-4 h-4 fill-[#251D4B] text-[#251D4B]" />
          <span>4.9 / 5 Ümumi Qiymət</span>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Rating Score Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-5xl font-black text-[#251D4B]">4.9</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="text-xs text-slate-500 font-semibold">128 təsdiqlənmiş seans rəyi əsasında</div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-2.5 flex flex-col justify-center">
          {[
            { stars: '5 ulduz', percent: 94, count: 120 },
            { stars: '4 ulduz', percent: 5, count: 6 },
            { stars: '3 ulduz', percent: 1, count: 2 },
            { stars: '2 ulduz', percent: 0, count: 0 },
            { stars: '1 ulduz', percent: 0, count: 0 }
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-14 text-slate-500 font-semibold text-[11px]">{bar.stars}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${bar.percent}%` }}
                />
              </div>
              <span className="w-8 text-right text-slate-400 text-[10px] font-bold">{bar.count}</span>
            </div>
          ))}
        </div>

        {/* Specific Attributes */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-center text-xs">
          <div className="space-y-1">
            <div className="flex justify-between font-bold">
              <span className="text-[#251D4B]">Peşəkarlıq & Etika</span>
              <span className="text-emerald-700">5.0 / 5</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-bold">
              <span className="text-[#251D4B]">Empatiya & Dinləmə</span>
              <span className="text-emerald-700">4.9 / 5</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-bold">
              <span className="text-[#251D4B]">Terapiya Effektivliyi</span>
              <span className="text-emerald-700">4.8 / 5</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
            </div>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Bütün Rəylər ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('unreplied')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'unreplied'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Cavab gözləyən ({reviews.filter((r) => !r.reply).length})
        </button>
        <button
          onClick={() => setActiveTab('replied')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'replied'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Cavablandırılmış ({reviews.filter((r) => !!r.reply).length})
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 hover:border-[#CADFFD] transition-all"
          >
            {/* Review Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#CADFFD]/50 text-[#251D4B] font-black text-xs flex items-center justify-center">
                  {review.clientName.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-xs text-[#251D4B]">{review.clientName}</div>
                  <div className="text-[10px] text-slate-400 font-semibold">{review.serviceType}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{review.date}</span>
              </div>
            </div>

            {/* Review Comment */}
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              "{review.comment}"
            </p>

            {/* Psychologist Response Thread */}
            {review.reply ? (
              <div className="p-4 rounded-2xl bg-[#CADFFD]/20 border border-[#CADFFD]/60 space-y-1 ml-4 sm:ml-8">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[11px] text-[#251D4B] flex items-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-[#251D4B]" />
                    <span>Sizin Peşəkar Cavabınız</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{review.reply.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {review.reply.text}
                </p>
              </div>
            ) : (
              <div className="pt-2">
                {replyingTo === review.id ? (
                  <div className="space-y-2 ml-4 sm:ml-8">
                    <textarea
                      rows={2}
                      value={replyInput[review.id] || ''}
                      onChange={(e) =>
                        setReplyInput({ ...replyInput, [review.id]: e.target.value })
                      }
                      placeholder="Müştəriyə peşəkar təşəkkür və ya cavab yazın..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSendReply(review.id)}
                        className="px-4 py-1.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Cavabı göndər</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        İmtina
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(review.id)}
                    className="text-xs font-bold text-[#251D4B] hover:underline flex items-center gap-1 ml-4 sm:ml-8"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Rəyi cavablandır</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
