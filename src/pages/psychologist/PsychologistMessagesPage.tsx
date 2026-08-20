import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Smile,
  ShieldCheck,
  Video,
  Clock,
  CheckCheck,
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';
import { PSYCHOLOGIST_MESSAGES_MOCK, PsychologistChatThread } from '../../data/psychologistMockData';

export const PsychologistMessagesPage: React.FC = () => {
  const [threads, setThreads] = useState<PsychologistChatThread[]>(PSYCHOLOGIST_MESSAGES_MOCK);
  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]?.id || 'th-1');
  const [newMessageText, setNewMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !currentThread) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'psychologist' as const,
      text: newMessageText.trim(),
      timestamp: 'Bu gün, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(
      threads.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              lastMessage: newMsg.text,
              lastMessageTime: 'İndi',
              messages: [...t.messages, newMsg]
            }
          : t
      )
    );

    setNewMessageText('');
  };

  const handleQuickTemplate = (templateText: string) => {
    setNewMessageText(templateText);
  };

  const filteredThreads = threads.filter((t) =>
    t.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Mesajlar</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Müştərilərinizlə təhlükəsiz və şifrələnmiş birbaşa əlaqə kanalı.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Məxfi və Təhlükəsiz</span>
        </div>
      </div>

      {/* Main Chat Interface Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden h-[75vh] flex flex-col md:flex-row">
        
        {/* Left Side: Threads List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          
          {/* Search Box */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Söhbətlərdə axtar..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
              />
            </div>
          </div>

          {/* Threads Scrollable Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredThreads.map((th) => {
              const isSelected = th.id === selectedThreadId;
              return (
                <div
                  key={th.id}
                  onClick={() => setSelectedThreadId(th.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#CADFFD]/30 border-l-4 border-[#251D4B]' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <img
                    src={th.clientPhoto}
                    alt={th.clientName}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-xs text-[#251D4B] truncate">{th.clientName}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{th.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{th.lastMessage}</p>
                  </div>
                  {th.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#251D4B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {th.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat View */}
        {currentThread ? (
          <div className="flex-1 flex flex-col h-full bg-white">
            
            {/* Chat Top Header */}
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={currentThread.clientPhoto}
                  alt={currentThread.clientName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-black text-xs text-[#251D4B]">{currentThread.clientName}</h3>
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Aktiv müştəri</span>
                  </div>
                </div>
              </div>

              {/* Quick Session Launcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickTemplate('Salam! Bugünkü onlayn seansımızın linki: https://meet.dayaq.az/cbt-room')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#CADFFD]/30 border border-slate-200 text-xs font-bold text-[#251D4B]"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Seans linki göndər</span>
                </button>
              </div>
            </div>

            {/* Quick Response Suggestion Chips */}
            <div className="px-6 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-bold shrink-0">Şablonlar:</span>
              <button
                onClick={() => handleQuickTemplate('Salam, seans qeydlərinizə əsasən gündəlik qeydiyyat cədvəlini doldurmağı unutmayın.')}
                className="px-3 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 whitespace-nowrap"
              >
                Ev tapşırığı xatırlatması
              </button>
              <button
                onClick={() => handleQuickTemplate('Salam, seans vaxtını sabah saat 15:00-a dəyişmək sizin üçün uyğundur?')}
                className="px-3 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 whitespace-nowrap"
              >
                Vaxt dəyişmə təklifi
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
              {currentThread.messages.map((msg) => {
                const isMe = msg.sender === 'psychologist';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-3xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#251D4B] text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 bg-white flex items-center gap-3 shrink-0"
            >
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Müştəriyə mesaj yazın..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
              />
              <button
                type="submit"
                className="p-3 bg-[#251D4B] hover:bg-[#1a1435] text-white rounded-2xl transition-colors shadow-xs"
              >
                <Send className="w-4 h-4 text-[#CADFFD]" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
            Söhbət seçilməyib
          </div>
        )}

      </div>

    </div>
  );
};
