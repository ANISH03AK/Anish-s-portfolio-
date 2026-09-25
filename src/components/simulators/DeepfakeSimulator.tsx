import React, { useState } from 'react';
import { Scan, ShieldAlert, CheckCircle2, Cpu, Eye, Play, Sparkles } from 'lucide-react';

interface TestCase {
  id: string;
  label: string;
  source: string;
  actualType: 'synthetic' | 'genuine' | 'faceswap';
  boundaryScore: number;
  symmetryScore: number;
  textureAnomaly: number;
}

const TEST_CASES: TestCase[] = [
  {
    id: 'case-1',
    label: 'Sample A: StyleGAN3 Synthesized',
    source: 'GAN-Generated Face (Synthetic)',
    actualType: 'synthetic',
    boundaryScore: 88,
    symmetryScore: 42,
    textureAnomaly: 91
  },
  {
    id: 'case-2',
    label: 'Sample B: Real Camera Portrait',
    source: 'Natural Photographic Capture',
    actualType: 'genuine',
    boundaryScore: 12,
    symmetryScore: 94,
    textureAnomaly: 8
  },
  {
    id: 'case-3',
    label: 'Sample C: Deepfake Face Swap',
    source: 'Facial Boundary Replacement',
    actualType: 'faceswap',
    boundaryScore: 94,
    symmetryScore: 56,
    textureAnomaly: 84
  }
];

export const DeepfakeSimulator: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<TestCase>(TEST_CASES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(true);

  const runInference = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 900);
  };

  const isFake = selectedCase.actualType !== 'genuine';
  const confidence = isFake ? 98.4 : 99.1;

  return (
    <div className="p-4 sm:p-5 bg-[#090b12] rounded-2xl border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-wide">CNN FACE INFERENCE ENGINE</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">PYTHON · OPENCV · TENSORFLOW</span>
      </div>

      {/* Test Sample Selector */}
      <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
        {TEST_CASES.map((tc) => (
          <button
            key={tc.id}
            onClick={() => {
              setSelectedCase(tc);
              setIsScanning(false);
              setScanComplete(true);
            }}
            className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              selectedCase.id === tc.id
                ? 'bg-blue-950/60 border-blue-500/80 text-blue-300 font-semibold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tc.label}
          </button>
        ))}
      </div>

      {/* Visual Neural Network Scanner Card */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#0e111d] p-4 rounded-xl border border-zinc-800/80 items-center">
        {/* Face Silhouette with Scan Laser (5 cols) */}
        <div className="sm:col-span-5 relative aspect-square max-w-[180px] mx-auto w-full bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
          {/* Facial Silhouette Graphic */}
          <div className="w-24 h-28 rounded-full border-2 border-dashed border-zinc-700/80 flex flex-col items-center justify-center relative">
            <div className="flex gap-4 mb-2">
              <div className="w-3 h-3 rounded-full border border-blue-400/80 bg-blue-500/20" />
              <div className="w-3 h-3 rounded-full border border-blue-400/80 bg-blue-500/20" />
            </div>
            <div className="w-1.5 h-4 bg-zinc-600 rounded-full mb-1" />
            <div className="w-6 h-1.5 bg-zinc-600 rounded-full" />
          </div>

          {/* Animated Laser Scanning Line */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_0.9s_infinite]" />
          )}

          {/* Detection Overlay Box */}
          <div className="absolute inset-3 border border-blue-500/40 rounded-lg pointer-events-none flex flex-col justify-between p-1.5 text-[9px] font-mono text-blue-400">
            <span>ROI: [32, 32, 192, 192]</span>
            <span>224x224 RGB</span>
          </div>
        </div>

        {/* Feature Heatmap & Output (7 cols) */}
        <div className="sm:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-zinc-300">Convolutional Layer Metrics:</div>
            <button
              onClick={runInference}
              disabled={isScanning}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isScanning ? 'Extracting...' : 'Scan Sample'}</span>
            </button>
          </div>

          {/* Feature Bars */}
          <div className="space-y-1.5 text-xs font-mono">
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Boundary Blend Discontinuity:</span>
                <span className={selectedCase.boundaryScore > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {selectedCase.boundaryScore}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${selectedCase.boundaryScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${selectedCase.boundaryScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>High-Frequency Texture Anomaly:</span>
                <span className={selectedCase.textureAnomaly > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {selectedCase.textureAnomaly}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${selectedCase.textureAnomaly > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${selectedCase.textureAnomaly}%` }}
                />
              </div>
            </div>
          </div>

          {/* Classification Verdict Box */}
          {scanComplete && (
            <div
              className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                isFake
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {isFake ? <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                <div>
                  <div className="font-bold">{isFake ? 'SYNTHETIC / DEEPFAKE' : 'AUTHENTIC HUMAN'}</div>
                  <div className="text-[10px] opacity-80">{selectedCase.source}</div>
                </div>
              </div>
              <div className="text-right font-mono font-bold text-[11px]">
                {confidence}% CONF
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
