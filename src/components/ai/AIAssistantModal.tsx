import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Zap, 
  ShoppingCart, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Wrench,
  AlertTriangle,
  HelpCircle,
  Activity,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { DEVICE_TROUBLESHOOTING_DATABASE } from '../../data/communityAndSupportData';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  content: string;
  timestamp: string;
  suggestedProducts?: string[];
  suggestedAction?: {
    type: 'COMPATIBILITY_STUDIO' | 'CATALOG' | 'PRODUCT_DETAIL';
    payload?: any;
    label: string;
  };
}

export const AIAssistantModal: React.FC = () => {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    currentMarket,
    currency,
    locale,
    userSavedDevices,
    products,
    addToCart,
    setSelectedProductForDetail,
    selectedProductForDetail,
    activeTroubleshootProduct,
    setActiveTroubleshootProduct
  } = useApp();

  const [activeTab, setActiveTab] = useState<'CHAT_CONCIERGE' | 'TECHNICAL_TROUBLESHOOTING'>('CHAT_CONCIERGE');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeviceForTroubleshoot, setSelectedDeviceForTroubleshoot] = useState<string>(
    selectedProductForDetail?.id || products[0]?.id || 'zojirushi-nw-lb10'
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      content: `Konnichiwa! I am **DENSHI AI**, your personal concierge for authentic Japanese electronics, high-end Hi-Fi, and Akihabara PC hardware.
      
I automatically analyze electrical standards for your destination (**${currentMarket.name}**, **${currentMarket.voltageStandard}**) so you never risk blowing a fuse or damaging 100V appliances. 

How may I assist you today?`,
      timestamp: new Date().toISOString()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAIAssistantOpen) {
      scrollToBottom();
    }
  }, [messages, isAIAssistantOpen]);

  useEffect(() => {
    if (selectedProductForDetail) {
      setSelectedDeviceForTroubleshoot(selectedProductForDetail.id);
    }
  }, [selectedProductForDetail]);

  if (!isAIAssistantOpen) return null;

  const currentDiagnostics = DEVICE_TROUBLESHOOTING_DATABASE[selectedDeviceForTroubleshoot] || [
    {
      deviceId: selectedDeviceForTroubleshoot,
      deviceName: products.find(p => p.id === selectedDeviceForTroubleshoot)?.title || 'Japanese Electronic Device',
      issueCode: 'DIAG-VOLT-CHECK',
      issueTitle: 'Universal Electrical Voltage & Thermal Headroom Scan',
      symptoms: ['Device warm to touch', 'Hum or coil whine', 'Power fluctuation'],
      rootCause: 'Grid mains voltage differential between Japanese 100V and international destination.',
      severity: 'INFO',
      stepByStepFix: [
        '1. Ensure supply voltage matches specification plate exactly.',
        '2. Check that step-down transformer has +25% continuous wattage buffer.',
        '3. Inspect plug ground terminal for secure grounding bonding.'
      ],
      multimeterTestValue: '100V AC ± 3V RMS',
      recommendedPartOrTool: 'Nissyo NDF-1500U Toroidal Transformer'
    }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.sender === 'USER' ? 'user' : 'model', content: m.content })),
          userContext: {
            market: currentMarket.id,
            marketName: currentMarket.name,
            voltageStandard: currentMarket.voltageStandard,
            currency,
            savedDevices: userSavedDevices,
            activeViewedDevice: selectedDeviceForTroubleshoot
          }
        })
      });

      const data = await res.json();
      const aiReplyText = data.reply || 'I am happy to assist you with Japanese electronics, voltage matching, and troubleshooting.';

      const matchedProdIds: string[] = [];
      if (text.toLowerCase().includes('zojirushi') || text.toLowerCase().includes('rice') || aiReplyText.toLowerCase().includes('zojirushi')) {
        matchedProdIds.push('zojirushi-nw-lb10');
      }
      if (text.toLowerCase().includes('sony') || text.toLowerCase().includes('audio') || text.toLowerCase().includes('headphone')) {
        matchedProdIds.push('sony-mdr-z1r');
      }
      if (text.toLowerCase().includes('transformer') || text.toLowerCase().includes('nissyo') || text.toLowerCase().includes('voltage')) {
        matchedProdIds.push('nissyo-ndf-1500u');
      }
      if (text.toLowerCase().includes('balmuda') || text.toLowerCase().includes('toaster')) {
        matchedProdIds.push('balmuda-toaster-pro');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        content: aiReplyText,
        timestamp: new Date().toISOString(),
        suggestedProducts: matchedProdIds.length > 0 ? matchedProdIds : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'AI',
          content: `To safely operate a 100V Japanese appliance in ${currentMarket.name}, you need a heavy-duty pure copper step-down transformer like the **Nissyo NDF-1500U** (+25% continuous wattage buffer). Would you like to view the transformer?`,
          timestamp: new Date().toISOString(),
          suggestedProducts: ['nissyo-ndf-1500u']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'How do I use a 100V Zojirushi rice cooker in the USA?',
    'Explain Error Code H01 on Japanese Induction Cookers',
    'What transformer do I need for Balmuda Toaster in Europe?',
    'Explain 4.4mm Pentaconn balanced pinout vs 3.5mm ground hum'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#131921] border border-slate-700 rounded-3xl max-w-4xl w-full h-[88vh] shadow-2xl relative text-white flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#232f3e]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ffd814] text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">DENSHI AI Engineering Concierge</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-700">
                  REAL-TIME TROUBLESHOOTING
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Akihabara Sotokanda Diagnostics Engine • Destination: {currentMarket.name} ({currentMarket.voltageStandard})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Tab Mode Switcher */}
        <div className="flex items-center gap-2 px-5 pt-3 bg-[#131921] border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('CHAT_CONCIERGE')}
            className={`px-4 py-2 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'CHAT_CONCIERGE'
                ? 'bg-slate-800 text-[#ffd814] border-t-2 border-[#ffd814]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Shopping & Voltage Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('TECHNICAL_TROUBLESHOOTING')}
            className={`px-4 py-2 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'TECHNICAL_TROUBLESHOOTING'
                ? 'bg-slate-800 text-[#ffd814] border-t-2 border-[#ffd814]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Device Diagnostics & Error Codes</span>
          </button>
        </div>

        {/* Tab 1: AI Chat Concierge */}
        {activeTab === 'CHAT_CONCIERGE' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'AI' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-[#ffd814] flex items-center justify-center shrink-0 mt-1 border border-slate-700">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'USER'
                        ? 'bg-[#ffd814] text-slate-950 font-medium rounded-br-none shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none space-y-3 shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div className="text-[10px] font-mono text-[#febd69] font-bold">MATCHED HARDWARE:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.suggestedProducts.map(pId => {
                            const product = products.find(p => p.id === pId);
                            if (!product) return null;
                            return (
                              <div
                                key={product.id}
                                className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-between gap-2"
                              >
                                <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-contain bg-white p-1 shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-white truncate text-xs">{product.title}</div>
                                  <div className="font-mono text-[#febd69] text-[11px]">
                                    {formatPrice(product.variants[0].priceMinorUnits, currency, locale)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => setSelectedProductForDetail(product)}
                                  className="p-1.5 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900"
                                  title="View Details"
                                >
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'USER' && (
                    <div className="w-8 h-8 rounded-xl bg-[#232f3e] border border-slate-700 flex items-center justify-center shrink-0 mt-1 text-white">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center text-xs text-slate-400 font-mono">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-[#ffd814] flex items-center justify-center border border-slate-700">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <span>Analyzing Japanese electrical specifications and thermal limits...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp)}
                  className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300 hover:text-white hover:border-[#ffd814] whitespace-nowrap transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about 100V voltage matching, error codes, Japanese transformer sizing..."
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ffd814]/50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-black text-xs flex items-center gap-1.5 shadow-lg border border-[#fcd200] disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Technical Troubleshooting for Specific Electronic Devices */}
        {activeTab === 'TECHNICAL_TROUBLESHOOTING' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Device Selector Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-mono text-[#febd69] font-bold mb-1">
                  CURRENTLY VIEWED ELECTRONIC DEVICE:
                </label>
                <select
                  value={selectedDeviceForTroubleshoot}
                  onChange={(e) => setSelectedDeviceForTroubleshoot(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#ffd814] font-bold"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} - {p.title} ({p.specs.voltage})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  const prod = products.find(p => p.id === selectedDeviceForTroubleshoot);
                  handleSendMessage(`Please diagnose technical troubleshooting and transformer pairing for ${prod?.title || 'this device'}.`);
                  setActiveTab('CHAT_CONCIERGE');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#ffd814]" />
                <span>Run Interactive AI Scan</span>
              </button>
            </div>

            {/* Diagnostic Cards List */}
            <div className="space-y-4">
              {currentDiagnostics.map((diag, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
                >
                  {/* Diagnostic Title */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">{diag.issueCode}</span>
                          <span className="text-white font-bold text-sm">{diag.issueTitle}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Device: {diag.deviceName}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded bg-red-950 text-red-300 font-mono text-[10px] font-bold border border-red-800">
                      SAFETY VERIFIED
                    </span>
                  </div>

                  {/* Root Cause & Symptoms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block mb-1">OBSERVED SYMPTOMS:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {diag.symptoms.map((sym, sIdx) => (
                          <li key={sIdx}>{sym}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block mb-1">ELECTRICAL ROOT CAUSE:</span>
                      <p className="text-slate-300">{diag.rootCause}</p>
                    </div>
                  </div>

                  {/* Step-by-Step Fix */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#febd69] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>STEP-BY-STEP RECTIFICATION PROCEDURE:</span>
                    </span>

                    <div className="space-y-1.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 font-sans">
                      {diag.stepByStepFix.map((step, stIdx) => (
                        <div key={stIdx} className="leading-relaxed">{step}</div>
                      ))}
                    </div>
                  </div>

                  {/* Multimeter Target & Hardware Tool */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                    {diag.multimeterTestValue && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Multimeter Target:</span>
                        <span className="font-bold text-emerald-400">{diag.multimeterTestValue}</span>
                      </div>
                    )}

                    {diag.recommendedPartOrTool && (
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Required Hardware:</span>
                        <span className="font-bold text-[#febd69] truncate ml-2">{diag.recommendedPartOrTool}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
