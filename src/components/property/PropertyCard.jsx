// src/components/property/PropertyCard.jsx
import { Link } from "react-router-dom";
import { optimizeImageUrl } from "../../utils/helpers";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    price,
    propertyType = "apartment",
    propertyStatus = "sale",
    bedrooms,
    bathrooms,
    area,
    address,
    city,
    images,
  } = property;

  // For backwards compatibility
  const status = propertyStatus;

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES").format(price);
  };

  // Imagen principal
  const mainImage = images && images.length > 0 ? images[0] : null;

  // Obtener el display name del tipo de propiedad
  const getPropertyTypeDisplayName = (typeId) => {
    const typeMap = {
      piso: "Piso",
      atico: "Ático",
      casaUnifamiliar: "Casa Unifamiliar",
      casaAdosada: "Casa Adosada",
      villa: "Villa",
      duplex: "Dúplex",
      loft: "Loft",
      local: "Local",
      nave: "Nave",
      oficinas: "Oficinas",
    };
    return typeMap[typeId] || typeId;
  };

  // Obtener el display name del estado
  const getStatusDisplayName = (statusId) => {
    const statusMap = {
      enVenta: "En Venta",
      vendido: "Vendido",
      enAlquiler: "En Alquiler",
      alquilado: "Alquilado",
    };
    return statusMap[statusId] || statusId;
  };

  // Obtener color según el estado
  const getStatusColor = (statusId) => {
    const colors = {
      enVenta: "property-card__badge--sale",
      enAlquiler: "property-card__badge--rent",
      vendido: "property-card__badge--sold",
      alquilado: "property-card__badge--rented",
    };
    return colors[statusId] || "property-card__badge--default";
  };

  return (
    <Link to={`/propiedad/${id}`} className="property-card__link">
      <article className="property-card">
        {/* Imagen */}
        <div className="property-card__image-container">
          {mainImage ? (
            <img
              src={optimizeImageUrl(mainImage.url, {
                width: 600,
                height: 400,
                quality: 80,
              })}
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
              {getStatusDisplayName(status)}
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
              {status === "enAlquiler" && (
                <span className="property-card__price-period">/mes</span>
              )}
            </div>
            <div className="property-card__type">
              {getPropertyTypeDisplayName(propertyType)}
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
                <HotelIcon className="property-card__feature-icon" />
                <span className="property-card__feature-text">
                  {bedrooms} hab
                </span>
              </div>
            )}

            {bathrooms && (
              <div className="property-card__feature">
                <BathtubIcon className="property-card__feature-icon" />
                <span className="property-card__feature-text">
                  {bathrooms} baños
                </span>
              </div>
            )}

            {area && (
              <div className="property-card__feature">
                <SquareFootIcon className="property-card__feature-icon" />
                <span className="property-card__feature-text">{area}m²</span>
              </div>
            )}
          </div>
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
            var(--color-rust) 0%,
            var(--color-rust-dark) 100%
          );
        }

        .property-card__badge--rent {
          background: linear-gradient(
            135deg,
            var(--color-honeyfield-light) 0%,
            var(--color-honeyfield-dark) 100%
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
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
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
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .property-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.875rem;
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
          margin-bottom: 0.625rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .property-card__location {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.875rem;
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
