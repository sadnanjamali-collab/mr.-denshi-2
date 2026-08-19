import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Plus, 
  Send, 
  Check, 
  ExternalLink,
  Tag,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ShoppingCart
} from 'lucide-react';
import { formatPrice } from '../../utils/currency';

export const CommunityTrends: React.FC = () => {
  const { 
    communityDiscussions, 
    likeCommunityDiscussion, 
    addDiscussionReply, 
    addCommunityDiscussion,
    products,
    addToCart,
    setSelectedProductForDetail,
    currency,
    locale
  } = useApp();

  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [expandedDiscussionId, setExpandedDiscussionId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<{ [id: string]: string }>({});
  const [isPostingNew, setIsPostingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('#100V_Kamado');
  const [selectedProductIdForNew, setSelectedProductIdForNew] = useState(products[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tags = [
    'ALL',
    '#100V_Kamado',
    '#HiRes_Audio',
    '#Fujifilm_ColorRecipes',
    '#StepDownTransformer',
    '#Akiba_Custom_PC'
  ];

  const filteredDiscussions = communityDiscussions.filter(disc => {
    if (selectedTag === 'ALL') return true;
    return disc.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
  });

  const handleReplySubmit = (discussionId: string) => {
    const text = replyInput[discussionId];
    if (!text || !text.trim()) return;

    addDiscussionReply(discussionId, text.trim());
    setReplyInput(prev => ({ ...prev, [discussionId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const matchedProd = products.find(p => p.id === selectedProductIdForNew);

    addCommunityDiscussion({
      authorName: 'You (Verified Buyer)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      authorLocation: 'Global Tech Enthusiast',
      authorBadge: 'COMMUNITY MEMBER',
      title: newTitle,
      content: newContent,
      tags: [newTag, '#TokyoDirect'],
      productId: matchedProd?.id,
      productName: matchedProd?.title,
      productImage: matchedProd?.images[0],
      isTrending: true
    });

    setNewTitle('');
    setNewContent('');
    setIsPostingNew(false);
  };

  const handleShare = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#232f3e] flex items-center justify-center text-[#ff9900]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              Akihabara Community Trends & Live Discussions
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold font-mono">
                LIVE SOCIAL COMMERCE
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real experiences, audio frequency measurements, 100V transformer tips, and culinary science from global owners.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPostingNew(true)}
            className="px-4 py-2 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Share Your Experience (+25 Pts)</span>
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-[#232f3e] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {tag === 'ALL' ? '🔥 All Trending Threads' : tag}
          </button>
        ))}
      </div>

      {/* New Post Form Modal */}
      {isPostingNew && (
        <div className="bg-slate-50 border-2 border-dashed border-[#ff9900] rounded-xl p-5 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff9900]" />
              <span>Create New Electronic Discussion Thread</span>
            </h3>
            <button
              onClick={() => setIsPostingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Thread Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. My test results running Zojirushi Kamado with a 1500W Step-Down Transformer..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#ff9900]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Related Electronic Product</label>
                <select
                  value={selectedProductIdForNew}
                  onChange={(e) => setSelectedProductIdForNew(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#ff9900]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} - {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Topic Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#ff9900]"
                >
                  <option value="#100V_Kamado">#100V_Kamado (Culinary)</option>
                  <option value="#HiRes_Audio">#HiRes_Audio (Audiophile)</option>
                  <option value="#StepDownTransformer">#StepDownTransformer (Power)</option>
                  <option value="#Fujifilm_ColorRecipes">#Fujifilm_ColorRecipes (Optics)</option>
                  <option value="#Akiba_Custom_PC">#Akiba_Custom_PC (Hardware)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Technical Review & Thoughts</label>
              <textarea
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share voltage readings, soundstage impressions, rice texture results, or packaging conditions from Tokyo..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#ff9900]"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs rounded-lg border border-[#fcd200] shadow-xs"
              >
                Publish Discussion Thread
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Discussion Cards Grid */}
      <div className="space-y-4">
        {filteredDiscussions.map((disc) => {
          const isExpanded = expandedDiscussionId === disc.id;
          const matchedProduct = products.find(p => p.id === disc.productId);

          return (
            <div
              key={disc.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={disc.authorAvatar}
                    alt={disc.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{disc.authorName}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                        {disc.authorBadge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {disc.authorLocation} • {new Date(disc.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {disc.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-amber-50 text-[#c7511f] font-mono text-[10px] font-bold border border-amber-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Content */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  {disc.title}
                </h3>
                {disc.japaneseTitle && (
                  <div className="text-xs text-slate-500 font-sans italic">
                    {disc.japaneseTitle}
                  </div>
                )}
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {disc.content}
                </p>
              </div>

              {/* Linked Product Card (if any) */}
              {matchedProduct && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedProduct.images[0]}
                      alt={matchedProduct.title}
                      className="w-12 h-12 rounded object-contain bg-white p-1 border border-slate-200 shrink-0 cursor-pointer"
                      onClick={() => setSelectedProductForDetail(matchedProduct)}
                    />
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{matchedProduct.brand}</div>
                      <div
                        onClick={() => setSelectedProductForDetail(matchedProduct)}
                        className="text-xs font-bold text-slate-900 hover:text-[#c7511f] cursor-pointer line-clamp-1"
                      >
                        {matchedProduct.title}
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {formatPrice(matchedProduct.variants[0].priceMinorUnits, currency, locale)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(matchedProduct, matchedProduct.variants[0], 1)}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => setSelectedProductForDetail(matchedProduct)}
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              )}

              {/* Action Bar (Like, Comments count, Share) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => likeCommunityDiscussion(disc.id)}
                    className="flex items-center gap-1.5 hover:text-[#ff9900] font-medium"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{disc.likesCount} Helpful Votes</span>
                  </button>

                  <button
                    onClick={() => setExpandedDiscussionId(isExpanded ? null : disc.id)}
                    className="flex items-center gap-1.5 hover:text-[#007185] font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{disc.replies.length} Replies</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleShare(disc.id)}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-900"
                >
                  {copiedId === disc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Thread</span>
                    </>
                  )}
                </button>
              </div>

              {/* Replies Accordion */}
              {isExpanded && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {disc.replies.map((rep) => (
                      <div key={rep.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={rep.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                            <span className="font-bold text-slate-900">{rep.author}</span>
                            {rep.isSellerOrExpert && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold">
                                TOKYO EXPERT
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{rep.time}</span>
                        </div>
                        <p className="text-slate-700 pl-7">{rep.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Reply Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyInput[disc.id] || ''}
                      onChange={(e) => setReplyInput(prev => ({ ...prev, [disc.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleReplySubmit(disc.id);
                      }}
                      placeholder="Add to this technical discussion..."
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#ff9900]"
                    />
                    <button
                      onClick={() => handleReplySubmit(disc.id)}
                      className="px-3 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs rounded-lg border border-[#fcd200] shadow-xs flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
