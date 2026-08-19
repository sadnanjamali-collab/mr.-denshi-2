import { Order, UserDeviceProfile, WalletLedgerEntry, LiveStreamSession, Review } from '../types';
import { ELECTRONICS_CATALOG } from './catalog';
import { GLOBAL_MARKETS } from './markets';

export const CURRENT_USER = {
  id: 'usr-denshi-global-889',
  name: 'Sadnan Jamali',
  email: 'sadnan.jamali@denshi-global.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  defaultMarket: 'JP' as const,
  defaultCurrency: 'JPY' as const,
  defaultLocale: 'ja-JP' as const,
  savedAddresses: [
    {
      id: 'addr-tokyo-1',
      recipientName: 'Sadnan Jamali',
      companyName: 'Denshi Global Technology Ltd.',
      country: 'JP' as const,
      postalCode: '101-0021',
      prefectureOrState: 'Tokyo-to',
      city: 'Chiyoda-ku',
      streetAddress1: 'Sotokanda 4-14-1',
      streetAddress2: 'Akihabara UDX Building 18F',
      phoneNumber: '+81-3-5297-8890',
      isDefault: true
    },
    {
      id: 'addr-sf-2',
      recipientName: 'Sadnan Jamali (US Office)',
      companyName: 'Denshi Global America Inc.',
      country: 'US' as const,
      postalCode: '94107',
      prefectureOrState: 'California',
      city: 'San Francisco',
      streetAddress1: '500 Townsend St, Suite 400',
      streetAddress2: 'Design & Engineering Hub',
      phoneNumber: '+1-415-555-0199',
      isDefault: false
    }
  ]
};

export const SEEDED_SAVED_DEVICES: UserDeviceProfile[] = [
  {
    id: 'dev-kitchen-us',
    name: 'Home Kitchen Countertop (North America)',
    deviceType: 'APPLIANCE_STATION',
    voltage: 120,
    plugType: 'Type B (US Grounded 3-prong)',
    specs: {
      mainsVoltage: 120,
      frequency: '60Hz',
      circuitBreakerLimitWatts: 1800
    },
    notes: 'Requires 1500W step-down transformer for pure 100V Japanese appliances (e.g. Zojirushi / Balmuda)'
  },
  {
    id: 'dev-macbook-m3',
    name: 'Apple MacBook Pro 16" (M3 Max)',
    deviceType: 'LAPTOP',
    voltage: 240,
    plugType: 'USB-C Power Delivery 3.1',
    specs: {
      maxChargingWattage: 140,
      protocol: 'USB PD 3.1 EPR (28V/5A)'
    },
    notes: 'Works perfectly with Anker Prime 240W charger single port 140W mode.'
  },
  {
    id: 'dev-audio-rig',
    name: 'Reference Audiophile Rig (FiiO / Sony)',
    deviceType: 'AUDIO_CHAIN',
    voltage: 0,
    plugType: '4.4mm Balanced Pentaconn',
    specs: {
      outputImpedance: '0.5Ω',
      supportSampling: 'PCM 768kHz / DSD512'
    },
    notes: 'Paired with Sony MDR-Z1R high-resolution balanced headphones.'
  }
];

export const SEEDED_WALLET_LEDGER: WalletLedgerEntry[] = [
  {
    id: 'w-entry-1',
    date: '2026-08-18T14:30:00Z',
    type: 'CASHBACK_REWARD',
    amountMinorUnits: 4500,
    currency: 'JPY',
    description: '3% Akihabara Tech Reward Points on Sony MDR-Z1R Order',
    balanceAfterMinorUnits: 28500
  },
  {
    id: 'w-entry-2',
    date: '2026-08-15T09:12:00Z',
    type: 'TOP_UP',
    amountMinorUnits: 24000,
    currency: 'JPY',
    description: 'Digital Wallet Fast-Reload via Japanese Bank Transfer (Pay-easy)',
    balanceAfterMinorUnits: 24000
  }
];

