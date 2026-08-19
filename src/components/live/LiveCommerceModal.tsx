import React, { useState } from 'react';
import { X, Radio, Eye, Heart, MessageSquare, ShoppingBag, Send, Sparkles, Flame, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';

export const LiveCommerceModal: React.FC = () => {
  const {
    isLiveCommerceOpen,
    setIsLiveCommerceOpen,
    activeLiveStream,
    currency,
    locale,
    products,
    addToCart,
    setSelectedProductForDetail
  } = useApp();

  const [chatComments, setChatComments] = useState<Array<{ user: string; text: string; time: string; badge?: string }>>([
    { user: 'TokyoAudiophile', text: 'Does this Sony MDR-Z1R include the 4.4mm balanced cable in the wooden case?', time: '12:04', badge: 'VIP' },
    { user: 'US_Chef_Dan', text: 'Watching the rice cook in real time! The steam control is incredible.', time: '12:05' },
    { user: 'Sato_San', text: 'Yes, all Zojirushi models demonstrated are 100% Japanese domestic stock with PSE stamps!', time: '12:06', badge: 'HOST' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [heartCount, setHeartCount] = useState(1482);

  if (!isLiveCommerceOpen || !activeLiveStream) return null;

  const pinnedProduct = products.find(p => p.id === activeLiveStream.pinnedProductId) || products[0];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setChatComments(prev => [
      ...prev,
      {
        user: 'You (International Buyer)',
        text: newComment,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewComment('');
  };

  const handleAddHeart = () => {
    setHeartCount(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full h-[88vh] shadow-2xl relative text-slate-100 flex flex-col md:flex-row overflow-hidden">
        {/* Top Close Button for Mobile */}
        <button
          onClick={() => setIsLiveCommerceOpen(false)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-950/80 text-white border border-slate-700 md:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Video Player Stage */}
        <div className="flex-1 bg-slate-950 relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          {/* Simulated Video Feed Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=1200&q=80"
              alt="Live Stream"
              className="w-full h-full object-cover opacity-60 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
          </div>

          {/* Top Live Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-red-600/40">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>LIVE AKIHABARA</span>
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-xs font-mono text-slate-300 border border-slate-700">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeLiveStream.liveViewerCount.toLocaleString()} Viewers</span>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-slate-300 hidden sm:block">
              <span className="text-amber-400 font-bold">{activeLiveStream.hostName}</span>
              <div className="text-[10px] text-slate-400">{activeLiveStream.hostLocation}</div>
            </div>
          </div>

          {/* Bottom Floating Pinned Deal Card */}
          <div className="relative z-10 max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/90 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
            <img
              src={pinnedProduct.images[0]}
              alt=""
              className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0 cursor-pointer"
              onClick={() => setSelectedProductForDetail(pinnedProduct)}
            />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="text-[10px] font-mono text-red-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>PINNED LIVE SPECIAL</span>
              </div>
              <h4
                onClick={() => setSelectedProductForDetail(pinnedProduct)}
                className="text-xs font-bold text-white truncate cursor-pointer hover:text-red-400"
              >
                {pinnedProduct.title}
              </h4>
              <div className="text-sm font-black text-white font-mono">
                {formatPrice(pinnedProduct.variants[0].priceMinorUnits, currency, locale)}
              </div>
            </div>

            <button
              onClick={() => addToCart(pinnedProduct, pinnedProduct.variants[0], 1)}
              className="px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg shadow-red-600/30 transition-all shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Live</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Chat & Reactions */}
        <div className="w-full md:w-80 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-xs text-white">Live Stream Chat</span>
            </div>
            <button
              onClick={() => setIsLiveCommerceOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white hidden md:block"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Comments Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {chatComments.map((c, idx) => (
              <div key={idx} className="space-y-0.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-slate-300 flex items-center gap-1">
                    {c.user}
                    {c.badge && (
                      <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[9px]">
                        {c.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-slate-500">{c.time}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input & Floating Reactions */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[10px]">Tap hearts to cheer host:</span>
              <button
                onClick={handleAddHeart}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold hover:scale-105 transition-transform"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{heartCount}</span>
              </button>
            </div>

            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask host a question..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
