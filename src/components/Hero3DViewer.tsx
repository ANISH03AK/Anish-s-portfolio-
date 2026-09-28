import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ColorTheme } from '../data/colorThemes';

interface Hero3DViewerProps {
  theme?: ColorTheme;
  className?: string;
  onSelectFeature?: (featureId: string) => void;
}

interface TechNode {
  id: string;
  name: string;
  category: string;
  purpose: string;
  color: string;
  pos: [number, number, number];
}

const TECH_NODES: TechNode[] = [
  {
    id: 'react',
    name: 'React 19 & TypeScript',
    category: 'Frontend Development',
    purpose: 'Component-based UI architecture & maintainable application structure.',
    color: '#61DAFB',
    pos: [2.2, 0.4, 0.8]
  },
  {
    id: 'gsap',
    name: 'GSAP Motion & Scroll',
    category: 'Motion & Interaction',
    purpose: 'Smooth cinematic scroll animations, micro-interactions & transitions.',
    color: '#0AE448',
    pos: [-2.1, 0.7, -0.6]
  },
  {
    id: 'three',
    name: '3D & 360° Immersive',
    category: '3D & Immersive Design',
    purpose: 'Large-scale rotational presentation, layered depth & perspective visual design.',
    color: '#38BDF8',
    pos: [0.5, 2.0, -1.2]
  },
  {
    id: 'figma',
    name: 'Figma & Design Systems',
    category: 'UI / UX Design',
    purpose: 'Systematic typography, spacing hierarchy, prototypes & responsive UX.',
    color: '#F24E1E',
    pos: [-0.6, -1.9, 1.1]
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Design-System Styling',
    purpose: 'High-performance responsive layouts, semantic structure & zero-jank UI.',
    color: '#0EA5E9',
    pos: [1.6, -1.2, -1.4]
  },
  {
    id: 'tcs',
    name: 'TCS BMS & ELV Ops',
    category: 'Infrastructure Engineering',
    purpose: 'Enterprise 24/7 facility systems: Fire Alarm, WLD, CCTV & Access telemetry.',
    color: '#10B981',
    pos: [-1.8, -0.6, 1.6]
  }
];

