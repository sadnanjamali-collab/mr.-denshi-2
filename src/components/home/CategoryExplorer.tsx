import React from 'react';
import { 
  Headphones, 
  Camera, 
  Cpu, 
  Zap, 
  Flame,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';

interface CategoryItem {
  id: ProductCategory | 'ALL';
  name: string;
  japaneseName: string;
  icon: React.ReactNode;
  count: number;
  highlightTag: string;
  sampleImg: string;
}

export const CategoryExplorer: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products } = useApp();

  const categories: CategoryItem[] = [
    {
      id: 'ALL',
      name: 'All Electronics',
      japaneseName: '全商品一覧',
      icon: <Layers className="w-5 h-5 text-slate-700" />,
      count: products.length,
      highlightTag: 'COMPLETE',
      sampleImg: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'JAPANESE_APPLIANCES',
      name: '100V JDM Kitchen',
      japaneseName: '日本国内100V職人家電',
      icon: <Flame className="w-5 h-5 text-[#c7511f]" />,
      count: products.filter(p => p.category === 'JAPANESE_APPLIANCES').length,
      highlightTag: 'KAMADO / BALMUDA',
      sampleImg: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'AUDIO_HIFI',
      name: 'Hi-Res Audiophile Audio',
      japaneseName: 'ハイレゾ音響・ヘッドホン',
      icon: <Headphones className="w-5 h-5 text-[#007185]" />,
      count: products.filter(p => p.category === 'AUDIO_HIFI').length,
      highlightTag: 'SONY TAIYO / FIIO',
      sampleImg: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'CAMERAS_OPTICS',
      name: 'Japanese Cameras & Glass',
      japaneseName: 'カメラ・光学機器',
      icon: <Camera className="w-5 h-5 text-[#007185]" />,
      count: products.filter(p => p.category === 'CAMERAS_OPTICS').length,
      highlightTag: 'FUJIFILM / CANON',
      sampleImg: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'COMPUTERS_COMPONENTS',
      name: 'Akihabara PC Hardware',
      japaneseName: '秋葉原カスタムPC・部品',
      icon: <Cpu className="w-5 h-5 text-[#007185]" />,
      count: products.filter(p => p.category === 'COMPUTERS_COMPONENTS').length,
      highlightTag: 'RYZEN 9 / RTX 4090',
      sampleImg: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'CABLES_POWER_ACCESSORIES',
      name: 'Step-Down Transformers',
      japaneseName: '変圧器・GaN電源',
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      count: products.filter(p => p.category === 'CABLES_POWER_ACCESSORIES').length,
      highlightTag: 'NISSYO 1500W',
      sampleImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-lg text-left transition-all border bg-white flex flex-col justify-between hover:shadow-md ${
                isSelected
                  ? 'border-[#ff9900] ring-1 ring-[#ff9900] shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-medium">{cat.count} items</span>
              </div>

              <div>
                <div className={`font-bold text-xs leading-snug ${isSelected ? 'text-[#c7511f]' : 'text-slate-900'}`}>
                  {cat.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{cat.japaneseName}</div>
                <div className="text-[10px] text-[#007185] font-medium mt-1.5 flex items-center gap-0.5">
                  <span>Shop now</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
