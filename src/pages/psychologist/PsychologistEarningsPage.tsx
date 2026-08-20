import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Building2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { PSYCHOLOGIST_EARNINGS_MOCK, PsychologistTransactionItem } from '../../data/psychologistMockData';

export const PsychologistEarningsPage: React.FC = () => {
  const [earningsData, setEarningsData] = useState(PSYCHOLOGIST_EARNINGS_MOCK);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('1850');
  const [selectedIban, setSelectedIban] = useState('AZ34NABZ01350100000000123456');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(payoutAmount);
    if (isNaN(amount) || amount <= 0 || amount > earningsData.pendingPayout) {
      alert('Düzgün məbləğ daxil edin');
      return;
    }

    setEarningsData({
      ...earningsData,
      pendingPayout: earningsData.pendingPayout - amount,
      payoutHistory: [
        {
          id: `p-${Date.now()}`,
          date: '20 Avqust 2026',
          amount: amount,
          bankIban: selectedIban,
          status: 'processing'
        },
        ...earningsData.payoutHistory
      ]
    });

    setShowPayoutModal(false);
    showToast(`₼${amount} məbləğində çıxarış sorğusu qeydə alındı və bank hesabınıza yönləndirildi.`);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Gəlirlər və Maliyyə</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Seanslar, vebinarlar və təlimlərdən qazanılan vəsaiti, tranzaksiyaları və bank çıxarışlarını izləyin.
          </p>
        </div>

        <button
          onClick={() => setShowPayoutModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold flex items-center gap-2 shadow-xs self-start sm:self-auto transition-colors"
        >
          <CreditCard className="w-4 h-4 text-[#CADFFD]" />
          <span>Vəsait Çıxarışı Tələb Et</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Toplam Qazanc</span>
            <Wallet className="w-4 h-4 text-[#251D4B]" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">
            ₼{earningsData.totalEarnings.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Platforma üzrə məcmu</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cari Ayın Gəliri</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">
            ₼{earningsData.thisMonthEarnings.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% əvvəlki aya nisbətən</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Çıxarışa Hazır Balans</span>
            <CreditCard className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            ₼{earningsData.pendingPayout.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Həftəlik avtomatik köçürmə</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ortalama Seans</span>
            <Building2 className="w-4 h-4 text-[#251D4B]" />
          </div>
          <div className="text-2xl font-black text-[#251D4B]">
            ₼{earningsData.averageSessionPrice}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">50 dəqiqəlik seans üçün</div>
        </div>

      </div>

      {/* Transactions & Payouts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-sm text-[#251D4B]">Son Tranzaksiyalar</h2>
              <p className="text-xs text-slate-500">Müştəri ödənişləri və xalis gəlir bölgüsü</p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-bold">
              Komissiya 10%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Tarix</th>
                  <th className="py-3 px-4">Mənbə</th>
                  <th className="py-3 px-4">Müştəri</th>
                  <th className="py-3 px-4">Brutto</th>
                  <th className="py-3 px-4">Xalis</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {earningsData.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{tx.date}</td>
                    <td className="py-3.5 px-4 font-bold text-[#251D4B]">{tx.source}</td>
                    <td className="py-3.5 px-4 text-slate-700">{tx.clientName}</td>
                    <td className="py-3.5 px-4 text-slate-500">₼{tx.grossAmount}</td>
                    <td className="py-3.5 px-4 font-black text-emerald-700">₼{tx.netAmount}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Ödənilib
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Payout History */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <h2 className="font-black text-sm text-[#251D4B]">Çıxarış Tarixçəsi</h2>

          <div className="space-y-3">
            {earningsData.payoutHistory.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#251D4B]">₼{p.amount}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.status === 'completed' ? 'Köçürüldü' : 'Emalda'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{p.date}</span>
                  <span className="font-mono">{p.bankIban.slice(0, 8)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Payout Request Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleRequestPayout}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#251D4B]" />
                <h3 className="font-black text-sm text-[#251D4B]">Bank Hesabına Çıxarış</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#CADFFD]/20 border border-[#CADFFD]/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-bold">Mövcud Çıxarış Balansı:</span>
              <span className="text-base font-black text-[#251D4B]">₼{earningsData.pendingPayout}</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bank Hesabı (IBAN)</label>
                <select
                  value={selectedIban}
                  onChange={(e) => setSelectedIban(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                >
                  <option value="AZ34NABZ01350100000000123456">ABB — AZ34NABZ01350100000000123456</option>
                  <option value="AZ78PASH01350100000000987654">Paşa Bank — AZ78PASH01350100000000987654</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Çıxarılacaq Məbləğ (AZN)</label>
                <input
                  type="number"
                  max={earningsData.pendingPayout}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                İmtina
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Sorğunu təsdiq et
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
