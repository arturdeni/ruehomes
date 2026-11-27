// src/components/property/EnergyCertificate.jsx
import "./EnergyCertificate.css";
import { useLanguage } from "../../i18n/LanguageContext";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

const EnergyScale = ({ title, rating, value, unit }) => {
  const { t } = useLanguage();
  const active = rating?.toUpperCase();

  return (
    <div className="energy-scale">
      <h3 className="energy-scale__title">{title}</h3>
      <ul className="energy-scale__bars" aria-label={`${title}: ${t("letra")} ${active}`}>
        {LETTERS.map((letter, index) => {
          const isActive = letter === active;
          return (
            <li key={letter} className="energy-scale__row">
              <span
                className={`energy-scale__bar energy-scale__bar--${letter.toLowerCase()}${
                  isActive ? " is-active" : ""
                }`}
                style={{ width: `${46 + index * 8}%` }}
              >
                {letter}
              </span>
              {isActive && <span className="energy-scale__badge">{letter}</span>}
            </li>
          );
        })}
      </ul>
      <p className="energy-scale__summary">
        <strong>{t("Letra")} {active}</strong>
        {value && (
          <>
            {" · "}
            {value} {unit}
          </>
        )}
      </p>
    </div>
  );
};

const EnergyCertificate = ({
  consumptionRating,
  consumptionValue,
  emissionsRating,
  emissionsValue,
}) => {
  const { t } = useLanguage();
  if (!consumptionRating && !emissionsRating) return null;

  return (
    <div className="energy-certificate">
      <h2 className="property-detail__section-title">{t("Certificado energético")}</h2>
      <div className="energy-certificate__grid">
        {consumptionRating && (
          <EnergyScale
            title={t("Consumo de energía")}
            rating={consumptionRating}
            value={consumptionValue}
            unit={`kWh/m² ${t("año")}`}
          />
        )}
        {emissionsRating && (
          <EnergyScale
            title={t("Emisiones")}
            rating={emissionsRating}
            value={emissionsValue}
            unit={
              <>
                kg CO<sub>2</sub>/m² {t("año")}
              </>
            }
          />
        )}
      </div>
    </div>
  );
};

export default EnergyCertificate;