export const Hero3DViewer: React.FC<Hero3DViewerProps> = ({ theme, className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<TechNode | null>(TECH_NODES[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const sceneState = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    group?: THREE.Group;
    nodesGroup?: THREE.Group;
    ringsGroup?: THREE.Group;
    particlesGroup?: THREE.Points;
    reqId?: number;
    mouseX: number;
    mouseY: number;
    targetRotationX: number;
    targetRotationY: number;
    currentRotationX: number;
    currentRotationY: number;
    isPointerDown: boolean;
    lastPointerX: number;
    lastPointerY: number;
  }>({
    mouseX: 0,
    mouseY: 0,
    targetRotationX: 0.2,
    targetRotationY: 0.4,
    currentRotationX: 0.2,
    currentRotationY: 0.4,
    isPointerDown: false,
    lastPointerX: 0,
    lastPointerY: 0
  });

  const primaryColor = theme?.primary || '#2563eb';
  const accentColor = theme?.accent || '#38bdf8';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneState.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    sceneState.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    sceneState.current.renderer = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, 4, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, 3, 20);
    pointLight2.position.set(-5, -4, -4);
    scene.add(pointLight2);

    // 5. Main 3D Pivot Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    sceneState.current.group = mainGroup;

    // A. Central 3D Polyhedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.set(1.06, 1.06, 1.06);
    mainGroup.add(wireMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.75
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // B. Multi-layered 3D Orbital Rings (Depth & Perspective)
    const ringsGroup = new THREE.Group();
    mainGroup.add(ringsGroup);
    sceneState.current.ringsGroup = ringsGroup;

    const ringRadii = [1.8, 2.3, 2.8];
    const ringColors = [primaryColor, accentColor, '#10b981'];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i % ringColors.length],
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.55 - i * 0.1
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      if (i === 0) ringMesh.rotation.x = Math.PI / 3;
      if (i === 1) ringMesh.rotation.y = Math.PI / 4;
      if (i === 2) ringMesh.rotation.x = -Math.PI / 5;
      ringsGroup.add(ringMesh);
    });

    // C. 3D Particles Matrix (Star Dust / Depth Field)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePos[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);
    sceneState.current.particlesGroup = particles;

    // D. Interactive 3D Technology Nodes
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);
    sceneState.current.nodesGroup = nodesGroup;

    TECH_NODES.forEach((node) => {
      const nodeGeo = new THREE.SphereGeometry(0.18, 20, 20);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(...node.pos);
      nodeMesh.userData = { id: node.id, nodeData: node };

      // Halo ring around node
      const haloGeo = new THREE.RingGeometry(0.24, 0.28, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.lookAt(0, 0, 0);
      nodeMesh.add(haloMesh);

      // Connecting filament to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...node.pos).multiplyScalar(0.9)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.28
      });
      const line = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(line);

      nodesGroup.add(nodeMesh);
    });

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Core pulsing & floating rotation
      coreMesh.rotation.y += delta * 0.2;
      coreMesh.rotation.x += delta * 0.15;
      wireMesh.rotation.y = coreMesh.rotation.y;
      wireMesh.rotation.x = coreMesh.rotation.x;

      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.5) * 0.04;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Orbital rings rotation
      ringsGroup.rotation.y += delta * 0.25;
      ringsGroup.rotation.x += delta * 0.1;

      // Particles ambient drift
      particles.rotation.y -= delta * 0.05;

      // Node individual breathing
      nodesGroup.children.forEach((child, i) => {
        child.position.y += Math.sin(elapsedTime * 2 + i) * 0.0015;
      });

      // Smooth 360° Rotational Damping
      const state = sceneState.current;
      if (autoRotate && !state.isPointerDown) {
        state.targetRotationY += delta * 0.45;
      }

      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.08;
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.08;

      mainGroup.rotation.x = state.currentRotationX;
      mainGroup.rotation.y = state.currentRotationY;

      // Update rotational angle telemetry for UI readout
      const deg = Math.round(((state.currentRotationY % (Math.PI * 2)) / (Math.PI * 2)) * 360);
      setRotationDegree(deg >= 0 ? deg : 360 + deg);

      renderer.render(scene, camera);
      state.reqId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0 && camera && renderer) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (sceneState.current.reqId) {
        cancelAnimationFrame(sceneState.current.reqId);
      }
      resizeObserver.disconnect();
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [primaryColor, accentColor, autoRotate]);

  // Pointer Interaction Handlers (Full 360° Rotational Touch & Drag)
  const handlePointerDown = (e: React.PointerEvent) => {
    sceneState.current.isPointerDown = true;
    sceneState.current.lastPointerX = e.clientX;
    sceneState.current.lastPointerY = e.clientY;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!sceneState.current.isPointerDown) return;
    const deltaX = e.clientX - sceneState.current.lastPointerX;
    const deltaY = e.clientY - sceneState.current.lastPointerY;

    sceneState.current.targetRotationY += deltaX * 0.008;
    sceneState.current.targetRotationX += deltaY * 0.008;

    // Clamp pitch slightly so it doesn't flip completely upside down
    sceneState.current.targetRotationX = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, sceneState.current.targetRotationX)
    );

    sceneState.current.lastPointerX = e.clientX;
    sceneState.current.lastPointerY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    sceneState.current.isPointerDown = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handleResetAngle = () => {
    sceneState.current.targetRotationX = 0.2;
    sceneState.current.targetRotationY = 0.4;
  };

  return (
    <div className={`relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Telemetry Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono z-20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-bold tracking-wide">360° INTERACTIVE PRESENTATION</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-medium">3D DEPTH ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden sm:inline">ANGLE:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold text-[11px] border border-slate-700">
            {rotationDegree}° ROTATION
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        className="relative w-full h-[360px] sm:h-[400px] cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Three.js mount element */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Ambient perspective grid overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,23,42,0.85)_100%)]" />

        {/* Drag Hint Overlay */}
        <div
          className={`absolute top-4 left-4 pointer-events-none transition-opacity duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-slate-700/80 text-[11px] font-mono text-slate-300 backdrop-blur-md ${
            isDragging ? 'opacity-30' : 'opacity-90'
          }`}
        >
          <i className="fa-solid fa-arrows-spin text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>DRAG TO ROTATE 360°</span>
        </div>

        {/* Floating Controls Bar (Bottom Right inside canvas) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Continuous 360° Orbit"
          >
            <i className={`fa-solid ${autoRotate ? 'fa-pause' : 'fa-play'} text-[10px]`} />
            <span>{autoRotate ? 'AUTO-SPIN: ON' : 'AUTO-SPIN: OFF'}</span>
          </button>

          <button
            onClick={handleResetAngle}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer text-xs shadow-md backdrop-blur-md"
            title="Reset Perspective Angle"
          >
            <i className="fa-solid fa-rotate-left" />
          </button>
        </div>
      </div>

      {/* Interactive Technology Selector Pills */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/90 z-20">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-layer-group text-cyan-400" />
            <span>INTERACTIVE ARCHITECTURE NODES</span>
          </span>
          <span className="text-slate-500">6 INTEGRATED PILLARS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {TECH_NODES.map((node) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => {
                  setActiveNode(node);
                  // Focus view slightly toward node position
                  sceneState.current.targetRotationY = Math.atan2(node.pos[0], node.pos[2]);
                  sceneState.current.targetRotationX = -node.pos[1] * 0.15;
                }}
                className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all border cursor-pointer font-sans ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400/60 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: node.color }}
                />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {node.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate font-mono">
                    {node.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Detail Card */}
      {activeNode && (
        <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-start justify-between gap-4 z-20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded font-bold uppercase tracking-wider" style={{ backgroundColor: `${activeNode.color}20`, color: activeNode.color }}>
                {activeNode.category}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">ARCHITECTURAL PURPOSE</span>
            </div>
            <h4 className="text-sm font-bold text-white font-sans">
              {activeNode.name}
            </h4>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              {activeNode.purpose}
            </p>
          </div>
          <div className="shrink-0 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-cyan-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ACTIVE 3D LAYER</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
