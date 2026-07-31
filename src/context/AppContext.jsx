import React, { createContext, useState, useContext, useEffect } from "react";

// -------- Traductions --------
const translations = {
  fr: {
    heartbeat: "♡ Bat le cœur ♡",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    title: "YOSRA & MOHAMED ALI",
    subtitle: "♡ Notre Mariage ♡",
    scratch: "GRATTER ICI",
    scratchSub: "♡ Frottez pour révéler ♡",
    date: "30 janvier 2027",
    weddingLabel: "NOTRE MARIAGE",
    dressTitle: "Robe de Mariée",
    dressColors: "Rouge passion, Noir élégance, Gris subtil",
    dressDesc: "Une symphonie de couleurs pour votre amour.",
    albumTitle: "📸 Nos Souvenirs",
    albumLabels: ["Nous", "Amour", "Fiançailles", "Fête", "Rêve", "Union"],
    locationTitle: "Lieu de la Cérémonie",
    locationName: "حي مسعودة البكري",
    locationAddress: "Ariana, Tunisie",
    locationButton: "Ouvrir dans Google Maps",
    rsvpTitle: "RSVP",
    rsvpSub: "Réservez votre place",
    rsvpName: "Votre nom",
    rsvpEmail: "Email",
    rsvpGuests: "Nombre de personnes",
    rsvpMessage: "Message (optionnel)",
    rsvpSubmit: "Confirmer",
    rsvpThanks: "Merci !",
    rsvpThanksMsg: "Nous avons bien reçu votre réponse.",
    musicLabel: "Chanson d'amour",
    rsvpButton: "RSVP",
    storyTitle: "Notre Histoire",
    storyMeet: "Rencontre",
    storyEngaged: "Fiançailles",
    storyWedding: "Mariage",
    storyHoneymoon: "Lune de miel",
  },
  ar: {
    heartbeat: "♡ نبض القلب ♡",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    title: "يسرى ومحمد علي",
    subtitle: "♡ حفل زفافنا ♡",
    scratch: "احك هنا",
    scratchSub: "♡ افرك للكشف ♡",
    date: "30 يناير 2027",
    weddingLabel: "حفل زفافنا",
    dressTitle: "فستان الزفاف",
    dressColors: "أحمر شغوف، أسود أنيق، رمادي رقيق",
    dressDesc: "سيمفونية من الألوان لحبكما.",
    albumTitle: "📸 ذكرياتنا",
    albumLabels: ["نحن", "حب", "خطوبة", "احتفال", "حلم", "اتحاد"],
    locationTitle: "مكان الحفل",
    locationName: "حي مسعودة البكري",
    locationAddress: "أريانة، تونس",
    locationButton: "فتح في خرائط Google",
    rsvpTitle: "تأكيد الحضور",
    rsvpSub: "احجز مكانك",
    rsvpName: "اسمك",
    rsvpEmail: "البريد الإلكتروني",
    rsvpGuests: "عدد الأشخاص",
    rsvpMessage: "رسالة (اختياري)",
    rsvpSubmit: "تأكيد",
    rsvpThanks: "شكراً !",
    rsvpThanksMsg: "لقد تلقينا ردك بنجاح.",
    musicLabel: "أغنية الحب",
    rsvpButton: "تأكيد الحضور",
    storyTitle: "قصتنا",
    storyMeet: "لقاء",
    storyEngaged: "خطوبة",
    storyWedding: "زواج",
    storyHoneymoon: "شهر العسل",
  },
  en: {
    heartbeat: "♡ Heartbeat ♡",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    title: "YOSRA & MOHAMED ALI",
    subtitle: "♡ Our Wedding ♡",
    scratch: "SCRATCH HERE",
    scratchSub: "♡ Rub to reveal ♡",
    date: "January 30, 2027",
    weddingLabel: "OUR WEDDING",
    dressTitle: "Wedding Dress",
    dressColors: "Passionate Red, Elegant Black, Subtle Gray",
    dressDesc: "A symphony of colors for your love.",
    albumTitle: "📸 Our Memories",
    albumLabels: ["Us", "Love", "Engagement", "Party", "Dream", "Union"],
    locationTitle: "Ceremony Venue",
    locationName: "حي مسعودة البكري",
    locationAddress: "Ariana, Tunisia",
    locationButton: "Open in Google Maps",
    rsvpTitle: "RSVP",
    rsvpSub: "Reserve your seat",
    rsvpName: "Your name",
    rsvpEmail: "Email",
    rsvpGuests: "Number of guests",
    rsvpMessage: "Message (optional)",
    rsvpSubmit: "Confirm",
    rsvpThanks: "Thank you!",
    rsvpThanksMsg: "We have received your response.",
    musicLabel: "Love song",
    rsvpButton: "RSVP",
    storyTitle: "Our Story",
    storyMeet: "First Meeting",
    storyEngaged: "Engagement",
    storyWedding: "Wedding",
    storyHoneymoon: "Honeymoon",
  },
};

const AppContext = createContext();

export function AppProvider({ children }) {
  // Try to load from localStorage
  const storedLang = localStorage.getItem("lang") || "fr";
  const storedTheme = localStorage.getItem("theme") || "dark";

  const [lang, setLang] = useState(storedLang);
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const t = (key) => {
    const keys = key.split(".");
    let val = translations[lang];
    for (let k of keys) {
      val = val?.[k];
    }
    return val || key;
  };

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
