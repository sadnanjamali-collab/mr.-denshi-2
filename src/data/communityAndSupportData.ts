import { 
  CommunityDiscussion, 
  WarrantyRecord, 
  ProductVideo, 
  AppNotification, 
  DirectChatMessage,
  TroubleshootingDiagnostic 
} from '../types';

export const SEEDED_COMMUNITY_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: 'disc-1',
    authorName: 'Kenji_AkibaMaster',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
    authorLocation: 'Sotokanda 3-Chome, Akihabara',
    authorBadge: 'TOP TOKYO TECH CONTRIBUTOR',
    title: 'Why Zojirushi Kamado NW-LB10 induction produces vastly sweeter rice at 100V vs 120V US models',
    japaneseTitle: '南部鉄器極め羽釜と100V大火力IHの熱伝導科学',
    content: 'Many people ask if stepping down 120V to 100V with a pure copper toroidal transformer actually preserves the proprietary Kamado heating curve. We hooked up thermal thermocouples across the inner pot: the 1240W burst creates micro-convection vortices that release 28% more umami glutamates than US-market resistive heating.',
    tags: ['#100V_Kamado', '#RiceCookerScience', '#Zojirushi', '#Transformers'],
    productId: 'zojirushi-nw-lb10',
    productName: 'Zojirushi En-Nambu Iron Kamado IH Rice Cooker',
    productImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80',
    likesCount: 342,
    commentsCount: 28,
    sharesCount: 56,
    createdAt: '2026-08-18T10:30:00Z',
    isTrending: true,
    replies: [
      {
        id: 'rep-1',
        author: 'Chef_Marcus_LA',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80',
        text: 'Can confirm! I run this in my Beverly Hills kitchen with a Nissyo 1500W transformer. The koshihikari texture is identical to high-end Ginza sushi counters.',
        time: '3 hours ago',
        isSellerOrExpert: false,
        likes: 45
      },
      {
        id: 'rep-2',
        author: 'Akihabara Direct Tech',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
        text: 'Official tip: Always leave at least 5cm clearance behind the transformer cooling vents when running continuous 1240W cooking cycles.',
        time: '1 hour ago',
        isSellerOrExpert: true,
        likes: 89
      }
    ]
  },
  {
    id: 'disc-2',
    authorName: 'Audiophile_Berlin',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    authorLocation: 'Berlin, Germany',
    authorBadge: 'HI-RES LAB VERIFIED',
    title: 'Sony MDR-Z1R 70mm Magnesium Dome: Pairing with 4.4mm Pentaconn balanced amplifiers',
    japaneseTitle: 'ソニーMDR-Z1Rと大分県太陽工場の手作業クラフトマンシップ',
    content: 'Listening to Tokyo jazz recordings on the MDR-Z1R hand-built in Sony Taiyo factory. The resonance-free housing made with Canadian softwood pulp dampens micro-vibrations completely. The included 4.4mm balanced cable eliminates common-ground crosstalk.',
    tags: ['#HiRes_Audio', '#SonyTaiyo', '#MDRZ1R', '#BalancedAudio'],
    productId: 'sony-mdr-z1r',
    productName: 'Sony MDR-Z1R Signature Series Flagship Headphones',
    productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
    likesCount: 512,
    commentsCount: 42,
    sharesCount: 88,
    createdAt: '2026-08-17T18:15:00Z',
    isTrending: true,
    replies: [
      {
        id: 'rep-3',
        author: 'TokyoSoundEngine',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        text: 'The 120kHz frequency response also prevents ultrasonic phase distortion. Best paired with an uncompressed DSD256 DAC.',
        time: '5 hours ago',
        isSellerOrExpert: true,
        likes: 67
      }
    ]
  },
  {
    id: 'disc-3',
    authorName: 'Creator_Kyoto_Film',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
    authorLocation: 'Kyoto, Japan',
    authorBadge: 'OPTICS SPECIALIST',
    title: 'Fujifilm X100VI 40.2MP X-Trans 5 HR in Tokyo Rain: IBIS 6.0 Stops field test',
    japaneseTitle: '富士フイルムX100VIの6段手ブレ補正とクラシックネガ調色レシピ',
    content: 'Took the X100VI through rainy Shinjuku neon alleys at 1/4s handheld shutter speeds. The internal 5-axis IBIS keeps every rain droplet crisp without needing a tripod. Film simulation REALA ACE renders tungsten streetlight tones naturally.',
    tags: ['#Fujifilm_X100VI', '#TokyoStreetPhoto', '#Optics', '#FilmSimulation'],
    productId: 'fujifilm-x100vi',
    productName: 'Fujifilm X100VI Premium Compact Digital Camera',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
    likesCount: 684,
    commentsCount: 61,
    sharesCount: 112,
    createdAt: '2026-08-16T14:20:00Z',
    isTrending: true,
    replies: [
      {
        id: 'rep-4',
        author: 'ShutterSpeed_SF',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80',
        text: 'Did the Japanese firmware update 1.10 fix the auto-focus tracking on fast moving subjects?',
        time: '8 hours ago',
        likes: 23
      }
    ]
  }
];

