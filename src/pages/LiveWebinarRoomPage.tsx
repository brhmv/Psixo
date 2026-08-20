import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WEBINARS_DATA } from '../data/mockData';
import {
  Video,
  Radio,
  Users,
  Send,
  MessageSquare,
  HelpCircle,
  Download,
  Hand,
  Smile,
  X,
  Volume2,
  Maximize2,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const LiveWebinarRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const webinar = WEBINARS_DATA.find((w) => w.id === id) || WEBINARS_DATA[0];

  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'qa' | 'resources'>('chat');
  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; text: string; time: string }[]>([
    { id: '1', user: 'Günel H.', text: 'Salam hər kəsə! Səs və görüntü əladır.', time: '20:01' },
    { id: '2', user: 'Vüqar M.', text: 'Dr. Leyla xanım, təqdimat slaydlarını sonra yükləyə biləcəyik?', time: '20:03' },
    { id: '3', user: 'Moderator', text: 'Bəli, Slaydlar "Resurslar" bölməsində PDF formatda aktivdir.', time: '20:04' }
  ]);

  const [newMsg, setNewMsg] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [reactionCounter, setReactionCounter] = useState(148);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const msg = {
      id: Date.now().toString(),
      user: 'Siz (Ayan Ə.)',
      text: newMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, msg]);
    setNewMsg('');
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      
      {/* Top Learning / Webinar Header */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/30 border border-rose-500/50 text-rose-400 text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>CANLI YAYIM</span>
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md">
            {webinar.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{webinar.registeredCount + 42} Onlayn Dinləyici</span>
          </div>

          <Link
            to={`/vebinarlar/${webinar.id}`}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
          >
            <span>Otaqdan Çıx</span>
            <X className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Grid: Stream on Left, Interactive Chat & Q&A on Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Stream Area (8 cols) */}
        <div className="lg:col-span-8 bg-black flex flex-col justify-between p-4 sm:p-6 relative">
          
          {/* Simulated Video Player */}
          <div className="flex-1 aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center">
            
            <img
              src={webinar.coverImage}
              alt={webinar.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xs"
            />

            {/* Presenter Box Overlay */}
            <div className="relative z-10 text-center space-y-4 max-w-md p-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-400 mx-auto shadow-2xl relative">
                <img
                  src={webinar.speaker.photo}
                  alt={webinar.speaker.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">{webinar.speaker.name}</div>
                <div className="text-xs text-slate-300">{webinar.speaker.title}</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">Mikrofon Aktivdir · Danışır</div>
              </div>
            </div>

            {/* Live badges */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Full HD 1080p · 60 FPS</span>
            </div>

          </div>

          {/* Player Toolbar Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  handRaised
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                <Hand className="w-4 h-4" />
                <span>{handRaised ? 'Əl Qaldırıldı' : 'Əl Qaldır (Söz İstə)'}</span>
              </button>

              <button
                onClick={() => setReactionCounter(prev => prev + 1)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{reactionCounter}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Spiker: <strong>{webinar.speaker.name}</strong>
            </div>
          </div>

        </div>

        {/* Interactive Chat & Q&A Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 border-l border-slate-800 flex flex-col h-full max-h-[calc(100vh-4rem)]">
          
          {/* Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`py-3.5 border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeSideTab === 'chat'
                  ? 'border-[#CADFFD] text-[#CADFFD] bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Canlı Çat</span>
            </button>

            <button
              onClick={() => setActiveSideTab('qa')}
              className={`py-3.5 border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeSideTab === 'qa'
                  ? 'border-[#CADFFD] text-[#CADFFD] bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Sual-Cavab</span>
            </button>

            <button
              onClick={() => setActiveSideTab('resources')}
              className={`py-3.5 border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeSideTab === 'resources'
                  ? 'border-[#CADFFD] text-[#CADFFD] bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resurslar</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            
            {activeSideTab === 'chat' && (
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#CADFFD]">{msg.user}</span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-normal">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSideTab === 'qa' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  Spikerə sual ünvanlayın. Q&A sessiyasında mütəxəssis canlı cavablandıracaq.
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-200">
                    Sual: Panik tutma anında nəfəs sayını necə nəzarətdə saxlamalı?
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Spiker tərəfindən cavablandırıldı</span>
                  </div>
                </div>
              </div>
            )}

            {activeSideTab === 'resources' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-white">Vebinar Təqdimatı PDF</div>
                    <div className="text-[11px] text-slate-400">Dr. Leyla Məmmədova · 4.8 MB</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#CADFFD] text-[#251D4B] flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Yüklə</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Fikir və ya sualınızı yazın..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#CADFFD]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#CADFFD] text-[#251D4B] hover:bg-[#b5d4fe] font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
