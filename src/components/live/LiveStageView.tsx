import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Eye, 
  Heart, 
  MessageSquare, 
  ShoppingBag, 
  Send, 
  Sparkles, 
  Flame, 
  Check, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Calendar, 
  Clock, 
  Zap, 
  ShieldCheck,
  Share2,
  ThumbsUp,
  Tv
} from 'lucide-react';
import { formatPrice } from '../../utils/currency';
import { LiveStreamSession } from '../../types';

interface FloatingHeart {
  id: number;
  x: number;
}

export const LiveStageView: React.FC = () => {
  const {
    liveStreams,
    activeLiveStream,
    setActiveLiveStream,
    products,
    addToCart,
    setSelectedProductForDetail,
    currency,
    locale
  } = useApp();

  const currentStream = activeLiveStream || liveStreams[0];
  const pinnedProduct = products.find(p => p.id === currentStream.pinnedProductId) || products[0];

  const [chatComments, setChatComments] = useState<Array<{ id: string; user: string; text: string; time: string; isHost?: boolean; badge?: string }>>([
    { id: '1', user: 'TokyoAudiophile', text: 'Does this Sony MDR-Z1R include the 4.4mm balanced cable in the wooden case?', time: '12:04', badge: 'VIP' },
    { id: '2', user: 'US_Chef_Dan', text: 'Watching the rice cook in real time! The steam aroma looks incredible.', time: '12:05' },
    { id: '3', user: 'Kenji Takahashi', text: 'Yes, all Zojirushi and Sony units demonstrated are 100% Japanese domestic stock with PSE diamond stamps!', time: '12:06', isHost: true },
    { id: '4', user: 'Berlin_Sound_Lab', text: 'Just claimed the 1-click live coupon to Germany with DDP duty paid!', time: '12:07' }
  ]);

  const [newComment, setNewComment] = useState('');
  const [heartCount, setHeartCount] = useState(2890);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewerCount, setViewerCount] = useState(currentStream.viewerCount);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Periodic heartbeat for live viewer fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatComments]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userMsg = {
      id: `chat-${Date.now()}`,
      user: 'You (International Buyer)',
      text: newComment,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatComments(prev => [...prev, userMsg]);
    setNewComment('');

    // Simulated host reply after 3s
    setTimeout(() => {
      setChatComments(prev => [
        ...prev,
        {
          id: `host-${Date.now()}`,
          user: currentStream.hostName,
          text: 'Thank you for your question! We inspect every unit before dispatch at Haneda air cargo hub.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isHost: true
        }
      ]);
    }, 3000);
  };

  const handleAddHeart = () => {
    setHeartCount(prev => prev + 1);
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 60 + 20
    };
    setFloatingHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1800);
  };

  const toggleReminder = (streamId: string) => {
    setReminders(prev => ({
      ...prev,
      [streamId]: !prev[streamId]
    }));
  };

  const upcomingStreams = [
    {
      id: 'up-1',
      title: 'Fujifilm X100VI Sensor Calibration & Tokyo Street Optics Guide',
      time: 'Tomorrow, 19:00 JST',
      host: 'Takumi Shimizu (Tokyo Camera Master)',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'
    },
    {
      id: 'up-2',
      title: 'Anker Solix & Japanese Backup Power Stations for Remote Creators',
      time: 'Friday, 21:00 JST',
      host: 'Kenji Takahashi',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Section: Stage Header & Multi-channel tabs */}
      <div className="bg-[#131921] text-white rounded-xl p-5 border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#cc0c39] text-white font-black text-xs font-mono flex items-center gap-1.5 shadow-sm animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>LIVE COMMERCE STAGE</span>
            </span>
            <span className="text-xs font-mono text-slate-300">
              Direct Broadcast from Akihabara Sotokanda Studios, Tokyo
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {currentStream.title}
          </h1>
        </div>

        {/* Channels Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {liveStreams.map((stream, idx) => (
            <button
              key={stream.id}
              onClick={() => setActiveLiveStream(stream)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                stream.id === currentStream.id
                  ? 'bg-[#ffd814] text-slate-900 shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Channel {idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Broadcast Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High-Def Video Stream Player Stage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-16/9 bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between p-4 sm:p-6">
            {/* Background Stream Image / Canvas Feed */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentStream.coverImage}
                alt="Live Stream Feed"
                className="w-full h-full object-cover opacity-70 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/80"></div>
            </div>

            {/* Floating Floating Hearts Animation */}
            {floatingHearts.map((heart) => (
              <div
                key={heart.id}
                style={{ left: `${heart.x}%` }}
                className="absolute bottom-20 z-30 pointer-events-none animate-bounce text-red-500"
              >
                <Heart className="w-8 h-8 fill-red-500 drop-shadow-lg" />
              </div>
            ))}

            {/* Stream Top HUD */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#cc0c39] text-white font-black text-xs font-mono flex items-center gap-1.5 shadow-md">
                  <Radio className="w-3.5 h-3.5 animate-ping" />
                  <span>ON AIR</span>
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-xs font-mono text-slate-200 border border-slate-700">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{viewerCount.toLocaleString()} Viewers</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700 text-[10px] font-mono hidden sm:inline-block">
                  1080p 60FPS DDP Guaranteed
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Stream HUD: Host info & Pinned Product Deal Card */}
            <div className="relative z-10 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
              {/* Host Avatar Badge */}
              <div className="flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                <img
                  src={currentStream.hostAvatar}
                  alt={currentStream.hostName}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">{currentStream.hostName}</div>
                  <div className="text-[10px] text-slate-400">{currentStream.location}</div>
                </div>
              </div>

              {/* Pinned Flash Special Deal Card */}
              <div className="w-full sm:max-w-md bg-[#131921]/95 backdrop-blur-md border border-[#febd69]/50 rounded-2xl p-3 shadow-2xl flex items-center gap-3 text-white">
                <img
                  src={pinnedProduct.images[0]}
                  alt=""
                  className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-slate-700 shrink-0 cursor-pointer"
                  onClick={() => setSelectedProductForDetail(pinnedProduct)}
                />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="text-[10px] font-mono text-[#febd69] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#cc0c39]" />
                    <span>PINNED LIVE SPECIAL (15% OFF)</span>
                  </div>
                  <h4
                    onClick={() => setSelectedProductForDetail(pinnedProduct)}
                    className="text-xs font-bold text-white truncate cursor-pointer hover:text-[#febd69]"
                  >
                    {pinnedProduct.title}
                  </h4>
                  <div className="text-sm font-black text-[#febd69] font-mono">
                    {formatPrice(pinnedProduct.variants[0].priceMinorUnits, currency, locale)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(pinnedProduct, pinnedProduct.variants[0], 1)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-black text-xs flex items-center gap-1 shadow-lg shadow-[#ffd814]/20 transition-all shrink-0 border border-[#fcd200]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy Live</span>
                </button>
              </div>
            </div>
          </div>

          {/* Under player host details & Stream highlights */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-slate-900">
                {currentStream.japaneseTitle}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddHeart}
                className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center gap-2 border border-red-200 transition-all transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-red-600" />
                <span>{heartCount.toLocaleString()} Loves</span>
              </button>

              <button
                onClick={() => setSelectedProductForDetail(pinnedProduct)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors"
              >
                Inspect Technical Specs
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Chat & Upcoming Streams Schedule */}
        <div className="space-y-6">
          {/* Real-time Interactive Chat */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col h-[480px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-3.5 bg-[#232f3e] text-white border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#febd69]" />
                <span className="font-bold text-xs">Live Stage Chat Room</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-slate-50">
              {chatComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-2.5 rounded-lg border ${
                    comment.isHost
                      ? 'bg-amber-50/80 border-amber-200 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">
                        {comment.user}
                      </span>
                      {comment.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-mono text-[9px] font-bold">
                          {comment.badge}
                        </span>
                      )}
                      {comment.isHost && (
                        <span className="px-1.5 py-0.2 rounded bg-[#cc0c39] text-white font-mono text-[9px] font-black">
                          HOST
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{comment.time}</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed">{comment.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendComment} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask host a question about specs, voltage..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff9900]"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold border border-[#fcd200] shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Upcoming Akihabara Stream Schedule */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-[#ff9900]" />
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Upcoming Live Broadcasts
              </h3>
            </div>

            <div className="space-y-3">
              {upcomingStreams.map((stream) => (
                <div key={stream.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <img
                    src={stream.thumbnail}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{stream.title}</h4>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{stream.time}</span>
                    </div>
                    <div className="text-[10px] text-[#007185] font-medium">{stream.host}</div>
                  </div>
                  <button
                    onClick={() => toggleReminder(stream.id)}
                    className={`px-2.5 py-1.5 rounded text-[11px] font-bold transition-colors ${
                      reminders[stream.id]
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    }`}
                  >
                    {reminders[stream.id] ? 'Reminded' : 'Remind'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
