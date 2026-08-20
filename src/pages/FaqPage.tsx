import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Video, CreditCard, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Onlayn psixoloji seans necə keçirilir?',
      a: 'Rezervasiya etdiyiniz vaxtda şəxsi kabinetinizdə ("Seanslarım") və ya sizə göndərilən e-poçt bildirişindəki məxfi video otaq linkinə klikləyərək kompüter və ya smartfon vasitəsilə 50 dəqiqəlik canlı video görüşə qoşulursunuz.'
    },
    {
      q: 'Psixoloqların diplom və ixtisası necə yoxlanılır?',
      a: 'Dayaq platformasında qeydiyyatdan keçən hər bir mütəxəssisin ali psixologiya təhsili (Dövlət İmtahan Mərkəzi tərəfindən tanınan bakalavr/magistr diplomu) və beynəlxalq terapevtik sertifikatları ekspert heyətimiz tərəfindən hərtərəfli autentifikasiya edilir.'
    },
    {
      q: 'Məxfilik necə qorunur?',
      a: 'Bütün video zənglər və məlumatlar beynəlxalq şifrələmə protokolları ilə qorunur. Seans zamanı danışılan heç bir məlumat üçüncü şəxslərə və ya təşkilatlara ötürülmür, video zənglər qeydə alınmır.'
    },
    {
      q: 'Görüş vaxtını dəyişmək və ya ləğv etmək mümkündürmü?',
      a: 'Bəli, təyin olunmuş seansa ən azı 12 saat qalmış şəxsi kabinetinizdən görüşün vaxtını başqa günə keçirə və ya tam ödənişsiz ləğv edərək ödənişi balansınıza geri qaytara bilərsiniz.'
    },
    {
      q: 'Təlimləri bitirdikdə verilən sertifikat rəsmidirmi?',
      a: 'Bəli, təlimin bütün modullarını və yekun yoxlama testini uğurla bitirdikdə sizin adınıza unikal QR-kodlu və lisenziyalı rəqəmsal sertifikat generasiya edilir. Bu sertifikatı CV-nizə və LinkedIn profilinizə əlavə edə bilərsiniz.'
    },
    {
      q: 'Ödəniş üsulları hansılardır?',
      a: 'Platformada istənilən yerli və ya beynəlxalq bank kartı (Visa, Mastercard, Birbank, Leobank və s.) vasitəsilə təhlükəsiz 3D-Secure sistemi ilə ödəniş edə bilərsiniz.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Tez-Tez Verilən Suallar' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B]">
              Tez-Tez Verilən Suallar (FAQ)
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Platformadan istifadə, seans qaydaları, ödəniş və təhlükəsizliklə bağlı ən çox soruşulan sualların cavabları.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left gap-4"
              >
                <span className="font-bold text-sm text-[#251D4B]">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#251D4B] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8 text-center space-y-2">
          <p className="text-xs text-slate-500">Cavabınızı tapa bilmədiniz?</p>
          <Link
            to="/elaqe"
            className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#191333]"
          >
            Dəstək Xidməti ilə Əlaqə Saxlayın
          </Link>
        </div>
      </div>

    </div>
  );
};
