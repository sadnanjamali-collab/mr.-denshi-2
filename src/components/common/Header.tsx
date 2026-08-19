import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  Camera, 
  Radio, 
  Zap, 
  Store, 
  LayoutDashboard, 
  Menu,
  X,
  ChevronDown,
  MapPin,
  Truck,
  Globe,
  SlidersHorizontal,
  Gift,
  ShieldCheck,
  Check,
  Flame,
  User,
  Bell,
  MessageSquare,
  Users,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GLOBAL_MARKETS } from '../../data/markets';
import { SupportedLocale, MarketId, CurrencyCode } from '../../types';
import { formatPrice } from '../../utils/currency';
import { t } from '../../utils/i18n';

interface LanguageOption {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語 - JA', flag: '🇯🇵' },
  { code: 'en-US', name: 'English', nativeName: 'English - EN', flag: '🇺🇸' },
  { code: 'zh-CN', name: 'Chinese Simplified', nativeName: '简体中文 - ZH', flag: '🇨🇳' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어 - KO', flag: '🇰🇷' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch - DE', flag: '🇩🇪' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français - FR', flag: '🇫🇷' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español - ES', flag: '🇪🇸' },
  { code: 'ar-AE', name: 'Arabic', nativeName: 'العربية - AR', flag: '🇦🇪' }
];

