// src/components/property/PropertyDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Datos mockeados ampliados para la vista de detalle
const mockPropertyDetail = {
  id: 1,
  title: "Piso moderno en zona exclusiva de Madrid",
  price: 850000,
  propertyType: "apartment",
  status: "sale",
  bedrooms: 3,
  bathrooms: 2,
  area: 120,
  address: "Calle Serrano 45, 3º Izquierda",
  city: "Madrid",
  neighborhood: "Salamanca",
  postalCode: "28001",
  description:
    "Espectacular piso de 120m² completamente reformado en una de las zonas más exclusivas de Madrid. Ubicado en la prestigiosa calle Serrano, este inmueble ofrece acabados de primera calidad, abundante luz natural y una distribución funcional perfecta para familias modernas. El edificio cuenta con portero físico y está situado en el corazón del barrio de Salamanca.",
  images: [
    {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Salón principal con grandes ventanales",
    },
    {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Cocina moderna completamente equipada",
    },
    {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Dormitorio principal con vestidor",
    },
    {
      url: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Baño principal con bañera",
    },
    {
      url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Terraza con vistas a la ciudad",
    },
  ],
  features: [
    "Ascensor",
    "Terraza 15m²",
    "Parking incluido",
    "Aire acondicionado",
    "Calefacción central",
    "Portero físico",
    "Reformado 2023",
    "Orientación Sur",
  ],
  yearBuilt: 1985,
  lastReform: 2023,
  energyRating: "B",
  floor: "3º",
  totalFloors: 6,
  elevator: true,
  parking: true,
  storage: true,
  terrace: true,
  garden: false,
  pool: false,
  heatingType: "Central",
  coordinates: {
    lat: 40.4378,
    lng: -3.6795,
  },
  nearbyPlaces: [
    { name: "Metro Serrano", distance: "2 min", type: "metro" },
    { name: "Parque del Retiro", distance: "5 min", type: "park" },
    { name: "El Corte Inglés", distance: "1 min", type: "shopping" },
    { name: "Colegio Santa Patricio", distance: "8 min", type: "school" },
  ],
  agent: {
    name: "María González",
    phone: "+34 600 123 456",
    email: "maria@ruehomes.com",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    // Simular carga de datos - reemplazar con llamada real a Hygraph
    const loadProperty = async () => {
      try {
        setLoading(true);
        // Aquí irá la llamada real: const data = await getPropertyById(id);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simular carga
        setProperty(mockPropertyDetail);
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="property-detail__loading">
        <div className="container py-20 text-center">
          <div className="property-detail__spinner"></div>
          <p className="font-secondary text-rust mt-4">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-primary text-rust text-4xl mb-4">
          Propiedad no encontrada
        </h1>
        <p className="font-secondary text-rust-light mb-8">
          La propiedad que buscas no existe o ha sido eliminada.
        </p>
        <Link to="/propiedades" className="btn btn-primary">
          Ver todas las propiedades
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES").format(price);
  };

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

  const getStatusLabel = (status) => {
    const statuses = {
      sale: "En Venta",
      rent: "En Alquiler",
      sold: "Vendido",
      rented: "Alquilado",
    };
    return statuses[status] || status;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="property-detail">
      {/* Carousel de Imágenes */}
      <section className="property-detail__carousel">
        <div className="property-detail__carousel-container">
          {/* Imagen principal */}
          <div className="property-detail__main-image">
            <img
              src={property.images[currentImageIndex].url}
              alt={property.images[currentImageIndex].alt}
              className="property-detail__image"
            />

            {/* Controles de navegación */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="property-detail__nav-btn property-detail__nav-btn--prev"
                  aria-label="Imagen anterior"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="property-detail__nav-btn property-detail__nav-btn--next"
                  aria-label="Imagen siguiente"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Contador */}
            <div className="property-detail__image-counter">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="property-detail__thumbnails">
              <div className="property-detail__thumbnails-scroll">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`property-detail__thumbnail ${
                      index === currentImageIndex
                        ? "property-detail__thumbnail--active"
                        : ""
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="property-detail__thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Información Principal */}
      <section className="property-detail__content">
        <div className="container">
          <div className="property-detail__grid">
            {/* Columna Principal */}
            <div className="property-detail__main-column">
              {/* Header */}
              <div className="property-detail__header">
                <div className="property-detail__header-top">
                  <div className="property-detail__badge">
                    {getStatusLabel(property.status)}
                  </div>
                  <div className="property-detail__type">
                    {getPropertyTypeLabel(property.propertyType)}
                  </div>
                </div>

                <h1 className="property-detail__title">{property.title}</h1>

                <div className="property-detail__location">
                  <svg
                    className="property-detail__location-icon"
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
                  <span>
                    {property.address}, {property.city}
                  </span>
                </div>

                <div className="property-detail__price">
                  {formatPrice(property.price)}€
                  {property.status === "rent" && (
                    <span className="property-detail__price-period">/mes</span>
                  )}
                </div>
              </div>

              {/* Características principales */}
              <div className="property-detail__key-features">
                <div className="property-detail__feature-item">
                  <svg
                    className="property-detail__feature-icon"
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
                  <div>
                    <span className="property-detail__feature-number">
                      {property.bedrooms}
                    </span>
                    <span className="property-detail__feature-label">
                      Habitaciones
                    </span>
                  </div>
                </div>

                <div className="property-detail__feature-item">
                  <svg
                    className="property-detail__feature-icon"
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
                  <div>
                    <span className="property-detail__feature-number">
                      {property.bathrooms}
                    </span>
                    <span className="property-detail__feature-label">
                      Baños
                    </span>
                  </div>
                </div>

                <div className="property-detail__feature-item">
                  <svg
                    className="property-detail__feature-icon"
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
                  <div>
                    <span className="property-detail__feature-number">
                      {property.area}
                    </span>
                    <span className="property-detail__feature-label">m²</span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="property-detail__description">
                <h2 className="property-detail__section-title">Descripción</h2>
                <p className="property-detail__description-text">
                  {property.description}
                </p>
              </div>

              {/* Características */}
              <div className="property-detail__features">
                <h2 className="property-detail__section-title">
                  Características
                </h2>
                <div className="property-detail__features-grid">
                  {property.features.map((feature, index) => (
                    <div key={index} className="property-detail__feature-tag">
                      <svg
                        className="property-detail__check-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información detallada */}
              <div className="property-detail__specs">
                <h2 className="property-detail__section-title">
                  Información Detallada
                </h2>
                <div className="property-detail__specs-grid">
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">
                      Año de construcción
                    </span>
                    <span className="property-detail__spec-value">
                      {property.yearBuilt}
                    </span>
                  </div>
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">
                      Última reforma
                    </span>
                    <span className="property-detail__spec-value">
                      {property.lastReform}
                    </span>
                  </div>
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">
                      Certificado energético
                    </span>
                    <span className="property-detail__spec-value">
                      {property.energyRating}
                    </span>
                  </div>
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">Planta</span>
                    <span className="property-detail__spec-value">
                      {property.floor}
                    </span>
                  </div>
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">
                      Plantas del edificio
                    </span>
                    <span className="property-detail__spec-value">
                      {property.totalFloors}
                    </span>
                  </div>
                  <div className="property-detail__spec-item">
                    <span className="property-detail__spec-label">
                      Calefacción
                    </span>
                    <span className="property-detail__spec-value">
                      {property.heatingType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lugares cercanos */}
              <div className="property-detail__nearby">
                <h2 className="property-detail__section-title">
                  Lugares de Interés
                </h2>
                <div className="property-detail__nearby-list">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="property-detail__nearby-item">
                      <div className="property-detail__nearby-icon">
                        {place.type === "metro" && (
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                        {place.type === "park" && (
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                        )}
                        {place.type === "shopping" && (
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        )}
                        {place.type === "school" && (
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14v7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="property-detail__nearby-info">
                        <span className="property-detail__nearby-name">
                          {place.name}
                        </span>
                        <span className="property-detail__nearby-distance">
                          a {place.distance} andando
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Lateral - Información de Contacto */}
            <div className="property-detail__sidebar">
              <div className="property-detail__contact-card">
                <div className="property-detail__agent">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="property-detail__agent-photo"
                  />
                  <div className="property-detail__agent-info">
                    <h3 className="property-detail__agent-name">
                      {property.agent.name}
                    </h3>
                    <p className="property-detail__agent-title">
                      Agente Inmobiliario
                    </p>
                  </div>
                </div>

                <div className="property-detail__contact-methods">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="property-detail__contact-btn property-detail__contact-btn--phone"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Llamar</span>
                  </a>

                  <a
                    href={`mailto:${property.agent.email}?subject=Consulta sobre ${property.title}&body=Hola, estoy interesado en esta propiedad y me gustaría obtener más información.`}
                    className="property-detail__contact-btn property-detail__contact-btn--email"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Email</span>
                  </a>

                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="property-detail__contact-btn property-detail__contact-btn--form"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>Consultar</span>
                  </button>
                </div>

                {/* Formulario de contacto expandible */}
                {showContactForm && (
                  <div className="property-detail__contact-form">
                    <form className="property-detail__form">
                      <div className="property-detail__form-group">
                        <label className="property-detail__form-label">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          className="property-detail__form-input"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="property-detail__form-group">
                        <label className="property-detail__form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="property-detail__form-input"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div className="property-detail__form-group">
                        <label className="property-detail__form-label">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          className="property-detail__form-input"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                      <div className="property-detail__form-group">
                        <label className="property-detail__form-label">
                          Mensaje
                        </label>
                        <textarea
                          className="property-detail__form-textarea"
                          placeholder="Me gustaría recibir más información sobre esta propiedad..."
                          rows="4"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="property-detail__form-submit"
                      >
                        Enviar Consulta
                      </button>
                    </form>
                  </div>
                )}

                {/* Información adicional */}
                <div className="property-detail__additional-info">
                  <div className="property-detail__info-item">
                    <span className="property-detail__info-label">
                      Referencia:
                    </span>
                    <span className="property-detail__info-value">
                      REF-{property.id.toString().padStart(4, "0")}
                    </span>
                  </div>
                  <div className="property-detail__info-item">
                    <span className="property-detail__info-label">
                      Publicado:
                    </span>
                    <span className="property-detail__info-value">
                      {new Date(property.createdAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <div className="property-detail__info-item">
                    <span className="property-detail__info-label">
                      Actualizado:
                    </span>
                    <span className="property-detail__info-value">
                      {new Date(property.updatedAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .property-detail {
          min-height: 100vh;
          background: var(--color-marble-lighter);
        }

        /* === LOADING === */
        .property-detail__loading {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .property-detail__spinner {
          width: 3rem;
          height: 3rem;
          border: 3px solid var(--color-softdune);
          border-top: 3px solid var(--color-cinnamon);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* === CAROUSEL === */
        .property-detail__carousel {
          position: relative;
          background: white;
          margin-top: 4rem;
        }

        .property-detail__carousel-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .property-detail__main-image {
          position: relative;
          height: 65vh;
          min-height: 500px;
          overflow: hidden;
        }

        .property-detail__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Controles de navegación */
        .property-detail__nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          color: var(--color-rust);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          z-index: 10;
        }

        .property-detail__nav-btn:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .property-detail__nav-btn--prev {
          left: 1.5rem;
        }

        .property-detail__nav-btn--next {
          right: 1.5rem;
        }

        .property-detail__nav-btn svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        /* Contador */
        .property-detail__image-counter {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(8px);
        }

        /* Thumbnails */
        .property-detail__thumbnails {
          padding: 1.5rem;
          background: white;
          border-top: 1px solid var(--color-softdune-light);
        }

        .property-detail__thumbnails-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: var(--color-softdune) var(--color-marble);
        }

        .property-detail__thumbnails-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .property-detail__thumbnails-scroll::-webkit-scrollbar-track {
          background: var(--color-marble);
        }

        .property-detail__thumbnails-scroll::-webkit-scrollbar-thumb {
          background: var(--color-softdune);
          border-radius: 2px;
        }

        .property-detail__thumbnail {
          flex-shrink: 0;
          width: 6rem;
          height: 4rem;
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          padding: 0;
        }

        .property-detail__thumbnail:hover {
          border-color: var(--color-cinnamon-light);
          transform: translateY(-2px);
        }

        .property-detail__thumbnail--active {
          border-color: var(--color-cinnamon);
        }

        .property-detail__thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* === CONTENIDO PRINCIPAL === */
        .property-detail__content {
          padding: 3rem 0;
        }

        .property-detail__grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
        }

        .property-detail__main-column {
          background: white;
          border-radius: 16px;
          padding: 3rem;
        }

        /* Header de la propiedad */
        .property-detail__header {
          border-bottom: 1px solid var(--color-softdune-light);
          padding-bottom: 2rem;
          margin-bottom: 3rem;
        }

        .property-detail__header-top {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .property-detail__badge {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .property-detail__type {
          background: var(--color-marble);
          color: var(--color-rust);
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .property-detail__title {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-rust);
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .property-detail__location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .property-detail__location-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--color-rust-light);
        }

        .property-detail__location span {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          color: var(--color-rust-light);
        }

        .property-detail__price {
          font-family: var(--font-primary);
          font-size: 3rem;
          font-weight: 400;
          color: var(--color-cinnamon);
          line-height: 1.1;
        }

        .property-detail__price-period {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-rust-light);
          font-weight: 400;
        }

        /* Características principales */
        .property-detail__key-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 2rem;
          background: linear-gradient(
            135deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 100%
          );
          border-radius: 16px;
        }

        .property-detail__feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }

        .property-detail__feature-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: var(--color-cinnamon);
          flex-shrink: 0;
        }

        .property-detail__feature-number {
          display: block;
          font-family: var(--font-primary);
          font-size: 2rem;
          font-weight: 400;
          color: var(--color-rust);
          line-height: 1;
        }

        .property-detail__feature-label {
          display: block;
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          color: var(--color-rust-light);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0.25rem;
        }

        /* Secciones */
        .property-detail__section-title {
          font-family: var(--font-primary);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-rust);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-softdune-light);
        }

        /* Descripción */
        .property-detail__description {
          margin-bottom: 3rem;
        }

        .property-detail__description-text {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-rust);
        }

        /* Características */
        .property-detail__features {
          margin-bottom: 3rem;
        }

        .property-detail__features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .property-detail__feature-tag {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--color-marble);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-rust);
        }

        .property-detail__check-icon {
          width: 1rem;
          height: 1rem;
          color: var(--color-cinnamon);
          flex-shrink: 0;
        }

        /* Especificaciones */
        .property-detail__specs {
          margin-bottom: 3rem;
        }

        .property-detail__specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .property-detail__spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          border: 1px solid var(--color-softdune-light);
          border-radius: 8px;
        }

        .property-detail__spec-label {
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          color: var(--color-rust-light);
          font-weight: 500;
        }

        .property-detail__spec-value {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          color: var(--color-rust);
          font-weight: 600;
        }

        /* Lugares cercanos */
        .property-detail__nearby {
          margin-bottom: 3rem;
        }

        .property-detail__nearby-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .property-detail__nearby-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--color-marble);
          border-radius: 8px;
        }

        .property-detail__nearby-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: var(--color-cinnamon);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .property-detail__nearby-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .property-detail__nearby-info {
          display: flex;
          flex-direction: column;
        }

        .property-detail__nearby-name {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-rust);
          line-height: 1.2;
        }

        .property-detail__nearby-distance {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust-light);
        }

        /* === SIDEBAR === */
        .property-detail__sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .property-detail__contact-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
        }

        .property-detail__agent {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-softdune-light);
        }

        .property-detail__agent-photo {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .property-detail__agent-name {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-rust);
          margin-bottom: 0.25rem;
        }

        .property-detail__agent-title {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust-light);
          margin: 0;
        }

        /* Métodos de contacto */
        .property-detail__contact-methods {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .property-detail__contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .property-detail__contact-btn svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .property-detail__contact-btn--phone {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
          color: white;
        }

        .property-detail__contact-btn--phone:hover {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon-dark) 0%,
            var(--color-cinnamon-darker) 100%
          );
          transform: translateY(-1px);
        }

        .property-detail__contact-btn--email {
          background: var(--color-softdune);
          color: var(--color-rust);
          border: 1px solid var(--color-softdune-dark);
        }

        .property-detail__contact-btn--email:hover {
          background: var(--color-softdune-dark);
          transform: translateY(-1px);
        }

        .property-detail__contact-btn--form {
          background: transparent;
          color: var(--color-cinnamon);
          border: 2px solid var(--color-cinnamon);
        }

        .property-detail__contact-btn--form:hover {
          background: var(--color-cinnamon);
          color: white;
          transform: translateY(-1px);
        }

        /* Formulario de contacto */
        .property-detail__contact-form {
          border-top: 1px solid var(--color-softdune-light);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .property-detail__form-group {
          margin-bottom: 1.25rem;
        }

        .property-detail__form-label {
          display: block;
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-rust);
          margin-bottom: 0.5rem;
        }

        .property-detail__form-input,
        .property-detail__form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--color-softdune);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          background: white;
          color: var(--color-rust);
          transition: all 0.3s ease;
        }

        .property-detail__form-input:focus,
        .property-detail__form-textarea:focus {
          outline: none;
          border-color: var(--color-cinnamon);
        }

        .property-detail__form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .property-detail__form-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
          color: white;
          border: none;
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .property-detail__form-submit:hover {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon-dark) 0%,
            var(--color-cinnamon-darker) 100%
          );
          transform: translateY(-1px);
        }

        /* Información adicional */
        .property-detail__additional-info {
          border-top: 1px solid var(--color-softdune-light);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        .property-detail__info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .property-detail__info-item:last-child {
          margin-bottom: 0;
        }

        .property-detail__info-label {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust-light);
          font-weight: 500;
        }

        .property-detail__info-value {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-rust);
          font-weight: 600;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .property-detail__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .property-detail__main-column {
            padding: 2rem;
          }

          .property-detail__sidebar {
            position: static;
          }

          .property-detail__key-features {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .property-detail__specs-grid,
          .property-detail__nearby-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .property-detail__main-image {
            height: 50vh;
            min-height: 350px;
          }

          .property-detail__content {
            padding: 2rem 0;
          }

          .property-detail__main-column,
          .property-detail__contact-card {
            padding: 1.5rem;
          }

          .property-detail__title {
            font-size: 2rem;
          }

          .property-detail__price {
            font-size: 2.5rem;
          }

          .property-detail__key-features {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.5rem;
          }

          .property-detail__thumbnails {
            padding: 1rem;
          }

          .property-detail__thumbnail {
            width: 5rem;
            height: 3.5rem;
          }

          .property-detail__nav-btn {
            width: 2.5rem;
            height: 2.5rem;
          }

          .property-detail__nav-btn--prev {
            left: 1rem;
          }

          .property-detail__nav-btn--next {
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .property-detail__main-image {
            height: 40vh;
            min-height: 300px;
          }

          .property-detail__header-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .property-detail__feature-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .property-detail__contact-methods {
            gap: 0.5rem;
          }

          .property-detail__contact-btn {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetail;
