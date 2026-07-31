import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

function PhotoSlideshow({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const { t } = useApp();

  // Sécurité : si photos n'est pas un tableau ou vide, on n'affiche rien
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  useEffect(() => {
    if (isPlaying && photos.length > 0) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, isPlaying, photos]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div
      className="slideshow-container"
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.06)",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}
    >
      <h3 className="album-title" style={{ marginBottom: "1rem" }}>
        {t("slideshowTitle") || "📸 Nos Souvenirs en diaporama"}
      </h3>
      <div
        className="slideshow-viewer"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "75%",
          overflow: "hidden",
          borderRadius: "16px",
          background: "#1a0a0a",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={photos[currentIndex].src}
            alt={photos[currentIndex].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AnimatePresence>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            background: "rgba(0,0,0,0.5)",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            backdropFilter: "blur(4px)",
          }}
        >
          <button
            onClick={togglePlay}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <span
            style={{
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.8rem",
            }}
          >
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PhotoSlideshow;
