import React, { useEffect, useRef } from "react";

function HeartsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;
    let hearts = [];
    const MAX_HEARTS = 40; // reduced from 80

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Heart {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h + h;
        this.size = Math.random() * 14 + 6;
        this.speed = Math.random() * 1.2 + 0.3;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.swing = Math.random() * 0.015 + 0.005;
        this.angle = Math.random() * Math.PI * 2;
        this.color = `hsla(${340 + Math.random() * 20}, 80%, 60%, ${
          this.opacity
        })`;
      }
      update() {
        this.y -= this.speed;
        this.angle += this.swing;
        this.x += Math.sin(this.angle) * 0.4;
        if (this.y < -50) {
          this.reset();
          this.y = h + 50;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.size / 16, this.size / 16);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(-10, -15, -20, 0, 0, 12);
        ctx.bezierCurveTo(20, 0, 10, -15, 0, -5);
        ctx.fillStyle = this.color;
        ctx.shadowColor = "rgba(255, 100, 100, 0.2)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < MAX_HEARTS; i++) {
      hearts.push(new Heart());
    }

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      hearts.forEach((heart) => {
        heart.update();
        heart.draw();
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
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default HeartsBackground;