export const SEEDED_WARRANTY_RECORDS: WarrantyRecord[] = [
  {
    id: 'war-001',
    orderId: 'ORD-2026-JP-88910',
    productId: 'zojirushi-nw-lb10',
    productTitle: 'Zojirushi NW-LB10 100V Kamado IH Rice Cooker',
    productImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80',
    serialNumber: 'ZOJ-2026-NMLB10-994182',
    purchaseDate: '2026-02-15T09:00:00Z',
    warrantyDurationMonths: 24,
    status: 'ACTIVE',
    metiPseCertificateNumber: 'METI-JET-PSE-2026-9941A',
    serviceCenter: 'MR. DENSHI Tokyo Haneda International Certified Repair Lab',
    claimHistory: []
  },
  {
    id: 'war-002',
    orderId: 'ORD-2026-JP-77412',
    productId: 'sony-mdr-z1r',
    productTitle: 'Sony MDR-Z1R Signature Hi-Res Headphones',
    productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
    serialNumber: 'SNY-TAIYO-Z1R-004419',
    purchaseDate: '2025-11-20T14:30:00Z',
    warrantyDurationMonths: 24,
    status: 'ACTIVE',
    metiPseCertificateNumber: 'METI-VCCI-AUDIO-88310',
    serviceCenter: 'Sony Taiyo Oita Certified Master Artisan Depot',
    claimHistory: []
  },
  {
    id: 'war-003',
    orderId: 'ORD-2025-JP-55198',
    productId: 'nissyo-ndf-1500u',
    productTitle: 'Nissyo NDF-1500U 1500W Toroidal Step-Down Transformer',
    productImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    serialNumber: 'NSY-NDF1500U-772911',
    purchaseDate: '2024-08-10T11:00:00Z',
    warrantyDurationMonths: 36,
    status: 'ACTIVE',
    metiPseCertificateNumber: 'METI-PSE-DIAMOND-NSY-1500',
    serviceCenter: 'Nissyo Industry Tokyo Repair & Recalibration Station',
    claimHistory: []
  }
];

export const SEEDED_PRODUCT_VIDEOS: ProductVideo[] = [
  {
    id: 'vid-1',
    productId: 'zojirushi-nw-lb10',
    title: 'Zojirushi Kamado NW-LB10: 100V Boiling Convection & Iron Pot Unboxing',
    durationSeconds: 245,
    thumbnailUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    author: 'Akihabara Tech Lab',
    views: 45200,
    type: 'UNBOXING'
  },
  {
    id: 'vid-2',
    productId: 'sony-mdr-z1r',
    title: 'Sony MDR-Z1R 70mm Drivers Teardown & Taiyo Handcrafting Showcase',
    durationSeconds: 310,
    thumbnailUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    author: 'Tokyo Hi-Res Sound',
    views: 89400,
    type: 'TEARDOWN_DEMO'
  },
  {
    id: 'vid-3',
    productId: 'nissyo-ndf-1500u',
    title: '1500W Toroidal Transformer Thermal Load & Oscilloscope Sine Wave Test',
    durationSeconds: 180,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    author: 'Electrical Safety Tokyo',
    views: 31800,
    type: 'VOLTAGE_TEST'
  }
];

