import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ARTICLES_DATA, PSYCHOLOGISTS_DATA } from '../data/mockData';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES_DATA.find((a) => a.id === id) || ARTICLES_DATA[0];

  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 2);
  const authorPsychologist = PSYCHOLOGISTS_DATA.find((p) => p.name === article.author.name);

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Məqalələr', path: '/meqaleler' },
              { label: article.title }
            ]}
          />
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} dəqiqəlik oxu
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author snippet */}
          <div className="flex items-center justify-between py-4 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={article.author.photo}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-sm text-[#251D4B]">{article.author.name}</div>
                <div className="text-xs text-slate-500">{article.author.title} · {article.publishDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Məqalə linki kopyalandı!');
                }}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Paylaş</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 aspect-video shadow-xs">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        <div className="mt-8 p-6 rounded-2xl bg-[#CADFFD]/30 border border-[#CADFFD] space-y-3">
          <h3 className="font-bold text-sm text-[#251D4B] uppercase tracking-wider">
            Əsas Qaydalar və Nəticə:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Emosiyaları inkar etmək əvəzinə onları adlandırmaq və qəbul etmək bərpa prosesinin ilk addımıdır.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Gündəlik 10 dəqiqəlik dərin diafraqmal nəfəs təşviş simptonlarını 40% azaldır.</span>
            </li>
          </ul>
        </div>

        {/* Article Body */}
        <div className="mt-8 prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
          <p className="font-semibold text-slate-900 text-base sm:text-lg leading-relaxed">
            {article.excerpt}
          </p>

          <p>
            Müasir həyat tərzi, daimi informasiya axını və sosial təzyiqlər psixi rifahımıza fasiləsiz təsir göstərir. Çox vaxt insanlar yaranan yorğunluğu sadəcə fiziki tükənmə kimi qiymətləndirir, lakin daxili emosional siqnalları nəzərdən qaçırırlar.
          </p>

          <h2 className="text-xl font-bold text-[#251D4B] pt-4">
            1. Bədəninizin verdiyi ilk siqnallar
          </h2>
          <p>
            Təşviş və ya gərginlik ilk olaraq bədəndə əzələ spazmları, çiyin və boyun nahiyəsində ağrılar və ürək döyüntüsünün tezləşməsi ilə özünü büruzə verir. Beynimiz təhlükə siqnalı qəbul etdikdə "vur və ya qaç" rejimini aktivləşdirir. Bu fizioloji reaksiyanı tanımaq ona nəzarət etməyin açarıdır.
          </p>

          <h2 className="text-xl font-bold text-[#251D4B] pt-4">
            2. Praktik Psixoloji Texnikalar
          </h2>
          <p>
            Koqnitiv Davranış Terapiyasında (CBT) sübut olunmuş "5-4-3-2-1 Torpaqlanma Metodu" (Grounding Technique) dərhal indiki ana qayıtmağa kömək edir:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Gördüyünüz <strong>5 əşyanı</strong> sadalayın.</li>
            <li>Toxuna biləcəyiniz <strong>4 fakturanı</strong> hiss edin.</li>
            <li>Eşitdiyiniz <strong>3 səsi</strong> ayırd edin.</li>
            <li>Hiss etdiyiniz <strong>2 qoxunu</strong> müəyyənləşdirin.</li>
            <li>Ağzınızdakı <strong>1 dadı</strong> xatırlayın.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#251D4B] pt-4">
            3. Nə zaman peşəkar köməyə müraciət etməli?
          </h2>
          <p>
            Əgər narahatlıq və ya əhvalsızlıq 2 həftədən çox davam edirsə, yuxu və iştaha rejiminiz pozulubsa, ixtisaslı psixoloqla görüşmək həyat keyfiyyətinizi bərpa etmək üçün ən sağlam addımdır.
          </p>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={article.author.photo}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <div className="font-bold text-base text-[#251D4B]">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.title}</div>
              <p className="text-xs text-slate-600 mt-1">Dayaq platformasının rəsmi müəllifi və klinik məsləhətçisi.</p>
            </div>
          </div>

          {authorPsychologist && (
            <Link
              to={`/psixoloqlar/${authorPsychologist.id}`}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] shrink-0"
            >
              Mütəxəssisdən Seans Rezerv Et
            </Link>
          )}
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-[#251D4B]">Oxşar Məqalələr</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div key={rel.id} className="p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-slate-300 transition-all">
                <span className="text-[11px] font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                  {rel.category}
                </span>
                <Link to={`/meqaleler/${rel.id}`} className="block">
                  <h4 className="font-bold text-sm text-[#251D4B] hover:underline line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
                <div className="text-[11px] text-slate-400">{rel.readTimeMinutes} dəq oxu · {rel.publishDate}</div>
              </div>
            ))}
          </div>
        </div>

      </article>

    </div>
  );
};
