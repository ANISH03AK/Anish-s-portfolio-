import React, { useState, useEffect } from 'react';
import { BarChart3, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

export const AnalyticsSimulator: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1s' | '5s' | '1m' | '1h'>('5s');
  const [dataPoints, setDataPoints] = useState<number[]>([142.3, 142.8, 143.1, 142.9, 143.6, 144.2, 144.0, 144.7, 145.2, 144.9, 145.8, 146.1]);
  const [tickCount, setTickCount] = useState(12840920);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickCount((prev) => prev + Math.floor(180 + Math.random() * 80));
      setDataPoints((prev) => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.47) * 0.4;
        const nextVal = Number((last + delta).toFixed(2));
        return [...prev.slice(1), nextVal];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const minVal = Math.min(...dataPoints);
  const maxVal = Math.max(...dataPoints);
  const range = maxVal - minVal || 1;
  const lastPrice = dataPoints[dataPoints.length - 1];
  const firstPrice = dataPoints[0];
  const isPositive = lastPrice >= firstPrice;

  return (
    <div className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl p-4 font-mono text-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-zinc-200">FinMetrics Tick Aggregator</span>
          <span className="text-[10px] text-zinc-400">· ClickHouse + Arrow</span>
        </div>
        <div className="flex items-center gap-1 font-sans">
          {(['1s', '5s', '1m', '1h'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-zinc-200 text-zinc-900 font-semibold'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-center gap-2 font-sans">
          <span className="text-xl font-bold text-zinc-100 tabular-nums">${lastPrice.toFixed(2)}</span>
          <span
            className={`text-xs font-semibold flex items-center ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)}%
          </span>
        </div>
        <div className="text-[11px] text-zinc-400 font-mono">
          Ticks Today: <span className="text-zinc-200 font-semibold tabular-nums">{tickCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Sparkline Canvas Area */}
      <div className="h-24 w-full bg-zinc-950/80 rounded border border-zinc-800 p-2 flex items-end gap-1.5 relative overflow-hidden mb-3">
        {dataPoints.map((val, idx) => {
          const heightPercent = Math.max(15, Math.min(100, ((val - minVal) / range) * 85 + 15));
          return (
            <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full group relative">
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t transition-all duration-300 ${
                  isPositive ? 'bg-emerald-500/60 group-hover:bg-emerald-400' : 'bg-rose-500/60 group-hover:bg-rose-400'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Performance Footer */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 font-sans">
        <div className="flex items-center gap-1.5 bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/60">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>Zero-Copy Apache Arrow Deserialization</span>
        </div>
        <div className="flex items-center justify-end bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/60">
          <span>Query p95: <strong className="text-zinc-200">76ms</strong></span>
        </div>
      </div>
    </div>
  );
};
