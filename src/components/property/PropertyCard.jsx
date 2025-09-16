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
      sale: "bg-green-500",
      rent: "bg-blue-500",
      sold: "bg-gray-500",
      rented: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="card-hover group">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badge de estado */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(
              status
            )}`}
          >
            {getStatusLabel(status)}
          </span>
        </div>

        {/* Badge de tipo */}
        <div className="absolute top-3 right-3">
          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">
            {getPropertyTypeLabel(propertyType)}
          </span>
        </div>

        {/* Número de imágenes */}
        {images && images.length > 1 && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded-full flex items-center space-x-1">
              <svg
                className="w-3 h-3"
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
              <span>{images.length}</span>
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Precio */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-gray-900">
            €{formatPrice(price)}
            {status === "rent" && (
              <span className="text-base font-normal text-gray-600">/mes</span>
            )}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Ubicación */}
        <div className="flex items-center text-gray-600 mb-4">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
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
          <span className="text-sm line-clamp-1">
            {address}, {city}
          </span>
        </div>

        {/* Características */}
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          {bedrooms && (
            <div className="flex items-center space-x-1">
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                />
              </svg>
              <span className="text-sm">{bedrooms}</span>
            </div>
          )}

          {bathrooms && (
            <div className="flex items-center space-x-1">
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
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
                />
              </svg>
              <span className="text-sm">{bathrooms}</span>
            </div>
          )}

          {area && (
            <div className="flex items-center space-x-1">
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span className="text-sm">{area}m²</span>
            </div>
          )}
        </div>

        {/* Características destacadas */}
        {features && features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="text-gray-500 text-xs py-1">
                  +{features.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Botón ver detalles */}
        <Link
          to={`/propiedad/${id}`}
          className="block w-full btn-primary text-center"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
