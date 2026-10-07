'use client';

import { useEffect, useRef } from 'react';

/** Decorative, viewport-sized canvas: only draws while the mouse is active. */
export default function PointerBackground({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || paused) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = matchMedia('(hover: hover) and (pointer: fine)');
    let width = 0, height = 0, frame = 0, lastMove = 0, previous = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0, opacity = 0;
    let active = false;
    const clear = () => context.clearRect(0, 0, width, height);
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      active = false;
      opacity = 0;
      clear();
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };
    const draw = (now: number) => {
      const dt = Math.min(now - previous, 50);
      previous = now;
      const follow = 1 - Math.exp(-dt / 100);
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      const visible = active && now - lastMove < 1200;
      opacity += ((visible ? 1 : 0) - opacity) * (1 - Math.exp(-dt / 240));
      clear();
      const glow = context.createRadialGradient(x, y, 0, x, y, 270);
      glow.addColorStop(0, `rgba(174, 224, 102, ${opacity * .22})`);
      glow.addColorStop(.45, `rgba(173, 223, 156, ${opacity * .10})`);
      glow.addColorStop(1, 'rgba(173, 223, 156, 0)');
      context.fillStyle = glow;
      context.fillRect(x - 270, y - 270, 540, 540);
      const nodes: { x: number; y: number; strength: number }[] = [];
      // Stable staggered points only within the small area around the cursor.
      for (let row = Math.floor((y - 210) / 64); row <= Math.ceil((y + 210) / 64); row++) {
        for (let col = Math.floor((x - 210) / 72); col <= Math.ceil((x + 210) / 72); col++) {
          const px = col * 72 + Math.sin(row * 13 + col * 7) * 20;
          const py = row * 64 + Math.cos(col * 11 + row * 3) * 18;
          const strength = Math.max(0, 1 - Math.hypot(px - x, py - y) / 210);
          if (!strength) continue;
          nodes.push({ x: px + (x - px) * strength * .07, y: py + (y - py) * strength * .07, strength });
        }
      }
      nodes.forEach((node, index) => {
        for (const other of nodes.slice(index + 1)) {
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > 94) continue;
          context.strokeStyle = `rgba(94, 139, 69, ${opacity * Math.min(node.strength, other.strength) * .25})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
        context.fillStyle = `rgba(94, 139, 69, ${opacity * node.strength * .6})`;
        context.beginPath();
        context.arc(node.x, node.y, 1.2 + node.strength, 0, Math.PI * 2);
        context.fill();
      });
      if (visible || opacity > .005) frame = requestAnimationFrame(draw);
      else { frame = 0; clear(); }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || motion.matches || !mouse.matches || document.hidden) return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) { x = targetX; y = targetY; }
      active = true;
      lastMove = performance.now();
      if (!frame) { previous = lastMove; frame = requestAnimationFrame(draw); }
    };
    const leave = () => { active = false; };
    resize();
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('resize', resize);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', stop);
    motion.addEventListener('change', stop);
    mouse.addEventListener('change', stop);
    return () => {
      stop();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', stop);
      document.removeEventListener('visibilitychange', stop);
      motion.removeEventListener('change', stop);
      mouse.removeEventListener('change', stop);
    };
  }, [paused]);
  return <canvas ref={canvasRef} className="pointer-background" aria-hidden="true" />;
}
