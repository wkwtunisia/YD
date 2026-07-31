import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

function DateReveal({ onReveal }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    // Reduce DPR for lower resolution (0.7 instead of 1)
    const dpr = Math.min(window.devicePixelRatio || 1, 0.7);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Fond doré
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.5, "#f9d976");
    grad.addColorStop(1, "#b8860b");
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 12;
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 0;

    // Texture (fewer lines)
    for (let i = 0; i < w; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 15, h);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Texte
    const fontSize = Math.min(w, h) * 0.16;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `bold ${fontSize}px 'Montserrat', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GRATTEZ ICI", w / 2, h / 2 - fontSize * 0.2);

    const subFontSize = Math.min(w, h) * 0.07;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = `${subFontSize}px 'Montserrat', sans-serif`;
    ctx.fillText("♡ pour voir la date ♡", w / 2, h / 2 + fontSize * 0.3);

    const scratch = (x, y) => {
      if (revealed) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      // Smaller brush radius to reduce painting overhead
      const radius = Math.min(w, h) * 0.08;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparent++;
      }
      const percentage = transparent / (data.length / 4);
      if (percentage > 0.25) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
        setRevealed(true);
        setDateVisible(true);
        confetti({
          particleCount: 30,
          spread: 30,
          origin: { y: 0.5, x: 0.5 },
          colors: ["#f9d976", "#e74c3c", "#f39c12", "#fff"],
        });
        setTimeout(() => {
          if (typeof onReveal === "function") {
            onReveal();
          }
        }, 2500);
      }
    };

    // Throttled event handlers
    let throttleTimer = null;
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX == null) return null;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleStart = (e) => {
      e.preventDefault?.();
      const pos = getPos(e);
      if (pos) {
        isDrawingRef.current = true;
        scratch(pos.x, pos.y);
      }
    };

    const handleMove = (e) => {
      e.preventDefault?.();
      if (!isDrawingRef.current) return;
      if (throttleTimer) return;
      throttleTimer = requestAnimationFrame(() => {
        const pos = getPos(e);
        if (pos) scratch(pos.x, pos.y);
        throttleTimer = null;
      });
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleEnd, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
      if (throttleTimer) cancelAnimationFrame(throttleTimer);
    };
  }, [onReveal, revealed]);

  return (
    <div
      className="date-reveal-wrapper"
      style={{
        width: "320px",
        height: "160px",
        position: "relative",
        margin: "0 auto",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(212,175,55,0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(145deg, #d4af37, #f9d976)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
          opacity: dateVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
          background: "rgba(0,0,0,0.15)",
          backdropFilter: "blur(2px)",
          borderRadius: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            background: "linear-gradient(135deg, #fff, #f9d976, #f39c12)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(212,175,55,0.6)",
            letterSpacing: "2px",
            lineHeight: 1.2,
          }}
        >
          30 janvier 2027
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
            letterSpacing: "4px",
            marginTop: "4px",
            textTransform: "uppercase",
          }}
        >
          Notre Mariage
        </span>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            borderRadius: "16px",
            touchAction: "none",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
}

export default DateReveal;
