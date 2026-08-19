import { Product } from '../types';
import { OFFICIAL_SELLERS } from './sellers';

export const ELECTRONICS_CATALOG: Product[] = [
  {
    id: 'zojirushi-nw-lb10',
    slug: 'zojirushi-en-nabe-nw-lb10-bz',
    title: 'Zojirushi NW-LB10-BZ En-nabe Flagship Induction Heating Rice Cooker (5.5 Go)',
    japaneseTitle: '象印 炎舞炊き 圧力IH炊飯ジャー 濃墨 NW-LB10-BZ (最高峰モデル)',
    brand: 'Zojirushi (象印)',
    modelNumber: 'NW-LB10-BZ',
    category: 'JAPANESE_APPLIANCES',
    description: 'The pinnacle of Japanese domestic culinary engineering. Utilizes 6 independent bottom induction heating coils simulating traditional Japanese woodfire kamado rotational convection. Features premium iron-forged "Kurogane" thick inner pot, 121 personalized texture settings, and artificial intelligence steam control.',
    highlightBullets: [
      'Authentic Japan Domestic Market (JDM) flagship engineered in Osaka, Japan',
      '6-Zone Independent Rotary IH Heating system creates turbulent thermal convection',
      'Platinum-infused fluororesin coated thick iron-forged inner cauldron',
      '100V 1240W Power: Requires 1500W+ Step-Down Transformer outside Japan',
      'Certified PSE Diamond Japanese Electrical Safety Mark'
    ],
    images: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V AC only (Japan Domestic Spec)',
      voltageNumber: 100,
      frequency: '50/60Hz Dual compatible across Eastern/Western Japan',
      wattage: 1240,
      plugType: 'Type A (Japanese unpolarized 2-pin flat)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 375, width: 275, height: 235 },
      weightGrams: 8500,
      certifications: ['PSE Diamond', 'S-Mark (Japan Electrical Safety)'],
      warrantyRegion: 'JAPAN_ONLY',
      warrantyMonths: 12
    },
    detailedSpecs: [
      { key: 'voltage_in', label: 'Rated Input Voltage', value: 100, unit: 'V', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'power_consumption', label: 'Maximum Cooking Power', value: 1240, unit: 'W', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'inner_pan', label: 'Cauldron Metallurgy', value: 'Kurogane-jikomi Iron / Stainless Steel / Aluminum Hybrid', category: 'PHYSICAL' },
      { key: 'capacity', label: 'Cooking Capacity', value: '1.0L (0.5 to 5.5 cups raw rice)', category: 'PERFORMANCE' },
      { key: 'ai_logic', label: 'Smart Engine', value: 'Denshi Umami AI Sensor (Dual pressure valves)', category: 'PERFORMANCE' }
    ],
    variants: [
      {
        id: 'var-zojirushi-black',
        sku: 'ZOJ-NWLB10-BZ-BLK',
        name: 'Nou-zumi (Deep Charcoal Matte Black)',
        color: 'Nou-zumi Black',
        colorHex: '#18181b',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 108000, // ¥108,000 JPY
        originalPriceMinorUnits: 128000,
        stockOnHand: 18,
        stockReserved: 2,
        image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'var-zojirushi-white',
        sku: 'ZOJ-NWLB10-WZ-WHT',
        name: 'Kinu-shiro (Silk Matte White)',
        color: 'Kinu-shiro White',
        colorHex: '#f8fafc',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 108000,
        originalPriceMinorUnits: 128000,
        stockOnHand: 9,
        stockReserved: 1,
        image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-zojirushi-black',
    rating: 4.97,
    reviewCount: 342,
    seller: OFFICIAL_SELLERS['tokyo-appliance-craft'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: true,
    transformerRequiredForUS: true,
    transformerRequiredForEU: true,
    recommendedTransformerWattage: 1500,
    hsCode: '8516.60.00',
    authenticityGuaranteed: true,
    tags: ['JDM', 'IH Pressure', 'Osaka Craft', 'Zojirushi Flagship', '100V Japan'],
    accessoryProductIds: ['nissyo-ndf-1500u', 'kashimura-ti-20'],
    featuredInFlashDeal: true,
    dealDiscountPercent: 15,
    dealExpiresAt: '2026-08-20T23:59:59Z',
    b2bBulkDiscountTiers: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 10, discountPercent: 12 }
    ]
  },
  {
    id: 'sony-mdr-z1r',
    slug: 'sony-mdr-z1r-signature-series-headphones',
    title: 'Sony Signature Series MDR-Z1R Flagship Closed-Back Dynamic Hi-Res Headphones',
    japaneseTitle: 'ソニー シグネチャーシリーズ MDR-Z1R ハイレゾ密閉型ヘッドホン (日本太陽工場製造)',
    brand: 'Sony (ソニー)',
    modelNumber: 'MDR-Z1R',
    category: 'AUDIO_HIFI',
    description: 'Handcrafted with obsessive precision at Sony Taiyo factory in Oita, Japan. Features a massive 70mm magnesium dome dynamic driver with Fibonacci-patterned grill, acoustic resonance-free housing crafted from Canadian softwood pulp, and genuine Japanese sheepskin leather earpads.',
    highlightBullets: [
      'Manufactured exclusively by master artisans at Sony Taiyo plant in Japan',
      'Huge 70mm Magnesium dome diaphragm delivering frequency response up to 120kHz',
      'Resonance-free acoustic filter housing and titanium/beta-titanium headband',
      'Silver-coated OFC cables with balanced 4.4mm Pentaconn and 3.5mm unbalanced gold plugs',
      'Impedance: 64 Ohms at 1kHz | Sensitivity: 100 dB/mW'
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: 'Passive Audio (No external AC power required)',
      voltageNumber: 0,
      frequency: '4Hz - 120,000Hz (Hi-Res Audio Certified)',
      wattage: 2.5,
      plugType: 'Balanced 4.4mm Pentaconn & 3.5mm Gold-plated Stereo Mini',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 240, width: 220, height: 120 },
      weightGrams: 385,
      certifications: ['JEITA Hi-Res Audio', 'CE', 'RoHS'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 24
    },
    detailedSpecs: [
      { key: 'impedance', label: 'Nominal Impedance', value: 64, unit: 'Ω', category: 'AUDIO', isCrucialForCompatibility: true },
      { key: 'sensitivity', label: 'Sound Sensitivity', value: 100, unit: 'dB/mW', category: 'AUDIO' },
      { key: 'driver_size', label: 'Diaphragm Diameter', value: 70, unit: 'mm', category: 'AUDIO' },
      { key: 'frequency_range', label: 'Frequency Spectrum', value: '4Hz – 120kHz', category: 'PERFORMANCE' },
      { key: 'craftsmanship', label: 'Origin Workshop', value: 'Sony Taiyo Artisan Workshop (Oita Prefecture, Japan)', category: 'COMPLIANCE' }
    ],
    variants: [
      {
        id: 'var-sony-z1r-std',
        sku: 'SONY-MDR-Z1R-JAP',
        name: 'Flagship Edition (Includes Hard Storage Trunk & Dual Cables)',
        color: 'Satin Titanium & Black Leather',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 238000, // ¥238,000 JPY (~$1,550 USD)
        originalPriceMinorUnits: 260000,
        stockOnHand: 14,
        stockReserved: 1,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-sony-z1r-std',
    rating: 4.99,
    reviewCount: 189,
    seller: OFFICIAL_SELLERS['nihon-precision-audio'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8518.30.20',
    authenticityGuaranteed: true,
    tags: ['Hi-Res Audio', 'Sony Flagship', 'Made in Japan', 'Audiophile', 'Pentaconn 4.4mm'],
    accessoryProductIds: ['fiio-m17-dac'],
    b2bBulkDiscountTiers: [
      { minQty: 3, discountPercent: 6 }
    ]
  },
  {
    id: 'fujifilm-x100vi',
    slug: 'fujifilm-x100vi-digital-camera-silver',
    title: 'Fujifilm X100VI Premium Compact Digital Camera (40.2MP X-Trans CMOS 5 HR)',
    japaneseTitle: '富士フイルム X100VI プレミアムコンパクトデジタルカメラ (シルバー/ブラック)',
    brand: 'Fujifilm (富士フイルム)',
    modelNumber: 'X100VI',
    category: 'CAMERAS_OPTICS',
    description: 'The definitive creative tool. Houses a 40.2 megapixel back-illuminated X-Trans CMOS 5 HR sensor paired with the X-Processor 5 engine and a dedicated 6.0-stop 5-axis In-Body Image Stabilization (IBIS) system inside an ultra-refined machined aluminum chassis. Includes 20 legendary Film Simulation modes including REALA ACE.',
    highlightBullets: [
      '40.2MP X-Trans CMOS 5 HR sensor with Fujinon 23mm F2.0 MK II high-resolving prime lens',
      'Advanced 6.0-stop 5-axis In-Body Image Stabilization in classic rangefinder form factor',
      'Hybrid optical/electronic viewfinder (OVF/EVF) with 3.69M-dot OLED panel',
      '6.2K/30p & 4K/60p 10-bit internal video recording with F-Log2 support',
      'USB-C Power Delivery charging (Universal 100V-240V USB charging compatible)'
    ],
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V-240V Universal USB-PD Charging (5V/9V/15V)',
      voltageNumber: 240,
      frequency: '50/60Hz Universal',
      wattage: 18,
      plugType: 'USB Type-C (Global standard)',
      powerSupplyType: 'BATTERY_RECHARGEABLE',
      dimensionsMm: { length: 128, width: 74.8, height: 55.3 },
      weightGrams: 521,
      operatingSystem: 'Fujifilm Camera OS v1.12',
      certifications: ['PSE Diamond', 'CE', 'FCC', 'VCCI Class B', 'MIC Radio'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 12
    },
    detailedSpecs: [
      { key: 'sensor_res', label: 'Effective Pixel Count', value: '40.2 Megapixels', category: 'OPTICAL' },
      { key: 'lens_focal', label: 'Integrated Prime Lens', value: '23mm F2.0 (35mm Equivalent in Full-Frame)', category: 'OPTICAL' },
      { key: 'ibis', label: 'Image Stabilization', value: '5-Axis In-Body Gyro (up to 6.0 Stops)', category: 'PERFORMANCE' },
      { key: 'battery', label: 'Battery Type', value: 'NP-W126S Lithium-ion (Rechargeable via USB-C PD)', category: 'POWER' }
    ],
    variants: [
      {
        id: 'var-fuji-silver',
        sku: 'FUJI-X100VI-SLV-JP',
        name: 'Classic Precision Silver',
        color: 'Precision Silver & Black Leatherette',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 281600, // ¥281,600 JPY
        originalPriceMinorUnits: 298000,
        stockOnHand: 7,
        stockReserved: 3,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'var-fuji-black',
        sku: 'FUJI-X100VI-BLK-JP',
        name: 'Stealth All-Black Anodized',
        color: 'Stealth Matte Black',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 281600,
        originalPriceMinorUnits: 298000,
        stockOnHand: 5,
        stockReserved: 1,
        image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-fuji-silver',
    rating: 4.95,
    reviewCount: 428,
    seller: OFFICIAL_SELLERS['akihabara-direct'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8525.80.30',
    authenticityGuaranteed: true,
    tags: ['Fujifilm', '40.2MP', 'X100VI', 'Film Simulation', 'IBIS', 'Rangefinder'],
    accessoryProductIds: ['anker-prime-240w'],
    featuredInFlashDeal: false
  },
  {
    id: 'balmuda-toaster-pro',
    slug: 'balmuda-the-toaster-pro-salamander',
    title: 'Balmuda The Toaster Pro with Salamander Mode (K05A-SE Flagship Steam Toaster)',
    japaneseTitle: 'バルミューダ ザ・トースター プロ K05A-SE サラマンダー機能搭載 (ブラック)',
    brand: 'Balmuda (バルミューダ)',
    modelNumber: 'K05A-SE',
    category: 'JAPANESE_APPLIANCES',
    description: 'Renowned Tokyo design marvel. Uses micro-steam boiler technology (5cc water reservoir) with second-by-second thermal calibration, now elevated with professional "Salamander Mode" providing explosive top heat for instant caramelized surface crisping and melted cheese blistering.',
    highlightBullets: [
      'Revolutionary Japanese micro-steam moisture envelope prevents crumb drying',
      'Salamander Mode: Professional chef-grade directional radiant top charring',
      'Triple temperature zones: Surface gelatinization (60°C), inner heat (160°C), surface browning (220°C)',
      '100V 1300W Japanese domestic spec: Requires 1500W step-down transformer for US/EU use',
      'Machined brass dials and industrial matte textured stainless steel casing'
    ],
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V AC only (Japan Domestic Spec)',
      voltageNumber: 100,
      frequency: '50/60Hz Dual compatible',
      wattage: 1300,
      plugType: 'Type A (Japanese 2-pin)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 357, width: 321, height: 209 },
      weightGrams: 4500,
      certifications: ['PSE Diamond', 'S-JET Japan'],
      warrantyRegion: 'JAPAN_ONLY',
      warrantyMonths: 12
    },
    detailedSpecs: [
      { key: 'rated_voltage', label: 'Input Voltage', value: 100, unit: 'V', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'power_consumption', label: 'Rated Power', value: 1300, unit: 'W', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'steam_boiler', label: 'Steam Generator', value: '5cc precision boiler tube', category: 'PERFORMANCE' },
      { key: 'heating_modes', label: 'Baking Modes', value: 'Toast / Cheese Toast / French Bread / Croissant / Classic / Salamander', category: 'PERFORMANCE' }
    ],
    variants: [
      {
        id: 'var-balmuda-pro-blk',
        sku: 'BALM-K05ASE-BLK',
        name: 'Matte Charcoal & Polished Solid Brass',
        color: 'Matte Charcoal',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 36300, // ¥36,300 JPY (~$240 USD)
        originalPriceMinorUnits: 39800,
        stockOnHand: 22,
        stockReserved: 4,
        image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-balmuda-pro-blk',
    rating: 4.93,
    reviewCount: 260,
    seller: OFFICIAL_SELLERS['tokyo-appliance-craft'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: true,
    transformerRequiredForUS: true,
    transformerRequiredForEU: true,
    recommendedTransformerWattage: 1500,
    hsCode: '8516.72.00',
    authenticityGuaranteed: true,
    tags: ['Balmuda', 'Steam Toaster', 'Salamander Mode', 'Tokyo Design', '100V JDM'],
    accessoryProductIds: ['nissyo-ndf-1500u', 'kashimura-ti-20']
  },
  {
    id: 'nissyo-ndf-1500u',
    slug: 'nissyo-ndf-1500u-step-down-transformer-120v-to-100v',
    title: 'Nissyo NDF-1500U Heavy-Duty Step-Down Transformer 120V to 100V (1500W Continuous for US/Canada)',
    japaneseTitle: '日章工業 NDF-1500U 変圧器 (アメリカ・カナダ等 120V→日本 100V 1500W大容量)',
    brand: 'Nissyo Industry (日章工業)',
    modelNumber: 'NDF-1500U',
    category: 'CABLES_POWER_ACCESSORIES',
    description: 'The industry gold-standard Japanese transformer built by Nissyo in Japan. Converts North American 120V mains electricity down to true Japanese domestic 100V AC at up to 1500W continuous load. Safe and essential for running Zojirushi rice cookers, Balmuda toasters, and Japanese coffee makers in the USA and Canada.',
    highlightBullets: [
      'Made in Japan by specialized power equipment manufacturer Nissyo Industry',
      'Converts 110V-127V (USA / Canada / Mexico) to Japanese 100V AC',
      'Massive 1500W continuous rating with built-in auto-reset thermal fuse & circuit breaker',
      'Dual Japanese Type A outlets with heavy-duty US grounded 3-prong input cord',
      'Pure copper toroidal core ensures zero waveform distortion and high efficiency'
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: 'Input: 110V-127V AC | Output: 100V AC',
      voltageNumber: 120,
      frequency: '50/60Hz Passthrough',
      wattage: 1500,
      plugType: 'Input: US Type B (3-prong grounded) | Output: Dual Japanese Type A (2-pin)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 170, width: 150, height: 135 },
      weightGrams: 4200,
      certifications: ['PSE Circle', 'UL Compliant Core', 'RoHS'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 36
    },
    detailedSpecs: [
      { key: 'input_voltage', label: 'Rated Input Voltage Range', value: '110V – 127V AC', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'output_voltage', label: 'Precision Output Voltage', value: '100V AC (±2%)', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'capacity_watts', label: 'Max Continuous Power Load', value: 1500, unit: 'W', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'protection', label: 'Circuit Safety Protection', value: 'Auto-recovery Thermal Cutoff & Overload Breaker', category: 'COMPLIANCE' }
    ],
    variants: [
      {
        id: 'var-nissyo-1500u',
        sku: 'NISSYO-NDF1500U',
        name: '1500W Standard Heavy-Duty Enclosure',
        color: 'Industrial Slate Grey',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 15800, // ¥15,800 JPY (~$105 USD)
        stockOnHand: 45,
        stockReserved: 5,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-nissyo-1500u',
    rating: 4.98,
    reviewCount: 512,
    seller: OFFICIAL_SELLERS['akihabara-direct'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8504.31.00',
    authenticityGuaranteed: true,
    tags: ['Transformer', 'Step-Down', '120V to 100V', 'Made in Japan', '1500W', 'Nissyo'],
    compatibleProductIds: ['zojirushi-nw-lb10', 'balmuda-toaster-pro']
  },
  {
    id: 'kashimura-ti-20',
    slug: 'kashimura-ti-20-step-down-transformer-230v-to-100v',
    title: 'Kashimura TI-20 Heavy-Duty Step-Down Transformer 220V-240V to 100V (1500W for EU/UK/AU/Middle East)',
    japaneseTitle: 'カシムラ TI-20 変圧器 (ヨーロッパ・豪州・アジア 220V-240V→日本 100V 1500W対応)',
    brand: 'Kashimura (カシムラ)',
    modelNumber: 'TI-20',
    category: 'CABLES_POWER_ACCESSORIES',
    description: 'Designed for European (230V), British (230V), Australian (230V), and Middle Eastern (220V-240V) mains voltages. Drops high European/Global voltages down to Japanese domestic 100V at up to 1500 Watts continuous power.',
    highlightBullets: [
      'Accepts 220V to 240V AC and outputs genuine Japanese 100V AC',
      '1500W continuous rating: Powers high-draw Japanese cookers, irons, and audio equipment',
      'Type C/F Euro & Type G interchangeable adapter plugs included',
      'Dual thermal sensors for overheat prevention and silent toroidal transformer coil'
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: 'Input: 220V-240V AC | Output: 100V AC',
      voltageNumber: 230,
      frequency: '50/60Hz Passthrough',
      wattage: 1500,
      plugType: 'Input: European Type C/F & UK Type G | Output: Dual Japanese Type A (2-pin)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 180, width: 160, height: 140 },
      weightGrams: 5100,
      certifications: ['CE Mark', 'PSE Circle', 'TÜV Compliant'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 36
    },
    detailedSpecs: [
      { key: 'input_voltage', label: 'Input Voltage Rating', value: '220V – 240V AC (50/60Hz)', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'output_voltage', label: 'Output Voltage', value: '100V AC', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'capacity_watts', label: 'Capacity', value: 1500, unit: 'W', category: 'POWER', isCrucialForCompatibility: true }
    ],
    variants: [
      {
        id: 'var-kashimura-ti20',
        sku: 'KASHI-TI-20-1500W',
        name: '230V to 100V 1500W Transformer Kit',
        color: 'Matte Charcoal Grey',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 21800, // ¥21,800 JPY (~$145 USD)
        stockOnHand: 30,
        stockReserved: 2,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-kashimura-ti20',
    rating: 4.96,
    reviewCount: 310,
    seller: OFFICIAL_SELLERS['akihabara-direct'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8504.31.00',
    authenticityGuaranteed: true,
    tags: ['Transformer', '230V to 100V', 'European Ready', 'UK Ready', '1500W', 'Kashimura'],
    compatibleProductIds: ['zojirushi-nw-lb10', 'balmuda-toaster-pro']
  },
  {
    id: 'am5-ryzen9-creator-pc',
    slug: 'denshi-am5-ryzen9-9950x-rtx4090-workstation',
    title: 'MR. DENSHI Extreme Workstation (AMD Ryzen 9 9950X / RTX 4090 24GB / 64GB DDR5 / 2TB Gen5 NVMe)',
    japaneseTitle: 'DENSHI 極・秋葉原カスタムワークステーション (Ryzen 9 9950X / RTX 4090 24GB / DDR5 64GB)',
    brand: 'MR. DENSHI Custom Akihabara Labs',
    modelNumber: 'DENSHI-WKSTN-9950X',
    category: 'COMPUTERS_COMPONENTS',
    description: 'Engineered for AI researchers, 3D VFX artists, and high-frequency traders. Hand-assembled in Akihabara with laser-leveled thermal paste application, custom braided Japanese cable harnesses, Noctua flagship silent cooling, and Seasonic 1200W Titanium ATX 3.0 power supply (100V-240V Universal).',
    highlightBullets: [
      'AMD Ryzen 9 9950X 16-Core / 32-Thread Zen 5 CPU clocked up to 5.7GHz',
      'NVIDIA GeForce RTX 4090 24GB GDDR6X with custom vapor chamber cooling',
      'ASUS ROG Crosshair X670E Hero Motherboard + 64GB G.Skill Trident Z5 DDR5-6000 RAM',
      'Crucial T700 2TB PCIe 5.0 NVMe SSD (12,400 MB/s Sequential Read)',
      'Seasonic Prime TX-1200 Titanium ATX 3.0 PSU: 100V-240V Universal Input'
    ],
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V-240V AC Universal Auto-Switching (50/60Hz)',
      voltageNumber: 240,
      frequency: '50/60Hz Universal',
      wattage: 1200,
      plugType: 'IEC C13 Universal (Ships with localized power cord for destination country)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 540, width: 235, height: 505 },
      weightGrams: 16800,
      operatingSystem: 'Windows 11 Pro / Ubuntu 24.04 LTS Dual-Boot Ready',
      certifications: ['80 PLUS Titanium', 'PSE Diamond', 'CE', 'FCC Class B'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 36
    },
    detailedSpecs: [
      { key: 'cpu', label: 'Processor Architecture', value: 'AMD Ryzen 9 9950X (Zen 5, 16 Cores, 32 Threads)', category: 'PERFORMANCE' },
      { key: 'gpu', label: 'Graphics Card', value: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', category: 'PERFORMANCE' },
      { key: 'ram', label: 'System Memory', value: '64GB Dual-Channel DDR5-6000 CL30', category: 'PERFORMANCE' },
      { key: 'storage', label: 'Primary NVMe SSD', value: '2TB PCIe Gen 5.0 (12.4 GB/s Read)', category: 'PERFORMANCE' },
      { key: 'psu', label: 'Power Supply Unit', value: '1200W Seasonic Prime TX-1200 Titanium (100V-240V)', category: 'POWER', isCrucialForCompatibility: true }
    ],
    variants: [
      {
        id: 'var-denshi-pc-64gb',
        sku: 'DENSHI-PC-9950X-64G',
        name: '64GB DDR5 / 2TB Gen5 SSD Workstation',
        color: 'Anodized Stealth Obsidian with Smoked Glass',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 685000, // ¥685,000 JPY (~$4,450 USD)
        originalPriceMinorUnits: 720000,
        stockOnHand: 4,
        stockReserved: 1,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-denshi-pc-64gb',
    rating: 5.0,
    reviewCount: 68,
    seller: OFFICIAL_SELLERS['akihabara-direct'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8471.49.00',
    authenticityGuaranteed: true,
    tags: ['Workstation', 'Ryzen 9 9950X', 'RTX 4090', 'Akihabara Custom', 'AI Rig'],
    b2bBulkDiscountTiers: [
      { minQty: 2, discountPercent: 7 },
      { minQty: 5, discountPercent: 12 }
    ]
  },
  {
    id: 'fiio-m17-dac',
    slug: 'fiio-m17-desktop-caliber-portable-digital-audio-player',
    title: 'FiiO M17 Flagship Desktop-Caliber Portable Digital Audio Player / DAC (Dual ES9038PRO)',
    japaneseTitle: 'FiiO M17 デスクトップ級ポータブルオーディオプレーヤー (デュアルES9038PRO / THX AAA-788+)',
    brand: 'FiiO',
    modelNumber: 'M17',
    category: 'AUDIO_HIFI',
    description: 'Bridges the boundary between high-end desktop DAC/amps and portable players. Features dual ESS ES9038PRO 8-channel DAC chips, dual desktop THX AAA-788+ amplifier modules delivering up to 3000mW per channel, and DC power supply enhancement mode.',
    highlightBullets: [
      'Dual ESS ES9038PRO desktop-grade flagship DAC chips with 32-bit / 768kHz PCM & DSD512',
      'Dual THX AAA-788+ headphone amplifiers with staggering 3000mW output in DC mode',
      'Full suite of ports: 6.35mm, 4.4mm Balanced, 3.5mm, 2.5mm Balanced, and RCA Coaxial I/O',
      'Qualcomm Snapdragon 660 SoC with customized Android audio architecture bypassing SRC',
      'Includes 100V-240V DC switching desktop power supply adapter'
    ],
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V-240V AC Universal DC Adapter (12V 3A) or Battery',
      voltageNumber: 240,
      frequency: '50/60Hz Universal',
      wattage: 36,
      plugType: 'Type C / USB-C & 12V DC Port',
      powerSupplyType: 'EXTERNAL_ADAPTER',
      dimensionsMm: { length: 156.4, width: 88.5, height: 28 },
      weightGrams: 610,
      operatingSystem: 'FiiO Custom Android 10 (Audio Bit-Perfect)',
      certifications: ['Hi-Res Audio', 'Hi-Res Audio Wireless', 'MQA Full Decoder', 'CE', 'FCC'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 12
    },
    detailedSpecs: [
      { key: 'dac_chip', label: 'DAC Architecture', value: 'Dual ESS Sabre ES9038PRO Flagship', category: 'AUDIO' },
      { key: 'amp_module', label: 'Amplifier Circuitry', value: 'Dual THX AAA-788+ Desktop Modules', category: 'AUDIO' },
      { key: 'max_power', label: 'Max Output Power', value: '3,000mW + 3,000mW (32Ω Balanced DC Mode)', category: 'AUDIO' },
      { key: 'battery_life', label: 'Battery Capacity', value: '9,200 mAh (approx. 10.5 hours playback)', category: 'POWER' }
    ],
    variants: [
      {
        id: 'var-fiio-m17-std',
        sku: 'FIIO-M17-64G-ALUM',
        name: 'Unibody CNC Aluminum with Cooling Stand',
        color: 'Space Grey Aluminum',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 242000, // ¥242,000 JPY
        originalPriceMinorUnits: 265000,
        stockOnHand: 11,
        stockReserved: 1,
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-fiio-m17-std',
    rating: 4.96,
    reviewCount: 94,
    seller: OFFICIAL_SELLERS['nihon-precision-audio'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8519.81.00',
    authenticityGuaranteed: true,
    tags: ['DAC', 'HiFi', 'THX AAA', 'ES9038PRO', 'Audiophile DAP'],
    compatibleProductIds: ['sony-mdr-z1r']
  },
  {
    id: 'anker-prime-240w',
    slug: 'anker-prime-240w-gan-desktop-charging-station',
    title: 'Anker Prime 240W 4-Port GaN Desktop Charger with USB-C Power Delivery 3.1',
    japaneseTitle: 'Anker Prime 240W GaN デスクトップ急速充電器 (USB-C PD 3.1 最大140W単ポート)',
    brand: 'Anker (アンカー)',
    modelNumber: 'A2343',
    category: 'CABLES_POWER_ACCESSORIES',
    description: 'Equipped with Anker GaNPrime technology and PowerIQ 4.0. Features 3x USB-C ports with PD 3.1 capable of delivering up to 140W single-port charging to fast-charge a 16-inch MacBook Pro or power high-performance gadgets simultaneously from 100V-240V universal outlets.',
    highlightBullets: [
      'Massive 240W total output across 3x USB-C ports and 1x USB-A port',
      'Single-port USB-C PD 3.1 output up to 140W (charges MacBook Pro 16" to 50% in 28 mins)',
      'Universal 100V-240V input voltage for worldwide travel and home use',
      'ActiveShield 2.0 real-time temperature monitoring checks thermal status 3,000,000 times per day'
    ],
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      voltage: '100V-240V AC Universal (50/60Hz)',
      voltageNumber: 240,
      frequency: '50/60Hz Universal',
      wattage: 240,
      plugType: 'Detachable 2-pin C7 cord (Includes JP/US Type A & EU adapter)',
      powerSupplyType: 'INTEGRATED',
      dimensionsMm: { length: 104.5, width: 78.4, height: 34 },
      weightGrams: 656,
      certifications: ['PSE Diamond', 'CE', 'FCC', 'UL 62368-1', 'RoHS'],
      warrantyRegion: 'GLOBAL_1_YEAR',
      warrantyMonths: 24
    },
    detailedSpecs: [
      { key: 'input_range', label: 'AC Input Voltage Range', value: '100V – 240V ~ 3.5A, 50/60Hz', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'usbc_max', label: 'USB-C1 Max Output (PD 3.1)', value: '140W (5V=3A / 9V=3A / 15V=3A / 20V=5A / 28V=5A)', category: 'POWER', isCrucialForCompatibility: true },
      { key: 'total_wattage', label: 'Total Multi-Port Output', value: 240, unit: 'W', category: 'POWER' }
    ],
    variants: [
      {
        id: 'var-anker-240w-blk',
        sku: 'ANKER-PRIME-240W-BLK',
        name: 'Matte Graphite with Anodized Metal Faceplate',
        color: 'Graphite Black',
        condition: 'BRAND_NEW_SEALED',
        priceMinorUnits: 19990, // ¥19,990 JPY (~$130 USD)
        originalPriceMinorUnits: 22990,
        stockOnHand: 60,
        stockReserved: 6,
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
      }
    ],
    selectedVariantId: 'var-anker-240w-blk',
    rating: 4.94,
    reviewCount: 880,
    seller: OFFICIAL_SELLERS['akihabara-direct'],
    shipsFrom: 'Tokyo Haneda International Air Terminal Hub, Japan',
    isJapaneseDomesticModel: false,
    transformerRequiredForUS: false,
    transformerRequiredForEU: false,
    hsCode: '8504.40.85',
    authenticityGuaranteed: true,
    tags: ['GaN', 'PD 3.1', '240W', 'Anker', 'Universal 100-240V', 'USB-C'],
    featuredInFlashDeal: true,
    dealDiscountPercent: 13,
    dealExpiresAt: '2026-08-20T23:59:59Z'
  }
];
