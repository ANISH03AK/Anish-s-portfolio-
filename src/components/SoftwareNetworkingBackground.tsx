import React, { useEffect, useRef } from 'react';

export const SoftwareNetworkingBackground: React.FC = () => {
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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 16);
      const dist = Math.abs(targetScrollY - lastScrollY);
      scrollVelocity = (dist / dt) * 16;
      lastScrollY = targetScrollY;
      lastScrollTime = now;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

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

    const packetLabels = ['TCP:SYN', '400G:FABRIC', 'SDN:FLOW', 'BGP:UPDATE', 'VXLAN', 'HTTP/3', 'ACK:200'];
    const packetColors = ['#00f2fe', '#38bdf8', '#60a5fa', '#34d399'];
    const packets = Array.from({ length: 26 }, () => ({
      conduitIdx: Math.floor(Math.random() * conduits.length),
      forward: Math.random() > 0.35,
      t: Math.random(),
      baseSpeed: 0.003 + Math.random() * 0.004,
      color: packetColors[Math.floor(Math.random() * packetColors.length)],
      size: Math.random() > 0.65 ? 3.5 : 2.5,
      label: packetLabels[Math.floor(Math.random() * packetLabels.length)],
      showLabel: Math.random() > 0.7
    }));

    const render = () => {
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;
      scrollVelocity *= 0.92;

      if (topoLayer) {
        const parallaxOffset = -currentScrollY * 0.18;
        topoLayer.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      const nodeParallaxY = -currentScrollY * 0.06;
      const nodes = rawNodes.map((n) => {
        const x = n.relX * width;
        let y = (n.relY * height + nodeParallaxY) % (height * 1.25);
        if (y < -50) y += height * 1.25;
        return { ...n, x, y };
      });

      // Conduits
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
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Packets with scroll surge
      const scrollSurge = 1 + Math.min(scrollVelocity * 0.14, 4.0);
      packets.forEach((p) => {
        const [sourceIdx, targetIdx] = conduits[p.conduitIdx];
        const n1 = p.forward ? nodes[sourceIdx] : nodes[targetIdx];
        const n2 = p.forward ? nodes[targetIdx] : nodes[sourceIdx];
        if (!n1 || !n2) return;

        p.t += p.baseSpeed * scrollSurge;
        if (p.t > 1) {
          p.t = 0;
          p.conduitIdx = Math.floor(Math.random() * conduits.length);
          p.forward = Math.random() > 0.4;
        }

        const midX = (n1.x + n2.x) / 2;
        let px: number;
        let py: number;

        if (p.t < 0.33) {
          const subT = p.t / 0.33;
          px = n1.x + (midX - n1.x) * subT;
          py = n1.y;
        } else if (p.t < 0.66) {
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
          ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(p.label, px + 6, py - 4);
        }
        ctx.restore();
      });

      // Nodes
      nodes.forEach((n) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8, 18, 38, 0.7)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.type === 'bms' ? '#34d399' : (n.type === 'core' ? '#00f2fe' : '#38bdf8');
        ctx.fill();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.75)';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(n.name, n.x + 16, n.y - 3);
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Plane 1: Software Networking Vector Topology Backdrop */}
      <div
        ref={topoLayerRef}
        className="absolute -top-[25%] -left-[5%] w-[110%] h-[150%] bg-cover bg-center will-change-transform opacity-75"
        style={{ backgroundImage: `url('/network-mesh-bg.svg')` }}
      />

      {/* Plane 2: Dynamic Real-time Software Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform" />

      {/* Plane 3: Contrast Scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/70 via-[#040711]/45 to-[#040711]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,7,17,0.78)_100%)]" />
    </div>
  );
};
