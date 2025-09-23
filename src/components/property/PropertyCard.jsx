// src/components/property/PropertyCard.jsx
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    price,
    propertyType,
    status,
    bedrooms,
    bathrooms,
    area,
    address,
    city,
    images,
    features,
  } = property;

  // Formatear precio
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  // Imagen principal
  const mainImage = images && images.length > 0 ? images[0] : null;

  // Traducir tipo de propiedad
  const getPropertyTypeLabel = (type) => {
    const types = {
      apartment: "Piso",
      house: "Casa",
      commercial: "Local",
      office: "Oficina",
      warehouse: "Nave",
      land: "Terreno",
    };
    return types[type] || type;
  };

  // Traducir estado
  const getStatusLabel = (status) => {
    const statuses = {
      sale: "Venta",
      rent: "Alquiler",
      sold: "Vendido",
      rented: "Alquilado",
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      sale: "property-card__badge--sale",
      rent: "property-card__badge--rent",
      sold: "property-card__badge--sold",
      rented: "property-card__badge--rented",
    };
    return colors[status] || "property-card__badge--default";
  };

  return (
    <Link to={`/propiedad/${id}`} className="property-card__link">
      <article className="property-card">
        {/* Imagen */}
        <div className="property-card__image-container">
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={mainImage.alt || title}
              className="property-card__image"
              loading="lazy"
            />
          ) : (
            <div className="property-card__image-placeholder">
              <svg
                className="property-card__placeholder-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Badge de estado */}
          <div className="property-card__badge-container">
            <span className={`property-card__badge ${getStatusColor(status)}`}>
              {getStatusLabel(status)}
            </span>
          </div>

          {/* Contador de imágenes */}
          {images && images.length > 1 && (
            <div className="property-card__image-count">
              <svg
                className="property-card__image-count-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="property-card__image-count-text">
                {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="property-card__content">
          {/* Precio y tipo */}
          <div className="property-card__header">
            <div className="property-card__price">
              {formatPrice(price)}€
              {status === "rent" && (
                <span className="property-card__price-period">/mes</span>
              )}
            </div>
            <div className="property-card__type">
              {getPropertyTypeLabel(propertyType)}
            </div>
          </div>

          {/* Título */}
          <h3 className="property-card__title">{title}</h3>

          {/* Ubicación */}
          <div className="property-card__location">
            <svg
              className="property-card__location-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="property-card__location-text">
              {address}, {city}
            </span>
          </div>

          {/* Características */}
          <div className="property-card__features">
            {bedrooms && (
              <div className="property-card__feature">
                <svg
                  className="property-card__feature-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                  />
                </svg>
                <span className="property-card__feature-text">
                  {bedrooms} hab
                </span>
              </div>
            )}

            {bathrooms && (
              <div className="property-card__feature">
                <svg
                  className="property-card__feature-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
                  />
                </svg>
                <span className="property-card__feature-text">
                  {bathrooms} baños
                </span>
              </div>
            )}

            {area && (
              <div className="property-card__feature">
                <svg
                  className="property-card__feature-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                <span className="property-card__feature-text">{area}m²</span>
              </div>
            )}
          </div>

          {/* Tags de características destacadas */}
          {features && features.length > 0 && (
            <div className="property-card__tags">
              {features.slice(0, 3).map((feature, index) => (
                <span key={index} className="property-card__tag">
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="property-card__tag property-card__tag--more">
                  +{features.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </article>

      <style jsx>{`
        .property-card__link {
          display: block;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .property-card {
          background: white;
          border-radius: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* === IMAGEN === */
        .property-card__image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
          cursor: pointer;
        }

        .property-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .property-card__link:hover .property-card__image {
          transform: scale(1.08);
        }

        .property-card__image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--color-marble) 0%,
            var(--color-softdune-light) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .property-card__placeholder-icon {
          width: 4rem;
          height: 4rem;
          color: var(--color-softdune-dark);
        }

        /* Badge de estado */
        .property-card__badge-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
        }

        .property-card__badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-family: var(--font-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          backdrop-filter: blur(8px);
        }

        .property-card__badge--sale {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
        }

        .property-card__badge--rent {
          background: linear-gradient(
            135deg,
            var(--color-info) 0%,
            var(--color-info-dark) 100%
          );
        }

        .property-card__badge--sold,
        .property-card__badge--rented {
          background: linear-gradient(
            135deg,
            var(--color-gray-600) 0%,
            var(--color-gray-700) 100%
          );
        }

        .property-card__badge--default {
          background: linear-gradient(
            135deg,
            var(--color-rust) 0%,
            var(--color-rust-dark) 100%
          );
        }

        /* Contador de imágenes */
        .property-card__image-count {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.35rem 0.7rem;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 15px;
          backdrop-filter: blur(8px);
        }

        .property-card__image-count-icon {
          width: 0.875rem;
          height: 0.875rem;
          color: white;
        }

        .property-card__image-count-text {
          color: white;
          font-family: var(--font-secondary);
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* === CONTENIDO === */
        .property-card__content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .property-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .property-card__price {
          font-family: var(--font-primary);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-cinnamon);
          line-height: 1.1;
        }

        .property-card__price-period {
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          color: var(--color-rust-light);
          font-weight: 400;
        }

        .property-card__type {
          font-family: var(--font-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-rust-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: var(--color-marble);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
        }

        .property-card__title {
          font-family: var(--font-secondary);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-rust);
          line-height: 1.3;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .property-card__location {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .property-card__location-icon {
          width: 1rem;
          height: 1rem;
          color: var(--color-rust-light);
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .property-card__location-text {
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          color: var(--color-rust-light);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Características */
        .property-card__features {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1rem;
        }

        .property-card__feature {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .property-card__feature-icon {
          width: 1rem;
          height: 1rem;
          color: var(--color-rust-light);
        }

        .property-card__feature-text {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust);
          font-weight: 500;
        }

        /* Tags de características */
        .property-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .property-card__tag {
          font-family: var(--font-secondary);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-rust-light);
          background: var(--color-marble);
          padding: 0.25rem 0.6rem;
          border-radius: 10px;
        }

        .property-card__tag--more {
          color: var(--color-rust);
          background: var(--color-softdune);
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .property-card__image-container {
            height: 240px;
          }

          .property-card__content {
            padding: 1.25rem;
          }

          .property-card__price {
            font-size: 1.5rem;
          }

          .property-card__title {
            font-size: 1rem;
          }

          .property-card__features {
            gap: 1rem;
          }

          .property-card__feature-text {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .property-card__image-container {
            height: 200px;
          }

          .property-card__content {
            padding: 1rem;
          }

          .property-card__header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }

          .property-card__features {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
        }
      `}</style>
    </Link>
  );
};

export default PropertyCard;
