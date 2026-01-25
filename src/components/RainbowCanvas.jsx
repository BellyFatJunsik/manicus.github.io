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

    const handleMouseMove = (e) => {
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

      if (mouse.active) {
        // 무지개 색상: 시간과 마우스 위치를 조합하여 0~360도 범위로 순환
        const timeHue = (Date.now() * 0.1) % 360;
        const mouseHue = ((mouse.x + mouse.y) * 0.5) % 360;
        hue = (timeHue + mouseHue * 0.3) % 360;
        for (let i = 0; i < 2; i++) {
          particles.push(new PaintDrop(mouse.x, mouse.y, hue));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
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
