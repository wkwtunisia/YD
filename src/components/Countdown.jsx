import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2027-01-30T00:00:00").getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Secondes", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-section">
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          className="countdown-item"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
        >
          <span className="countdown-number">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default Countdown;
