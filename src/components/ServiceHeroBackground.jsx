import { useEffect, useRef } from 'react';

/**
 * 여러 레이어의 점들이 천천히 원 궤도로 움직이고,
 * 위·아래 그라데이션으로 끊어지지 않게 블렌딩
 */
const ServiceHeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    let animationId;
    let width = 0;
    let height = 0;
    const startTime = Date.now();
    let mouse = { x: null, y: null };
    const MOUSE_INFLUENCE_RADIUS = 320;
    const MOUSE_ATTRACT_STRENGTH = 85;
    const EVENT_HORIZON = 18;

    // 영역 2배: 반지름 배율을 2배로 확장
    const LAYERS = [
      { count: 220, maxR: 0.76, minR: 0.16, sizeMin: 0.4, sizeMax: 0.9, alphaMin: 0.12, alphaMax: 0.35, speedMin: 0.04, speedMax: 0.12 },
      { count: 140, maxR: 0.84, minR: 0.24, sizeMin: 0.7, sizeMax: 1.5, alphaMin: 0.25, alphaMax: 0.5, speedMin: 0.07, speedMax: 0.18 },
      { count: 80, maxR: 0.9, minR: 0.4, sizeMin: 1.2, sizeMax: 2.2, alphaMin: 0.35, alphaMax: 0.65, speedMin: 0.1, speedMax: 0.22 },
      { count: 40, maxR: 0.96, minR: 0.5, sizeMin: 1.5, sizeMax: 2.8, alphaMin: 0.4, alphaMax: 0.7, speedMin: 0.12, speedMax: 0.2 },
    ];

    let dots = [];

    const initDots = (w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h);
      dots = [];

      LAYERS.forEach((layer) => {
        const maxR = base * layer.maxR;
        const minR = base * layer.minR;
        for (let i = 0; i < layer.count; i++) {
          const radius = minR + Math.random() * (maxR - minR);
          const angle = Math.random() * Math.PI * 2;
          const size = layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin);
          const alpha = layer.alphaMin + Math.random() * (layer.alphaMax - layer.alphaMin);
          const hasGlow = Math.random() < 0.15;
          // 좌우·사방 조금씩 흔들림 (빙글빙글 X)
          const driftAmount = 4 + Math.random() * 14;
          const phaseX = Math.random() * Math.PI * 2;
          const phaseY = Math.random() * Math.PI * 2;
          const speedX = 0.3 + Math.random() * 0.8;
          const speedY = 0.3 + Math.random() * 0.8;
          dots.push({
            radius, angle, size, alpha, hasGlow, driftAmount, phaseX, phaseY, speedX, speedY,
            mouseDx: 0, mouseDy: 0,
          });
        }
      });
    };

    const resize = () => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots(width, height);
    };

    const draw = () => {
      const w = width || canvas.parentElement?.offsetWidth || 800;
      const h = height || canvas.parentElement?.offsetHeight || 320;
      const cx = w / 2;
      const cy = h / 2;
      const t = (Date.now() - startTime) * 0.001;

      // 상 #242424 → 중 #000000 → 하 #242424
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#242424');
      bgGrad.addColorStop(0.5, '#000000');
      bgGrad.addColorStop(1, '#242424');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      for (const d of dots) {
        const baseX = cx + d.radius * Math.cos(d.angle);
        const baseY = cy + d.radius * Math.sin(d.angle);
        const dx = d.driftAmount * Math.sin(t * d.speedX + d.phaseX);
        const dy = d.driftAmount * Math.cos(t * d.speedY + d.phaseY);
        const dotX = baseX + dx + d.mouseDx;
        const dotY = baseY + dy + d.mouseDy;
        let targetDx = 0, targetDy = 0;
        if (mouse.x != null && mouse.y != null) {
          const toMouseX = mouse.x - dotX;
          const toMouseY = mouse.y - dotY;
          const dist = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);
          if (dist <= EVENT_HORIZON) {
            targetDx = mouse.x - baseX - dx;
            targetDy = mouse.y - baseY - dy;
          } else if (dist < MOUSE_INFLUENCE_RADIUS) {
            const strength = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_ATTRACT_STRENGTH;
            const nx = toMouseX / dist;
            const ny = toMouseY / dist;
            targetDx = nx * strength;
            targetDy = ny * strength;
          }
        }
        const LERP = 0.09;
        if (mouse.x != null && mouse.y != null) {
          const toMouseX = mouse.x - (baseX + dx + d.mouseDx);
          const toMouseY = mouse.y - (baseY + dy + d.mouseDy);
          const dist = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);
          if (dist <= EVENT_HORIZON) {
            d.mouseDx = targetDx;
            d.mouseDy = targetDy;
          } else {
            d.mouseDx += (targetDx - d.mouseDx) * LERP;
            d.mouseDy += (targetDy - d.mouseDy) * LERP;
          }
        } else {
          d.mouseDx += (targetDx - d.mouseDx) * LERP;
          d.mouseDy += (targetDy - d.mouseDy) * LERP;
        }
        const x = baseX + dx + d.mouseDx;
        const y = baseY + dy + d.mouseDy;

        if (d.hasGlow) {
          const r2 = d.size * 3;
          const g = ctx.createRadialGradient(x, y, 0, x, y, r2);
          g.addColorStop(0, `rgba(255, 255, 255, ${d.alpha * 0.5})`);
          g.addColorStop(0.5, `rgba(200, 220, 255, ${d.alpha * 0.15})`);
          g.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, r2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
        ctx.fill();
      }

      // 상단·하단 연결감: 위아래 섹션과 자연스럽게 이어지도록 #242424로 페이드
      const edgeH = h * 0.22;
      const topEdge = ctx.createLinearGradient(0, 0, 0, edgeH);
      topEdge.addColorStop(0, 'rgba(24, 24, 24, 0.8)');
      topEdge.addColorStop(0.6, 'rgba(36, 36, 36, 0.1)');
      topEdge.addColorStop(1, 'rgba(36, 36, 36, 0)');
      ctx.fillStyle = topEdge;
      ctx.fillRect(0, 0, w, edgeH);

      const bottomEdge = ctx.createLinearGradient(0, h - edgeH, 0, h);
      bottomEdge.addColorStop(0, 'rgba(36, 36, 36, 0)');
      bottomEdge.addColorStop(0.6, 'rgba(36, 36, 36, 0.1)');
      bottomEdge.addColorStop(1, 'rgba(24, 24, 24, 0.8)');
      ctx.fillStyle = bottomEdge;
      ctx.fillRect(0, h - edgeH, w, edgeH);

      animationId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resize();
    window.addEventListener('resize', resize);
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="sv-hero-bg-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ServiceHeroBackground;