const SUPPORTED_CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'JPY', label: 'Japanese Yen (JPY)', symbol: '¥' },
  { code: 'USD', label: 'US Dollar (USD)', symbol: '$' },
  { code: 'EUR', label: 'Euro (EUR)', symbol: '€' },
  { code: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
  { code: 'AUD', label: 'Australian Dollar (AUD)', symbol: 'A$' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$' },
  { code: 'TWD', label: 'New Taiwan Dollar (TWD)', symbol: 'NT$' },
  { code: 'CAD', label: 'Canadian Dollar (CAD)', symbol: 'CA$' },
  { code: 'HKD', label: 'Hong Kong Dollar (HKD)', symbol: 'HK$' }
];

export const Header: React.FC = () => {
  const {
    activePortal,
    setActivePortal,
    activeBuyerTab,
    setActiveBuyerTab,
    currentMarket,
    setMarketById,
    currency,
    setCurrency,
    locale,
    setLocale,
    b2bMode,
    setB2bMode,
    cartCount,
    cartSubtotalJPY,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartOpen,
    setIsAIAssistantOpen,
    setIsVisualSearchOpen,
    setIsComparisonModalOpen,
    setIsCompatibilityStudioOpen,
    setIsLiveCommerceOpen,
    setIsSellerPortalOpen,
    setIsAdminDashboardOpen,
    setIsOrderTrackerOpen,
    setIsAccountModalOpen,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    setIsChatOpen,
    vipPoints,
    dailyCheckedIn,
    handleDailyCheckIn
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === locale) || SUPPORTED_LANGUAGES[1];

  const departments = [
    { label: 'All', category: 'ALL' },
    { label: '100V JDM Kitchen & Cookers', category: 'JAPANESE_APPLIANCES' },
    { label: 'Audiophile & Hi-Res Audio', category: 'AUDIO_HIFI' },
    { label: 'Akihabara PC & Components', category: 'COMPUTERS_COMPONENTS' },
    { label: 'Step-Down Transformers', category: 'CABLES_POWER_ACCESSORIES' },
    { label: 'Japanese Cameras & Glass', category: 'CAMERAS_OPTICS' },
    { label: 'Smart Home & IoT Modules', category: 'IOT_SMART_HOME' }
  ];

  const searchSuggestions = [
    'Zojirushi 100V IH Kamado Rice Cooker',
    'Sony Signature MDR-Z1R 70mm HD',
    'Nissyo 1500W Toroidal Transformer',
    'Balmuda The Toaster Pro 100V',
    'Anker Prime 240W GaN Station',
    'AMD Ryzen 9 9950X Akihabara Rig'
  ];

  const handleSelectLanguage = (langCode: SupportedLocale) => {
    setLocale(langCode);
    setIsLangMenuOpen(false);
  };

  const handleSelectCurrency = (currCode: CurrencyCode) => {
    setCurrency(currCode);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#131921] text-white shadow-md select-none font-sans">
      {/* 1. TOP UTILITY / PORTAL BAR */}
      <div className="bg-[#0f1111] border-b border-[#232f3e] py-1 px-3 sm:px-6 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Global Portals Switcher */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[10px] text-slate-500 uppercase font-bold hidden md:inline">SYSTEM CONSOLE:</span>
          
          <button
            onClick={() => {
              setActivePortal('BUYER');
              setActiveBuyerTab('HOME');
            }}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
              activePortal === 'BUYER'
                ? 'bg-[#ffd814] text-slate-900 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Buyer Marketplace</span>
          </button>

          <button
            onClick={() => {
              setActivePortal('SELLER');
              setIsSellerPortalOpen(true);
            }}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
              activePortal === 'SELLER'
                ? 'bg-[#ffd814] text-slate-900 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Store className="w-3 h-3" />
            <span>Seller Central</span>
          </button>

          <button
            onClick={() => {
              setActivePortal('ADMIN');
              setIsAdminDashboardOpen(true);
            }}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
              activePortal === 'ADMIN'
                ? 'bg-[#ffd814] text-slate-900 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Global Admin</span>
          </button>
        </div>

        {/* Right: Tokyo Air Cargo Telemetry & Notifications & Chat */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Haneda Air Cargo Bonded Logistics: <strong className="text-emerald-400">ONLINE</strong></span>
          </div>

          {/* Quick Chat Shortcut */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1 text-slate-300 hover:text-[#ffd814] transition-colors"
            title="Tokyo Support & Seller Live Chat"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#ffd814]" />
            <span className="hidden sm:inline">Live Chat</span>
          </button>

          {/* Quick Notifications */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            title="Notification Center"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotificationsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ff9900]"></span>
            )}
            <span className="hidden sm:inline">Alerts</span>
          </button>

          <button
            onClick={handleDailyCheckIn}
            className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1 transition-all ${
              dailyCheckedIn
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-amber-500/20 border-amber-400 text-amber-300 hover:bg-amber-500/30'
            }`}
          >
            <Gift className="w-3 h-3 text-amber-400" />
            <span>{dailyCheckedIn ? 'Checked In (+50 pts)' : 'Daily Check-in (+50 pts)'}</span>
          </button>

          <button
            onClick={() => setB2bMode(!b2bMode)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
              b2bMode
                ? 'bg-[#ffd814] text-slate-900 border-[#fcd200]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {b2bMode ? 'B2B WHOLESALE (NET-30)' : 'B2B INVOICING'}
          </button>
        </div>
      </div>

      {/* 2. MAIN AMAZON HEADER BAR */}
      <div className="px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-4 bg-[#131921]">
        {/* Amazon-style Brand Logo */}
        <div 
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('HOME');
          }}
          className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:ring-1 hover:ring-white transition-all shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#232f3e] border border-slate-700 flex items-center justify-center text-[#ff9900]">
            <Zap className="w-5 h-5 fill-[#ff9900] text-[#ff9900]" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-lg font-black tracking-tight text-white font-sans">denshi</span>
              <span className="text-xs font-bold text-[#ff9900]">.global</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 tracking-wider">
              MR. DENSHI (ミスター電子)
            </div>
          </div>
        </div>

        {/* Amazon-style "Deliver to" Pill */}
        <div 
          onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
          className="hidden md:flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer text-xs shrink-0 relative"
          ref={regionRef}
        >
          <MapPin className="w-4 h-4 text-slate-300 mt-1" />
          <div className="text-left">
            <div className="text-[10px] text-slate-400 leading-none">Deliver to</div>
            <div className="text-xs font-bold text-white leading-none mt-1 flex items-center gap-1">
              <span>{currentMarket.flag} {currentMarket.name}</span>
            </div>
          </div>

          {/* Region Modal Dropdown */}
          {isRegionMenuOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-[#232f3e] border border-slate-700 rounded-lg shadow-2xl p-3 z-50 text-xs space-y-2.5">
              <div className="font-bold text-white border-b border-slate-700 pb-2">
                Choose Delivery Country / Region:
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto">
                {Object.values(GLOBAL_MARKETS).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMarketById(m.id as MarketId);
                      setIsRegionMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-left transition-colors ${
                      currentMarket.id === m.id
                        ? 'bg-[#ffd814] text-slate-900 font-bold'
                        : 'hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{m.flag}</span>
                      <span>{m.name}</span>
                    </span>
                    <span className="font-mono text-[10px] opacity-80">{m.defaultCurrency}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Amazon Mega Search Bar */}
        <div className="flex-1 max-w-3xl relative">
          <div className="flex items-center rounded-md bg-white text-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-[#ff9900]">
            {/* Department Dropdown */}
            <div className="relative hidden sm:block border-r border-slate-300">
              <button
                type="button"
                onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1 whitespace-nowrap"
              >
                <span className="max-w-[100px] truncate">{selectedDept}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isDeptDropdownOpen && (
                <div className="absolute top-full left-0 z-50 mt-1 w-60 bg-white border border-slate-300 rounded shadow-xl p-1 text-xs text-slate-800">
                  {departments.map((dept) => (
                    <button
                      key={dept.label}
                      onClick={() => {
                        setSelectedDept(dept.label);
                        setSelectedCategory(dept.category as any);
                        setIsDeptDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded hover:bg-amber-50 hover:text-[#c7511f] font-medium"
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              placeholder="Search 100V kitchen appliances, Hi-Res audio, transformers, Japanese hardware..."
              className="flex-1 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Visual Hardware Search */}
            <button
              onClick={() => setIsVisualSearchOpen(true)}
              title="Visual Hardware AI Search"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Warm Gold Amazon Search Button */}
            <button
              type="button"
              className="px-4 py-2.5 bg-[#febd69] hover:bg-[#f3a847] text-slate-900 font-bold flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4 text-slate-900 stroke-[2.5]" />
            </button>
          </div>

          {/* Autocomplete Overlay */}
          {isSearchFocused && !searchQuery && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-md shadow-2xl p-3 text-xs text-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold mb-2">
                Popular Akihabara & JDM Searches:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchSuggestions.map((sugg) => (
                  <button
                    key={sugg}
                    onMouseDown={() => setSearchQuery(sugg)}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-slate-900 text-xs transition-colors"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Nav Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Multi-Language & Multi-Currency Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-1.5 rounded hover:ring-1 hover:ring-white flex items-center gap-1 text-xs text-white"
              title="Change Language & Currency"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="font-bold uppercase text-[11px] hidden sm:inline">
                {currentLang.code.split('-')[0]} • {currency}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#232f3e] border border-slate-700 rounded-lg shadow-2xl p-3 z-50 text-xs space-y-3">
                {/* Languages */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white border-b border-slate-700 pb-1.5 mb-2">
                    <Globe className="w-4 h-4 text-[#ff9900]" />
                    <span>Language Settings ({SUPPORTED_LANGUAGES.length})</span>
                  </div>
                  
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((item) => {
                      const isSelected = locale === item.code;
                      return (
                        <button
                          key={item.code}
                          onClick={() => handleSelectLanguage(item.code)}
                          className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-colors ${
                            isSelected
                              ? 'bg-[#ffd814] text-slate-900 font-bold'
                              : 'hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{item.flag}</span>
                            <span>{item.nativeName}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Real-Time Currency Switcher */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white border-b border-slate-700 pb-1.5 mb-2">
                    <Coins className="w-4 h-4 text-[#febd69]" />
                    <span>Select Display Currency:</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 max-h-36 overflow-y-auto font-mono">
                    {SUPPORTED_CURRENCIES.map((curr) => {
                      const isSelected = currency === curr.code;
                      return (
                        <button
                          key={curr.code}
                          onClick={() => handleSelectCurrency(curr.code)}
                          className={`p-1.5 rounded text-left flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#ffd814] text-slate-900 font-bold'
                              : 'hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          <span>{curr.code} ({curr.symbol})</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account & Lists / Profile */}
          <button
            onClick={() => {
              setActivePortal('BUYER');
              setActiveBuyerTab('PROFILE');
            }}
            className="p-1.5 rounded hover:ring-1 hover:ring-white text-left hidden sm:block"
          >
            <div className="text-[10px] text-slate-300 leading-none">Hello, VIP Member</div>
            <div className="text-xs font-bold text-white leading-none mt-1 flex items-center gap-1">
              <span>Account & Lists</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </button>

          {/* Saved Items / Wishlist Shortcut */}
          <button
            onClick={() => {
              setActivePortal('BUYER');
              setActiveBuyerTab('WISHLIST');
            }}
            className={`p-1.5 rounded hover:ring-1 hover:ring-white text-left relative flex items-center gap-1.5 ${
              activeBuyerTab === 'WISHLIST' && activePortal === 'BUYER' ? 'ring-1 ring-[#ff9900]' : ''
            }`}
            title="Saved Items & Wishlist"
          >
            <div className="relative">
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-[#cc0c39] text-white font-black text-[9px] flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-[10px] text-slate-300 leading-none">Your</div>
              <div className="text-xs font-bold text-white leading-none mt-1">Saved Items</div>
            </div>
          </button>

          {/* Notifications Center */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="p-1.5 rounded hover:ring-1 hover:ring-white text-left relative flex items-center gap-1.5"
            title="System & Shipping Notifications"
          >
            <div className="relative">
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-[#ff9900] text-slate-950 font-black text-[9px] flex items-center justify-center font-mono animate-bounce">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
          </button>

          {/* Returns & Orders */}
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="p-1.5 rounded hover:ring-1 hover:ring-white text-left hidden lg:block"
          >
            <div className="text-[10px] text-slate-300 leading-none">Returns</div>
            <div className="text-xs font-bold text-white leading-none mt-1 flex items-center gap-1">
              <span>& Orders</span>
              <Truck className="w-3.5 h-3.5 text-[#ff9900]" />
            </div>
          </button>

          {/* Amazon Shopping Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1.5 rounded hover:ring-1 hover:ring-white flex items-center gap-2 font-bold text-xs"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-1.5 left-2.5 w-4 h-4 rounded-full bg-[#ff9900] text-slate-900 font-black text-[10px] flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[10px] text-slate-300 leading-none">Cart</div>
              <div className="text-xs font-bold text-[#ff9900] font-mono leading-none mt-1">
                {formatPrice(cartSubtotalJPY, currency, locale)}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 3. AMAZON SECONDARY NAVIGATION SUB-BAR (#232f3e) */}
      <div className="bg-[#232f3e] px-3 sm:px-6 py-1.5 flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar text-xs font-medium text-white border-t border-slate-700/60">
        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('EXPLORE');
          }}
          className="flex items-center gap-1.5 hover:text-[#ff9900] py-1 px-1.5 rounded hover:bg-slate-800 whitespace-nowrap font-bold"
        >
          <Menu className="w-4 h-4" />
          <span>All Departments</span>
        </button>

        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('HOME');
          }}
          className={`hover:text-[#ff9900] py-1 px-1.5 rounded whitespace-nowrap ${
            activeBuyerTab === 'HOME' && activePortal === 'BUYER' ? 'text-[#ff9900] font-bold' : ''
          }`}
        >
          <span>Today's Deals</span>
        </button>

        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('COMMUNITY');
          }}
          className={`flex items-center gap-1.5 hover:text-[#ffd814] py-1 px-1.5 rounded whitespace-nowrap ${
            activeBuyerTab === 'COMMUNITY' && activePortal === 'BUYER' ? 'text-[#ffd814] font-bold' : ''
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#ffd814]" />
          <span>Community Trends</span>
        </button>

        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('LIVE');
          }}
          className={`flex items-center gap-1.5 hover:text-[#ff9900] py-1 px-1.5 rounded whitespace-nowrap ${
            activeBuyerTab === 'LIVE' && activePortal === 'BUYER' ? 'text-[#ff9900] font-bold' : ''
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#cc0c39] animate-ping"></span>
          <span>Akihabara Live Stage</span>
        </button>

        <button
          onClick={() => setIsCompatibilityStudioOpen(true)}
          className="flex items-center gap-1.5 hover:text-amber-300 py-1 px-1.5 rounded whitespace-nowrap text-amber-400 font-bold"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Voltage & Transformer Lab</span>
        </button>

        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex items-center gap-1.5 hover:text-purple-300 py-1 px-1.5 rounded whitespace-nowrap text-purple-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>DENSHI AI Concierge</span>
        </button>

        <button
          onClick={() => setIsComparisonModalOpen(true)}
          className="hover:text-[#ff9900] py-1 px-1.5 rounded whitespace-nowrap"
        >
          <span>Hardware Comparison</span>
        </button>

        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('WISHLIST');
          }}
          className={`hover:text-[#ff9900] py-1 px-1.5 rounded whitespace-nowrap ${
            activeBuyerTab === 'WISHLIST' && activePortal === 'BUYER' ? 'text-[#ff9900] font-bold' : ''
          }`}
        >
          <span>Saved Items & Wishlist</span>
        </button>

        <button
          onClick={() => {
            setActivePortal('BUYER');
            setActiveBuyerTab('PROFILE');
          }}
          className={`hover:text-[#ff9900] py-1 px-1.5 rounded whitespace-nowrap ${
            activeBuyerTab === 'PROFILE' && activePortal === 'BUYER' ? 'text-[#ff9900] font-bold' : ''
          }`}
        >
          <span>Customer Service & VIP</span>
        </button>
      </div>
    </header>
  );
};
