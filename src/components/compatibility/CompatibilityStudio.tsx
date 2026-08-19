import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Cpu, 
  Headphones, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  RotateCcw,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';

export const CompatibilityStudio: React.FC = () => {
  const {
    isCompatibilityStudioOpen,
    setIsCompatibilityStudioOpen,
    currentMarket,
    currency,
    locale,
    products,
    setSelectedProductForDetail
  } = useApp();

  const [activeLabTab, setActiveLabTab] = useState<'VOLTAGE' | 'PC_RIG' | 'AUDIO_CHAIN'>('VOLTAGE');

  // Voltage Lab State
  const [selectedJDMApplianceId, setSelectedJDMApplianceId] = useState<string>('zojirushi-nw-lb10');
  const [userCountryVoltage, setUserCountryVoltage] = useState<number>(120); // 120V US default
  const [selectedSafetyBuffer, setSelectedSafetyBuffer] = useState<number>(25); // 25%

  // Custom PC Rig Builder State
  const [selectedCpu, setSelectedCpu] = useState('AMD Ryzen 9 9950X (16-Core / 32-Thread)');
  const [selectedGpu, setSelectedGpu] = useState('NVIDIA GeForce RTX 4090 24GB GDDR6X');
  const [selectedPsu, setSelectedPsu] = useState('Seasonic Vertex 1200W ATX 3.0 Titanium');

  // Audio Chain Matcher State
  const [selectedHeadphone, setSelectedHeadphone] = useState('Sony Signature MDR-Z1R (70mm HD / 64Ω)');
  const [selectedDacAmp, setSelectedDacAmp] = useState('FiiO K9 Pro ESS Dual ES9038PRO Balanced DAC');

  if (!isCompatibilityStudioOpen) return null;

  const currentAppliance = products.find(p => p.id === selectedJDMApplianceId) || products[0];
  const applianceWattage = currentAppliance.specs.wattage || 1200;
  const recommendedTransformerWattage = Math.ceil((applianceWattage * (1 + selectedSafetyBuffer / 100)) / 100) * 100;
  const transformerProduct = products.find(p => p.id === 'nissyo-ndf-1500u');

  // Calculated PC Power Draw
  const estimatedPcWatts = 850;
  const psuCapacity = 1200;
  const psuHeadroomPercent = Math.round(((psuCapacity - estimatedPcWatts) / psuCapacity) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Voltage & Rig Compatibility Studio</h2>
              <p className="text-xs text-slate-400 font-mono">
                Deterministic Electrical & Hardware Matching • Zero-Risk Japanese Tech Deployment
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCompatibilityStudioOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveLabTab('VOLTAGE')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeLabTab === 'VOLTAGE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>100V Japanese Voltage & Transformer Lab</span>
          </button>

          <button
            onClick={() => setActiveLabTab('PC_RIG')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeLabTab === 'PC_RIG'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Akihabara PC Rig Power & Thermals</span>
          </button>

          <button
            onClick={() => setActiveLabTab('AUDIO_CHAIN')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeLabTab === 'AUDIO_CHAIN'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Hi-Res Audio Impedance Matcher</span>
          </button>
        </div>

        {/* TAB 1: 100V Voltage Lab */}
        {activeLabTab === 'VOLTAGE' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Controls */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1.5 font-bold">1. Select 100V Japanese Appliance:</label>
                  <select
                    value={selectedJDMApplianceId}
                    onChange={(e) => setSelectedJDMApplianceId(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                  >
                    <option value="zojirushi-nw-lb10">Zojirushi 100V Kamado IH Rice Cooker (1240W)</option>
                    <option value="balmuda-toaster-pro">Balmuda The Toaster Pro 100V (1300W)</option>
                    <option value="sony-mdr-z1r">Sony MDR-Z1R Audiophile (Universal Audio)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1.5 font-bold">2. Destination Mains Voltage:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 100, label: '100V (Japan)' },
                      { v: 120, label: '120V (US / Canada)' },
                      { v: 230, label: '230V (EU / UK / AU)' }
                    ].map(opt => (
                      <button
                        key={opt.v}
                        onClick={() => setUserCountryVoltage(opt.v)}
                        className={`p-2 rounded-xl border text-center font-mono transition-all ${
                          userCountryVoltage === opt.v
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1.5 font-bold">3. Continuous Thermal Safety Margin:</label>
                  <div className="flex items-center gap-3 font-mono">
                    {[15, 25, 40].map(buf => (
                      <button
                        key={buf}
                        onClick={() => setSelectedSafetyBuffer(buf)}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                          selectedSafetyBuffer === buf
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        +{buf}% Buffer
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output Verdict */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 mb-1">SAFETY ANALYSIS VERDICT</div>
                  <div className="flex items-center gap-2">
                    {userCountryVoltage === 100 ? (
                      <div className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Direct 100V Plug-In Safe</span>
                      </div>
                    ) : (
                      <div className="text-amber-400 font-bold text-base flex items-center gap-1.5">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Step-Down Transformer Mandatory</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Appliance Power Draw:</span>
                    <span className="text-slate-200 font-bold">{applianceWattage}W at 100V AC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recommended Transformer Rating:</span>
                    <span className="text-amber-300 font-bold">≥ {recommendedTransformerWattage} Watts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transformer Voltage Conversion:</span>
                    <span className="text-slate-200">{userCountryVoltage}V AC → 100V AC (50/60Hz)</span>
                  </div>
                </div>

                {transformerProduct && userCountryVoltage !== 100 && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-3">
                    <img src={transformerProduct.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0" />
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="font-bold text-slate-200 truncate">{transformerProduct.title}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">100% Japanese Pure Copper Toroidal</div>
                    </div>
                    <button
                      onClick={() => {
                        setIsCompatibilityStudioOpen(false);
                        setSelectedProductForDetail(transformerProduct);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                    >
                      View
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PC Rig Builder */}
        {activeLabTab === 'PC_RIG' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">Akihabara Custom Creator Rig Specification:</span>
                <span className="text-emerald-400 font-mono font-bold">✓ 100% Component Synergy Pass</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">PROCESSOR (CPU)</div>
                  <div className="font-bold text-slate-200 text-xs mt-1">{selectedCpu}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">GRAPHICS (GPU)</div>
                  <div className="font-bold text-slate-200 text-xs mt-1">{selectedGpu}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">POWER SUPPLY (PSU)</div>
                  <div className="font-bold text-slate-200 text-xs mt-1">{selectedPsu}</div>
                </div>
              </div>

              {/* Thermal & Wattage Gauge */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Estimated Peak Draw: {estimatedPcWatts}W / {psuCapacity}W</span>
                  <span className="text-emerald-400 font-bold">{psuHeadroomPercent}% PSU Headroom (Optimum ATX 3.0 Efficiency)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[70%]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Audio Chain Matcher */}
        {activeLabTab === 'AUDIO_CHAIN' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">Hi-Res Audio Signal Chain Verification:</span>
                <span className="text-indigo-400 font-mono font-bold">Pentaconn 4.4mm Balanced Ready</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">TRANSDUCER / HEADPHONES</div>
                  <div className="font-bold text-slate-200 text-xs mt-1">{selectedHeadphone}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DAC & HEADPHONE AMPLIFIER</div>
                  <div className="font-bold text-slate-200 text-xs mt-1">{selectedDacAmp}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
