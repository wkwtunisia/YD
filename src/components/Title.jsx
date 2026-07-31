import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import Sparkles from "./Sparkles";

function Title() {
  const { t } = useApp();
  return (
    <div className="title-section" style={{ position: "relative" }}>
      <Sparkles />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      >
        <h1 className="title-main">{t("title")}</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="title-divider"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="title-sub">{t("subtitle")}</p>
      </motion.div>
    </div>
  );
}

export default Title;
