/**
 * MR. DENSHI - Enterprise Global AI-Native E-Commerce Platform
 * Core Domain Type Definitions
 */

export type MarketId = 'JP' | 'US' | 'CA' | 'DE' | 'KR' | 'AU' | 'GB' | 'AE' | 'CN';

export type CurrencyCode = 'JPY' | 'USD' | 'EUR' | 'CAD' | 'KRW' | 'AUD' | 'GBP' | 'AED' | 'CNY' | 'SGD' | 'TWD' | 'HKD';

export type SupportedLocale = 'ja-JP' | 'en-US' | 'zh-CN' | 'ko-KR' | 'de-DE' | 'fr-FR' | 'es-ES' | 'ar-AE';

export type UserRole = 
  | 'CUSTOMER' 
  | 'SELLER_ADMIN' 
  | 'SELLER_STAFF' 
  | 'REGIONAL_ADMIN' 
  | 'GLOBAL_ADMIN' 
  | 'WAREHOUSE_OPERATOR' 
  | 'CUSTOMER_SUPPORT' 
  | 'FINANCE_OPERATOR' 
  | 'FRAUD_ANALYST';

export interface Market {
  id: MarketId;
  name: string;
  nativeName: string;
  flag: string;
  defaultCurrency: CurrencyCode;
  supportedCurrencies: CurrencyCode[];
  defaultLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
  voltageStandard: string; // e.g. "100V 50/60Hz"
  plugTypes: string[]; // e.g. ["Type A", "Type B"]
  defaultTaxRate: number; // e.g. 0.10 for Japan 10%
  taxName: string; // e.g. "Japanese Consumption Tax (JCT)"
  customsDeMinimisUSD: number; // threshold under which duty is 0
  dutyRateAverage: number;
  availableCarriers: Carrier[];
  regulatoryBodies: string[]; // e.g. ["PSE (METI)", "VCCI"]
}

export interface Carrier {
  id: string;
  name: string;
  logo: string;
  type: 'DOMESTIC' | 'INTERNATIONAL_EXPRESS' | 'POSTAL_AIR' | 'ECONOMY';
  baseTransitDaysMin: number;
  baseTransitDaysMax: number;
  baseRateUSD: number;
  trackingUrlTemplate: string;
  realtimeGpsSupported: boolean;
}

export interface ExchangeRate {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  lastUpdated: string;
  source: string;
}

export type ProductCategory = 
  | 'AUDIO_HIFI' 
  | 'CAMERAS_OPTICS' 
  | 'COMPUTERS_COMPONENTS' 
  | 'GAMING_CONSOLES' 
  | 'SMARTPHONES_TABLETS' 
  | 'JAPANESE_APPLIANCES' 
  | 'IOT_SMART_HOME' 
  | 'INDUSTRIAL_TOOLS' 
  | 'CABLES_POWER_ACCESSORIES';

export interface Specification {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
  category: 'POWER' | 'PHYSICAL' | 'CONNECTIVITY' | 'PERFORMANCE' | 'COMPLIANCE' | 'AUDIO' | 'OPTICAL';
  isCrucialForCompatibility?: boolean;
}

export interface TechnicalSpecs {
  voltage: string; // e.g. "100V AC only (Japan domestic)" or "100V-240V Universal"
  voltageNumber: number; // e.g. 100 or 240
  frequency: string; // e.g. "50/60Hz"
  wattage: number; // e.g. 1240
  plugType: string; // e.g. "Type A (Unpolarized 2-pin)"
  powerSupplyType: 'INTEGRATED' | 'EXTERNAL_ADAPTER' | 'USB_PD' | 'BATTERY_RECHARGEABLE' | 'BATTERY_REPLACEABLE';
  dimensionsMm: { length: number; width: number; height: number };
  weightGrams: number;
  operatingSystem?: string;
  supportedProtocols?: string[];
  certifications: string[]; // e.g. ["PSE Diamond", "PSE Circle", "CE", "FCC", "RoHS"]
  warrantyRegion: 'JAPAN_ONLY' | 'GLOBAL_1_YEAR' | 'REGIONAL';
  warrantyMonths: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  color?: string;
  colorHex?: string;
  capacity?: string;
  condition: 'BRAND_NEW_SEALED' | 'REFURBISHED_A_PLUS' | 'MINT_JAPAN_STOCK';
  priceMinorUnits: number; // stored in base currency (JPY)
  originalPriceMinorUnits?: number;
  stockOnHand: number;
  stockReserved: number;
  image: string;
}

