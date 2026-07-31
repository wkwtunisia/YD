import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider, useApp } from "./context/AppContext";

import HeartsBackground from "./components/HeartsBackground";
import HeartTrail from "./components/HeartTrail";
import SettingsBar from "./components/SettingsBar";
import Door from "./components/Door";
import Fireworks from "./components/Fireworks";
import DynamicBackground from "./components/DynamicBackground";

import Heartbeat from "./components/Heartbeat";
import Countdown from "./components/Countdown";
import Title from "./components/Title";
import DressSection from "./components/DressSection";
import PhotoAlbum from "./components/PhotoAlbum";
import PhotoSlideshow from "./components/PhotoSlideshow";
import Location from "./components/Location";
import LoveStory from "./components/LoveStory";
import MusicPlayer from "./components/MusicPlayer";
import RSVPModal from "./components/RSVPModal";
import SoundEffects from "./components/SoundEffects";

// Memoize static components to prevent unnecessary re-renders
const MemoizedDress = memo(DressSection);
const MemoizedLocation = memo(Location);
const MemoizedLoveStory = memo(LoveStory);
const MemoizedPhotoAlbum = memo(PhotoAlbum);

function AppContent() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const { t } = useApp();
  const musicPlayerRef = useRef(null);
  const fireworksRef = useRef(null);
  const sound = SoundEffects();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const imageModules = import.meta.glob("../photos/*.{jpg,jpeg,png,webp}", {
      eager: true,
    });
    const entries = Object.entries(imageModules);
    if (entries.length === 0) {
      setPhotos([]);
    } else {
      const loaded = entries.map(([path, mod]) => ({
        src: mod.default,
        label: path
          .split("/")
          .pop()
          .replace(/\.[^/.]+$/, ""),
      }));
      setPhotos(loaded);
    }
  }, []);

  const handleDoorOpen = () => {
    setIsRevealed(true);
    sound.playDoorCreak();
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play();
    }
    setTimeout(() => {
      if (fireworksRef.current) {
        fireworksRef.current.launch(
          window.innerWidth / 2,
          window.innerHeight / 2
        );
        sound.playCheer();
      }
    }, 600);
  };

  return (
    <>
      <DynamicBackground />
      <Fireworks ref={fireworksRef} />
      <Door onDoorOpen={handleDoorOpen} />

      <HeartsBackground />
      <HeartTrail />
      <SettingsBar />

      <div className="app-content">
        <Heartbeat />
        <Countdown />
        <Title />

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="revealed-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="bottom-row">
                <MemoizedPhotoAlbum />
                <MemoizedDress />
              </div>

              {photos.length > 0 && <PhotoSlideshow photos={photos} />}
              <MemoizedLoveStory />

              <motion.button
                className="rsvp-button"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsRSVPOpen(true)}
                style={{
                  marginTop: "2rem",
                  padding: "0.8rem 2.5rem",
                  borderRadius: "50px",
                  border: "2px solid #f9d976",
                  background: "transparent",
                  color: "#f9d976",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f9d976";
                  e.target.style.color = "#1a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#f9d976";
                }}
              >
                {t("rsvpButton")}
              </motion.button>

              <MemoizedLocation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MusicPlayer ref={musicPlayerRef} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
