import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

function PhotoAlbum() {
  const { t } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const labels = t("albumLabels") || [
    "Nous",
    "Amour",
    "Fiançailles",
    "Fête",
    "Rêve",
    "Union",
  ];

  const imageModules = import.meta.glob("../photos/*.{jpg,jpeg,png,webp}", {
    eager: true,
  });
  const photos = useMemo(() => {
    const entries = Object.entries(imageModules);
    if (entries.length === 0) {
      return labels.map((label, i) => ({
        id: i,
        src: null,
        label: label,
        emoji: ["💑", "🌹", "💍", "🥂", "✨", "💞"][i] || "📸",
      }));
    }
    return entries.map(([path, module], index) => ({
      id: index,
      src: module.default,
      label:
        labels[index] ||
        path
          .split("/")
          .pop()
          .replace(/\.[^/.]+$/, ""),
    }));
  }, [imageModules, labels]);

  return (
    <>
      <motion.div
        className="album-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="album-title">{t("albumTitle")}</h3>
        <div className="album-grid">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              className="album-photo"
              onClick={() => photo.src && setSelectedPhoto(photo)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + idx * 0.12 }}
              whileHover={{ scale: 1.06, rotate: idx % 2 === 0 ? -1 : 1 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: photo.src ? "pointer" : "default" }}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span
                  className="placeholder-icon"
                  style={{ fontSize: "3rem", opacity: 0.3 }}
                >
                  {photo.emoji}
                </span>
              )}
              <span className="photo-label">{photo.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.label}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            />
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              ✕
            </button>
            <span className="lightbox-label">{selectedPhoto.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PhotoAlbum;
