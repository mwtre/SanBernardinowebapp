'use client';

import { useEffect, useRef } from 'react';

interface RippleSettings {
  maxSize: number;
  animationSpeed: number;
  strokeColor: number[];
}

interface CanvasSettings {
  blur: number;
  ratio: number;
}

class Coords {
  x: number | null;
  y: number | null;
  constructor(x?: number, y?: number) {
    this.x = x || null;
    this.y = y || null;
  }
}

interface RippleProps {
  position: { x: number; y: number };
  circleSize: number;
  maxSize: number;
  opacity: number;
  ctx: CanvasRenderingContext2D;
  strokeColor: string;
  animationSpeed: number;
  opacityStep: number;
}

class Ripple {
  position: Coords;
  circleSize: number;
  maxSize: number;
  opacity: number;
  ctx: CanvasRenderingContext2D;
  strokeColor: string;
  animationSpeed: number;
  opacityStep: number;

  constructor(
    x: number,
    y: number,
    circleSize: number,
    ctx: CanvasRenderingContext2D,
    rippleSettings: RippleSettings
  ) {
    this.position = new Coords(x, y);
    this.circleSize = circleSize;
    this.maxSize = rippleSettings.maxSize;
    this.opacity = 1;
    this.ctx = ctx;
    this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;

    this.animationSpeed = rippleSettings.animationSpeed;
    this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
  }

  update(rippleSettings: RippleSettings) {
    this.circleSize = this.circleSize + this.animationSpeed;
    this.opacity = this.opacity - this.opacityStep;
    this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;
  }

  draw() {
    if (this.position.x === null || this.position.y === null) return;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.arc(this.position.x, this.position.y, this.circleSize, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const rippleSettings: RippleSettings = {
    maxSize: 100,
    animationSpeed: 5,
    strokeColor: [148, 217, 255],
  };

  const canvasSettings: CanvasSettings = {
    blur: 8,
    ratio: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ripples = ripplesRef.current;

    const updateCanvasSize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      canvas.width = width * canvasSettings.ratio;
      canvas.height = height * canvasSettings.ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateCanvasSize();

    canvas.style.filter = `blur(${canvasSettings.blur}px)`;

    // Set line width for better visibility (scaled by ratio)
    ctx.lineWidth = 2 * canvasSettings.ratio;

    const handleMouseMove = (e: MouseEvent) => {
      // Multiply coordinates by ratio to match canvas size
      const x = e.clientX * canvasSettings.ratio;
      const y = e.clientY * canvasSettings.ratio;
      ripples.unshift(new Ripple(x, y, 2, ctx, rippleSettings));
    };

    const animation = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const length = ripples.length;
      for (let i = length - 1; i >= 0; i -= 1) {
        const r = ripples[i];
        if (!r) continue;

        r.update(rippleSettings);
        r.draw();

        if (r.opacity <= 0) {
          ripples.splice(i, 1);
        }
      }
      animationFrameRef.current = requestAnimationFrame(animation);
    };

    // Start animation loop
    animation();
    
    // Attach event listeners - use window for better compatibility
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none', // Allow clicks to pass through to content
      }}
    />
  );
}

