'use client';

import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

export default function BubblesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = 60;
    const minRadius = 5;
    const maxRadius = 20;
    const speed = 0.01;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Initialize bubbles
    const bubbles: Bubble[] = [];
    const x = width / particles;
    for (let i = 0; i < particles; i++) {
      bubbles.push({
        x: i * x,
        y: height * Math.random(),
        r: minRadius + Math.random() * (maxRadius - minRadius),
        speed: 10 * Math.random(),
        alpha: 0,
      });
    }
    bubblesRef.current = bubbles;

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    updateCanvasSize();

    const bubble = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const bubbles = bubblesRef.current;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        
        b.alpha = 0.5 * (b.y / height);
        b.speed += speed;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        ctx.stroke();
        ctx.fillStyle = `hsla(203, 75%, 69%, ${b.alpha})`;
        ctx.fill();
        
        b.y -= b.speed;
        if (b.y < 0) {
          b.y = height;
          b.speed = Math.random() * 5;
        }
      }
    };

    const draw = () => {
      bubble();
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recalculate bubble positions based on new width
      const x = width / particles;
      const bubbles = bubblesRef.current;
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].x = i * x;
      }
    };

    // Start animation
    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bubbles"
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

