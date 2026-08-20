import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  ArrowLeft,
  Copy,
  Check,
  Printer
} from 'lucide-react';
import { USER_MOCK_CERTIFICATES, MOCK_USER } from '../../data/mockData';

export const DashboardCertificateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cert =
    USER_MOCK_CERTIFICATES.find((c) => c.id === id) || USER_MOCK_CERTIFICATES[0];

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const certCode = cert.certificateNumber || cert.credentialId || 'DYQ-CERT-2026-8891';
    navigator.clipboard?.writeText(`https://dayaq.az/verify/cert/${certCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const certNumber = cert.certificateNumber || cert.credentialId || 'DYQ-CERT-2026-8891';
  const recipient = cert.recipientName || MOCK_USER.name;

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(
      `Mən Dayaq platformasında "${cert.title}" təlimini uğurla başa vurdum və rəsmi sertifikatı qazandım! Sertifikat nömrəsi: ${certNumber}`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-16">
      
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/sertifikatlar"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#251D4B] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sertifikatlarıma qayıt</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251D4B] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Çap et</span>
          </button>
          <button
            onClick={() => alert(`Sertifikat (${cert.certificateNumber}) PDF formatında endirilir...`)}
            className="px-4 py-2 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>PDF Yüklə</span>
          </button>
        </div>
      </div>

      {/* Rəsmi Sertifikat Çərçivəsi (Classic Elegant Certificate View) */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border-8 border-double border-[#251D4B]/20 shadow-xl relative overflow-hidden text-center space-y-8 bg-gradient-to-b from-white via-slate-50/40 to-white">
        
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#251D4B]/40" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#251D4B]/40" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#251D4B]/40" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#251D4B]/40" />

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#251D4B] text-[#CADFFD] flex items-center justify-center font-black text-sm">
              D
            </div>
            <span className="font-black text-sm tracking-widest text-[#251D4B] uppercase">
              DAYAQ PSİXOLOJİ DƏSTƏK PLATFORMASI
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold">
            RƏSMİ BİTİRMƏ VƏ İXTİSASLAŞMA ŞƏHADƏTNAMƏSİ
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight">
            SERTİFİKAT
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Bu sənəd təsdiq edir ki, aşağıda adı qeyd olunan şəxs proqramı tam həcmdə müvəffəqiyyətlə bitirmişdir:
          </p>
        </div>

        {/* Recipient Name */}
        <div className="py-2">
          <div className="text-2xl sm:text-3xl font-black text-[#251D4B] font-serif border-b-2 border-[#251D4B] pb-2 inline-block px-12">
            {recipient}
          </div>
        </div>

        {/* Course Description Text */}
        <div className="max-w-xl mx-auto space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          <p>
            Dayaq platforması nəzdində təşkil olunmuş <strong className="text-[#251D4B] font-black">{cert.title}</strong> üzrə peşəkar təlim kursunu və bütün praktiki modulları uğurla tamamlamışdır.
          </p>
        </div>

        {/* Signatures & Seal Section */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end border-t border-slate-200 max-w-2xl mx-auto text-center">
          
          {/* Instructor Signature */}
          <div className="space-y-1">
            <div className="font-serif italic text-base text-[#251D4B]">{cert.instructorName}</div>
            <div className="w-32 h-0.5 bg-slate-300 mx-auto" />
            <div className="text-[10px] text-slate-500 font-bold uppercase">Təlimçi & Ekspert</div>
          </div>

          {/* Golden Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-50 flex flex-col items-center justify-center text-amber-800 shadow-md">
              <Award className="w-8 h-8 text-amber-600" />
              <span className="text-[8px] font-black uppercase tracking-wider mt-0.5">TƏSDİQLƏNDİ</span>
            </div>
          </div>

          {/* Platform Director */}
          <div className="space-y-1">
            <div className="font-serif italic text-base text-[#251D4B]">Dayaq Akademiyası</div>
            <div className="w-32 h-0.5 bg-slate-300 mx-auto" />
            <div className="text-[10px] text-slate-500 font-bold uppercase">Tədris Şurası</div>
          </div>
        </div>

        {/* Verification Meta Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 gap-4">
          <div>
            Verilmə tarixi: <strong className="text-slate-700">{cert.issueDate}</strong>
          </div>

          <div className="flex items-center gap-2 font-mono font-bold text-[#251D4B]">
            <QrCode className="w-4 h-4 text-slate-700" />
            <span>ID: {certNumber}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Rəsmi Onlayn Doğrulama</span>
          </div>
        </div>

      </div>

      {/* Share & Verify Actions Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-black text-sm text-[#251D4B]">Sertifikatınızı paylaşın</h3>
          <p className="text-xs text-slate-500">
            Nailiyyətinizi peşəkar şəbəkənizdə paylaşaraq təhsil profilinizi zənginləşdirin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleLinkedInShare}
            className="px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#084e96] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>LinkedIn-də paylaş</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251D4B] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Linki kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
