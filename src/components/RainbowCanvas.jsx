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
    let prevMouse = { x: -100, y: -100 }; // 이전 마우스 위치
    let hue = 0;
    let animationFrameId;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const MAX_PARTICLES = 400; // 최대 파티클 개수 제한 (두 번째 캔버스는 조금 더 적게)

    class PaintDrop {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 35; // 더 큰 크기 (10-25 → 15-35)
        this.color = color;
        this.vx = (Math.random() - 0.5) * 1.5; // 더 빠른 속도 (1.5 → 2.5)
        this.vy = (Math.random() - 0.5) * 2.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.0008 + 0.0015; // 더 오래 남도록 (decay 감소)
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.8; // 더 빠르게 커지도록 (0.6 → 0.8)
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
        // 더 화사하게: 채도 85%, 밝기 70%, 투명도 증가
        grad.addColorStop(0, `hsla(${this.color}, 85%, 70%, ${this.life * 0.6})`);
        grad.addColorStop(0.5, `hsla(${this.color}, 80%, 65%, ${this.life * 0.3})`);
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
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      // 마우스가 실제로 움직였는지 확인 (최소 1px 이상 이동)
      const moved = Math.abs(newX - prevMouse.x) > 1 || Math.abs(newY - prevMouse.y) > 1;
      
      if (moved && particles.length < MAX_PARTICLES) {
        // 무지개 색상: 시간과 마우스 위치를 조합하여 0~360도 범위로 순환
        const timeHue = (Date.now() * 0.1) % 360;
        const mouseHue = ((newX + newY) * 0.5) % 360;
        hue = (timeHue + mouseHue * 0.3) % 360;
        
        // 더 화사하게: 파티클을 더 많이 생성 (2-3개)
        const addCount = particles.length > MAX_PARTICLES * 0.8 ? 2 : 3;
        for (let i = 0; i < addCount; i++) {
          particles.push(new PaintDrop(newX, newY, hue));
        }
      }
      
      // 현재 위치를 이전 위치로 저장
      prevMouse.x = newX;
      prevMouse.y = newY;
      mouse.x = newX;
      mouse.y = newY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleDoubleClick = () => {
      // 더블클릭 시 모든 파티클 제거
      particles = [];
      // 캔버스도 즉시 지우기
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('dblclick', handleDoubleClick);

    function animate() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)'; // 더 오래 남도록 페이드 아웃 속도 감소
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighten';

      // 파티클은 handleMouseMove에서만 생성됨 (마우스가 움직일 때만)

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
      container.removeEventListener('dblclick', handleDoubleClick);
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
