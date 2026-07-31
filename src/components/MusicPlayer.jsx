import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useApp } from "../context/AppContext";
import musicFile from "../assets/test.mp3";

const MusicPlayer = forwardRef((props, ref) => {
  const { t } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const hasStartedRef = useRef(false);
  const interactionListenerRef = useRef(null);
  let analyser, dataArray, animationId;

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!hasStartedRef.current) {
        audio
          .play()
          .then(() => {
            hasStartedRef.current = true;
            setIsPlaying(true);
            startVisualizer();
          })
          .catch(() => {});
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const audio = audioRef.current;
    if (!audio) return;

    const setupAnalyser = () => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    };

    const draw = () => {
      if (!analyser) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / dataArray.length;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        const hue = 340 + i * 0.5;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.3)`;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
      animationId = requestAnimationFrame(draw);
    };

    const startVisualizer = () => {
      if (!analyser) {
        try {
          setupAnalyser();
        } catch (e) {
          return;
        }
      }
      draw();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      startVisualizer();
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (animationId) cancelAnimationFrame(animationId);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const attemptPlay = () => {
      if (hasStartedRef.current) return;
      audio
        .play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
          startVisualizer();
        })
        .catch(() => {
          if (!interactionListenerRef.current) {
            const listener = () => {
              if (!hasStartedRef.current) {
                audio
                  .play()
                  .then(() => {
                    hasStartedRef.current = true;
                    setIsPlaying(true);
                    startVisualizer();
                  })
                  .catch(() => {});
              }
              document.removeEventListener("click", listener);
              document.removeEventListener("touchstart", listener);
              interactionListenerRef.current = null;
            };
            interactionListenerRef.current = listener;
            document.addEventListener("click", listener);
            document.addEventListener("touchstart", listener);
          }
        });
    };

    const timeout = setTimeout(attemptPlay, 300);

    return () => {
      clearTimeout(timeout);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      if (animationId) cancelAnimationFrame(animationId);
      if (interactionListenerRef.current) {
        document.removeEventListener("click", interactionListenerRef.current);
        document.removeEventListener(
          "touchstart",
          interactionListenerRef.current
        );
        interactionListenerRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} loop preload="auto">
        <source src={musicFile} type="audio/mpeg" />
      </audio>
      <button
        className={`music-btn ${isPlaying ? "" : "paused"}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <canvas
        ref={canvasRef}
        style={{
          width: "80px",
          height: "30px",
          borderRadius: "4px",
          background: "rgba(0,0,0,0.3)",
        }}
      />
      <span className="music-info">
        <strong>♫</strong> {t("musicLabel")}
      </span>
    </div>
  );
});

export default MusicPlayer;