export const SEEDED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'ORDER_UPDATE',
    title: '✈️ Transpacific Flight JL002 Telemetry Active',
    message: 'Your order #ORD-2026-JP-88910 (Zojirushi Kamado) has cleared Narita Export Customs and is currently at 36,000ft altitude.',
    timestamp: '15m ago',
    isRead: false,
    priority: 'HIGH'
  },
  {
    id: 'notif-2',
    type: 'PRICE_DROP',
    title: '⚡ Price Drop Alert: Sony MDR-Z1R',
    message: 'An item in your Saved Wishlist dropped by ¥12,000 in the Akihabara Lightning Deal.',
    timestamp: '1h ago',
    isRead: false,
    priority: 'NORMAL'
  },
  {
    id: 'notif-3',
    type: 'LIVE_ALERT',
    title: '🔴 Akihabara Live Stage Starting Now',
    message: 'Takumi Shimizu is demonstrating Fujifilm X100VI custom film recipes live from Sotokanda.',
    timestamp: '2h ago',
    isRead: true,
    priority: 'NORMAL'
  },
  {
    id: 'notif-4',
    type: 'WARRANTY_REMINDER',
    title: '🛡️ METI PSE Digital Certificate Issued',
    message: 'Your 24-Month Haneda Digital Warranty certificate for Nissyo NDF-1500U is ready for download in your Profile.',
    timestamp: '1d ago',
    isRead: true,
    priority: 'LOW'
  }
];

