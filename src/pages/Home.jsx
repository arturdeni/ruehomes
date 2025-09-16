// src/pages/Home.jsx - Versión con Hero Parallax
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero/hero-background.webp";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/propiedades?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  // Datos temporales de propiedades destacadas
  const featuredProperties = [
    {
      id: 1,
      title: "Casa Familiar en Zona Residencial",
      price: 485000,
      type: "Casa",
      bedrooms: 4,
      bathrooms: 3,
      area: 185,
      description:
        "Amplia casa familiar con jardín privado, perfecta para familias que buscan tranquilidad.",
    },
    {
      id: 2,
      title: "Piso Moderno en el Centro",
      price: 320000,
      type: "Piso",
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      description:
        "Piso completamente reformado en pleno centro con todas las comodidades modernas.",
    },
    {
      id: 3,
      title: "Casa con Vistas Panorámicas",
      price: 675000,
      type: "Casa",
      bedrooms: 5,
      bathrooms: 3,
      area: 240,
      description:
        "Exclusiva casa con vistas espectaculares y acabados de lujo en zona privilegiada.",
    },
  ];

  const services = [
    {
      title: "Comprar",
      description:
        "Encuentra la propiedad perfecta con nuestra amplia selección y asesoramiento personalizado de nuestros expertos",
      link: "/propiedades",
      buttonText: "Ver Propiedades",
      icon: (
        <svg
          className="service-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "Vender",
      description:
        "Vendemos tu propiedad al mejor precio con estrategias de marketing innovadoras y seguimiento personalizado",
      link: "/vender",
      buttonText: "Valorar Propiedad",
      icon: (
        <svg
          className="service-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      title: "Premium",
      description:
        "Servicios exclusivos para clientes VIP con atención personalizada 24/7 y acceso a propiedades únicas",
      link: "/tailored-services",
      buttonText: "Descubrir Más",
      icon: (
        <svg
          className="service-icon"
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
      ),
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section con Parallax */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Rue Homes</h1>
            <p className="hero-subtitle">
              Encuentra un lugar al que llamar hogar
            </p>

            {/* Buscador */}
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Dónde te gustaría vivir?"
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <svg
                    className="search-icon"
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
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Propiedades Destacadas</h2>
            <p className="section-subtitle">
              Descubre nuestra selección de propiedades exclusivas,
              cuidadosamente elegidas para ti
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <div key={property.id} className="property-card">
                {/* Imagen placeholder */}
                <div className="property-image">
                  <div className="property-image-placeholder">
                    <svg
                      className="property-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>

                  {/* Badge */}
                  <div className="property-badge">
                    <span>Destacado</span>
                  </div>
                </div>

                <div className="property-content">
                  <div className="property-header">
                    <h3 className="property-title">{property.title}</h3>
                    <span className="property-price">
                      €{(property.price / 1000).toFixed(0)}K
                    </span>
                  </div>

                  <p className="property-description">{property.description}</p>

                  {/* Características */}
                  <div className="property-features">
                    <div className="feature-item">
                      <svg
                        className="feature-icon"
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
                      <span>{property.bedrooms} hab.</span>
                    </div>
                    <div className="feature-item">
                      <svg
                        className="feature-icon"
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
                      <span>{property.bathrooms} baños</span>
                    </div>
                    <div className="feature-item">
                      <svg
                        className="feature-icon"
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
                      <span>{property.area}m²</span>
                    </div>
                  </div>

                  <Link
                    to={`/propiedad/${property.id}`}
                    className="btn btn-primary w-full"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/propiedades" className="btn btn-secondary btn-lg">
              Ver todas las propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Soluciones completas para todas tus necesidades inmobiliarias
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-content">
                  <div className="service-icon-container">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <Link to={service.link} className="btn btn-outline">
                    {service.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para encontrar tu nuevo hogar?</h2>
            <p className="cta-subtitle">
              Nuestro equipo de expertos está aquí para ayudarte en cada paso
              del proceso. Contáctanos hoy y comienza tu búsqueda.
            </p>
            <div className="cta-actions">
              <Link to="/contacto" className="btn btn-primary btn-lg cta-btn">
                Contactar Ahora
              </Link>
              <Link
                to="/propiedades"
                className="btn btn-outline btn-lg cta-btn cta-btn-outline"
              >
                Ver Propiedades
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }

        /* === HERO SECTION CON PARALLAX === */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh; /* Más alto para el efecto parallax */
          background-image: url("${heroImage}");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          z-index: -2;
          will-change: transform;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(72, 50, 40, 0.8) 0%,
            rgba(154, 116, 78, 0.6) 50%,
            rgba(72, 50, 40, 0.8) 100%
          );
          z-index: -1;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-title {
          font-family: var(--font-primary);
          font-size: 5rem;
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          letter-spacing: 1px;
        }

        .hero-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          color: var(--color-beige-lighter);
          margin-bottom: 4rem;
          line-height: 1.4;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .search-form {
          margin-bottom: 0;
        }

        .search-container {
          display: flex;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 60px;
          padding: 9px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          max-width: 550px;
          margin: 0 auto;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 1rem 1rem;
          font-size: 1rem;
          color: var(--color-marron);
          font-family: var(--font-secondary);
          background: transparent;
          font-weight: 400;
        }

        .search-input::placeholder {
          color: var(--color-gray-500);
          font-weight: 300;
        }

        .search-button {
          background: linear-gradient(
            135deg,
            var(--color-camel) 0%,
            var(--color-camel-dark) 100%
          );
          border: none;
          border-radius: 50px;
          padding: 1.2rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(154, 116, 78, 0.3);
        }

        .search-button:hover {
          background: linear-gradient(
            135deg,
            var(--color-camel-dark) 0%,
            var(--color-camel-darker) 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(154, 116, 78, 0.4);
        }

        .search-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        /* Eliminar estilos no utilizados */

        /* === FEATURED SECTION === */
        .featured-section {
          padding: 8rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-marron);
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-marron-light);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .property-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--color-beige-light);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }

        .property-image {
          height: 220px;
          position: relative;
          background: linear-gradient(
            135deg,
            var(--color-beige-lighter) 0%,
            var(--color-beige) 100%
          );
        }

        .property-image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .property-icon {
          width: 60px;
          height: 60px;
          color: var(--color-camel);
          opacity: 0.7;
        }

        .property-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--color-camel);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(154, 116, 78, 0.3);
        }

        .property-content {
          padding: 2rem;
        }

        .property-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .property-title {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          color: var(--color-marron);
          margin: 0;
          flex: 1;
          margin-right: 1rem;
        }

        .property-price {
          font-family: var(--font-primary);
          font-size: 2rem;
          color: var(--color-camel);
          font-weight: 700;
        }

        .property-description {
          color: var(--color-marron-light);
          margin-bottom: 1.5rem;
          font-family: var(--font-secondary);
          line-height: 1.6;
        }

        .property-features {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-marron-light);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
        }

        .feature-icon {
          width: 18px;
          height: 18px;
          color: var(--color-camel);
        }

        .section-cta {
          text-align: center;
        }

        /* === SERVICES SECTION === */
        .services-section {
          padding: 8rem 0;
          background: var(--color-beige-lighter);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--color-beige);
          transition: all 0.3s ease;
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        }

        .service-content {
          padding: 3rem 2rem;
        }

        .service-icon-container {
          width: 80px;
          height: 80px;
          background: linear-gradient(
            135deg,
            var(--color-beige-light) 0%,
            var(--color-beige) 100%
          );
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 0 4px 16px rgba(215, 192, 160, 0.3);
        }

        .service-icon {
          width: 40px;
          height: 40px;
          color: var(--color-camel);
        }

        .service-title {
          font-family: var(--font-primary);
          font-size: 2rem;
          color: var(--color-marron);
          margin-bottom: 1rem;
        }

        .service-description {
          color: var(--color-marron-light);
          margin-bottom: 2rem;
          font-family: var(--font-secondary);
          line-height: 1.6;
        }

        /* === CTA SECTION === */
        .cta-section {
          padding: 8rem 0;
          background: linear-gradient(
            135deg,
            var(--color-marron) 0%,
            var(--color-marron-darker) 100%
          );
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 70%
          );
          pointer-events: none;
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .cta-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-beige-light);
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          min-width: 200px;
        }

        .cta-btn-outline {
          background: transparent;
          color: var(--color-beige-light);
          border: 2px solid var(--color-beige-light);
        }

        .cta-btn-outline:hover {
          background: var(--color-beige-light);
          color: var(--color-marron);
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .hero-background {
            background-attachment: scroll; /* Mejor performance en móviles */
            height: 100vh;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 3rem;
          }

          .search-container {
            max-width: 90%;
            padding: 10px;
          }

          .search-input {
            padding: 1rem 2rem;
            font-size: 1.1rem;
          }

          .search-button {
            padding: 1rem 1.5rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .properties-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .cta-title {
            font-size: 2.5rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .property-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .property-features {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }

        /* === OPTIMIZACIÓN PARALLAX === */
        @media (prefers-reduced-motion: reduce) {
          .hero-background {
            transform: none !important;
          }
        }

        /* Mejora performance en dispositivos móviles */
        @media (max-width: 1024px) {
          .hero-background {
            transform: none !important;
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
