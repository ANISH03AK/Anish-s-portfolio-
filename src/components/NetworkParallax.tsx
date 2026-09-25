import React, { useEffect, useRef } from 'react';
import { ColorTheme } from '../data/colorThemes';

interface NetworkParallaxProps {
  theme?: ColorTheme;
}

export const NetworkParallax: React.FC<NetworkParallaxProps> = ({ theme }) => {
  const topoLayerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const topoLayer = topoLayerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let targetScrollY = currentScrollY;
    let scrollVelocity = 0;
    let lastScrollY = currentScrollY;
    let lastScrollTime = performance.now();
    let animFrameId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 16);
      const dist = Math.abs(targetScrollY - lastScrollY);
      scrollVelocity = (dist / dt) * 16;
      lastScrollY = targetScrollY;
      lastScrollTime = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let mouse = { x: null as number | null, y: null as number | null };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseOut);

    const rawNodes = [
      { id: 'CORE-RTR-01', type: 'core', relX: 0.16, relY: 0.22, name: 'BGP CORE-01', ip: '10.0.0.1', speed: '100 Gbps' },
      { id: 'SDN-CTRL-01', type: 'controller', relX: 0.50, relY: 0.18, name: 'SDN CONTROLLER', ip: '10.0.1.254', speed: '400 Gbps' },
      { id: 'SPINE-SW-01', type: 'spine', relX: 0.32, relY: 0.38, name: 'SPINE-A', ip: '10.0.2.1', speed: '100 Gbps' },
      { id: 'SPINE-SW-02', type: 'spine', relX: 0.70, relY: 0.34, name: 'SPINE-B', ip: '10.0.2.2', speed: '100 Gbps' },
      { id: 'LEAF-SW-01', type: 'leaf', relX: 0.14, relY: 0.62, name: 'LEAF-101', ip: '10.10.1.1', speed: '25 Gbps' },
      { id: 'LEAF-SW-02', type: 'leaf', relX: 0.40, relY: 0.65, name: 'LEAF-102', ip: '10.10.2.1', speed: '25 Gbps' },
      { id: 'LEAF-SW-03', type: 'leaf', relX: 0.64, relY: 0.68, name: 'LEAF-103', ip: '10.10.3.1', speed: '25 Gbps' },
      { id: 'EDGE-GW-01', type: 'gateway', relX: 0.86, relY: 0.25, name: 'EDGE-GW-E', ip: '172.16.0.1', speed: '100 Gbps' },
      { id: 'CLUSTER-APP-01', type: 'endpoint', relX: 0.26, relY: 0.85, name: 'APP-POD-ALPHA', ip: '10.200.1.10', speed: '10 Gbps' },
      { id: 'BMS-MODBUS-GW', type: 'bms', relX: 0.52, relY: 0.88, name: 'BMS-GATEWAY', ip: '192.168.1.50', speed: 'BACnet/IP' },
      { id: 'DB-STORAGE-POD', type: 'db', relX: 0.84, relY: 0.76, name: 'SQL-STORAGE-CLUSTER', ip: '10.200.8.20', speed: 'NVMe-oF' }
    ];

    const conduits = [
      [0, 1], [0, 2], [1, 2], [1, 3], [1, 7],
      [2, 4], [2, 5], [3, 5], [3, 6], [3, 7],
      [4, 8], [5, 8], [5, 9], [6, 9], [6, 10], [7, 10]
    ];

    const packetLabels = ['TCP:SYN', '400G:FABRIC', 'SDN:FLOW', 'BGP:UPDATE', 'VXLAN', 'HTTP/3', 'ACK:200', 'MODBUS:IO', 'SQL:TXN'];
    const activePacketColors = theme?.packetColors || ['#ef4444', '#facc15', '#f87171', '#fbbf24'];

    const packets: Array<{
      conduitIdx: number;
      forward: boolean;
      t: number;
      baseSpeed: number;
      color: string;
      size: number;
      label: string;
      showLabel: boolean;
    }> = [];
    const packetCount = 28;

    for (let i = 0; i < packetCount; i++) {
      packets.push({
        conduitIdx: Math.floor(Math.random() * conduits.length),
        forward: Math.random() > 0.35,
        t: Math.random(),
        baseSpeed: 0.003 + Math.random() * 0.004,
        color: activePacketColors[Math.floor(Math.random() * activePacketColors.length)],
        size: Math.random() > 0.65 ? 3.5 : 2.5,
        label: packetLabels[Math.floor(Math.random() * packetLabels.length)],
        showLabel: Math.random() > 0.65
      });
    }

    // Floating Stardust Particles for Atmospheric Animation
    interface Stardust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseRate: number;
      baseAlpha: number;
    }
    const stardustArray: Stardust[] = [];
    const stardustCount = 42;
    for (let i = 0; i < stardustCount; i++) {
      stardustArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45 - 0.15, // slight upward float
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.25,
        pulseRate: Math.random() * 0.03 + 0.015
      });
    }

    let globalTick = 0;

    const draw = () => {
      globalTick += 0.02;
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;
      scrollVelocity *= 0.92;

      if (topoLayer) {
        const parallaxOffset = -currentScrollY * 0.18;
        topoLayer.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Atmospheric Floating Stardust Embers
      const stardustColor = theme?.primary || '#facc15';
      stardustArray.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const pulse = Math.sin(globalTick * 2 + star.pulseRate * 100);
        const currentAlpha = Math.max(0.08, star.baseAlpha + pulse * 0.25);

        ctx.save();
        ctx.fillStyle = stardustColor;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = stardustColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Parallax Network Topology Nodes & Orthogonal Conduits
      const nodeParallaxY = -currentScrollY * 0.06;
      const nodes = rawNodes.map((n) => {
        let x = n.relX * width;
        let y = ((n.relY * height + nodeParallaxY) % (height * 1.25));
        if (y < -50) y += height * 1.25;
        return { ...n, x, y };
      });

      const conduitStrokeColor = theme?.conduitStroke || 'rgba(239, 68, 68, 0.2)';
      const conduitSecondaryStroke = theme?.secondary ? `${theme.secondary}22` : 'rgba(250, 204, 21, 0.12)';

      conduits.forEach(([sourceIdx, targetIdx]) => {
        const n1 = nodes[sourceIdx];
        const n2 = nodes[targetIdx];
        if (!n1 || !n2) return;

        const midX = (n1.x + n2.x) / 2;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(midX, n1.y);
        ctx.lineTo(midX, n2.y);
        ctx.lineTo(n2.x, n2.y);

        ctx.strokeStyle = conduitStrokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = conduitSecondaryStroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 3. Flowing Data Packets
      packets.forEach((p) => {
        const pair = conduits[p.conduitIdx];
        if (!pair) return;
        const n1 = nodes[pair[0]];
        const n2 = nodes[pair[1]];
        if (!n1 || !n2) return;

        const effectiveSpeed = p.baseSpeed + scrollVelocity * 0.0007;
        if (p.forward) {
          p.t += effectiveSpeed;
          if (p.t > 1) {
            p.t = 0;
            p.conduitIdx = Math.floor(Math.random() * conduits.length);
          }
        } else {
          p.t -= effectiveSpeed;
          if (p.t < 0) {
            p.t = 1;
            p.conduitIdx = Math.floor(Math.random() * conduits.length);
          }
        }

        const midX = (n1.x + n2.x) / 2;
        let px = 0;
        let py = 0;

        if (p.t <= 0.33) {
          const subT = p.t / 0.33;
          px = n1.x + (midX - n1.x) * subT;
          py = n1.y;
        } else if (p.t <= 0.66) {
          const subT = (p.t - 0.33) / 0.33;
          px = midX;
          py = n1.y + (n2.y - n1.y) * subT;
        } else {
          const subT = (p.t - 0.66) / 0.34;
          px = midX + (n2.x - midX) * subT;
          py = n2.y;
        }

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.showLabel) {
          ctx.fillStyle = theme?.accent || 'rgba(254, 240, 138, 0.9)';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(p.label, px + 6, py - 4);
        }
        ctx.restore();
      });

      // 4. Interactive Nodes with Ambient Glow Pulse
      const themePrimary = theme?.primary || '#ef4444';
      const themeSecondary = theme?.secondary || '#facc15';

      nodes.forEach((n) => {
        let isHovered = false;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) isHovered = true;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 18 : 12, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? `${themePrimary}33` : 'rgba(12, 12, 12, 0.85)';
        ctx.strokeStyle = isHovered ? themeSecondary : `${themePrimary}66`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = isHovered ? 18 : 6;
        ctx.shadowColor = themePrimary;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = n.type === 'bms' ? themeSecondary : (n.type === 'core' || n.type === 'controller' ? themePrimary : themeSecondary);
        ctx.fill();

        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(212, 212, 216, 0.75)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(n.name, n.x + 16, n.y - 3);

        if (isHovered) {
          ctx.fillStyle = themeSecondary;
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(`IP: ${n.ip} · ${n.speed}`, n.x + 16, n.y + 9);
        }

        ctx.restore();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [theme]);

  const bgBase = theme?.bgDark || '#050505';

  return (
    <div id="network-parallax-stage" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={topoLayerRef}
        id="network-topo-layer"
        className="absolute -top-[25%] -left-[5%] w-[110%] h-[150%] bg-cover bg-center will-change-transform opacity-60"
        style={{ backgroundImage: "url('/network-mesh-bg.svg')", transform: 'translate3d(0, 0, 0)' }}
      />
      <canvas ref={canvasRef} id="software-network-canvas" className="absolute inset-0 w-full h-full will-change-transform" />
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: `linear-gradient(to bottom, ${bgBase}bf 0%, ${bgBase}80 50%, ${bgBase}e6 100%)`
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${bgBase}d9 100%)`
        }}
      />
    </div>
  );
};
