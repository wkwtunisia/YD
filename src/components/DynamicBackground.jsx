import React, { useEffect, useRef } from "react";

function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let frameCount = 0;

    const resize = () => {
      // Half resolution for performance
      w = canvas.width = window.innerWidth * 0.6;
      h = canvas.height = window.innerHeight * 0.6;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };
    window.addEventListener("resize", resize);
    resize();

    let hue = 0;
    const animate = () => {
      frameCount++;
      // Skip every other frame
      if (frameCount % 2 === 0) {
        hue = (hue + 0.1) % 360;
        const gradient = ctx.createRadialGradient(
          w * 0.5,
          h * 0.5,
          0,
          w * 0.5,
          h * 0.5,
          w * 0.7
        );
        gradient.addColorStop(0, `hsl(${hue}, 70%, 15%)`);
        gradient.addColorStop(0.5, `hsl(${(hue + 30) % 360}, 60%, 10%)`);
        gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 50%, 5%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}

export default DynamicBackground;
