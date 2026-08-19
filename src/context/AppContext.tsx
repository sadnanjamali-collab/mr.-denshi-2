import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CartItem, 
  CurrencyCode, 
  Market, 
  MarketId, 
  Order, 
  Product, 
  ProductCategory, 
  ProductVariant, 
  SupportedLocale, 
  UserDeviceProfile, 
  UserRole, 
  WalletLedgerEntry,
  LiveStreamSession,
  CommunityDiscussion,
  WarrantyRecord,
  ProductVideo,
  AppNotification,
  DirectChatMessage,
  Review,
  ReturnRequest,
  DenshiPointsLedgerEntry
} from '../types';
import { GLOBAL_MARKETS } from '../data/markets';
import { ELECTRONICS_CATALOG } from '../data/catalog';
import { 
  CURRENT_USER, 
  SEEDED_ACTIVE_ORDERS, 
  SEEDED_SAVED_DEVICES, 
  SEEDED_WALLET_LEDGER, 
  SEEDED_LIVESTREAMS,
  SEEDED_REVIEWS,
  SEEDED_RETURNS,
  SEEDED_DENSHI_POINTS_LEDGER
} from '../data/mockUserData';
import { 
  SEEDED_COMMUNITY_DISCUSSIONS, 
  SEEDED_WARRANTY_RECORDS, 
  SEEDED_PRODUCT_VIDEOS, 
  SEEDED_NOTIFICATIONS, 
  SEEDED_CHAT_MESSAGES 
} from '../data/communityAndSupportData';
import { calculateLandedCost } from '../utils/taxAndDuties';

export type PortalMode = 'BUYER' | 'SELLER' | 'ADMIN';
export type BuyerTab = 'HOME' | 'EXPLORE' | 'FLASH_DEALS' | 'LIVE' | 'PROFILE' | 'WISHLIST' | 'COMMUNITY';

interface AppContextType {
  // Active Portal & Buyer View Switching
  activePortal: PortalMode;
  setActivePortal: (portal: PortalMode) => void;
  activeBuyerTab: BuyerTab;
  setActiveBuyerTab: (tab: BuyerTab) => void;

  // Localization & Multi-Language / Multi-Currency
  currentMarket: Market;
  setCurrentMarket: (market: Market) => void;
  setMarketById: (id: MarketId) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  locale: SupportedLocale;
  setLocale: (loc: SupportedLocale) => void;

  // Identity & Permissions
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  userSavedDevices: UserDeviceProfile[];
  addUserDevice: (device: UserDeviceProfile) => void;
  removeUserDevice: (id: string) => void;
  walletBalanceJPY: number;
  walletLedger: WalletLedgerEntry[];
  vipPoints: number;
  addVipPoints: (points: number) => void;
  dailyCheckedIn: boolean;
  handleDailyCheckIn: () => void;
  b2bMode: boolean;
  setB2bMode: (enabled: boolean) => void;

  // Recent Searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Reviews & Seller Ratings
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  voteReviewHelpful: (reviewId: string) => void;

  // Denshi Points Loyalty System
  denshiPoints: number;
  denshiPointsLedger: DenshiPointsLedgerEntry[];
  redeemDenshiPoints: (points: number) => void;
  appliedDenshiPointsDiscount: number;
  setAppliedDenshiPointsDiscount: (points: number) => void;

  // Returns & Refund Portal
  returnRequests: ReturnRequest[];
  submitReturnRequest: (orderId: string, productId: string, quantity: number, reason: 'VOLTAGE_MISMATCH' | 'DEFECTIVE_OR_DAMAGED' | 'NOT_AS_DESCRIBED' | 'CHANGED_MIND' | 'SHIPPING_DELAY', reasonDetails: string) => ReturnRequest;
  isReturnsPortalOpen: boolean;
  setIsReturnsPortalOpen: (open: boolean) => void;

  // Seller Following
  followedSellerIds: string[];
  toggleFollowSeller: (sellerId: string) => void;
  isFollowingSeller: (sellerId: string) => boolean;

