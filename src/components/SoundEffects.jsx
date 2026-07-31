import React, { useRef } from "react";

const SOUND_URLS = {
  doorCreak: "/sounds/door-creak.mp3",
  heart: "/sounds/heartbeat.mp3",
  cheer: "/sounds/cheer.mp3",
};

function SoundEffects() {
  const audioContextRef = useRef(null);

  const playSound = (url) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContextRef.current.decodeAudioData(buffer))
        .then((decoded) => {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = decoded;
          source.connect(audioContextRef.current.destination);
          source.start(0);
        })
        .catch((err) => console.warn("Erreur son (fichier manquant) :", err));
    } catch (e) {
      console.warn("Erreur AudioContext :", e);
    }
  };

  return {
    playDoorCreak: () => playSound(SOUND_URLS.doorCreak),
    playHeart: () => playSound(SOUND_URLS.heart),
    playCheer: () => playSound(SOUND_URLS.cheer),
  };
}

export default SoundEffects;
