// src/components/property/EnergyCertificate.jsx
import "./EnergyCertificate.css";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

const EnergyScale = ({ title, rating, value, unit }) => {
  const active = rating?.toUpperCase();

  return (
    <div className="energy-scale">
      <h3 className="energy-scale__title">{title}</h3>
      <ul className="energy-scale__bars" aria-label={`${title}: letra ${active}`}>
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
        <strong>Letra {active}</strong>
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
  if (!consumptionRating && !emissionsRating) return null;

  return (
    <div className="energy-certificate">
      <h2 className="property-detail__section-title">Certificado energético</h2>
      <div className="energy-certificate__grid">
        {consumptionRating && (
          <EnergyScale
            title="Consumo de energía"
            rating={consumptionRating}
            value={consumptionValue}
            unit="kWh/m² año"
          />
        )}
        {emissionsRating && (
          <EnergyScale
            title="Emisiones"
            rating={emissionsRating}
            value={emissionsValue}
            unit={
              <>
                kg CO<sub>2</sub>/m² año
              </>
            }
          />
        )}
      </div>
    </div>
  );
};

export default EnergyCertificate;
