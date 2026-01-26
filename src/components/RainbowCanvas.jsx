import { useEffect, useRef } from 'react';

const RainbowCanvas = ({ containerRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef?.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -100, y: -100, active: false };
    let hue = 0;
    let animationFrameId;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const MAX_PARTICLES = 100; // 최대 파티클 개수 제한 (두 번째 캔버스는 조금 더 적게)

    class PaintDrop {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.001 + 0.001;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.6;
        this.life -= this.decay;
      }

      isDead() {
        return this.life <= 0 || 
               this.x < -50 || this.x > canvas.width + 50 || 
               this.y < -50 || this.y > canvas.height + 50;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `hsla(${this.color}, 70%, 60%, ${this.life * 0.4})`);
        grad.addColorStop(1, `hsla(${this.color}, 70%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let lastMouseUpdate = 0;
    const MOUSE_THROTTLE = 16; // ~60fps로 제한

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
      lastMouseUpdate = now;

      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    function animate() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighten';

      if (mouse.active && particles.length < MAX_PARTICLES) {
        // 무지개 색상: 시간과 마우스 위치를 조합하여 0~360도 범위로 순환
        const timeHue = (Date.now() * 0.1) % 360;
        const mouseHue = ((mouse.x + mouse.y) * 0.5) % 360;
        hue = (timeHue + mouseHue * 0.3) % 360;
        
        // 파티클 개수가 최대치에 가까우면 1개만 추가, 아니면 2개
        const addCount = particles.length > MAX_PARTICLES * 0.8 ? 1 : 2;
        for (let i = 0; i < addCount; i++) {
          particles.push(new PaintDrop(mouse.x, mouse.y, hue));
        }
      }

      // 더 효율적인 파티클 제거: 화면 밖으로 나간 파티클도 제거
      // 파티클이 너무 많으면 오래된 것부터 제거
      if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(-MAX_PARTICLES);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.isDead()) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default RainbowCanvas;
