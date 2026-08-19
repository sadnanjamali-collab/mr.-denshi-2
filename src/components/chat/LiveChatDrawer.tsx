import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Languages, 
  ShieldCheck, 
  Paperclip, 
  Sparkles, 
  ShoppingBag,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { formatPrice } from '../../utils/currency';

export const LiveChatDrawer: React.FC = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    chatMessages, 
    sendChatMessage, 
    products, 
    currency, 
    locale, 
    addToCart,
    setSelectedProductForDetail 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [showProductAttach, setShowProductAttach] = useState(false);
  const [selectedAttachProduct, setSelectedAttachProduct] = useState(products[0]);
  const [showOriginalLanguage, setShowOriginalLanguage] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    sendChatMessage(inputMsg.trim(), showProductAttach ? {
      id: selectedAttachProduct.id,
      title: selectedAttachProduct.title,
      priceMinorUnits: selectedAttachProduct.variants[0].priceMinorUnits,
      image: selectedAttachProduct.images[0]
    } : undefined);

    setInputMsg('');
    setShowProductAttach(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#131921] border-l border-slate-700 h-full shadow-2xl flex flex-col text-white animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#232f3e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                alt="Tokyo Support"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">Akihabara Direct Support Desk</h3>
                <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono">
                Hiroshi Tanaka • Japanese Technical Lead
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOriginalLanguage(!showOriginalLanguage)}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                showOriginalLanguage ? 'bg-amber-500/20 text-[#febd69] border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle AI Translation"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="text-[10px]">AI Translate</span>
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => {
            const isMe = msg.senderRole === 'BUYER';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <span>{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#ffd814] text-slate-950 rounded-br-none shadow-md font-medium'
                      : 'bg-slate-800 text-white rounded-bl-none border border-slate-700'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* AI Translation display if available */}
                  {!isMe && msg.translatedText && showOriginalLanguage && (
                    <div className="mt-2 pt-2 border-t border-slate-700 text-[11px] text-[#febd69] font-sans">
                      <div className="text-[9px] font-mono text-slate-400 flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>AI English Translation:</span>
                      </div>
                      <p>{msg.translatedText}</p>
                    </div>
                  )}

                  {/* Attached Product Card */}
                  {msg.attachedProduct && (
                    <div className="mt-2 bg-slate-900/90 text-white rounded-xl p-2 border border-slate-700 flex items-center gap-2.5">
                      <img
                        src={msg.attachedProduct.image}
                        alt=""
                        className="w-10 h-10 rounded object-contain bg-white p-0.5 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[11px] truncate text-white">
                          {msg.attachedProduct.title}
                        </div>
                        <div className="text-[10px] text-[#febd69] font-mono">
                          {formatPrice(msg.attachedProduct.priceMinorUnits, currency, locale)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Product Attachment Preview / Selector */}
        {showProductAttach && (
          <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-bold">Attach Product for Technical Voltage Verification</span>
              <button
                onClick={() => setShowProductAttach(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <select
              value={selectedAttachProduct.id}
              onChange={(e) => {
                const prod = products.find(p => p.id === e.target.value);
                if (prod) setSelectedAttachProduct(prod);
              }}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#febd69]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} - {p.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quick Question Presets */}
        <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <button
            onClick={() => setInputMsg('Is this 100V model compatible with my step-down transformer?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            ⚡ Voltage Compatibility
          </button>
          <button
            onClick={() => setInputMsg('Can you confirm Haneda bonded warehouse dispatch time?')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            ✈️ Flight Dispatch
          </button>
          <button
            onClick={() => setInputMsg('Please verify the Japanese METI PSE Diamond Certificate.')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
          >
            🛡️ PSE Certificate
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-[#131921] border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowProductAttach(!showProductAttach)}
            className={`p-2 rounded-xl transition-colors ${
              showProductAttach ? 'bg-[#ffd814] text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Attach Product"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type message in any language..."
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd814]"
          />

          <button
            type="submit"
            className="p-2 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold rounded-xl shadow-md border border-[#fcd200] transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
