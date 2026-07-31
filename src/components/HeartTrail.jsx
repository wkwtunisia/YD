import React, { useEffect, useRef } from "react";

function HeartTrail() {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
  let throttleTimer = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const hearts = [];
    const MAX_HEARTS = 15; // reduced from 30

    const addHeart = (x, y) => {
      hearts.push({
        x,
        y,
        size: Math.random() * 10 + 5,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2 - 0.5,
        life: 1,
        decay: 0.01 + Math.random() * 0.015,
        color: `hsla(${340 + Math.random() * 30}, 80%, 65%, 1)`,
      });
      if (hearts.length > MAX_HEARTS) hearts.shift();
    };

    const update = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.x += h.speedX;
        h.y += h.speedY;
        h.life -= h.decay;
        if (h.life <= 0) {
          hearts.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = h.life;
        ctx.translate(h.x, h.y);
        ctx.scale(h.size / 12, h.size / 12);
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(-6, -9, -12, 0, 0, 7);
        ctx.bezierCurveTo(12, 0, 6, -9, 0, -3);
        ctx.fillStyle = h.color;
        ctx.shadowColor = "rgba(255, 100, 100, 0.3)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(update);
    };

    const handleMove = (e) => {
      if (throttleTimer) return;
      throttleTimer = requestAnimationFrame(() => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (x !== undefined && y !== undefined) {
          addHeart(x, y);
        }
        throttleTimer = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    update();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", resize);
      if (throttleTimer) cancelAnimationFrame(throttleTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

export default HeartTrail;