export const SEEDED_ACTIVE_ORDERS: Order[] = [
  {
    id: 'ord-denshi-99281',
    orderNumber: 'DS-20260819-99281',
    createdAt: '2026-08-19T00:45:10Z',
    customerId: CURRENT_USER.id,
    customerName: CURRENT_USER.name,
    customerEmail: CURRENT_USER.email,
    items: [
      {
        product: ELECTRONICS_CATALOG[0], // Zojirushi
        variant: ELECTRONICS_CATALOG[0].variants[0],
        quantity: 1,
        addedAt: '2026-08-19T00:40:00Z',
        giftPackaging: true,
        voltageWarningAcknowledged: true
      },
      {
        product: ELECTRONICS_CATALOG[4], // Nissyo Transformer
        variant: ELECTRONICS_CATALOG[4].variants[0],
        quantity: 1,
        addedAt: '2026-08-19T00:41:00Z',
        giftPackaging: false,
        voltageWarningAcknowledged: true
      }
    ],
    shipments: [
      {
        shipmentId: 'shp-haneda-dhl-4889',
        trackingNumber: 'JD0146000098284712',
        carrier: GLOBAL_MARKETS.JP.availableCarriers[2], // Japan Post EMS / DHL
        originWarehouse: 'Tokyo Haneda Air Cargo Bonded Logistics Park, Japan',
        destinationAddress: CURRENT_USER.savedAddresses[0],
        status: 'INTERNATIONAL_AIR_TRANSIT',
        trackingTimeline: [
          {
            id: 'tk-1',
            timestamp: '2026-08-19T01:10:00Z',
            status: 'ORDER_CONFIRMED',
            location: 'MR. DENSHI Tokyo Automated Order Routing System',
            description: 'Order confirmed and inventory allocated with cryptographic reservation lock.',
            completed: true
          },
          {
            id: 'tk-2',
            timestamp: '2026-08-19T02:30:00Z',
            status: 'PACKED_AT_WAREHOUSE',
            location: 'Haneda Bonded Warehouse 4A (Tokyo, Japan)',
            description: 'Laser serial barcode scanned, anti-static sealed & PSE inspection certified.',
            completed: true
          },
          {
            id: 'tk-3',
            timestamp: '2026-08-19T04:15:00Z',
            status: 'EXPORT_CUSTOMS_CLEARED',
            location: 'Tokyo International Airport (Haneda HND) Customs Office',
            description: 'Export declaration filed and cleared under Japan Customs Electronic System (NACCS).',
            completed: true
          },
          {
            id: 'tk-4',
            timestamp: '2026-08-19T06:40:00Z',
            status: 'INTERNATIONAL_AIR_TRANSIT',
            location: 'Flight JL002 / NH106 En Route Trans-Pacific Air Corridor',
            description: 'Air cargo dispatched on dedicated widebody freight flight. Real-time telemetry active.',
            latitude: 35.5494,
            longitude: 139.7798,
            completed: true
          },
          {
            id: 'tk-5',
            timestamp: '2026-08-20T10:00:00Z',
            status: 'DESTINATION_CUSTOMS_CLEARED',
            location: 'Destination Import Customs Terminal',
            description: 'Pre-cleared under DDP Incoterms (Duties & Taxes pre-remitted).',
            completed: false
          },
          {
            id: 'tk-6',
            timestamp: '2026-08-21T09:00:00Z',
            status: 'LOCAL_COURIER_OUT_FOR_DELIVERY',
            location: 'Local Delivery Depot',
            description: 'Loaded onto temperature-controlled delivery vehicle.',
            completed: false
          },
          {
            id: 'tk-7',
            timestamp: '2026-08-21T14:00:00Z',
            status: 'DELIVERED',
            location: CURRENT_USER.savedAddresses[0].city,
            description: 'Delivered and verified by digital receiver signature.',
            completed: false
          }
        ],
        currentLocationName: 'Tokyo Haneda Air Cargo Terminal (Flight JL002)',
        currentCoordinates: { lat: 35.5494, lng: 139.7798 },
        estimatedDelivery: '2026-08-21T14:00:00Z',
        customsDeclarationNumber: 'JP-EXP-2026-8890214',
        incoterm: 'DDP'
      }
    ],
    landedCost: {
      itemsSubtotal: 123800,
      shippingTotal: 3500,
      taxAmount: 12380,
      taxName: 'Consumption Tax (JCT 10%)',
      taxRate: 0.10,
      customsDutyAmount: 0,
      customsProcessingFee: 0,
      insuranceFee: 650,
      discountAmount: 0,
      totalLandedCost: 140330,
      currency: 'JPY',
      incoterm: 'DDP'
    },
    paymentMethod: {
      type: 'CREDIT_CARD',
      label: 'JCB Platinum / Visa Infinite',
      details: 'Ending in 9012 (Tokenized 3D-Secure 2.2 Authorized)'
    },
    paymentStatus: 'CAPTURED',
    status: 'INTERNATIONAL_AIR_TRANSIT',
    isB2B: false,
    digitalWarrantyCertificateId: 'WARR-ZOJ-2026-0819-992'
  }
];

