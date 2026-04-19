import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { uz } from "./translations/uz";
import { ru } from "./translations/ru";
import { en } from "./translations/en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    fallbackLng: "uz",
    supportedLngs: ["uz", "ru", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "eyetracking-lang",
    },
  });

// Ensure default is Uzbek if nothing detected
if (!localStorage.getItem("eyetracking-lang")) {
  i18n.changeLanguage("uz");
}

export default i18n;
