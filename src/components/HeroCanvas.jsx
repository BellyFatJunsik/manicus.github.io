import { useEffect, useRef, useState } from 'react';

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorHue, setCursorHue] = useState(0);

  useEffect(() => {
    const heroSection = canvasRef.current?.parentElement;
    const canvas = canvasRef.current;
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -100, y: -100, active: false };
    let hue = 0;
    let animationFrameId;

    const resize = () => {
      const rect = heroSection.getBoundingClientRect();
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
        this.decay = Math.random() * 0.001 + 0.003; // 더 오래 남도록 decay 감소
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
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      
      // 커서 위치 업데이트
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      setIsHovering(false);
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    function animate() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // 페이드 아웃 속도 감소
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighten';

      if (mouse.active) {
        // 무지개 색상: 시간과 마우스 위치를 조합하여 0~360도 범위로 순환
        const timeHue = (Date.now() * 0.1) % 360;
        const mouseHue = ((mouse.x + mouse.y) * 0.5) % 360;
        hue = (timeHue + mouseHue * 0.3) % 360;
        setCursorHue(hue); // 커서 색상도 업데이트
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
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="heroCanvas"
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
      <div
        ref={cursorRef}
        className="brush-cursor"
        style={{
          position: 'fixed',
          left: cursorPosition.x,
          top: cursorPosition.y,
          pointerEvents: 'none',
          zIndex: 1000,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: `hsl(${cursorHue}, 70%, 60%)`,
          border: '2px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      />
    </>
  );
};

export default HeroCanvas;
