import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RSVP() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send to your backend or email – for now, we just show success
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFormData({ name: "", guests: "1", message: "" });
    }, 2000);
  };

  return (
    <>
      <button
        className="rsvp-button"
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: "1.5rem",
          padding: "0.8rem 2.5rem",
          background: "linear-gradient(135deg, #e74c3c, #c0392b)",
          border: "none",
          borderRadius: "50px",
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "1rem",
          letterSpacing: "3px",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 8px 30px rgba(231,76,60,0.3)",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ✦ RSVP ✦
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rsvp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              className="rsvp-modal"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#1a1a1a",
                borderRadius: "24px",
                padding: "2rem 2.5rem",
                maxWidth: "500px",
                width: "100%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,215,0,0.1)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  color: "#888",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h2
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      color: "#f1c40f",
                      fontSize: "2.2rem",
                      textAlign: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Réservez votre place
                  </h2>
                  <p
                    style={{
                      textAlign: "center",
                      color: "#aaa",
                      marginBottom: "1.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    Nous sommes impatients de vous accueillir !
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          color: "#ccc",
                          fontSize: "0.8rem",
                          letterSpacing: "2px",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Votre nom *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "0.8rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1rem",
                          outline: "none",
                          transition: "border 0.3s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#f1c40f")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          color: "#ccc",
                          fontSize: "0.8rem",
                          letterSpacing: "2px",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Nombre de personnes
                      </label>
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="10"
                        value={formData.guests}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "0.8rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1rem",
                          outline: "none",
                          transition: "border 0.3s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#f1c40f")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          display: "block",
                          color: "#ccc",
                          fontSize: "0.8rem",
                          letterSpacing: "2px",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "0.8rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1rem",
                          resize: "vertical",
                          outline: "none",
                          transition: "border 0.3s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#f1c40f")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "0.9rem",
                        background: "linear-gradient(135deg, #f1c40f, #f39c12)",
                        border: "none",
                        borderRadius: "50px",
                        color: "#1a1a1a",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.02)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      Envoyer
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <span style={{ fontSize: "4rem" }}>🎉</span>
                  <h3
                    style={{
                      color: "#f1c40f",
                      marginTop: "1rem",
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "2rem",
                    }}
                  >
                    Merci !
                  </h3>
                  <p style={{ color: "#aaa" }}>
                    Votre message a bien été envoyé.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RSVP;
