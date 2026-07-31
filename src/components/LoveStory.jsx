import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

function LoveStory() {
  const { t } = useApp();

  // Les étapes sont traduites
  const steps = [
    { date: "2025", label: t("storyMeet"), icon: "💕" },
    { date: "2026", label: t("storyEngaged"), icon: "💍" },
    { date: "2027", label: t("storyWedding"), icon: "🎊" },
    { date: "2027", label: t("storyHoneymoon"), icon: "🌴" },
  ];

  return (
    <motion.div
      className="love-story"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        marginTop: "2rem",
        padding: "1.5rem 2rem",
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
      <h3
        className="love-story-title"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "2rem",
          color: "#f9d976",
          marginBottom: "1.5rem",
        }}
      >
        {t("storyTitle")}
      </h3>
      <div className="timeline">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="timeline-item"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.2rem",
              padding: "0.8rem 1.2rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "transform 0.3s",
            }}
            whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.06)" }}
          >
            <span style={{ fontSize: "2rem", minWidth: "3rem" }}>
              {step.icon}
            </span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#f9d976",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                {step.date}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#fff",
                  fontSize: "0.9rem",
                }}
              >
                {step.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default LoveStory;
