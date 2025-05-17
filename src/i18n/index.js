import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "../locales/en/en.json";
import ar from "../locales/ar/ar.json";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    lng: Localization.locale.split("-")[0],
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
