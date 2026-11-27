// src/i18n/LanguageContext.jsx
// Idioma de la web (castellano por defecto, catalán opcional).
// t("Texto en castellano") devuelve la traducción catalana si existe;
// si falta, devuelve el mismo texto en castellano.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import ca from "./ca";

const STORAGE_KEY = "ruehomes-lang";
// eslint-disable-next-line react-refresh/only-export-components
export const LANGUAGES = ["es", "ca"];

const LanguageContext = createContext(null);

const readStoredLang = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ca" ? "ca" : "es";
  } catch {
    return "es";
  }
};

const interpolate = (text, vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m)) : text;

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Sin almacenamiento (modo privado): el idioma no se recuerda, pero funciona
    }
  }, [lang]);

  const t = useCallback(
    (text, vars) => {
      if (lang !== "ca") return interpolate(text, vars);
      const translated = ca[text];
      if (translated === undefined && import.meta.env.DEV) {
        console.warn(`[i18n] Falta traducción al catalán: "${text}"`);
      }
      return interpolate(translated ?? text, vars);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  return ctx;
};