export interface Seller {
  id: string;
  name: string;
  japaneseName?: string;
  location: string; // e.g. "Akihabara, Tokyo, Japan"
  country: MarketId;
  rating: number;
  totalReviews: number;
  fulfillmentType: 'DENSHI_GLOBAL_FULFILLMENT' | 'SELLER_DIRECT_AIR' | 'LOCAL_DEPOT';
  verifiedAuthentic: boolean;
  pseComplianceAuthorized: boolean;
  yearsOnPlatform: number;
  shipmentOntimeRate: number; // e.g. 99.4%
  badge: 'OFFICIAL_BRAND' | 'AUTHENTIC_JAPAN_SELLER' | 'PREMIUM_DEPOT' | 'VERIFIED_VENDOR';
  avatar: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  japaneseTitle: string;
  brand: string;
  modelNumber: string;
  category: ProductCategory;
  description: string;
  highlightBullets: string[];
  images: string[];
  specs: TechnicalSpecs;
  detailedSpecs: Specification[];
  variants: ProductVariant[];
  selectedVariantId: string;
  rating: number;
  reviewCount: number;
  seller: Seller;
  shipsFrom: string; // e.g. "Tokyo Haneda Logistics Center, Japan"
  isJapaneseDomesticModel: boolean; // JDM Flag
  transformerRequiredForUS: boolean;
  transformerRequiredForEU: boolean;
  recommendedTransformerWattage?: number;
  hsCode: string; // Harmonized System Code for customs
  authenticityGuaranteed: boolean;
  tags: string[];
  compatibleProductIds?: string[];
  accessoryProductIds?: string[];
  featuredInFlashDeal?: boolean;
  dealDiscountPercent?: number;
  dealExpiresAt?: string;
  b2bBulkDiscountTiers?: { minQty: number; discountPercent: number }[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  addedAt: string;
  giftPackaging?: boolean;
  voltageWarningAcknowledged?: boolean;
}

export interface SplitFulfillmentGroup {
  sellerId: string;
  sellerName: string;
  originLocation: string;
  items: CartItem[];
  subtotalMinorUnits: number;
  selectedCarrier: Carrier;
  shippingFeeMinorUnits: number;
  estimatedDeliveryDateMin: string;
  estimatedDeliveryDateMax: string;
}

export interface LandedCostBreakdown {
  itemsSubtotal: number;
  shippingTotal: number;
  taxAmount: number;
  taxName: string;
  taxRate: number;
  customsDutyAmount: number;
  customsProcessingFee: number;
  insuranceFee: number;
  discountAmount: number;
  totalLandedCost: number;
  currency: CurrencyCode;
  incoterm: 'DDP' | 'DAP'; // Delivered Duty Paid vs Delivered at Place
}

export type OrderStatus = 
  | 'ORDER_CONFIRMED'
  | 'ALLOCATING_INVENTORY'
  | 'PACKED_AT_WAREHOUSE'
  | 'EXPORT_CUSTOMS_CLEARED'
  | 'INTERNATIONAL_AIR_TRANSIT'
  | 'DESTINATION_CUSTOMS_CLEARED'
  | 'LOCAL_COURIER_OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'RETURN_REQUESTED'
  | 'REFUNDED';

export interface TrackingEvent {
  id: string;
  timestamp: string;
  status: OrderStatus;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
  completed: boolean;
}

export interface OrderShipment {
  shipmentId: string;
  trackingNumber: string;
  carrier: Carrier;
  originWarehouse: string;
  destinationAddress: ShippingAddress;
  status: OrderStatus;
  trackingTimeline: TrackingEvent[];
  currentLocationName: string;
  currentCoordinates: { lat: number; lng: number };
  estimatedDelivery: string;
  customsDeclarationNumber: string;
  incoterm: 'DDP' | 'DAP';
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  shipments: OrderShipment[];
  landedCost: LandedCostBreakdown;
  paymentMethod: PaymentMethodInfo;
  paymentStatus: 'AUTHORIZED' | 'CAPTURED' | 'REFUNDED' | 'FAILED';
  status: OrderStatus;
  isB2B: boolean;
  b2bPoNumber?: string;
  taxInvoiceNumber?: string;
  digitalWarrantyCertificateId: string;
}

export interface ShippingAddress {
  id: string;
  recipientName: string;
  companyName?: string;
  country: MarketId;
  postalCode: string;
  prefectureOrState: string;
  city: string;
  streetAddress1: string;
  streetAddress2?: string;
  phoneNumber: string;
  isDefault: boolean;
  taxIdOrVatNumber?: string; // for B2B cross-border
}

export interface PaymentMethodInfo {
  type: 'CREDIT_CARD' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'KONBINI_JAPAN' | 'PAY_EASY' | 'PAIDY_BNPL' | 'BANK_TRANSFER' | 'B2B_INVOICE_NET30';
  label: string;
  details: string; // e.g. "Visa ending in 4242" or "FamilyMart / Lawson (Ref: 98124)"
  iconName?: string;
}

export interface Review {
  id: string;
  productId: string;
  sellerId?: string;
  authorName: string;
  authorCountry: MarketId;
  rating: number; // product rating 1-5
  sellerRating?: number; // feedback rating for seller 1-5
  sellerFeedback?: string; // specific review note for seller service
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  voltageSetupComment?: string;
  helpfulCount: number;
  tags?: string[];
  images?: string[];
}

export interface ReturnRequest {
  id: string;
  rmaNumber: string;
  orderId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  reason: 'VOLTAGE_MISMATCH' | 'DEFECTIVE_OR_DAMAGED' | 'NOT_AS_DESCRIBED' | 'CHANGED_MIND' | 'SHIPPING_DELAY';
  reasonDetails: string;
  status: 'REQUEST_SUBMITTED' | 'RMA_LABEL_ISSUED' | 'PACKAGE_PICKED_UP' | 'IN_TRANSIT_TO_HANEDA' | 'INSPECTED_PASSED' | 'REFUND_COMPLETED';
  refundAmountMinorUnits: number;
  currency: CurrencyCode;
  requestedAt: string;
  trackingNumber: string;
  carrier: string;
  returnDestination: string;
  notes?: string;
}

export interface DenshiPointsLedgerEntry {
  id: string;
  date: string;
  type: 'EARNED_PURCHASE' | 'DAILY_CHECKIN' | 'REVIEW_BONUS' | 'REDEEMED_CHECKOUT' | 'TIER_BONUS';
  points: number;
  description: string;
  balanceAfter: number;
}

export interface UserDeviceProfile {
  id: string;
  name: string; // e.g. "My Japanese 100V Kitchen Setup" or "MacBook Pro M3 Max" or "Sony A7 IV Rig"
  deviceType: 'APPLIANCE_STATION' | 'LAPTOP' | 'CAMERA_BODY' | 'PC_MOTHERBOARD' | 'AUDIO_CHAIN' | 'SMARTPHONE';
  voltage: number; // e.g. 120 (for US user)
  plugType: string;
  specs: Record<string, string | number>;
  notes: string;
}

export interface WalletLedgerEntry {
  id: string;
  date: string;
  type: 'CASHBACK_REWARD' | 'REFUND_CREDIT' | 'STORE_PROMOTION' | 'PURCHASE_DEBIT' | 'TOP_UP';
  amountMinorUnits: number;
  currency: CurrencyCode;
  description: string;
  balanceAfterMinorUnits: number;
}

export interface LiveStreamSession {
  id: string;
  title: string;
  japaneseTitle: string;
  hostName: string;
  hostAvatar: string;
  location: string;
  viewerCount: number;
  status: 'LIVE' | 'UPCOMING' | 'REPLAY';
  pinnedProductId: string;
  coverImage: string;
  streamUrl: string;
  chatMessages: { id: string; user: string; text: string; time: string; isHost?: boolean }[];
}

export interface CompatibilityEvaluationResult {
  isCompatible: boolean;
  confidenceScore: number; // 0 to 100
  powerVerdict: 'SAFE_DIRECT_PLUG' | 'STEP_DOWN_TRANSFORMER_REQUIRED' | 'STEP_UP_TRANSFORMER_REQUIRED' | 'PLUG_ADAPTER_ONLY' | 'INCOMPATIBLE';
  recommendedAction: string;
  recommendedHardware: {
    name: string;
    wattageNeeded?: number;
    voltageIn?: number;
    voltageOut?: number;
    plugTypeFrom?: string;
    plugTypeTo?: string;
    suggestedProductId?: string;
  };
  explanation: string;
  detailedNotes: string[];
}

export interface AdminAnalyticsSummary {
  gmvUSD: number;
  totalOrders: number;
  averageOrderValueUSD: number;
  activeSellers: number;
  activeMarkets: number;
  customsClearanceSuccessRate: number;
  fraudAlertsBlocked: number;
  serverSlaUptime: number;
  dailyRevenueTrend: { date: string; revenueUSD: number; ordersCount: number }[];
  marketDistribution: { market: MarketId; percentage: number; revenueUSD: number }[];
  categoryDistribution: { category: ProductCategory; revenueUSD: number }[];
}

export interface CommunityDiscussion {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorLocation: string;
  authorBadge: string;
  title: string;
  japaneseTitle?: string;
  content: string;
  tags: string[];
  productId?: string;
  productName?: string;
  productImage?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  isTrending?: boolean;
  replies: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
    isSellerOrExpert?: boolean;
    likes: number;
  }[];
}

