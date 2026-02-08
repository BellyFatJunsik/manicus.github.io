import { useEffect, useRef, useState } from 'react';

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  }));
  const [isHovering, setIsHovering] = useState(false); // 흰 캔버스 안에서만 brush 표시
  const [cursorHue, setCursorHue] = useState(0);

  useEffect(() => {
    const heroSection = canvasRef.current?.parentElement;
    const canvas = canvasRef.current;
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0, active: true }; // 처음부터 활성, 위치는 resize에서 중앙으로
    let prevMouse = { x: 0, y: 0 };
    let hue = 0;
    let animationFrameId;
    let lastParticleTime = 0;
    const PARTICLE_INTERVAL = 30;

    const resize = () => {
      const rect = heroSection.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // 처음부터 중앙에서 효과: 마우스 위치를 중앙으로
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      mouse.active = true;
      const centerClientX = rect.left + rect.width / 2;
      const centerClientY = rect.top + rect.height / 2;
      setCursorPosition({ x: centerClientX, y: centerClientY });
    };

    window.addEventListener('resize', resize);
    resize();

    const MAX_PARTICLES = 200; // 최대 파티클 개수 제한

    class PaintDrop {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.001 + 0.001; // 더 오래 남도록 decay 감소
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

    const handleMouseEnter = () => {
      // 마우스를 가져가면 깨끗한 화면에서 다시 시작
      particles = [];
      if (canvas.width && canvas.height) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
      lastMouseUpdate = now;

      const rect = heroSection.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      prevMouse.x = newX;
      prevMouse.y = newY;
      mouse.x = newX;
      mouse.y = newY;
      mouse.active = true;
      
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      // 히어로 영역을 벗어나면: 파티클은 중앙에서 계속, brush-cursor는 숨김
      const rect = heroSection.getBoundingClientRect();
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      mouse.active = true;
      setCursorPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setIsHovering(false);
    };

    const handleDoubleClick = () => {
      // 더블클릭 시 모든 파티클 제거
      particles = [];
      // 캔버스도 즉시 지우기
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    heroSection.addEventListener('mouseenter', handleMouseEnter);
    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);
    heroSection.addEventListener('dblclick', handleDoubleClick);

    function animate() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // 페이드 아웃 속도 감소
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighten';

      // 마우스가 활성화되어 있고, 1초에 10개씩 파티클 생성 (100ms마다 1개)
      if (mouse.active && particles.length < MAX_PARTICLES) {
        const now = Date.now();
        if (now - lastParticleTime >= PARTICLE_INTERVAL) {
          // 무지개 색상: 시간과 마우스 위치를 조합하여 0~360도 범위로 순환
          const timeHue = (Date.now() * 0.1) % 360;
          const mouseHue = ((mouse.x + mouse.y) * 0.5) % 360;
          hue = (timeHue + mouseHue * 0.3) % 360;
          setCursorHue(hue); // 커서 색상도 업데이트
          
          // 1초에 10개 = 100ms마다 1개씩 생성
          particles.push(new PaintDrop(mouse.x, mouse.y, hue));
          lastParticleTime = now;
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
      heroSection.removeEventListener('mouseenter', handleMouseEnter);
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
      heroSection.removeEventListener('dblclick', handleDoubleClick);
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
      
    </>
  );
};

export default HeroCanvas;
