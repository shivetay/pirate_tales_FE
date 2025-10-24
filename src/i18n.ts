import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import pl from "./locales/pl/common.json";

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

await i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
