import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const Fireworks = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationId = useRef(null);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.current.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    if (particles.current.length > 0) {
      animationId.current = requestAnimationFrame(animate);
    } else {
      animationId.current = null;
      ctx.clearRect(0, 0, w, h);
    }
  };

  useImperativeHandle(ref, () => ({
    launch: (x, y) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = x || rect.width / 2;
      const cy = y || rect.height / 2;
      // Reduce particle count: 50-90 instead of 80-140
      const count = 50 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        const size = 2 + Math.random() * 4;
        const hue = Math.random() * 360;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.014,
          size,
          color: `hsl(${hue}, 100%, 60%)`,
        });
      }
      if (!animationId.current) animate();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
});

export default Fireworks;