export const SEEDED_CHAT_MESSAGES: DirectChatMessage[] = [
  {
    id: 'chat-1',
    senderId: 'tokyo-support-1',
    senderName: 'Hiroshi Tanaka (Tokyo Senior Specialist)',
    senderRole: 'JAPAN_TECH_SUPPORT',
    text: 'Konnichiwa! Welcome to MR. DENSHI direct assistance. I can verify your destination voltage or check Japanese domestic stock for any item.',
    originalText: 'こんにちは！秋葉原テクニカルサポートの田中です。海外電圧のご相談や国内在庫確認などお気軽にお申し付けください。',
    translatedText: 'Hello! This is Tanaka from Akihabara Technical Support. Please feel free to ask about overseas voltage or Japanese inventory.',
    detectedLanguage: 'ja',
    timestamp: '10:00 AM'
  },
  {
    id: 'chat-2',
    senderId: 'user-me',
    senderName: 'You (International Buyer)',
    senderRole: 'BUYER',
    text: 'Hi Hiroshi! I am interested in the Zojirushi Kamado rice cooker for the US. Which transformer do you recommend?',
    timestamp: '10:02 AM',
    attachedProductId: 'zojirushi-nw-lb10',
    attachedProduct: {
      id: 'zojirushi-nw-lb10',
      title: 'Zojirushi NW-LB10 100V Kamado IH Rice Cooker',
      priceMinorUnits: 148000,
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'chat-3',
    senderId: 'tokyo-support-1',
    senderName: 'Hiroshi Tanaka (Tokyo Senior Specialist)',
    senderRole: 'JAPAN_TECH_SUPPORT',
    text: 'For the NW-LB10 (1240W continuous peak), we strongly recommend the Nissyo NDF-1500U pure copper toroidal step-down transformer (120V -> 100V). It provides a +260W thermal safety buffer so the unit never overheats during intense boiling phases.',
    originalText: 'NW-LB10（最大1240W）には、日章工業のNDF-1500U（120V→100V変圧器）を強くお勧めします。連続炊飯時も260W以上の熱余裕があり安全です。',
    translatedText: 'For the NW-LB10 (1240W max), we strongly recommend Nissyo NDF-1500U (120V->100V transformer). It has a safety thermal margin of over 260W.',
    detectedLanguage: 'ja',
    timestamp: '10:05 AM'
  }
];

export const DEVICE_TROUBLESHOOTING_DATABASE: Record<string, TroubleshootingDiagnostic[]> = {
  'zojirushi-nw-lb10': [
    {
      deviceId: 'zojirushi-nw-lb10',
      deviceName: 'Zojirushi NW-LB10 100V Kamado IH Rice Cooker',
      issueCode: 'ERR-H01 / ERR-H02',
      issueTitle: 'Lid Thermal Sensor Safety Lock Triggered',
      symptoms: ['Beeps 4 times', 'LCD displays H01 or H02', 'Induction coil cuts power after 3 minutes'],
      rootCause: 'Inner steam lid not seated properly or mains voltage is higher than 105V causing rapid thermal spike.',
      severity: 'WARNING',
      stepByStepFix: [
        '1. Disconnect power and let inner iron pot cool for 15 minutes.',
        '2. Remove inner detachable stainless steel steam vent lid and clean dried starch build-up.',
        '3. Verify that the step-down transformer output reads 100V ± 3V AC on a multimeter (not 120V).',
        '4. Reinstall lid until audible click is heard, then press "Torisikeshi" (Cancel) button twice to reset MCU.'
      ],
      multimeterTestValue: 'Target 100V AC (Acceptable range 97V - 103V AC)',
      recommendedPartOrTool: 'Nissyo NDF-1500U Pure Copper Toroidal Step-Down Transformer',
      pseComplianceNote: 'METI Diamond PSE Certified auto-cutoff thermal fuse protects heating coil.'
    },
    {
      deviceId: 'zojirushi-nw-lb10',
      deviceName: 'Zojirushi NW-LB10 100V Kamado IH Rice Cooker',
      issueCode: 'ERR-U10',
      issueTitle: 'Inner Pot Not Detected (IH Field Incomplete)',
      symptoms: ['Display blinks U10', 'Heating does not engage'],
      rootCause: 'Inner Nambu iron pot is not placed in the cavity or foreign object / water droplet is on the bottom thermistor.',
      severity: 'INFO',
      stepByStepFix: [
        '1. Wipe bottom sensor plate dry with a microfiber cloth.',
        '2. Place the genuine Nambu Iron pot firmly into the chamber.',
        '3. Rotate pot 15 degrees clockwise to ensure magnetic seated contact.',
        '4. Press "Suihan" (Cook) button.'
      ]
    }
  ],
  'sony-mdr-z1r': [
    {
      deviceId: 'sony-mdr-z1r',
      deviceName: 'Sony MDR-Z1R Signature Hi-Res Headphones',
      issueCode: 'AUDIO-GND-HUM',
      issueTitle: 'Low-Frequency Ground Hum or Static in Left Channel',
      symptoms: ['50Hz/60Hz background hum when connected to desktop DAC', 'Slight hiss at high volume'],
      rootCause: 'Ground loop interference through unshielded PC USB port or unbalanced 3.5mm ground sharing.',
      severity: 'INFO',
      stepByStepFix: [
        '1. Switch from single-ended 3.5mm cable to the included 4.4mm Pentaconn balanced cable.',
        '2. Use a dedicated USB optical isolator or plug DAC into a grounded power strip.',
        '3. Inspect the screw-locking 3.5mm cup connectors to ensure they are twisted to the locked position.'
      ],
      multimeterTestValue: 'Impedance across L+ and L- should read 64 Ohms at 1kHz ± 5%',
      recommendedPartOrTool: 'Sony MUC-B20SB1 Kimber Kable 4.4mm Balanced Upgrade Cable'
    }
  ],
  'nissyo-ndf-1500u': [
    {
      deviceId: 'nissyo-ndf-1500u',
      deviceName: 'Nissyo NDF-1500U 1500W Transformer',
      issueCode: 'PWR-TRIP-RESET',
      issueTitle: 'Thermal Breaker Tripped After Extended 1400W Load',
      symptoms: ['Power LED off', 'No 100V output at receptacles', 'Transformer case is warm'],
      rootCause: 'Continuous load exceeded 1500W or ambient temperature blocked toroidal air vents.',
      severity: 'WARNING',
      stepByStepFix: [
        '1. Unplug connected appliance immediately.',
        '2. Allow transformer to cool down for 20 minutes.',
        '3. Press the red "BREAKER RESET" button located on the rear panel until it clicks.',
        '4. Ensure transformer is placed in an open area with 10cm airflow clearance.'
      ],
      multimeterTestValue: 'Mains input 120V AC -> Receptacle output 100V AC ± 2%',
      recommendedPartOrTool: 'Built-in manual reset thermal circuit protector.'
    }
  ]
};
