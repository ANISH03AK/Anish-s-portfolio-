import React, { useEffect, useRef } from 'react';
import { ColorTheme } from '../data/colorThemes';

interface NetworkParallaxProps {
  theme?: ColorTheme;
}

export const NetworkParallax: React.FC<NetworkParallaxProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgBase = theme?.bgDark || '#09090b';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let targetScrollY = currentScrollY;
    let animFrameId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Clean, minimalist geometric nodes
    const nodeCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 38000), 32);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 1
      });
    }

    const draw = () => {
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      ctx.clearRect(0, 0, width, height);

      // Subtle, quiet connection lines
      const parallaxY = -currentScrollY * 0.05;

      nodes.forEach((n, idx) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        const renderY = (n.y + parallaxY) % height;
        const normalizedY = renderY < 0 ? renderY + height : renderY;

        for (let j = idx + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const n2RenderY = (n2.y + parallaxY) % height;
          const n2NormY = n2RenderY < 0 ? n2RenderY + height : n2RenderY;

          const dx = n.x - n2.x;
          const dy = normalizedY - n2NormY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 120;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(n.x, normalizedY);
            ctx.lineTo(n2.x, n2NormY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw small quiet point
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(n.x, normalizedY, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [theme]);

  return (
    <div id="network-parallax-stage" className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} id="software-network-canvas" className="absolute inset-0 w-full h-full will-change-transform opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, transparent 0%, ${bgBase} 90%)`
        }}
      />
    </div>
  );
};