  // Catalog & Navigation
  products: Product[];
  addNewProduct: (product: Product) => void;
  selectedCategory: ProductCategory | 'ALL';
  setSelectedCategory: (cat: ProductCategory | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  voltageFilter: 'ALL' | '100V_JDM' | 'UNIVERSAL_100_240V';
  setVoltageFilter: (filter: 'ALL' | '100V_JDM' | 'UNIVERSAL_100_240V') => void;

  // Advanced Technical Filtering Sidebar State
  sidebarWattageFilter: string[];
  setSidebarWattageFilter: React.Dispatch<React.SetStateAction<string[]>>;
  sidebarCertificationsFilter: string[];
  setSidebarCertificationsFilter: React.Dispatch<React.SetStateAction<string[]>>;
  sidebarBrandFilter: string[];
  setSidebarBrandFilter: React.Dispatch<React.SetStateAction<string[]>>;
  sidebarPlugTypeFilter: string[];
  setSidebarPlugTypeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  sidebarMinPrice: number | null;
  setSidebarMinPrice: (val: number | null) => void;
  sidebarMaxPrice: number | null;
  setSidebarMaxPrice: (val: number | null) => void;
  sidebarMinRating: number | null;
  setSidebarMinRating: (val: number | null) => void;
  sidebarInStockOnly: boolean;
  setSidebarInStockOnly: (val: boolean) => void;
  sidebarPrimeOnly: boolean;
  setSidebarPrimeOnly: (val: boolean) => void;
  resetSidebarFilters: () => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, options?: { giftPackaging?: boolean; voltageWarningAcknowledged?: boolean }) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalJPY: number;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Product Comparison
  comparedProductIds: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;

  // Orders & Fulfillment
  orders: Order[];
  createOrderFromCart: (paymentDetails: { type: any; label: string; details: string }, addressId: string, isB2B: boolean) => Order;
  activeOrderToTrack: Order | null;
  setActiveOrderToTrack: (order: Order | null) => void;

  // Modals & Active Viewers
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;
  isCompatibilityStudioOpen: boolean;
  setIsCompatibilityStudioOpen: (open: boolean) => void;
  isLiveCommerceOpen: boolean;
  setIsLiveCommerceOpen: (open: boolean) => void;
  isSellerPortalOpen: boolean;
  setIsSellerPortalOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;

  // Community Trends
  communityDiscussions: CommunityDiscussion[];
  addCommunityDiscussion: (discussion: Omit<CommunityDiscussion, 'id' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'createdAt' | 'replies'>) => void;
  likeCommunityDiscussion: (id: string) => void;
  addDiscussionReply: (discussionId: string, replyText: string) => void;

  // Warranty Management
  warrantyRecords: WarrantyRecord[];
  registerWarrantyRecord: (record: Omit<WarrantyRecord, 'id' | 'claimHistory' | 'status'>) => void;
  submitWarrantyClaim: (warrantyId: string, issueDescription: string) => void;

  // Product Videos
  productVideos: ProductVideo[];
  addProductVideo: (video: Omit<ProductVideo, 'id' | 'views'>) => void;

  // Notification System
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Chatting System
  chatMessages: DirectChatMessage[];
  sendChatMessage: (text: string, attachedProduct?: { id: string; title: string; priceMinorUnits: number; image: string }) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // AI Troubleshooting
  activeTroubleshootProduct: Product | null;
  setActiveTroubleshootProduct: (product: Product | null) => void;

