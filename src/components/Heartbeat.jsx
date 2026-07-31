import React from "react";
import { useApp } from "../context/AppContext";

function Heartbeat() {
  const { t } = useApp();
  return (
    <div className="heart-section">
      <div className="heart-wrapper">
        <div className="heart-pulse-ring"></div>
        <div className="heart-pulse-ring"></div>
        <div className="heart-pulse-ring"></div>
        <div className="heart-icon">❤️</div>
      </div>
      <div className="heartbeat-text">{t("heartbeat")}</div>
    </div>
  );
}

export default Heartbeat;
