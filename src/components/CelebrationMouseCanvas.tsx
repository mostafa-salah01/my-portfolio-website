import React, { useEffect, useRef } from 'react';

// ============================================================================
// Interactive Celebration Mouse Canvas
// - Particle sparkles trail following cursor speed
// - Explosive fireworks burst on every click with 35-45 particles & gravity
// - Glowing shockwave ring expanding from click center
// - Object Pool architecture: capped at 250 particles, zero GC pauses
// - Auto-stops completely when idle (0% CPU load)
// - Pointer-events: none (zero obstruction to buttons, links, or text inputs)
// ============================================================================

interface CelebrationMouseCanvasProps {
  enabled?: boolean;
}

export const CelebrationMouseCanvas: React.FC<CelebrationMouseCanvasProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Palette: Gold, Orange, Coral Red, Pink, Lime, Cyan, Lavender, White
    const COLORS = [
      '#FFD700', // Gold
      '#FFA500', // Vibrant Orange
      '#EF4444', // Crimson / Coral
      '#F43F5E', // Rose Pink
      '#10B981', // Lime / Emerald
      '#38BDF8', // Sky Blue
      '#A855F7', // Violet
      '#FFFFFF'  // Pure White
    ];

    const MAX_PARTICLES = 250;
    const BURST_COUNT_DESKTOP = 38;
    const BURST_COUNT_TOUCH = 18;
    const GRAVITY = 0.08;
    const FRICTION = 0.982;

    let dpr = 1;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Object Pool for Particles
    class Particle {
      active = false;
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 2;
      color = '#FFF';
      alpha = 1;
      decay = 0.02;
      shape: 'dot' | 'star' = 'dot';
      rotation = 0;
      vRot = 0;
      gravity = GRAVITY;

      reset() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 2;
        this.color = '#FFF';
        this.alpha = 1;
        this.decay = 0.02;
        this.shape = 'dot';
        this.rotation = 0;
        this.vRot = 0;
        this.gravity = GRAVITY;
      }
    }

    interface ShockwaveRing {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }

    const particlePool = Array.from({ length: MAX_PARTICLES }, () => new Particle());
    const rings: ShockwaveRing[] = [];

    const getParticle = (): Particle | null => {
      for (let i = 0; i < particlePool.length; i++) {
        if (!particlePool[i].active) return particlePool[i];
      }
      return null;
    };

    let animationFrameId: number | null = null;
    let isRunning = false;

    // Draw 4-pointed sparkle star
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fill();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let activeCount = 0;

      // 1. Render and update shockwave rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 2.8;
        ring.alpha -= 0.045;

        if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
          rings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = Math.max(0, ring.alpha);
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render and update particles
      for (let i = 0; i < particlePool.length; i++) {
        const p = particlePool[i];
        if (!p.active) continue;

        activeCount++;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.x < -20 || p.x > width + 20 || p.y > height + 20) {
          p.reset();
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 7;

        if (p.shape === 'star') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawStar(ctx, 0, 0, 4, p.size * 1.6, p.size * 0.45);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Auto-stop when no active items
      if (activeCount > 0 || rings.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animationFrameId = null;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Emit trail sparks on mouse move
    const spawnTrail = (x: number, y: number, speed: number) => {
      if (!enabled) return;
      const count = Math.min(Math.floor(speed * 0.16) + 1, 3);

      for (let i = 0; i < count; i++) {
        const p = getParticle();
        if (!p) break;

        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const angle = Math.random() * Math.PI * 2;
        const velocity = (Math.random() * 2 + 1) * Math.min(speed * 0.12, 2.6);

        p.active = true;
        p.x = x;
        p.y = y;
        p.vx = Math.cos(angle) * velocity;
        p.vy = Math.sin(angle) * velocity;
        p.size = Math.random() * 3 + 1.8;
        p.color = color;
        p.alpha = 1;
        p.decay = 1 / (Math.random() * 20 + 26);
        p.shape = Math.random() > 0.4 ? 'star' : 'dot';
        p.rotation = Math.random() * Math.PI;
        p.vRot = (Math.random() - 0.5) * 0.16;
        p.gravity = 0.02;
      }
      startLoop();
    };

    // Emit explosion on click
    const spawnExplosion = (x: number, y: number, isTouch = false) => {
      if (!enabled) return;

      const count = isTouch ? BURST_COUNT_TOUCH : BURST_COUNT_DESKTOP;
      const ringColor = COLORS[Math.floor(Math.random() * COLORS.length)];

      rings.push({
        x,
        y,
        radius: 4,
        maxRadius: isTouch ? 45 : 70,
        alpha: 0.85,
        color: ringColor
      });

      for (let i = 0; i < count; i++) {
        const p = getParticle();
        if (!p) break;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2.2;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        p.active = true;
        p.x = x;
        p.y = y;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.size = Math.random() * 4.2 + 2;
        p.color = color;
        p.alpha = 1;
        p.decay = 1 / (Math.random() * 25 + 55);
        p.shape = Math.random() > 0.5 ? 'star' : 'dot';
        p.rotation = Math.random() * Math.PI * 2;
        p.vRot = (Math.random() - 0.5) * 0.22;
        p.gravity = GRAVITY;
      }

      startLoop();
    };

    // Mouse move listener
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Do not emit drag trail on touch to allow clean scrolling

      const now = performance.now();
      const dt = now - lastTime || 16;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.hypot(dx, dy) / (dt / 16);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      if (speed > 1.2 && Math.random() < 0.85) {
        spawnTrail(e.clientX, e.clientY, speed);
      }
    };

    // Click / Pointerdown listener
    const handlePointerDown = (e: PointerEvent) => {
      // Safeguard: ignore if clicking inside text inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('input') ||
          target.closest('textarea'))
      ) {
        return;
      }

      const isTouch = e.pointerType === 'touch';
      spawnExplosion(e.clientX, e.clientY, isTouch);
    };

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        isRunning = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[999999]"
      aria-hidden="true"
    />
  );
};
