import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Send,
  User,
  CheckCircle2,
  Paperclip,
  MessageSquare,
  Search,
  CheckCheck,
  Calendar,
  Sparkles,
  Phone,
  Video,
  Info,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { PSYCHOLOGISTS_DATA, MOCK_USER } from '../../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'psychologist' | 'user';
  text: string;
  time: string;
  isRead?: boolean;
}

export const DashboardMessagesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const recipientParam = searchParams.get('recipient');

  const initialPsychologist =
    PSYCHOLOGISTS_DATA.find((p) => p.id === recipientParam) || PSYCHOLOGISTS_DATA[0];

  const [activePsychologist, setActivePsychologist] = useState(initialPsychologist);
  const [searchFilter, setSearchFilter] = useState('');

  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({
    'dr-leyla-mammadova': [
      {
        id: '1',
        sender: 'psychologist',
        text: `Salam ${MOCK_USER.name} bəy, son seansımızda müzakirə etdiyimiz düşüncə qeydləri tapşırığını tamamlaya bildinizmi?`,
        time: '11:30',
        isRead: true
      },
      {
        id: '2',
        sender: 'user',
        text: 'Salam Leyla xanım. Bəli, həftə ərzində gərginlik hiss etdiyim 3 vəziyyəti qeyd dəftərinə yazdım.',
        time: '11:35',
        isRead: true
      },
      {
        id: '3',
        sender: 'psychologist',
        text: 'Əla! Cümə axşamı saat 15:00-dakı görüşümüzdə onları birlikdə təhlil edəcəyik.',
        time: '11:38',
        isRead: true
      }
    ],
    'terane-eliyeva': [
      {
        id: '1',
        sender: 'psychologist',
        text: `Salam ${MOCK_USER.name} bəy, "Emosional İntellekt" təlimi üzrə sertifikatınızı təbrik edirəm!`,
        time: 'Dünən',
        isRead: true
      },
      {
        id: '2',
        sender: 'user',
        text: 'Təşəkkür edirəm Təranə xanım, dərslər çox faydalı oldu.',
        time: 'Dünən',
        isRead: true
      }
    ],
    'elvin-hesenov': [
      {
        id: '1',
        sender: 'psychologist',
        text: 'Salam, seansdan əvvəl qısa anket suallarını cavablandırmağınızı xahiş edirəm.',
        time: '12 Avq',
        isRead: true
      }
    ]
  });

  const [inputVal, setInputVal] = useState('');

  const currentMessages = conversations[activePsychologist.id] || [];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setConversations({
      ...conversations,
      [activePsychologist.id]: [...currentMessages, newMsg]
    });
    setInputVal('');

    // Simulate doctor response
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'psychologist',
        text: 'Mesajınızı qəbul etdim. Ən qısa zamanda ətraflı cavablandıracağam.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      setConversations((prev) => ({
        ...prev,
        [activePsychologist.id]: [...(prev[activePsychologist.id] || []), replyMsg]
      }));
    }, 1500);
  };

  const quickTemplates = [
    'Salam, növbəti seansımızın vaxtını dəqiqləşdirmək istərdim.',
    'Ev tapşırığı ilə bağlı sualım var idi.',
    'Materialları qeyd etdim, növbəti seansda baxa bilərik.'
  ];

  const filteredPsychologists = PSYCHOLOGISTS_DATA.slice(0, 4).filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in pb-8">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Mesajlar</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Təyin olunmuş psixoloqunuzla təhlükəsiz və tam şifrələnmiş birbaşa əlaqə kanalı.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-bit Uçdan-uca Şifrələnmə</span>
        </div>
      </div>

      {/* Main Chat Layout Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[700px]">
        
        {/* Left Panel: Conversations List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/40">
          
          {/* Search bar inside list */}
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Mütəxəssis axtar..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {filteredPsychologists.map((psy) => {
              const msgs = conversations[psy.id] || [];
              const lastMsg = msgs[msgs.length - 1];
              const isSelected = activePsychologist.id === psy.id;

              return (
                <button
                  key={psy.id}
                  onClick={() => setActivePsychologist(psy)}
                  className={`w-full p-3.5 rounded-2xl flex items-start gap-3 text-left transition-all ${
                    isSelected
                      ? 'bg-white shadow-xs border border-slate-200'
                      : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={psy.photo}
                      alt={psy.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#251D4B] truncate">{psy.name}</h4>
                      {lastMsg && (
                        <span className="text-[10px] text-slate-400 font-medium">{lastMsg.time}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{psy.title}</p>
                    {lastMsg && (
                      <p className="text-[11px] text-slate-600 truncate mt-1">
                        {lastMsg.sender === 'user' ? 'Siz: ' : ''}{lastMsg.text}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / Main Panel: Active Conversation View */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3.5">
              <img
                src={activePsychologist.photo}
                alt={activePsychologist.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-[#251D4B]">{activePsychologist.name}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs text-slate-500">{activePsychologist.title} • Şəbəkədədir</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/seans/rezervasiya?psychologist=${activePsychologist.id}`}
                className="px-3.5 py-2 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                <span className="hidden sm:inline">Seans Rezerv Et</span>
              </Link>
              <Link
                to={`/psixoloqlar/${activePsychologist.id}`}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                title="Profilə bax"
              >
                <Info className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {/* Disclaimer notice */}
            <div className="max-w-md mx-auto p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center text-[11px] text-amber-800 font-medium">
              🔒 Qeyd: Mesajlaşma seanslararası suallar üçündür. Təcili krizis hallarında zəhmət olmasa təcili tibbi xidmətə müraciət edin.
            </div>

            {currentMessages.map((msg) => {
              const isMe = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={activePsychologist.photo}
                      alt={activePsychologist.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-xl object-cover shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-md p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-[#251D4B] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${
                        isMe ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Templates */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#251D4B]" /> Şablon:
            </span>
            {quickTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => setInputVal(tmpl)}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold whitespace-nowrap transition-colors"
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Fayl yükləmə dialoqu: Qeydlərinizi və ya test nəticələrinizi əlavə edin.')}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
              title="Fayl əlavə et"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 px-4 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] disabled:opacity-40 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-[#CADFFD]" />
              <span className="hidden sm:inline">Göndər</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
