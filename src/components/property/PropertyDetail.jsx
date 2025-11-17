// src/components/property/PropertyDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../../services/hygraph";
import {
  optimizeImageUrl,
  validateEmail,
  validatePhone,
} from "../../utils/helpers";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Configurar Brevo
  const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const BREVO_SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL;
  const BREVO_SENDER_NAME = import.meta.env.VITE_BREVO_SENDER_NAME;

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);

        if (data) {
          // Transformar datos de Hygraph al formato del componente
          const transformedProperty = {
            ...data,
            description: data.description?.text || data.description || "",
            images:
              data.images?.map((img) => ({
                url: img.url,
                alt: img.fileName || data.title,
                fileName: img.fileName,
              })) || [],
            // Backwards compatibility: use propertyStatus as status
            status: data.propertyStatus || "sale",
            // Add missing fields with defaults
            features: data.features || [],
            nearbyPlaces: [], // Not in schema
          };
          setProperty(transformedProperty);
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error("Error loading property:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
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

  // Funciones del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "El formato del teléfono no es válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    }

    return newErrors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo al escribir
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setFormLoading(true);

    try {
      // Preparar el contenido HTML del email
      const emailHtml = `
        <h2>Nueva Consulta sobre Propiedad desde RueHomes</h2>

        <h3>Propiedad de interés:</h3>
        <ul>
          <li><strong>Título:</strong> ${property.title}</li>
          <li><strong>Referencia:</strong> REF-${property.reference}</li>
          <li><strong>Precio:</strong> ${formatPrice(property.price)}€</li>
          <li><strong>Ubicación:</strong> ${property.address}, ${
        property.city
      }</li>
          <li><strong>Tipo:</strong> ${getPropertyTypeDisplayName(
            property.propertyType
          )}</li>
        </ul>

        <h3>Datos del contacto:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Teléfono:</strong> ${formData.phone}</li>
        </ul>

        <h3>Mensaje:</h3>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>

        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de consulta de propiedad de RueHomes.</small></p>
      `;

      // Enviar email usando Brevo API
      if (BREVO_API_KEY) {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: BREVO_SENDER_NAME || "RueHomes",
              email: BREVO_SENDER_EMAIL || "info@ruehomes.com",
            },
            to: [
              {
                email: "info@ruehomes.com",
                name: "RueHomes",
              },
            ],
            subject: `Consulta sobre: ${property.title} (REF-${property.reference})`,
            htmlContent: emailHtml,
            replyTo: {
              email: formData.email,
              name: formData.name,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Error al enviar el email");
        }
      } else {
        console.warn("Brevo no configurado. Simulando envío...");
        // Simular delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setFormSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setFormErrors({});

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setFormSuccess(false);
        setShowContactForm(false);
      }, 5000);
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setFormErrors({
        submit: "Error al enviar el formulario. Por favor, inténtelo de nuevo.",
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="property-detail">
      {/* Carousel de Imágenes */}
      <section className="property-detail__carousel">
        <div className="property-detail__carousel-container">
          {/* Imagen principal */}
          <div className="property-detail__main-image">
            <img
              src={optimizeImageUrl(property.images[currentImageIndex].url, {
                width: 1400,
                quality: 85,
              })}
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
                      src={optimizeImageUrl(image.url, {
                        width: 150,
                        height: 100,
                        quality: 75,
                      })}
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
                    {getStatusDisplayName(property.status)}
                  </div>
                  <div className="property-detail__type">
                    {getPropertyTypeDisplayName(property.propertyType)}
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
                  {property.status === "enAlquiler" && (
                    <span className="property-detail__price-period">/mes</span>
                  )}
                </div>
              </div>

              {/* Características principales */}
              <div className="property-detail__key-features">
                <div className="property-detail__feature-item">
                  <HotelIcon className="property-detail__feature-icon" />
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
                  <BathtubIcon className="property-detail__feature-icon" />
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
                  <SquareFootIcon className="property-detail__feature-icon" />
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
                  {property.description
                    .split(/\\n|\n/)
                    .map((line, index, array) => (
                      <span key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </span>
                    ))}
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
              {/* <div className="property-detail__specs">
                <h2 className="property-detail__section-title">
                  Información Detallada
                </h2>
                <div className="property-detail__specs-grid">
                  {property.yearBuilt && (
                    <div className="property-detail__spec-item">
                      <span className="property-detail__spec-label">
                        Año de construcción
                      </span>
                      <span className="property-detail__spec-value">
                        {property.yearBuilt}
                      </span>
                    </div>
                  )}
                  {property.energyRating && (
                    <div className="property-detail__spec-item">
                      <span className="property-detail__spec-label">
                        Certificado energético
                      </span>
                      <span className="property-detail__spec-value">
                        {property.energyRating}
                      </span>
                    </div>
                  )}
                </div>
              </div> */}

              {/* Lugares cercanos - Hidden if no data */}
              {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
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
              )}
            </div>

            {/* Columna Lateral - Información de Contacto */}
            <div className="property-detail__sidebar">
              <div className="property-detail__contact-card">
                <h3 className="property-detail__contact-title">
                  ¿Te interesa esta propiedad?
                </h3>
                <p className="property-detail__contact-subtitle">
                  Contáctanos para más información
                </p>

                <div className="property-detail__contact-methods">
                  <a
                    href="tel:+34642711331"
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
                    href={`mailto:info@ruehomes.com?subject=Consulta sobre ${property.title}&body=Hola, estoy interesado en esta propiedad (REF ${property.reference}) y me gustaría obtener más información.`}
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
                    {formSuccess ? (
                      <div className="property-detail__form-success">
                        <div className="success-icon">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <h4 className="success-title">¡Mensaje enviado!</h4>
                        <p className="success-text">
                          Gracias por tu interés. Nos pondremos en contacto
                          contigo lo antes posible.
                        </p>
                      </div>
                    ) : (
                      <form
                        className="property-detail__form"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="property-detail__form-group">
                          <label className="property-detail__form-label">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className={`property-detail__form-input ${
                              formErrors.name ? "error" : ""
                            }`}
                            placeholder="Tu nombre"
                          />
                          {formErrors.name && (
                            <span className="property-detail__form-error">
                              {formErrors.name}
                            </span>
                          )}
                        </div>
                        <div className="property-detail__form-group">
                          <label className="property-detail__form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className={`property-detail__form-input ${
                              formErrors.email ? "error" : ""
                            }`}
                            placeholder="tu@email.com"
                          />
                          {formErrors.email && (
                            <span className="property-detail__form-error">
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                        <div className="property-detail__form-group">
                          <label className="property-detail__form-label">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className={`property-detail__form-input ${
                              formErrors.phone ? "error" : ""
                            }`}
                            placeholder="+34 600 000 000"
                          />
                          {formErrors.phone && (
                            <span className="property-detail__form-error">
                              {formErrors.phone}
                            </span>
                          )}
                        </div>
                        <div className="property-detail__form-group">
                          <label className="property-detail__form-label">
                            Mensaje
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleFormChange}
                            className={`property-detail__form-textarea ${
                              formErrors.message ? "error" : ""
                            }`}
                            placeholder="Me gustaría recibir más información sobre esta propiedad..."
                            rows="4"
                          ></textarea>
                          {formErrors.message && (
                            <span className="property-detail__form-error">
                              {formErrors.message}
                            </span>
                          )}
                        </div>
                        {formErrors.submit && (
                          <div className="property-detail__form-submit-error">
                            <p>{formErrors.submit}</p>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={formLoading}
                          className={`property-detail__form-submit ${
                            formLoading ? "loading" : ""
                          }`}
                        >
                          {formLoading ? (
                            <span className="loading-content">
                              <div className="loading-spinner"></div>
                              Enviando...
                            </span>
                          ) : (
                            "Enviar Consulta"
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Información adicional */}
                <div className="property-detail__additional-info">
                  <div className="property-detail__info-item">
                    <span className="property-detail__info-label">
                      Referencia Rue Homes:
                    </span>
                    <span className="property-detail__info-value">
                      REF-{property.reference}
                    </span>
                  </div>
                  <div className="property-detail__info-item">
                    <span className="property-detail__info-label">
                      Referencia Web:
                    </span>
                    <span className="property-detail__info-value">
                      {property.id.toString().padStart(4, "0")}
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
          font-family: var(--font-titles);
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
          font-family: var(--font-titles);
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
          font-family: var(--font-titles);
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

        .property-detail__contact-title {
          font-family: var(--font-titles);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-rust);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .property-detail__contact-subtitle {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          color: var(--color-rust-light);
          text-align: center;
          margin-bottom: 2rem;
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

        .property-detail__form-input.error,
        .property-detail__form-textarea.error {
          border-color: var(--color-error);
        }

        .property-detail__form-error {
          display: block;
          font-family: var(--font-secondary);
          font-size: 0.75rem;
          color: var(--color-error);
          margin-top: 0.25rem;
        }

        .property-detail__form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .property-detail__form-submit-error {
          background: var(--color-marble);
          border: 1px solid var(--color-error);
          border-radius: 8px;
          padding: 0.75rem;
          margin-bottom: 1rem;
        }

        .property-detail__form-submit-error p {
          font-family: var(--font-secondary);
          font-size: 0.85rem;
          color: var(--color-error);
          margin: 0;
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

        .property-detail__form-submit:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon-dark) 0%,
            var(--color-cinnamon-darker) 100%
          );
          transform: translateY(-1px);
        }

        .property-detail__form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Mensaje de éxito */
        .property-detail__form-success {
          text-align: center;
          padding: 2rem 1rem;
        }

        .property-detail__form-success .success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: var(--color-cinnamon);
          color: white;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .property-detail__form-success .success-title {
          font-family: var(--font-primary);
          font-size: 1.25rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 0.5rem;
        }

        .property-detail__form-success .success-text {
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          color: var(--color-rust-light);
          line-height: 1.5;
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

          .property-detail__feature-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            padding: 1rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .property-detail__feature-icon {
            width: 2.5rem;
            height: 2.5rem;
            flex-shrink: 0;
          }

          .property-detail__feature-item > div {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
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
          .property-detail__description-text {
            font-size: 1rem;
            line-height: 1.6;
          }

          .property-detail__main-image {
            height: 40vh;
            min-height: 300px;
          }

          .property-detail__header-top {
            flex-direction: column;
            align-items: flex-start;
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
