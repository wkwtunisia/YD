import React, { useEffect, useRef } from "react";

function Sparkles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    const particles = [];
    const MAX = 50;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    window.addEventListener("resize", resize);
    resize();

    class Sparkle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.hue = 40 + Math.random() * 20; // gold-ish
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        if (
          this.life <= 0 ||
          this.x < 0 ||
          this.x > w ||
          this.y < 0 ||
          this.y > h
        ) {
          this.reset();
          this.life = this.maxLife;
        }
        this.currentOpacity = this.opacity * (this.life / this.maxLife);
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.currentOpacity;
        ctx.shadowColor = `hsl(${this.hue}, 80%, 70%)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 90%, 70%)`;
        ctx.fill();
        // Cross sparkle
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `hsla(${this.hue}, 80%, 80%, 0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size * 2, this.y);
        ctx.lineTo(this.x + this.size * 2, this.y);
        ctx.moveTo(this.x, this.y - this.size * 2);
        ctx.lineTo(this.x, this.y + this.size * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    for (let i = 0; i < MAX; i++) {
      particles.push(new Sparkle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export default Sparkles;
