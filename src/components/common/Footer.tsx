import React from 'react';
import { Shield, Zap, Truck, CheckCircle2, Globe, FileText, Lock, Headphones, RefreshCw, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { 
    currentMarket, 
    setIsCompatibilityStudioOpen, 
    setIsAIAssistantOpen, 
    setIsSellerPortalOpen, 
    setIsAdminDashboardOpen,
    setActivePortal
  } = useApp();

  return (
    <footer className="bg-black border-t border-zinc-850 text-zinc-400 text-xs pb-16 sm:pb-0">
      {/* 4 Pillars of Japanese Precision Commerce */}
      <div className="border-b border-zinc-850 py-8 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">100% Authentic Tokyo Stock</h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Every item is sourced directly from certified Japanese manufacturers and verified Akihabara partners with METI PSE marks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Voltage & Transformer AI</h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Automated electrical matching for 100V JDM appliances running in US (120V) or EU/Global (230V) homes with safety buffers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">DDP Pre-Paid Customs</h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Delivered Duty Paid guarantee: Import taxes and customs processing fees are calculated and pre-paid. Zero doorstep surprise fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Tokyo RMA & Warranty</h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Every purchase includes a tamper-proof digital warranty certificate, laser serial tracking, and global RMA return facilitation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#00FF66] font-black text-sm">
              <Zap className="w-4 h-4 fill-[#00FF66]" />
            </div>
            <span className="font-black text-white tracking-tight text-base">MR. DENSHI (ミスター電子)</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            Headquartered architecturally in Chiyoda-ku, Tokyo, Japan. The world's premier AI-native cross-border commerce ecosystem connecting global enthusiasts with authentic Japanese precision technology.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">METI Registration: #JP-88902</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">NACCS Electronic Port: TYO-HND</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF66]">PCI-DSS Level 1</span>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px] font-mono">Platform Panels</h5>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <button 
                onClick={() => setActivePortal('BUYER')} 
                className="hover:text-[#00FF66] transition-colors"
              >
                Buyer Storefront
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePortal('SELLER')} 
                className="hover:text-[#00FF66] transition-colors"
              >
                Seller Central Hub
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePortal('ADMIN')} 
                className="hover:text-[#00FF66] transition-colors"
              >
                Global Admin Console
              </button>
            </li>
            <li>
              <button onClick={() => setIsCompatibilityStudioOpen(true)} className="hover:text-amber-300 transition-colors">
                100V Voltage Studio
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px] font-mono">Global Fulfillment</h5>
          <ul className="space-y-2 text-zinc-400">
            <li><span>Tokyo Haneda Logistics Park</span></li>
            <li><span>Delivered Duty Paid (DDP)</span></li>
            <li><span>Japan Post EMS & Yamato</span></li>
            <li><span>METI PSE Certification</span></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px] font-mono">Security & Compliance</h5>
          <ul className="space-y-2 text-zinc-400">
            <li><span className="text-[#00FF66]">✓ 3DS 2.2 Tokenization</span></li>
            <li><span>GDPR & APPI Compliant</span></li>
            <li><span>24-Month JDM Warranty</span></li>
            <li><span>Air Cargo Insurance</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-4 px-3 sm:px-6 text-center text-zinc-600 text-[11px] font-mono">
        © 2026 MR. DENSHI Global Platform Inc. (Chiyoda, Tokyo, Japan). All rights reserved. Designed for Amazon-grade reliability and Shein-speed discovery in Black and Neon Green.
      </div>
    </footer>
  );
};
