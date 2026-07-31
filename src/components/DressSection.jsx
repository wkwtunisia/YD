import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

function DressSection() {
  const { t } = useApp();
  return (
    <motion.div
      className="dress-section"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="dress-icon">👗</div>
      <h3 className="dress-title">{t("dressTitle")}</h3>
      <div className="dress-colors">
        <div className="color-dot red"></div>
        <div className="color-dot black"></div>
        <div className="color-dot gray"></div>
      </div>
      <p className="dress-desc">
        {t("dressColors")}
        <br />
        {t("dressDesc")}
      </p>
    </motion.div>
  );
}

export default DressSection;