export interface WarrantyRecord {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  serialNumber: string;
  purchaseDate: string; // ISO date
  warrantyDurationMonths: number;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'CLAIM_IN_PROGRESS';
  metiPseCertificateNumber: string;
  serviceCenter: string;
  claimHistory: {
    id: string;
    date: string;
    issueDescription: string;
    status: 'SUBMITTED' | 'INSPECTION_PENDING' | 'REPAIRED_RETURNED' | 'REPLACED';
    resolutionNote?: string;
  }[];
}

export interface ProductVideo {
  id: string;
  productId: string;
  title: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl: string;
  author: string;
  views: number;
  type: 'UNBOXING' | 'VOLTAGE_TEST' | 'BENCHMARK' | 'TEARDOWN_DEMO';
}

export interface AppNotification {
  id: string;
  type: 'ORDER_UPDATE' | 'PRICE_DROP' | 'LIVE_ALERT' | 'VOLTAGE_ALERT' | 'WARRANTY_REMINDER' | 'COMMUNITY_REPLY';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionPayload?: any;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface DirectChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'BUYER' | 'SELLER' | 'JAPAN_TECH_SUPPORT' | 'AI_TRANSLATOR';
  text: string;
  originalText?: string;
  translatedText?: string;
  detectedLanguage?: string;
  timestamp: string;
  attachedProductId?: string;
  attachedProduct?: {
    id: string;
    title: string;
    priceMinorUnits: number;
    image: string;
  };
}

export interface TroubleshootingDiagnostic {
  deviceId: string;
  deviceName: string;
  issueCode?: string;
  issueTitle: string;
  symptoms: string[];
  rootCause: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL_SAFETY';
  stepByStepFix: string[];
  multimeterTestValue?: string;
  recommendedPartOrTool?: string;
  pseComplianceNote?: string;
}

