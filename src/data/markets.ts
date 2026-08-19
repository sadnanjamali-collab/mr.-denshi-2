import { Market, MarketId } from '../types';

export const GLOBAL_MARKETS: Record<MarketId, Market> = {
  JP: {
    id: 'JP',
    name: 'Japan',
    nativeName: '日本',
    flag: '🇯🇵',
    defaultCurrency: 'JPY',
    supportedCurrencies: ['JPY', 'USD', 'EUR'],
    defaultLocale: 'ja-JP',
    supportedLocales: ['ja-JP', 'en-US'],
    voltageStandard: '100V AC (50Hz East / 60Hz West)',
    plugTypes: ['Type A (2-pin)', 'Type B (3-pin)'],
    defaultTaxRate: 0.10, // 10% JCT
    taxName: 'Consumption Tax (JCT)',
    customsDeMinimisUSD: 10000,
    dutyRateAverage: 0.0,
    regulatoryBodies: ['PSE (METI)', 'VCCI', 'MIC Radio Act'],
    availableCarriers: [
      {
        id: 'yamato-jp',
        name: 'Yamato Transport (Kuroneko TA-Q-BIN)',
        logo: '📦',
        type: 'DOMESTIC',
        baseTransitDaysMin: 1,
        baseTransitDaysMax: 2,
        baseRateUSD: 6.5,
        trackingUrlTemplate: 'https://track.kuronekoyamato.co.jp/?no={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'sagawa-jp',
        name: 'Sagawa Express Hikyaku',
        logo: '🚚',
        type: 'DOMESTIC',
        baseTransitDaysMin: 1,
        baseTransitDaysMax: 2,
        baseRateUSD: 6.0,
        trackingUrlTemplate: 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'japanpost-ems',
        name: 'Japan Post EMS Speedpost',
        logo: '✈️',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 4,
        baseRateUSD: 24.0,
        trackingUrlTemplate: 'https://trackings.post.japanpost.jp/services/srv/search/?requestNo1={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  US: {
    id: 'US',
    name: 'United States',
    nativeName: 'United States',
    flag: '🇺🇸',
    defaultCurrency: 'USD',
    supportedCurrencies: ['USD', 'JPY', 'CAD'],
    defaultLocale: 'en-US',
    supportedLocales: ['en-US', 'es-ES'],
    voltageStandard: '120V AC (60Hz)',
    plugTypes: ['Type A (Polarized)', 'Type B (Grounded)'],
    defaultTaxRate: 0.0825, // Average sales tax
    taxName: 'State & Local Sales Tax',
    customsDeMinimisUSD: 800, // Section 321 de minimis
    dutyRateAverage: 0.025,
    regulatoryBodies: ['FCC Part 15', 'UL Listed', 'ETL'],
    availableCarriers: [
      {
        id: 'dhl-express-us',
        name: 'DHL Express Worldwide Air (Tokyo -> USA)',
        logo: '🟡',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 4,
        baseRateUSD: 28.0,
        trackingUrlTemplate: 'https://www.dhl.com/en/express/tracking.html?AWB={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'fedex-intl-priority',
        name: 'FedEx International Priority Air',
        logo: '🟣',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 3,
        baseRateUSD: 32.0,
        trackingUrlTemplate: 'https://www.fedex.com/fedextrack/?trknbr={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'yamato-intl-usa',
        name: 'Yamato Global Express Direct',
        logo: '📦',
        type: 'POSTAL_AIR',
        baseTransitDaysMin: 4,
        baseTransitDaysMax: 7,
        baseRateUSD: 19.5,
        trackingUrlTemplate: 'https://track.kuronekoyamato.co.jp/?no={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  DE: {
    id: 'DE',
    name: 'Germany & EU',
    nativeName: 'Deutschland (EU)',
    flag: '🇩🇪',
    defaultCurrency: 'EUR',
    supportedCurrencies: ['EUR', 'USD', 'JPY'],
    defaultLocale: 'de-DE',
    supportedLocales: ['de-DE', 'en-US', 'fr-FR'],
    voltageStandard: '230V AC (50Hz)',
    plugTypes: ['Type C (Europlug)', 'Type F (Schuko)'],
    defaultTaxRate: 0.19, // 19% MwSt / VAT
    taxName: 'Import VAT (EUST 19%)',
    customsDeMinimisUSD: 150, // IOSS threshold €150
    dutyRateAverage: 0.035,
    regulatoryBodies: ['CE Mark', 'RoHS', 'WEEE', 'TÜV Rheinland'],
    availableCarriers: [
      {
        id: 'dhl-express-eu',
        name: 'DHL Express DDP Air Cargo (Tokyo -> Frankfurt)',
        logo: '🟡',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 3,
        baseTransitDaysMax: 5,
        baseRateUSD: 31.0,
        trackingUrlTemplate: 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'japanpost-ems-eu',
        name: 'Japan Post EMS European Express',
        logo: '✈️',
        type: 'POSTAL_AIR',
        baseTransitDaysMin: 4,
        baseTransitDaysMax: 8,
        baseRateUSD: 25.0,
        trackingUrlTemplate: 'https://trackings.post.japanpost.jp/services/srv/search/?requestNo1={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  KR: {
    id: 'KR',
    name: 'South Korea',
    nativeName: '대한민국',
    flag: '🇰🇷',
    defaultCurrency: 'KRW',
    supportedCurrencies: ['KRW', 'JPY', 'USD'],
    defaultLocale: 'ko-KR',
    supportedLocales: ['ko-KR', 'en-US'],
    voltageStandard: '220V AC (60Hz)',
    plugTypes: ['Type C', 'Type F'],
    defaultTaxRate: 0.10,
    taxName: 'Value Added Tax (VAT 10%)',
    customsDeMinimisUSD: 150, // $150 USD personal clearance code
    dutyRateAverage: 0.08,
    regulatoryBodies: ['KC Safety Mark', 'KCC Radio Certification'],
    availableCarriers: [
      {
        id: 'cj-logistics-kr',
        name: 'CJ Logistics Japan-Korea Direct Fast Flight',
        logo: '🇰🇷',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 3,
        baseRateUSD: 18.0,
        trackingUrlTemplate: 'https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvcNo={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      },
      {
        id: 'japanpost-kr',
        name: 'Japan Post EMS Seoul Express',
        logo: '✈️',
        type: 'POSTAL_AIR',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 4,
        baseRateUSD: 20.0,
        trackingUrlTemplate: 'https://trackings.post.japanpost.jp/services/srv/search/?requestNo1={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  GB: {
    id: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    flag: '🇬🇧',
    defaultCurrency: 'GBP',
    supportedCurrencies: ['GBP', 'EUR', 'USD', 'JPY'],
    defaultLocale: 'en-US',
    supportedLocales: ['en-US'],
    voltageStandard: '230V AC (50Hz)',
    plugTypes: ['Type G (UK 3-pin rectangular)'],
    defaultTaxRate: 0.20, // 20% UK VAT
    taxName: 'UK VAT (20%)',
    customsDeMinimisUSD: 135,
    dutyRateAverage: 0.03,
    regulatoryBodies: ['UKCA Mark', 'BSI', 'BEAB'],
    availableCarriers: [
      {
        id: 'dhl-uk',
        name: 'DHL Express Heathrow Direct DDP',
        logo: '🟡',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 3,
        baseTransitDaysMax: 5,
        baseRateUSD: 30.0,
        trackingUrlTemplate: 'https://www.dhl.co.uk/en/express/tracking.html?AWB={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  AU: {
    id: 'AU',
    name: 'Australia',
    nativeName: 'Australia',
    flag: '🇦🇺',
    defaultCurrency: 'AUD',
    supportedCurrencies: ['AUD', 'USD', 'JPY'],
    defaultLocale: 'en-US',
    supportedLocales: ['en-US'],
    voltageStandard: '230V AC (50Hz)',
    plugTypes: ['Type I (Australian 3-pin angled)'],
    defaultTaxRate: 0.10, // 10% GST
    taxName: 'Goods and Services Tax (GST 10%)',
    customsDeMinimisUSD: 1000, // AUD 1,000 threshold
    dutyRateAverage: 0.05,
    regulatoryBodies: ['RCM Regulatory Compliance Mark', 'ACMA'],
    availableCarriers: [
      {
        id: 'japanpost-au',
        name: 'Japan Post EMS Sydney Direct',
        logo: '✈️',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 3,
        baseTransitDaysMax: 6,
        baseRateUSD: 27.0,
        trackingUrlTemplate: 'https://trackings.post.japanpost.jp/services/srv/search/?requestNo1={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  CA: {
    id: 'CA',
    name: 'Canada',
    nativeName: 'Canada',
    flag: '🇨🇦',
    defaultCurrency: 'CAD',
    supportedCurrencies: ['CAD', 'USD', 'JPY'],
    defaultLocale: 'en-US',
    supportedLocales: ['en-US', 'fr-FR'],
    voltageStandard: '120V AC (60Hz)',
    plugTypes: ['Type A', 'Type B'],
    defaultTaxRate: 0.13, // Average HST/GST
    taxName: 'GST/HST (Harmonized Sales Tax)',
    customsDeMinimisUSD: 20,
    dutyRateAverage: 0.04,
    regulatoryBodies: ['CSA Group', 'ISED Canada'],
    availableCarriers: [
      {
        id: 'dhl-ca',
        name: 'DHL Express Direct Flight (Tokyo -> Vancouver/Toronto)',
        logo: '🟡',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 3,
        baseTransitDaysMax: 5,
        baseRateUSD: 29.0,
        trackingUrlTemplate: 'https://www.dhl.ca/en/express/tracking.html?AWB={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  AE: {
    id: 'AE',
    name: 'United Arab Emirates',
    nativeName: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    defaultCurrency: 'AED',
    supportedCurrencies: ['AED', 'USD', 'EUR'],
    defaultLocale: 'ar-AE',
    supportedLocales: ['ar-AE', 'en-US'],
    voltageStandard: '220V-240V AC (50Hz)',
    plugTypes: ['Type G (UK 3-pin)'],
    defaultTaxRate: 0.05, // 5% VAT
    taxName: 'UAE VAT (5%)',
    customsDeMinimisUSD: 300,
    dutyRateAverage: 0.05,
    regulatoryBodies: ['ESMA (ECAS)', 'TDRA'],
    availableCarriers: [
      {
        id: 'emirates-skycargo-dhl',
        name: 'DHL Express Dubai Hub DDP',
        logo: '🟡',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 3,
        baseTransitDaysMax: 5,
        baseRateUSD: 33.0,
        trackingUrlTemplate: 'https://www.dhl.com/ae-en/home/tracking.html?AWB={TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  },
  CN: {
    id: 'CN',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    defaultCurrency: 'CNY',
    supportedCurrencies: ['CNY', 'JPY', 'USD'],
    defaultLocale: 'zh-CN',
    supportedLocales: ['zh-CN', 'en-US'],
    voltageStandard: '220V AC (50Hz)',
    plugTypes: ['Type A', 'Type C', 'Type I'],
    defaultTaxRate: 0.13,
    taxName: 'Cross-Border E-Commerce Tariff (CBEC)',
    customsDeMinimisUSD: 50,
    dutyRateAverage: 0.091,
    regulatoryBodies: ['CCC (China Compulsory Certificate)', 'SRRC'],
    availableCarriers: [
      {
        id: 'sf-express-cn',
        name: 'SF Express International Priority Air (Tokyo -> Shanghai/Beijing)',
        logo: '📦',
        type: 'INTERNATIONAL_EXPRESS',
        baseTransitDaysMin: 2,
        baseTransitDaysMax: 4,
        baseRateUSD: 19.0,
        trackingUrlTemplate: 'https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/{TRACKING_NUMBER}',
        realtimeGpsSupported: true
      }
    ]
  }
};
