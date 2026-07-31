import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

function Location() {
  const { t } = useApp();
  return (
    <motion.div
      className="location-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="location-icon">📍</div>
      <h4 className="location-title">{t("locationTitle")}</h4>
      <p className="location-name">{t("locationName")}</p>
      <p className="location-address">{t("locationAddress")}</p>
      <a
        href="https://maps.app.goo.gl/CnnoAfTaGEPUdfo28"
        target="_blank"
        rel="noopener noreferrer"
        className="location-link"
      >
        {t("locationButton")}
      </a>
    </motion.div>
  );
}

export default Location;
