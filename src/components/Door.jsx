import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateReveal from "./DateReveal";

function Door({ onDoorOpen }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleReveal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      // La musique est déclenchée par onDoorOpen dans App.jsx (via le setTimeout)
      const musicTimer = setTimeout(() => {
        if (onDoorOpen) onDoorOpen();
      }, 400);

      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 2800);

      return () => {
        clearTimeout(musicTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [open, onDoorOpen]);

  if (hidden) return null;

  return (
    <motion.div
      className="door-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 2.0, ease: "easeInOut", delay: open ? 0.6 : 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        overflow: "hidden",
        pointerEvents: open ? "none" : "all",
        background: "linear-gradient(145deg, #0a0a0a, #1a0a0a)",
        boxShadow: "inset 0 0 150px rgba(0,0,0,0.9)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Cadre en pierre */}
      <div
        style={{
          position: "absolute",
          top: "2%",
          left: "2%",
          width: "96%",
          height: "96%",
          border: "12px solid #5a4a3a",
          borderRadius: "20px",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.8)",
          background: "linear-gradient(145deg, #4a3a2a, #3a2a1a)",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #3a2a1a, #2a1a0a)",
            borderRadius: "12px",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Panneau gauche */}
          <motion.div
            className="door-panel left"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: open ? -75 : 0 }}
            transition={{
              duration: 2.2,
              ease: [0.23, 1, 0.32, 1],
              delay: open ? 0.3 : 0,
              type: "spring",
              damping: 14,
              stiffness: 70,
              mass: 1.5,
            }}
            style={{
              transformOrigin: "left center",
              flex: 1,
              height: "100%",
              background: "linear-gradient(135deg, #6b4a3a, #4a2a1a, #5a3a2a)",
              borderRight: "4px solid #d4af37",
              boxShadow:
                "inset -15px 0 40px rgba(0,0,0,0.7), 5px 0 30px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Texture bois */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.05) 0px,
                rgba(0,0,0,0.02) 20px,
                rgba(255,255,255,0.03) 40px,
                rgba(0,0,0,0.05) 60px
              )`,
                pointerEvents: "none",
              }}
            />
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <path
                d="M10,20 Q30,50 20,80 T40,150 T10,250"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M80,30 Q100,80 90,130 T120,200 T80,300"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M150,10 Q170,60 160,110 T190,180 T150,280"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Vitre */}
            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "15%",
                width: "70%",
                height: "25%",
                border: "3px solid #d4af37",
                borderRadius: "12px",
                background: "rgba(180, 200, 255, 0.15)",
                boxShadow:
                  "inset 0 0 30px rgba(255,255,200,0.1), 0 0 20px rgba(212,175,55,0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  left: "-20%",
                  width: "60%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transform: "rotate(25deg)",
                  animation: "shine 4s infinite",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "15%",
                width: "70%",
                height: "25%",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: "8px",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "38%",
                left: "10%",
                width: "80%",
                height: "50%",
                border: "2px solid rgba(212,175,55,0.1)",
                borderRadius: "8px",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
              }}
            />

            {/* Gonds */}
            <div
              style={{
                position: "absolute",
                top: "18%",
                left: "5px",
                width: "18px",
                height: "45px",
                background:
                  "linear-gradient(180deg, #b8860b, #d4af37, #b8860b)",
                borderRadius: "4px",
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "18%",
                left: "5px",
                width: "18px",
                height: "45px",
                background:
                  "linear-gradient(180deg, #b8860b, #d4af37, #b8860b)",
                borderRadius: "4px",
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
            />

            {/* Poignée */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: open ? -90 : 0 }}
              transition={{ duration: 0.8, delay: open ? 0.1 : 0 }}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #f9d976, #b8860b)",
                boxShadow:
                  "0 0 30px rgba(212, 175, 55, 0.7), inset 0 -5px 10px rgba(0,0,0,0.4)",
                border: "2px solid #f9d976",
                transform: "translateX(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "20px",
                  background: "#b8860b",
                  borderRadius: "3px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Panneau droit (symétrique) */}
          <motion.div
            className="door-panel right"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: open ? 75 : 0 }}
            transition={{
              duration: 2.2,
              ease: [0.23, 1, 0.32, 1],
              delay: open ? 0.3 : 0,
              type: "spring",
              damping: 14,
              stiffness: 70,
              mass: 1.5,
            }}
            style={{
              transformOrigin: "right center",
              flex: 1,
              height: "100%",
              background: "linear-gradient(135deg, #6b4a3a, #4a2a1a, #5a3a2a)",
              borderLeft: "4px solid #d4af37",
              boxShadow:
                "inset 15px 0 40px rgba(0,0,0,0.7), -5px 0 30px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.05) 0px,
                rgba(0,0,0,0.02) 20px,
                rgba(255,255,255,0.03) 40px,
                rgba(0,0,0,0.05) 60px
              )`,
                pointerEvents: "none",
              }}
            />
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <path
                d="M30,20 Q50,50 40,80 T60,150 T30,250"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M100,30 Q120,80 110,130 T140,200 T100,300"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M170,10 Q190,60 180,110 T210,180 T170,280"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "15%",
                width: "70%",
                height: "25%",
                border: "3px solid #d4af37",
                borderRadius: "12px",
                background: "rgba(180, 200, 255, 0.15)",
                boxShadow:
                  "inset 0 0 30px rgba(255,255,200,0.1), 0 0 20px rgba(212,175,55,0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20%",
                  left: "-20%",
                  width: "60%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transform: "rotate(25deg)",
                  animation: "shine 4s infinite",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "15%",
                width: "70%",
                height: "25%",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: "8px",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "38%",
                left: "10%",
                width: "80%",
                height: "50%",
                border: "2px solid rgba(212,175,55,0.1)",
                borderRadius: "8px",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "18%",
                right: "5px",
                width: "18px",
                height: "45px",
                background:
                  "linear-gradient(180deg, #b8860b, #d4af37, #b8860b)",
                borderRadius: "4px",
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "18%",
                right: "5px",
                width: "18px",
                height: "45px",
                background:
                  "linear-gradient(180deg, #b8860b, #d4af37, #b8860b)",
                borderRadius: "4px",
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
            />

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.8, delay: open ? 0.1 : 0 }}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #f9d976, #b8860b)",
                boxShadow:
                  "0 0 30px rgba(212, 175, 55, 0.7), inset 0 -5px 10px rgba(0,0,0,0.4)",
                border: "2px solid #f9d976",
                transform: "translateX(-12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "20px",
                  background: "#b8860b",
                  borderRadius: "3px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-45deg)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Zone centrale : message d'invitation + carte à gratter */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10000,
          pointerEvents: "all",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem",
          maxWidth: "90%",
          width: "100%",
        }}
      >
        {/* Message d'invitation */}
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#f9d976",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            textAlign: "center",
            textShadow:
              "0 0 40px rgba(212,175,55,0.3), 0 4px 20px rgba(0,0,0,0.6)",
            lineHeight: 1.3,
            letterSpacing: "2px",
            background: "rgba(0,0,0,0.5)",
            padding: "0.8rem 1.8rem",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,175,55,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            width: "fit-content",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          ✨ Nous avons le plaisir de vous inviter ✨
          <br />
          <span style={{ fontSize: "0.7em", opacity: 0.8 }}>
            à célébrer notre mariage
          </span>
        </div>

        {/* Carte à gratter */}
        <DateReveal onReveal={handleReveal} />
      </div>

      {/* Onde lumineuse */}
      {open && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "300%",
            height: "300%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9998,
          }}
        />
      )}

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(25deg); }
          20% { transform: translateX(100%) rotate(25deg); }
          100% { transform: translateX(100%) rotate(25deg); }
        }
      `}</style>
    </motion.div>
  );
}

export default Door;
