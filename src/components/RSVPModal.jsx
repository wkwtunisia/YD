import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

function RSVPModal({ isOpen, onClose }) {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RSVP Data:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", guests: "1", message: "" });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="rsvp-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="rsvp-modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <span style={{ fontSize: "4rem", display: "block" }}>🎉</span>
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "2.5rem",
                  color: "#f9d976",
                }}
              >
                {t("rsvpThanks")}
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#aaa",
                  marginTop: "0.5rem",
                }}
              >
                {t("rsvpThanksMsg")}
              </p>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "2.8rem",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #f9d976, #f39c12)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("rsvpTitle")}
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textAlign: "center",
                  color: "#888",
                  marginBottom: "1.5rem",
                  fontSize: "0.8rem",
                  letterSpacing: "2px",
                }}
              >
                {t("rsvpSub")}
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#ccc",
                      fontSize: "0.75rem",
                      letterSpacing: "2px",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {t("rsvpName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#f9d976")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#ccc",
                      fontSize: "0.75rem",
                      letterSpacing: "2px",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {t("rsvpEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#f9d976")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#ccc",
                      fontSize: "0.75rem",
                      letterSpacing: "2px",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {t("rsvpGuests")}
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#f9d976")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#ccc",
                      fontSize: "0.75rem",
                      letterSpacing: "2px",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {t("rsvpMessage")}
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border 0.3s",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#f9d976")}
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
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(135deg, #f9d976, #f39c12)",
                    color: "#1a0a0a",
                    fontSize: "1rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)";
                    e.target.style.boxShadow =
                      "0 8px 30px rgba(241, 196, 15, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {t("rsvpSubmit")}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RSVPModal;