  // Live Streams
  liveStreams: LiveStreamSession[];
  activeLiveStream: LiveStreamSession | null;
  setActiveLiveStream: (session: LiveStreamSession | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Portal & Navigation Mode
  const [activePortal, setActivePortal] = useState<PortalMode>('BUYER');
  const [activeBuyerTab, setActiveBuyerTab] = useState<BuyerTab>('HOME');

  // Market & Locale State
  const [currentMarket, setCurrentMarket] = useState<Market>(GLOBAL_MARKETS.JP);
  const [currency, setCurrency] = useState<CurrencyCode>('JPY');
  const [locale, setLocale] = useState<SupportedLocale>('ja-JP');

  // User & Identity
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('CUSTOMER');
  const [userSavedDevices, setUserSavedDevices] = useState<UserDeviceProfile[]>(SEEDED_SAVED_DEVICES);
  const [walletLedger, setWalletLedger] = useState<WalletLedgerEntry[]>(SEEDED_WALLET_LEDGER);
  const [vipPoints, setVipPoints] = useState<number>(1850);
  const [dailyCheckedIn, setDailyCheckedIn] = useState<boolean>(false);
  const [b2bMode, setB2bMode] = useState<boolean>(false);

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Zojirushi 100V IH Cooker',
    'Sony Signature MDR-Z1R',
    'Nissyo 1500W Step-Down Transformer',
    'Balmuda The Toaster Pro 100V',
    'Anker Prime 240W GaN Station'
  ]);

  const addRecentSearch = (query: string) => {
    if (!query || !query.trim()) return;
    const trimmed = query.trim();
    setRecentSearches(prev => [trimmed, ...prev.filter(q => q.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5));
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches(prev => prev.filter(q => q !== query));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Reviews & Seller Ratings
  const [reviews, setReviews] = useState<Review[]>(SEEDED_REVIEWS);

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };
    setReviews(prev => [newRev, ...prev]);

    // Also update product rating in catalog
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const newCount = p.reviewCount + 1;
        const newRating = Number(((p.rating * p.reviewCount + reviewData.rating) / newCount).toFixed(1));
        return {
          ...p,
          rating: newRating,
          reviewCount: newCount
        };
      }
      return p;
    }));

    // Award bonus Denshi Points for review!
    const bonusPoints = reviewData.images && reviewData.images.length > 0 ? 300 : 150;
    setDenshiPoints(prev => prev + bonusPoints);
    setDenshiPointsLedger(prev => [
      {
        id: `pt-${Date.now()}`,
        date: new Date().toISOString(),
        type: 'REVIEW_BONUS',
        points: bonusPoints,
        description: `Bonus for leaving verified review on ${newRev.title}`,
        balanceAfter: denshiPoints + bonusPoints
      },
      ...prev
    ]);
  };

  const voteReviewHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  // Denshi Points Loyalty System
  const [denshiPoints, setDenshiPoints] = useState<number>(2850);
  const [denshiPointsLedger, setDenshiPointsLedger] = useState<DenshiPointsLedgerEntry[]>(SEEDED_DENSHI_POINTS_LEDGER);
  const [appliedDenshiPointsDiscount, setAppliedDenshiPointsDiscount] = useState<number>(0);

  const redeemDenshiPoints = (points: number) => {
    if (points <= 0 || points > denshiPoints) return;
    setDenshiPoints(prev => prev - points);
    setDenshiPointsLedger(prev => [
      {
        id: `pt-${Date.now()}`,
        date: new Date().toISOString(),
        type: 'REDEEMED_CHECKOUT',
        points: -points,
        description: `Redeemed ${points} Denshi Points for Store Credit discount`,
        balanceAfter: denshiPoints - points
      },
      ...prev
    ]);
    setAppliedDenshiPointsDiscount(points);
  };

  // Returns & Refund Portal
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(SEEDED_RETURNS);
  const [isReturnsPortalOpen, setIsReturnsPortalOpen] = useState<boolean>(false);

  const submitReturnRequest = (
    orderId: string,
    productId: string,
    quantity: number,
    reason: 'VOLTAGE_MISMATCH' | 'DEFECTIVE_OR_DAMAGED' | 'NOT_AS_DESCRIBED' | 'CHANGED_MIND' | 'SHIPPING_DELAY',
    reasonDetails: string
  ): ReturnRequest => {
    const targetProduct = products.find(p => p.id === productId);
    const targetOrder = orders.find(o => o.id === orderId);
    const estimatedRefund = targetProduct ? targetProduct.variants[0].priceMinorUnits * quantity : 25000;

    const newRMA: ReturnRequest = {
      id: `ret-${Date.now()}`,
      rmaNumber: `RMA-TOKYO-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId,
      productId,
      productTitle: targetProduct?.title || 'Japanese Electronics Device',
      productImage: targetProduct?.images[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
      quantity,
      reason,
      reasonDetails,
      status: 'RMA_LABEL_ISSUED',
      refundAmountMinorUnits: estimatedRefund,
      currency: targetOrder?.landedCost.currency || 'JPY',
      requestedAt: new Date().toISOString(),
      trackingNumber: `RET-DHL-JP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'DHL Express Japan / Yamato Global Return',
      returnDestination: 'MR. DENSHI Tokyo Haneda International Inspection Depot, Terminal 4B, Tokyo 144-0041, Japan',
      notes: 'Prepaid DDP air return label generated. Carrier scheduled for automated door collection.'
    };

    setReturnRequests(prev => [newRMA, ...prev]);

    // Send push notification
    addNotification({
      title: 'RMA Return Label Issued',
      message: `Return request for order #${orderId} approved with RMA #${newRMA.rmaNumber}. Label is ready to print.`,
      type: 'ORDER_UPDATE',
      linkText: 'Track Return'
    });

    return newRMA;
  };

  // Seller Following System
  const [followedSellerIds, setFollowedSellerIds] = useState<string[]>([
    'seller-zojirushi-official',
    'seller-akiba-audio'
  ]);

  const toggleFollowSeller = (sellerId: string) => {
    setFollowedSellerIds(prev => 
      prev.includes(sellerId) ? prev.filter(id => id !== sellerId) : [...prev, sellerId]
    );
  };

  const isFollowingSeller = (sellerId: string) => followedSellerIds.includes(sellerId);

  // Catalog & Quick Filters
  const [products, setProducts] = useState<Product[]>(ELECTRONICS_CATALOG);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [voltageFilter, setVoltageFilter] = useState<'ALL' | '100V_JDM' | 'UNIVERSAL_100_240V'>('ALL');

  const addNewProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  // Advanced Technical Filtering Sidebar State
  const [sidebarWattageFilter, setSidebarWattageFilter] = useState<string[]>([]);
  const [sidebarCertificationsFilter, setSidebarCertificationsFilter] = useState<string[]>([]);
  const [sidebarBrandFilter, setSidebarBrandFilter] = useState<string[]>([]);
  const [sidebarPlugTypeFilter, setSidebarPlugTypeFilter] = useState<string[]>([]);
  const [sidebarMinPrice, setSidebarMinPrice] = useState<number | null>(null);
  const [sidebarMaxPrice, setSidebarMaxPrice] = useState<number | null>(null);
  const [sidebarMinRating, setSidebarMinRating] = useState<number | null>(null);
  const [sidebarInStockOnly, setSidebarInStockOnly] = useState<boolean>(false);
  const [sidebarPrimeOnly, setSidebarPrimeOnly] = useState<boolean>(false);

  const resetSidebarFilters = () => {
    setSelectedCategory('ALL');
    setVoltageFilter('ALL');
    setSidebarWattageFilter([]);
    setSidebarCertificationsFilter([]);
    setSidebarBrandFilter([]);
    setSidebarPlugTypeFilter([]);
    setSidebarMinPrice(null);
    setSidebarMaxPrice(null);
    setSidebarMinRating(null);
    setSidebarInStockOnly(false);
    setSidebarPrimeOnly(false);
    setSearchQuery('');
  };

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ELECTRONICS_CATALOG[0], // Zojirushi
      variant: ELECTRONICS_CATALOG[0].variants[0],
      quantity: 1,
      addedAt: new Date().toISOString(),
      giftPackaging: false,
      voltageWarningAcknowledged: true
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['sony-mdr-z1r', 'fujifilm-x100vi']);
  const [comparedProductIds, setComparedProductIds] = useState<string[]>(['zojirushi-nw-lb10', 'balmuda-toaster-pro']);

  // Orders
  const [orders, setOrders] = useState<Order[]>(SEEDED_ACTIVE_ORDERS);
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(SEEDED_ACTIVE_ORDERS[0]);

  // Modals & Panels
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isCompatibilityStudioOpen, setIsCompatibilityStudioOpen] = useState<boolean>(false);
  const [isLiveCommerceOpen, setIsLiveCommerceOpen] = useState<boolean>(false);
  const [isSellerPortalOpen, setIsSellerPortalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

  // Community Trends
  const [communityDiscussions, setCommunityDiscussions] = useState<CommunityDiscussion[]>(SEEDED_COMMUNITY_DISCUSSIONS);

  const addCommunityDiscussion = (discussion: Omit<CommunityDiscussion, 'id' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'createdAt' | 'replies'>) => {
    const newDisc: CommunityDiscussion = {
      ...discussion,
      id: `disc-${Date.now()}`,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: new Date().toISOString(),
      replies: []
    };
    setCommunityDiscussions(prev => [newDisc, ...prev]);
    addVipPoints(25);
  };

  const likeCommunityDiscussion = (id: string) => {
    setCommunityDiscussions(prev => prev.map(d => d.id === id ? { ...d, likesCount: d.likesCount + 1 } : d));
  };

  const addDiscussionReply = (discussionId: string, replyText: string) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      author: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      text: replyText,
      time: 'Just now',
      likes: 0
    };
    setCommunityDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          commentsCount: d.commentsCount + 1,
          replies: [...d.replies, newReply]
        };
      }
      return d;
    }));
  };

  // Warranty Records
  const [warrantyRecords, setWarrantyRecords] = useState<WarrantyRecord[]>(SEEDED_WARRANTY_RECORDS);

  const registerWarrantyRecord = (record: Omit<WarrantyRecord, 'id' | 'claimHistory' | 'status'>) => {
    const newRecord: WarrantyRecord = {
      ...record,
      id: `war-${Date.now()}`,
      status: 'ACTIVE',
      claimHistory: []
    };
    setWarrantyRecords(prev => [newRecord, ...prev]);
  };

  const submitWarrantyClaim = (warrantyId: string, issueDescription: string) => {
    setWarrantyRecords(prev => prev.map(w => {
      if (w.id === warrantyId) {
        return {
          ...w,
          status: 'CLAIM_IN_PROGRESS',
          claimHistory: [
            ...w.claimHistory,
            {
              id: `clm-${Date.now()}`,
              date: new Date().toISOString(),
              issueDescription,
              status: 'SUBMITTED',
              resolutionNote: 'Under review by Tokyo Haneda Certified Master Technician.'
            }
          ]
        };
      }
      return w;
    }));
  };

  // Product Videos
  const [productVideos, setProductVideos] = useState<ProductVideo[]>(SEEDED_PRODUCT_VIDEOS);

  const addProductVideo = (video: Omit<ProductVideo, 'id' | 'views'>) => {
    const newVid: ProductVideo = {
      ...video,
      id: `vid-${Date.now()}`,
      views: 1
    };
    setProductVideos(prev => [newVid, ...prev]);
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(SEEDED_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Chatting System
  const [chatMessages, setChatMessages] = useState<DirectChatMessage[]>(SEEDED_CHAT_MESSAGES);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const sendChatMessage = (text: string, attachedProduct?: { id: string; title: string; priceMinorUnits: number; image: string }) => {
    const userMsg: DirectChatMessage = {
      id: `chat-${Date.now()}`,
      senderId: 'user-me',
      senderName: CURRENT_USER.name,
      senderRole: 'BUYER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedProduct
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Simulated responsive reply from Tokyo Support with AI translation
    setTimeout(() => {
      const responseMsg: DirectChatMessage = {
        id: `chat-${Date.now() + 1}`,
        senderId: 'tokyo-support-1',
        senderName: 'Hiroshi Tanaka (Tokyo Senior Specialist)',
        senderRole: 'JAPAN_TECH_SUPPORT',
        text: `承知いたしました。該当の仕様（${attachedProduct ? attachedProduct.title : '機器'}）に関しまして、東京羽田倉庫にてPSE菱形検査済み在庫を確保しております。`,
        originalText: `承知いたしました。該当の仕様（${attachedProduct ? attachedProduct.title : '機器'}）に関しまして、東京羽田倉庫にてPSE菱形検査済み在庫を確保しております。`,
        translatedText: `Understood! Regarding specifications for ${attachedProduct ? attachedProduct.title : 'this unit'}, we have confirmed PSE diamond certified stock ready for export dispatch at Tokyo Haneda hub.`,
        detectedLanguage: 'ja',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, responseMsg]);
    }, 1500);
  };

  // AI Troubleshooting
  const [activeTroubleshootProduct, setActiveTroubleshootProduct] = useState<Product | null>(ELECTRONICS_CATALOG[0]);

  // Live Streams
  const [liveStreams] = useState<LiveStreamSession[]>(SEEDED_LIVESTREAMS);
  const [activeLiveStream, setActiveLiveStream] = useState<LiveStreamSession | null>(SEEDED_LIVESTREAMS[0]);

  // Market Switcher helper
  const setMarketById = (id: MarketId) => {
    const market = GLOBAL_MARKETS[id] || GLOBAL_MARKETS.JP;
    setCurrentMarket(market);
    setCurrency(market.defaultCurrency);
    setLocale(market.defaultLocale);
  };

  const walletBalanceJPY = walletLedger.length > 0 
    ? walletLedger[0].balanceAfterMinorUnits 
    : 28500;

  const addUserDevice = (device: UserDeviceProfile) => {
    setUserSavedDevices(prev => [device, ...prev]);
  };

  const removeUserDevice = (id: string) => {
    setUserSavedDevices(prev => prev.filter(d => d.id !== id));
  };

  const addVipPoints = (points: number) => {
    setVipPoints(prev => prev + points);
  };

  const handleDailyCheckIn = () => {
    if (!dailyCheckedIn) {
      setDailyCheckedIn(true);
      setVipPoints(prev => prev + 50);
    }
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    variant?: ProductVariant, 
    quantity: number = 1,
    options?: { giftPackaging?: boolean; voltageWarningAcknowledged?: boolean }
  ) => {
    const selectedVariant = variant || product.variants[0];
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.variant.id === selectedVariant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (options?.giftPackaging !== undefined) updated[existingIndex].giftPackaging = options.giftPackaging;
        if (options?.voltageWarningAcknowledged !== undefined) updated[existingIndex].voltageWarningAcknowledged = options.voltageWarningAcknowledged;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          variant: selectedVariant,
          quantity,
          addedAt: new Date().toISOString(),
          giftPackaging: options?.giftPackaging ?? false,
          voltageWarningAcknowledged: options?.voltageWarningAcknowledged ?? false
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(item => item.variant.id !== variantId));
  };

  const updateCartQuantity = (variantId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart(prev => prev.map(item => item.variant.id === variantId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalJPY = cart.reduce((sum, item) => sum + item.variant.priceMinorUnits * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  // Comparison
  const addToComparison = (productId: string) => {
    setComparedProductIds(prev => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= 4) return [...prev.slice(1), productId];
      return [...prev, productId];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparedProductIds(prev => prev.filter(id => id !== productId));
  };

  const clearComparison = () => {
    setComparedProductIds([]);
  };

  // Order Creation from Cart
  const createOrderFromCart = (
    paymentDetails: { type: any; label: string; details: string },
    addressId: string,
    isB2BOrder: boolean
  ): Order => {
    const selectedAddress = CURRENT_USER.savedAddresses.find(a => a.id === addressId) || CURRENT_USER.savedAddresses[0];
    const landedCost = calculateLandedCost({
      items: cart,
      destinationMarket: currentMarket,
      currency,
      incoterm: 'DDP',
      isB2B: isB2BOrder
    });

    const newOrder: Order = {
      id: `ORD-2026-${currentMarket.id}-${Math.floor(10000 + Math.random() * 90000)}`,
      orderNumber: `JP-EXP-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customerId: CURRENT_USER.id,
      customerName: CURRENT_USER.name,
      customerEmail: CURRENT_USER.email,
      items: [...cart],
      shipments: [
        {
          shipmentId: `shp-hnd-${Date.now()}`,
          trackingNumber: `JD01460000${Math.floor(10000000 + Math.random() * 90000000)}`,
          carrier: currentMarket.availableCarriers[0] || GLOBAL_MARKETS.JP.availableCarriers[0],
          originWarehouse: 'Tokyo Haneda Air Cargo Bonded Logistics Park, Japan',
          destinationAddress: selectedAddress,
          status: 'ORDER_CONFIRMED',
          trackingTimeline: [
            {
              id: `tk-${Date.now()}-1`,
              timestamp: new Date().toISOString(),
              status: 'ORDER_CONFIRMED',
              location: 'MR. DENSHI Tokyo Automated Routing System',
              description: 'Order confirmed with DDP pre-cleared documentation.',
              completed: true
            },
            {
              id: `tk-${Date.now()}-2`,
              timestamp: new Date(Date.now() + 3600000).toISOString(),
              status: 'PACKED_AT_WAREHOUSE',
              location: 'Haneda Bonded Warehouse 4A (Tokyo, Japan)',
              description: 'Laser serial barcode scanned, anti-static sealed & PSE inspection certified.',
              completed: false
            }
          ],
          currentLocationName: 'Haneda Logistics Park, Tokyo, Japan',
          currentCoordinates: { lat: 35.5494, lng: 139.7798 },
          estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
          customsDeclarationNumber: `JP-EXP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          incoterm: 'DDP'
        }
      ],
      landedCost,
      paymentMethod: {
        type: paymentDetails.type || 'CREDIT_CARD',
        label: paymentDetails.label || 'Credit Card (3D-Secure Authorized)',
        details: paymentDetails.details || 'Ending in 4242'
      },
      paymentStatus: 'CAPTURED',
      status: 'ORDER_CONFIRMED',
      isB2B: isB2BOrder,
      digitalWarrantyCertificateId: `WARR-METI-2026-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderToTrack(newOrder);

    // Register Warranty Record for the newly purchased electronics automatically
    cart.forEach((cItem, index) => {
      const newWar: WarrantyRecord = {
        id: `war-new-${Date.now()}-${index}`,
        orderId: newOrder.id,
        productId: cItem.product.id,
        productTitle: cItem.product.title,
        productImage: cItem.product.images[0],
        serialNumber: `SN-${cItem.product.brand.slice(0, 3).toUpperCase()}-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        purchaseDate: new Date().toISOString(),
        warrantyDurationMonths: cItem.product.specs.warrantyMonths || 24,
        status: 'ACTIVE',
        metiPseCertificateNumber: `METI-PSE-${Date.now().toString().slice(-6)}`,
        serviceCenter: 'MR. DENSHI Tokyo Haneda International Certified Depot',
        claimHistory: []
      };
      setWarrantyRecords(prevW => [newWar, ...prevW]);
    });

    // Add notification
    addNotification({
      type: 'ORDER_UPDATE',
      title: `✈️ Order #${newOrder.id} Dispatched to Haneda`,
      message: `Your Tokyo air shipment is preparing for export flight with pre-paid DDP customs.`,
      priority: 'HIGH'
    });

    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        activePortal,
        setActivePortal,
        activeBuyerTab,
        setActiveBuyerTab,
        currentMarket,
        setCurrentMarket,
        setMarketById,
        currency,
        setCurrency,
        locale,
        setLocale,
        currentUserRole,
        setCurrentUserRole,
        userSavedDevices,
        addUserDevice,
        removeUserDevice,
        walletBalanceJPY,
        walletLedger,
        vipPoints,
        addVipPoints,
        dailyCheckedIn,
        handleDailyCheckIn,
        b2bMode,
        setB2bMode,
        products,
        addNewProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        voltageFilter,
        setVoltageFilter,
        sidebarWattageFilter,
        setSidebarWattageFilter,
        sidebarCertificationsFilter,
        setSidebarCertificationsFilter,
        sidebarBrandFilter,
        setSidebarBrandFilter,
        sidebarPlugTypeFilter,
        setSidebarPlugTypeFilter,
        sidebarMinPrice,
        setSidebarMinPrice,
        sidebarMaxPrice,
        setSidebarMaxPrice,
        sidebarMinRating,
        setSidebarMinRating,
        sidebarInStockOnly,
        setSidebarInStockOnly,
        sidebarPrimeOnly,
        setSidebarPrimeOnly,
        resetSidebarFilters,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalJPY,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        comparedProductIds,
        addToComparison,
        removeFromComparison,
        clearComparison,
        orders,
        createOrderFromCart,
        activeOrderToTrack,
        setActiveOrderToTrack,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        isCompatibilityStudioOpen,
        setIsCompatibilityStudioOpen,
        isLiveCommerceOpen,
        setIsLiveCommerceOpen,
        isSellerPortalOpen,
        setIsSellerPortalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        communityDiscussions,
        addCommunityDiscussion,
        likeCommunityDiscussion,
        addDiscussionReply,
        warrantyRecords,
        registerWarrantyRecord,
        submitWarrantyClaim,
        productVideos,
        addProductVideo,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        isNotificationsOpen,
        setIsNotificationsOpen,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        activeTroubleshootProduct,
        setActiveTroubleshootProduct,
        liveStreams,
        activeLiveStream,
        setActiveLiveStream
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