export const SEEDED_LIVESTREAMS: LiveStreamSession[] = [
  {
    id: 'live-akiba-launch',
    title: 'Akihabara Flagship Live: Unboxing 2026 JDM Flagship Audio & Pure 100V Kitchen Masters',
    japaneseTitle: '【秋葉原LIVE】2026年最新ハイレゾ音響機器＆極上100V職人家電 実演レビュー',
    hostName: 'Kenji Takahashi (Senior Audio Engineer)',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Akihabara Sotokanda Stage, Tokyo',
    viewerCount: 2480,
    status: 'LIVE',
    pinnedProductId: 'sony-mdr-z1r',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    streamUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    chatMessages: [
      { id: 'c1', user: 'audiophile_berlin', text: 'Does this balanced 4.4mm cable pair natively with FiiO M17?', time: '01:02' },
      { id: 'c2', user: 'Kenji Takahashi', text: 'Yes! It pairs with zero adapters with 100% bit-perfect signal fidelity.', time: '01:03', isHost: true },
      { id: 'c3', user: 'chef_sanfrancisco', text: 'Can you show the Zojirushi Kamado heating cycle in action?', time: '01:04' },
      { id: 'c4', user: 'tokyo_tech_fan', text: 'The build quality of this titanium chassis is unbelievable ✨', time: '01:05' },
      { id: 'c5', user: 'Mark_London', text: 'Just claimed the flash deal voucher with DDP to UK!', time: '01:06' }
    ]
  },
  {
    id: 'live-kamado-taste',
    title: 'Pure 100V JDM Culinary Showdown: Zojirushi Kamado vs. Balmuda Steam Pro',
    japaneseTitle: '【職人家電対決】最高峰南部鉄器極め羽釜 vs バルミューダ 実演試食LIVE',
    hostName: 'Chef Yuka Morimoto (Tokyo Gastronomy Host)',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Ginza Gourmet Test Kitchen, Tokyo',
    viewerCount: 3120,
    status: 'LIVE',
    pinnedProductId: 'zojirushi-nw-lb10',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    streamUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    chatMessages: [
      { id: 'c10', user: 'Gourmet_NY', text: 'Look at that steam aroma! Is the transformer included?', time: '02:10' },
      { id: 'c11', user: 'Chef Yuka Morimoto', text: 'Add the Nissyo 1500W bundle at checkout for guaranteed safe power in US & EU kitchens!', time: '02:11', isHost: true },
      { id: 'c12', user: 'TokyoFoodie', text: 'The Nanbu iron kettle cooks with genuine firewood kiln pressure 🔥', time: '02:12' }
    ]
  },
  {
    id: 'live-akiba-pc-rig',
    title: 'Akihabara Custom Rig Build: Liquid Nitrogen Overclock & Japanese Machined Cases',
    japaneseTitle: '【秋葉原自作PC】RTX 4090 & 日本職人アルミ削り出しケース 冷却テスト',
    hostName: 'Ryota Sugiura (Akiba PC Builder)',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Radio Kaikan Studio 3F, Akihabara',
    viewerCount: 1840,
    status: 'LIVE',
    pinnedProductId: 'akiba-pc-custom-r1',
    coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    streamUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    chatMessages: [
      { id: 'c20', user: 'gamer_sydney', text: 'What is the GPU temp under 4K stress load?', time: '03:15' },
      { id: 'c21', user: 'Ryota Sugiura', text: 'Holding stable at 54°C thanks to Noctua industrial fans and Japanese copper piping!', time: '03:16', isHost: true }
    ]
  }
];

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'zojirushi-nw-lb10',
    sellerId: 'seller-zojirushi-official',
    authorName: 'Marcus Vance',
    authorCountry: 'US',
    rating: 5,
    sellerRating: 5,
    sellerFeedback: 'Seller packaged the rice cooker with dual-bubble shock wrapping and included Japanese rice washing instructions with English translation. Fast Tokyo Haneda dispatch!',
    date: '2026-08-10',
    title: 'The best rice cooker on earth. Using with Nissyo 1500W transformer in California!',
    comment: 'The grain separation and sweet umami glaze on Koshihikari rice is incomparable to US domestic units. Paired it with the Nissyo NDF-1500U step-down transformer recommended by MR. DENSHI, and it runs quietly with zero voltage issues. Arrived in SF from Tokyo in 3 days via DHL DDP with all customs handled seamlessly.',
    verifiedPurchase: true,
    voltageSetupComment: 'Connected to 120V US outlet via Nissyo NDF-1500U Step-Down Transformer (1500W rating). Perfectly safe!',
    helpfulCount: 42,
    tags: ['Fast Logistics', '100V Verified', 'Authentic JDM', 'Great Packaging'],
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'rev-2',
    productId: 'sony-mdr-z1r',
    sellerId: 'seller-akiba-audio',
    authorName: 'Satoshi Miura',
    authorCountry: 'JP',
    rating: 5,
    sellerRating: 5,
    sellerFeedback: '秋葉原の専門店らしく、シリアルナンバー一致の未開封品を即日発送してくれました。対応も丁寧で安心です。',
    date: '2026-08-04',
    title: '日本の音響職人魂を感じる最高峰のヘッドホン (Masterpiece of Japanese Audio Craft)',
    comment: '大分県のソニー太陽工場で熟練職人が手作業で組み立てているだけあり、70mmマグネシウムドームの低域の深みと高域の伸びが圧倒的です。4.4mmバランス接続時の解像度は異次元。一生モノの銘機です。',
    verifiedPurchase: true,
    helpfulCount: 31,
    tags: ['High Sound Quality', 'Authentic JDM', 'METI Approved']
  },
  {
    id: 'rev-3',
    productId: 'zojirushi-nw-lb10',
    sellerId: 'seller-zojirushi-official',
    authorName: 'Elena Rostova',
    authorCountry: 'DE',
    rating: 5,
    sellerRating: 5,
    sellerFeedback: 'Fast response regarding German 230V step-down transformer requirements. Super supportive seller!',
    date: '2026-08-01',
    title: 'Gourmet Perfection in Berlin',
    comment: 'Using this with a 230V to 100V 1500W converter in Berlin. Every single rice type (Jasmine, Sushi rice, Brown rice) turns out phenomenal.',
    verifiedPurchase: true,
    voltageSetupComment: 'Used 230V -> 100V 1500W Toroidal transformer.',
    helpfulCount: 19,
    tags: ['Fast Logistics', '100V Verified', 'Good Quality']
  },
  {
    id: 'rev-4',
    productId: 'balmuda-toaster-pro',
    sellerId: 'seller-balmuda-store',
    authorName: 'David K.',
    authorCountry: 'US',
    rating: 5,
    sellerRating: 4,
    sellerFeedback: 'Item was brand new in original sealed box. Delivered in 4 days.',
    date: '2026-07-28',
    title: 'Steam Salamander Mode is Pure Magic',
    comment: 'The 5cc water boiler rehydrates artisanal bread crumb while the salamander broiler creates a crisp golden crust. Best breakfast appliance in our kitchen.',
    verifiedPurchase: true,
    voltageSetupComment: 'Requires 1300W step-down transformer in the United States.',
    helpfulCount: 27,
    tags: ['Authentic JDM', 'Good Quality', 'Great Packaging']
  }
];

