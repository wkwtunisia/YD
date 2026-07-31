import React from "react";
import { useApp } from "../context/AppContext";

function SettingsBar() {
  const { lang, setLang, theme, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="settings-bar">
      <div className="settings-languages">
        <button
          className={`lang-btn ${lang === "fr" ? "active" : ""}`}
          onClick={() => setLang("fr")}
        >
          FR
        </button>
        <button
          className={`lang-btn ${lang === "ar" ? "active" : ""}`}
          onClick={() => setLang("ar")}
        >
          ع
        </button>
        <button
          className={`lang-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default SettingsBar;
