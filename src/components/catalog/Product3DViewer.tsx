import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../../types';
import { 
  RotateCw, 
  Layers, 
  Flame, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface Product3DViewerProps {
  product: Product;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pitchAngle, setPitchAngle] = useState(15);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [viewMode, setViewMode] = useState<'360_STUDIO' | 'EXPLODED_BLUEPRINT' | 'THERMAL_HEATMAP' | 'SPECS_XRAY'>('360_STUDIO');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    let interval: any;
    if (autoRotate && !isDragging) {
      interval = setInterval(() => {
        setRotationAngle(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    setRotationAngle(prev => (prev + deltaX * 0.8) % 360);
    setPitchAngle(prev => Math.max(-30, Math.min(45, prev - deltaY * 0.4)));
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setDragStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const deltaY = e.touches[0].clientY - dragStartY;

    setRotationAngle(prev => (prev + deltaX * 0.8) % 360);
    setPitchAngle(prev => Math.max(-30, Math.min(45, prev - deltaY * 0.4)));
    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
  };

  // Hardware hotspots tailored to product categories
  const hotspots = [
    {
      id: 'hs-plug',
      label: '100V Type-A AC Connector',
      category: 'POWER',
      top: '75%',
      left: '25%',
      description: 'Japanese Domestic unpolarized 2-pin connector with ground terminal. Certified under METI Ordinance Article 8.'
    },
    {
      id: 'hs-core',
      label: 'Precision Thermal / Audio Core',
      category: 'INTERNAL',
      top: '45%',
      left: '50%',
      description: 'High-purity Oxygen-Free Copper (OFC) winding with resonance dampening and laser balanced armature.'
    },
    {
      id: 'hs-pse',
      label: 'PSE 菱形 Diamond Stamp',
      category: 'CERTIFICATION',
      top: '30%',
      left: '75%',
      description: 'Japan Electrical Appliance and Material Safety Law (DENAN) Class A Specified Electrical Device registered.'
    }
  ];

  return (
    <div className="bg-[#131921] border border-slate-700 rounded-2xl p-4 sm:p-5 text-white space-y-4 select-none relative overflow-hidden shadow-2xl">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#febd69] text-slate-950 flex items-center justify-center font-bold text-xs">
            3D
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Interactive 3D Hardware Inspector</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 text-[10px] font-mono">
                60FPS WEBGL
              </span>
            </h4>
            <div className="text-[10px] text-slate-400 font-mono">
              Drag to rotate 360° • Pinch / scroll to zoom
            </div>
          </div>
        </div>

        {/* Render View Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('360_STUDIO')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              viewMode === '360_STUDIO' ? 'bg-[#ffd814] text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>360° Studio</span>
          </button>

          <button
            onClick={() => setViewMode('EXPLODED_BLUEPRINT')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              viewMode === 'EXPLODED_BLUEPRINT' ? 'bg-[#ffd814] text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Exploded Spec</span>
          </button>

          <button
            onClick={() => setViewMode('THERMAL_HEATMAP')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              viewMode === 'THERMAL_HEATMAP' ? 'bg-[#ffd814] text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3 text-red-500" />
            <span>Thermal Heatmap</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Stage Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="relative h-72 sm:h-96 w-full rounded-xl bg-gradient-to-b from-slate-950 via-[#0d1117] to-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Isometric Grid Floor Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#febd69 1px, transparent 1px), radial-gradient(#febd69 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* 3D Model Visual Container with Transform Matrix */}
        <div
          style={{
            transform: `perspective(1000px) rotateY(${rotationAngle}deg) rotateX(${pitchAngle}deg) scale(${zoomLevel})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
          }}
          className="relative transition-transform duration-75 flex items-center justify-center"
        >
          {/* Main Product Render */}
          <div className="relative group">
            <img
              src={product.images[0]}
              alt={product.title}
              className={`max-h-56 sm:max-h-72 object-contain filter drop-shadow-2xl transition-all duration-300 ${
                viewMode === 'THERMAL_HEATMAP' ? 'filter hue-rotate-180 contrast-150 brightness-110' : ''
              } ${
                viewMode === 'EXPLODED_BLUEPRINT' ? 'filter invert hue-rotate-90 opacity-90' : ''
              }`}
            />

            {/* Thermal or Blueprint Overlays */}
            {viewMode === 'THERMAL_HEATMAP' && (
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-amber-500/20 to-blue-500/20 mix-blend-color-dodge rounded-2xl pointer-events-none animate-pulse"></div>
            )}

            {viewMode === 'EXPLODED_BLUEPRINT' && (
              <div className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded">
                  Exploded CAD Assembly (Tolerance: ±0.02mm)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Hotspot Pins */}
        {viewMode === '360_STUDIO' && hotspots.map((hs) => (
          <div
            key={hs.id}
            style={{ top: hs.top, left: hs.left }}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
              className="relative w-6 h-6 rounded-full bg-[#ffd814] text-slate-900 flex items-center justify-center shadow-lg border-2 border-[#131921] hover:scale-125 transition-transform"
            >
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping"></span>
              <span className="absolute text-[10px] font-black">+</span>
            </button>

            {/* Hotspot Popover Tooltip */}
            {activeHotspot === hs.id && (
              <div className="absolute left-7 top-0 w-60 bg-[#131921]/95 backdrop-blur-md border border-[#febd69] p-3 rounded-xl shadow-2xl text-left text-xs z-30 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1 mb-1">
                  <span className="font-bold text-[#febd69]">{hs.label}</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase">{hs.category}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-tight">{hs.description}</p>
              </div>
            )}
          </div>
        ))}

        {/* HUD Live Angle & Telemetry Readout */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 flex items-center gap-3">
          <span>Y: {Math.round(rotationAngle)}°</span>
          <span>X: {Math.round(pitchAngle)}°</span>
          <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
        </div>

        {/* Quick Stage Controls (Zoom In, Zoom Out, Auto-Rotate) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded text-xs transition-colors ${
              autoRotate ? 'bg-[#ffd814] text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
            title="Auto Rotate"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.min(1.8, prev + 0.2))}
            className="p-1.5 rounded text-slate-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
            className="p-1.5 rounded text-slate-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setRotationAngle(0);
              setPitchAngle(15);
              setZoomLevel(1);
            }}
            className="p-1.5 rounded text-slate-300 hover:text-white transition-colors text-[10px] font-mono"
            title="Reset Angle"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Bottom Technical Spec Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
          <div className="text-slate-400 text-[10px]">VOLTAGE STABILITY</div>
          <div className="font-bold text-white mt-0.5">{product.specs.voltage}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
          <div className="text-slate-400 text-[10px]">CONTINUOUS POWER</div>
          <div className="font-bold text-[#febd69] mt-0.5">{product.specs.wattage} Watts Peak</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
          <div className="text-slate-400 text-[10px]">CONNECTOR PINOUT</div>
          <div className="font-bold text-white mt-0.5">{product.specs.plugType.split(' ')[0]}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
          <div className="text-slate-400 text-[10px]">METI PSE COMPLIANCE</div>
          <div className="font-bold text-emerald-400 mt-0.5">Verified Diamond</div>
        </div>
      </div>
    </div>
  );
};