export const SEEDED_RETURNS: ReturnRequest[] = [
  {
    id: 'ret-1092',
    rmaNumber: 'RMA-TOKYO-2026-0819-01',
    orderId: 'ord-denshi-99281',
    productId: 'nissyo-ndf-1500u',
    productTitle: 'Nissyo NDF-1500U Pure Copper Toroidal Step-Down Transformer (1500W)',
    productImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
    quantity: 1,
    reason: 'VOLTAGE_MISMATCH',
    reasonDetails: 'Ordered extra unit for secondary room but countertop already had dedicated 100V circuit line installed.',
    status: 'RMA_LABEL_ISSUED',
    refundAmountMinorUnits: 16500,
    currency: 'JPY',
    requestedAt: '2026-08-19T02:15:00Z',
    trackingNumber: 'RET-YAMATO-88192039',
    carrier: 'Yamato Global Express / DHL Return Service',
    returnDestination: 'MR. DENSHI Tokyo Haneda International Inspection Depot, Terminal 4B, Tokyo 144-0041, Japan',
    notes: 'Prepaid international air return label generated. Carrier scheduled for doorstep collection.'
  }
];

export const SEEDED_DENSHI_POINTS_LEDGER: DenshiPointsLedgerEntry[] = [
  {
    id: 'pt-1',
    date: '2026-08-19T01:00:00Z',
    type: 'EARNED_PURCHASE',
    points: 1240,
    description: '3% Akihabara Points on Order #DS-20260819-99281',
    balanceAfter: 2850
  },
  {
    id: 'pt-2',
    date: '2026-08-18T10:00:00Z',
    type: 'REVIEW_BONUS',
    points: 300,
    description: 'Verified JDM Photo Review Reward (Zojirushi Kamado)',
    balanceAfter: 1610
  },
  {
    id: 'pt-3',
    date: '2026-08-17T08:30:00Z',
    type: 'DAILY_CHECKIN',
    points: 50,
    description: 'Daily Tokyo Tech Hub Check-in Bonus',
    balanceAfter: 1310
  },
  {
    id: 'pt-4',
    date: '2026-08-15T14:00:00Z',
    type: 'TIER_BONUS',
    points: 500,
    description: 'Akihabara VIP Gold Tier Welcome Bonus',
    balanceAfter: 1260
  }
];
