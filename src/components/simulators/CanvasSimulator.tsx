import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Plus, Sparkles, RefreshCw } from 'lucide-react';

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  label: string;
  author: 'you' | 'remote_alice' | 'remote_bob';
  color: string;
}

export const CanvasSimulator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<CanvasNode[]>([
    { id: '1', x: 60, y: 40, label: 'Auth Middleware', author: 'you', color: 'border-blue-500 bg-blue-950/40 text-blue-200' },
    { id: '2', x: 220, y: 70, label: 'WebSocket Sync', author: 'remote_alice', color: 'border-emerald-500 bg-emerald-950/40 text-emerald-200' },
    { id: '3', x: 130, y: 130, label: 'CRDT Quadtree', author: 'remote_bob', color: 'border-purple-500 bg-purple-950/40 text-purple-200' },
  ]);

  const [remoteCursor, setRemoteCursor] = useState({ x: 200, y: 100 });
  const [fps, setFps] = useState(60);
  const [syncLatency, setSyncLatency] = useState(14);

  // Smooth remote simulated cursor movement with Hermite spline logic
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      const x = 160 + Math.sin(t * 1.5) * 80;
      const y = 80 + Math.cos(t * 2) * 40;
      setRemoteCursor({ x, y });
      setFps(Math.random() > 0.1 ? 60 : 59);
      setSyncLatency(Math.floor(12 + Math.random() * 5));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(rect.width - 90, e.clientX - rect.left - 40));
    const y = Math.max(10, Math.min(rect.height - 40, e.clientY - rect.top - 15));

    const labels = ['API Gateway', 'Worker Pool', 'Write Buffer', 'State Vector', 'Event Log'];
    const label = labels[Math.floor(Math.random() * labels.length)];

    const newNode: CanvasNode = {
      id: String(Date.now()),
      x,
      y,
      label,
      author: 'you',
      color: 'border-blue-500 bg-blue-950/40 text-blue-200'
    };

    setNodes((prev) => [...prev.slice(-5), newNode]);
  };

  const clearCanvas = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes([
      { id: '1', x: 70, y: 50, label: 'Root CRDT State', author: 'you', color: 'border-blue-500 bg-blue-950/40 text-blue-200' }
    ]);
  };

  return (
    <div className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl p-4 font-mono text-xs select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-zinc-200">PulseFlow Interactive Canvas</span>
          <span className="text-[10px] text-zinc-400">· CRDTs & Quadtree</span>
        </div>
        <div className="flex items-center gap-2 font-sans text-[11px]">
          <span className="text-emerald-400 font-semibold tabular-nums">{fps} FPS</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-400 tabular-nums">{syncLatency}ms P2P</span>
          <button
            onClick={clearCanvas}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors ml-1"
            title="Reset canvas nodes"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Canvas Plane */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="w-full h-44 bg-zinc-950/90 rounded-lg border border-zinc-800 relative overflow-hidden cursor-crosshair group"
      >
        {/* Subtle grid lines background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #a1a1aa 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* User Prompt Overlay */}
        <div className="absolute top-2 left-2 pointer-events-none text-[10px] text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800/60 flex items-center gap-1 font-sans">
          <Plus className="w-3 h-3 text-blue-400" />
          <span>Click anywhere to dispatch CRDT node</span>
        </div>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            className={`absolute px-2.5 py-1 rounded border text-[11px] font-sans font-medium shadow-sm transition-transform duration-150 hover:scale-105 pointer-events-auto ${node.color}`}
          >
            <div className="flex items-center gap-1">
              <span>{node.label}</span>
            </div>
            <div className="text-[8px] opacity-60 font-mono mt-0.5">{node.author}</div>
          </div>
        ))}

        {/* Simulated Remote Peer Cursor */}
        <div
          style={{
            transform: `translate3d(${remoteCursor.x}px, ${remoteCursor.y}px, 0)`,
            transition: 'transform 0.08s linear'
          }}
          className="absolute pointer-events-none top-0 left-0 z-20 flex items-start gap-1"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/30" />
          <span className="bg-emerald-600/90 text-white text-[9px] px-1 py-0.2 rounded font-sans whitespace-nowrap shadow-sm">
            Alice (Tokyo)
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-2 pt-2 text-[10px] text-zinc-400 border-t border-zinc-800/60">
        <span>Active Entities: {nodes.length} nodes</span>
        <span>Replication Protocol: Yjs State Vectors over WSS</span>
      </div>
    </div>
  );
};
