// src/components/common/LanguageSwitcher.jsx
import { LANGUAGES, useLanguage } from "../../i18n/LanguageContext";

const LABELS = { es: "ES", ca: "CA" };
const NAMES = { es: "Castellano", ca: "Català" };

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Idioma / Idioma">
      {LANGUAGES.map((code, index) => (
        <span key={code} className="lang-switcher__item">
          {index > 0 && <span className="lang-switcher__sep">|</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            className={`lang-switcher__btn${lang === code ? " is-active" : ""}`}
            aria-pressed={lang === code}
            aria-label={NAMES[code]}
            lang={code}
          >
            {LABELS[code]}
          </button>
        </span>
      ))}

      <style jsx>{`
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust);
        }
        .lang-switcher__item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .lang-switcher__sep {
          opacity: 0.4;
        }
        .lang-switcher__btn {
          background: none;
          border: none;
          padding: 4px 2px;
          cursor: pointer;
          font: inherit;
          color: inherit;
          opacity: 0.55;
          letter-spacing: 0.5px;
          transition: opacity 0.2s ease;
        }
        .lang-switcher__btn:hover {
          opacity: 0.85;
        }
        .lang-switcher__btn.is-active {
          opacity: 1;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
