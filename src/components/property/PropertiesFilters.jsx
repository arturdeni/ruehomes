// src/components/property/PropertiesFilters.jsx
import { useState, useEffect } from "react";

const PropertiesFilters = ({ filters, onFiltersChange, totalResults }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Sincronizar con los filtros externos
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Opciones para los filtros
  const propertyTypes = [
    { value: "", label: "Todos los tipos" },
    { value: "apartment", label: "Piso" },
    { value: "house", label: "Casa" },
    { value: "commercial", label: "Local" },
    { value: "office", label: "Oficina" },
    { value: "warehouse", label: "Nave" },
    { value: "land", label: "Terreno" },
  ];

  const bedroomOptions = [
    { value: "", label: "Cualquier número" },
    { value: "1", label: "1+ habitaciones" },
    { value: "2", label: "2+ habitaciones" },
    { value: "3", label: "3+ habitaciones" },
    { value: "4", label: "4+ habitaciones" },
    { value: "5", label: "5+ habitaciones" },
  ];

  const priceRanges = [
    { minPrice: "", maxPrice: "", label: "Cualquier precio" },
    { minPrice: "0", maxPrice: "300000", label: "Hasta 300.000€" },
    { minPrice: "300000", maxPrice: "500000", label: "300.000€ - 500.000€" },
    { minPrice: "500000", maxPrice: "750000", label: "500.000€ - 750.000€" },
    { minPrice: "750000", maxPrice: "1000000", label: "750.000€ - 1.000.000€" },
    { minPrice: "1000000", maxPrice: "", label: "Más de 1.000.000€" },
  ];

  const handleInputChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(newFilters);

    // Aplicar filtros inmediatamente para búsqueda y ciudad
    if (field === "search" || field === "city") {
      onFiltersChange(newFilters);
    }
  };

  const handleSelectChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeSelect = (minPrice, maxPrice) => {
    const newFilters = {
      ...localFilters,
      minPrice,
      maxPrice,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      city: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value !== ""
  );

  return (
    <div className="properties-filters">
      <div className="properties-filters__container">
        {/* Barra de filtros principales (siempre visible) */}
        <div className="properties-filters__main">
          {/* Buscador */}
          <div className="properties-filters__search">
            <div className="properties-filters__search-wrapper">
              <svg
                className="properties-filters__search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar por dirección, ciudad o palabra clave..."
                value={localFilters.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                className="properties-filters__search-input"
              />
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="properties-filters__quick">
            {/* Ciudad */}
            <div className="properties-filters__field">
              <label className="properties-filters__label">Ciudad</label>
              <input
                type="text"
                placeholder="Ej: Madrid, Barcelona..."
                value={localFilters.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="properties-filters__input"
              />
            </div>

            {/* Tipo de propiedad */}
            <div className="properties-filters__field">
              <label className="properties-filters__label">Tipo</label>
              <select
                value={localFilters.propertyType}
                onChange={(e) =>
                  handleSelectChange("propertyType", e.target.value)
                }
                className="properties-filters__select"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Habitaciones */}
            <div className="properties-filters__field">
              <label className="properties-filters__label">Habitaciones</label>
              <select
                value={localFilters.bedrooms}
                onChange={(e) => handleSelectChange("bedrooms", e.target.value)}
                className="properties-filters__select"
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón expandir/contraer */}
            <div className="properties-filters__toggle">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="properties-filters__toggle-btn"
              >
                <span>Más filtros</span>
                <svg
                  className={`properties-filters__toggle-icon ${
                    isExpanded
                      ? "properties-filters__toggle-icon--expanded"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros expandidos */}
        <div
          className={`properties-filters__expanded ${
            isExpanded ? "properties-filters__expanded--open" : ""
          }`}
        >
          {/* Rango de precios */}
          <div className="properties-filters__price-section">
            <h4 className="properties-filters__section-title">
              Rango de precio
            </h4>
            <div className="properties-filters__price-ranges">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handlePriceRangeSelect(range.minPrice, range.maxPrice)
                  }
                  className={`properties-filters__price-btn ${
                    localFilters.minPrice === range.minPrice &&
                    localFilters.maxPrice === range.maxPrice
                      ? "properties-filters__price-btn--active"
                      : ""
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Precio personalizado */}
            <div className="properties-filters__price-custom">
              <div className="properties-filters__price-inputs">
                <div className="properties-filters__price-field">
                  <label className="properties-filters__label">
                    Precio mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 300000"
                    value={localFilters.minPrice}
                    onChange={(e) =>
                      handleInputChange("minPrice", e.target.value)
                    }
                    className="properties-filters__input"
                    min="0"
                    step="1000"
                  />
                </div>
                <div className="properties-filters__price-separator">-</div>
                <div className="properties-filters__price-field">
                  <label className="properties-filters__label">
                    Precio máximo
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 800000"
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                      handleInputChange("maxPrice", e.target.value)
                    }
                    className="properties-filters__input"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de acciones */}
        <div className="properties-filters__actions">
          <div className="properties-filters__results">
            <span className="properties-filters__results-text">
              {totalResults} propiedades encontradas
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="properties-filters__clear-btn"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .properties-filters {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--color-softdune);
          overflow: hidden;
        }

        .properties-filters__container {
          padding: 2rem;
        }

        /* === FILTROS PRINCIPALES === */
        .properties-filters__main {
          margin-bottom: 1.5rem;
        }

        .properties-filters__search {
          margin-bottom: 2rem;
        }

        .properties-filters__search-wrapper {
          position: relative;
          max-width: 100%;
        }

        .properties-filters__search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: var(--color-rust-light);
          z-index: 2;
        }

        .properties-filters__search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid var(--color-softdune);
          border-radius: 12px;
          font-family: var(--font-secondary);
          font-size: 1rem;
          background: white;
          color: var(--color-rust);
          transition: all 0.3s ease;
        }

        .properties-filters__search-input:focus {
          outline: none;
          border-color: var(--color-cinnamon);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(178, 124, 81, 0.15);
        }

        .properties-filters__search-input::placeholder {
          color: var(--color-rust-light);
        }

        .properties-filters__quick {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 1.5rem;
          align-items: end;
        }

        .properties-filters__field {
          display: flex;
          flex-direction: column;
        }

        .properties-filters__label {
          font-family: var(--font-secondary);
          font-weight: 600;
          color: var(--color-rust);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .properties-filters__input,
        .properties-filters__select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-softdune);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          background: white;
          color: var(--color-rust);
          transition: all 0.3s ease;
        }

        .properties-filters__input:focus,
        .properties-filters__select:focus {
          outline: none;
          border-color: var(--color-cinnamon);
          transform: translateY(-1px);
        }

        .properties-filters__select {
          cursor: pointer;
        }

        .properties-filters__toggle {
          display: flex;
          align-items: center;
        }

        .properties-filters__toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--color-softdune);
          color: var(--color-rust);
          border: 2px solid var(--color-softdune-dark);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .properties-filters__toggle-btn:hover {
          background: var(--color-softdune-dark);
          transform: translateY(-1px);
        }

        .properties-filters__toggle-icon {
          width: 1rem;
          height: 1rem;
          transition: transform 0.3s ease;
        }

        .properties-filters__toggle-icon--expanded {
          transform: rotate(180deg);
        }

        /* === FILTROS EXPANDIDOS === */
        .properties-filters__expanded {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.4, 0.25, 1);
          opacity: 0;
        }

        .properties-filters__expanded--open {
          max-height: 500px;
          opacity: 1;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-softdune);
          margin-top: 1.5rem;
        }

        .properties-filters__section-title {
          font-family: var(--font-secondary);
          font-weight: 600;
          color: var(--color-rust);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .properties-filters__price-section {
          margin-bottom: 1.5rem;
        }

        .properties-filters__price-ranges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .properties-filters__price-btn {
          padding: 0.5rem 1rem;
          border: 2px solid var(--color-softdune);
          border-radius: 20px;
          background: white;
          color: var(--color-rust);
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .properties-filters__price-btn:hover {
          border-color: var(--color-cinnamon);
          transform: translateY(-1px);
        }

        .properties-filters__price-btn--active {
          background: var(--color-cinnamon);
          border-color: var(--color-cinnamon);
          color: white;
        }

        .properties-filters__price-custom {
          border-top: 1px solid var(--color-softdune-light);
          padding-top: 1rem;
        }

        .properties-filters__price-inputs {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1rem;
          align-items: end;
        }

        .properties-filters__price-field {
          display: flex;
          flex-direction: column;
        }

        .properties-filters__price-separator {
          font-family: var(--font-secondary);
          font-weight: 600;
          color: var(--color-rust-light);
          margin-bottom: 0.25rem;
          text-align: center;
        }

        /* === ACCIONES === */
        .properties-filters__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-softdune-light);
          margin-top: 1.5rem;
        }

        .properties-filters__results-text {
          font-family: var(--font-secondary);
          font-weight: 500;
          color: var(--color-rust);
        }

        .properties-filters__clear-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          color: var(--color-rust-light);
          border: 1px solid var(--color-softdune);
          border-radius: 6px;
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .properties-filters__clear-btn:hover {
          color: var(--color-rust);
          border-color: var(--color-rust-light);
          transform: translateY(-1px);
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .properties-filters__quick {
            grid-template-columns: 1fr 1fr auto;
            gap: 1rem;
          }

          .properties-filters__search {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .properties-filters__container {
            padding: 1.5rem;
          }

          .properties-filters__quick {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .properties-filters__toggle {
            justify-content: center;
            margin-top: 0.5rem;
          }

          .properties-filters__price-ranges {
            flex-direction: column;
            align-items: stretch;
          }

          .properties-filters__price-inputs {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .properties-filters__price-separator {
            display: none;
          }

          .properties-filters__actions {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .properties-filters__search-input {
            font-size: 0.9rem;
          }

          .properties-filters__price-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertiesFilters;
