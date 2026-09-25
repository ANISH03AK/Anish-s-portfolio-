import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Zap, RotateCcw, Activity } from 'lucide-react';

interface EventItem {
  id: number;
  key: string;
  partition: number;
  status: 'buffered' | 'processing' | 'cached';
  latency: number;
}

export const QueueSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [processedCount, setProcessedCount] = useState(1420);
  const [p99Latency, setP99Latency] = useState(1.4);
  const [singleflightActive, setSingleflightActive] = useState(false);
  const eventIdRef = useRef(1);

  // Generate continuous lightweight events
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const id = eventIdRef.current++;
      const partitions = [0, 1, 2, 3];
      const selectedPartition = partitions[Math.floor(Math.random() * partitions.length)];
      const keys = ['user:session:99', 'order:cart:442', 'product:sku:810', 'auth:token:19'];
      const key = keys[Math.floor(Math.random() * keys.length)];
      const latency = Number((0.8 + Math.random() * 0.9).toFixed(1));

      setEvents((prev) => {
        const next: EventItem[] = [...prev.slice(-14), { id, key, partition: selectedPartition, status: 'buffered' as const, latency }];
        return next;
      });

      setProcessedCount((c) => c + 1);
      setP99Latency(Number((1.2 + Math.random() * 0.5).toFixed(1)));
    }, 450);

    return () => clearInterval(interval);
  }, [isRunning]);

  const triggerBurst = () => {
    setSingleflightActive(true);
    for (let i = 0; i < 6; i++) {
      const id = eventIdRef.current++;
      const burstEvent: EventItem = {
        id,
        key: 'HOT_KEY:promotion:flash_sale',
        partition: 1,
        status: 'buffered',
        latency: 1.1
      };
      setEvents((prev) => [...prev.slice(-12), burstEvent]);
    }
    setProcessedCount((c) => c + 6);
    setTimeout(() => {
      setSingleflightActive(false);
    }, 1800);
  };

  const resetQueue = () => {
    setEvents([]);
    setProcessedCount(0);
    setP99Latency(1.2);
  };

  return (
    <div className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl p-4 font-mono text-xs select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-zinc-200">HyperScale Live Stream Engine</span>
          <span className="text-[10px] text-zinc-400">· Go + Redis Shard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            title={isRunning ? 'Pause stream' : 'Resume stream'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={triggerBurst}
            className="flex items-center gap-1 px-2 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 transition-colors font-sans text-[11px]"
            title="Simulate 100x hot key spike to test singleflight deduplication"
          >
            <Zap className="w-3 h-3 text-blue-400" />
            <span>Spike Burst</span>
          </button>
          <button
            onClick={resetQueue}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Reset metrics"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-400">Throughput</div>
          <div className="text-sm font-semibold text-emerald-400 tabular-nums">
            {isRunning ? `${(138 + (processedCount % 12)).toFixed(1)}k` : '0'} req/s
          </div>
        </div>
        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-400">p99 Latency</div>
          <div className="text-sm font-semibold text-blue-400 tabular-nums">{p99Latency} ms</div>
        </div>
        <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
          <div className="text-[10px] text-zinc-400">Singleflight Mutex</div>
          <div className={`text-sm font-semibold tabular-nums ${singleflightActive ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`}>
            {singleflightActive ? 'Active (Deduplicating)' : 'Standby'}
          </div>
        </div>
      </div>

      {/* Visual Pipeline Lanes */}
      <div className="space-y-1.5 mb-2">
        <div className="text-[10px] text-zinc-400 flex justify-between">
          <span>Virtual Partitions & Write-Behind Buffer</span>
          <span>Consistent Hash Ring (vNodes: 150)</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-20 bg-zinc-950/70 rounded p-1.5 border border-zinc-800/80 overflow-hidden">
          {[0, 1, 2, 3].map((pId) => {
            const partitionEvents = events.filter((e) => e.partition === pId);
            return (
              <div key={pId} className="flex flex-col justify-end items-center bg-zinc-900/50 rounded p-1 border border-zinc-800/50 relative overflow-hidden">
                <span className="text-[9px] text-zinc-400 absolute top-1 left-1">P-{pId}</span>
                <div className="w-full flex flex-col-reverse gap-1 items-center pb-0.5">
                  {partitionEvents.slice(-4).map((ev) => (
                    <div
                      key={ev.id}
                      className={`w-full py-0.5 px-1 rounded text-[9px] text-center truncate transition-all duration-300 ${
                        ev.key.includes('HOT_KEY')
                          ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50 font-semibold'
                          : 'bg-blue-600/30 text-blue-200 border border-blue-500/30'
                      }`}
                    >
                      {ev.key.split(':')[1] || 'msg'}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Stream Feed */}
      <div className="bg-black/60 rounded p-2 border border-zinc-800/70 text-[10px] text-zinc-400 h-16 overflow-hidden flex flex-col justify-end">
        {events.slice(-3).map((e) => (
          <div key={e.id} className="truncate flex items-center justify-between">
            <span className="text-zinc-400">
              [{new Date().toLocaleTimeString()}] INGEST key={e.key} shard=P-{e.partition}
            </span>
            <span className="text-emerald-400 font-semibold">{e.latency}ms</span>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-zinc-400 italic">Queue buffer idle. Click "Spike Burst" or resume stream.</div>
        )}
      </div>
    </div>
  );
};
