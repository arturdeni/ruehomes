// src/components/agency/AgencyAboutUs.jsx
import { useState, useEffect, useRef } from "react";

// Componente ScrollReveal simplificado reutilizado
const SimpleReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
};

const AgencyAboutUs = () => {
  const services = [
    {
      number: "1",
      title: "Valoración gratuita y sin compromiso:",
      description: "ofrecemos información clara y realista sobre tu propiedad.",
    },
    {
      number: "2",
      title: "Máxima visibilidad:",
      description:
        "fotografía, vídeo, tour virtual y campañas en los canales más destacados.",
    },
    {
      number: "3",
      title: "Acompañamiento en la compra:",
      description:
        "ayudamos a encontrar la vivienda que se adapte a ti y a tu estilo de vida.",
    },
    {
      number: "4",
      title: "Asesoramiento completo:",
      description:
        "gestionamos todos los trámites legales y burocráticos para que el proceso sea sencillo.",
    },
    {
      number: "5",
      title: "Venta ágil y segura:",
      description:
        "cuidamos cada detalle para que la experiencia sea tranquila y efectiva.",
    },
  ];

  return (
    <section className="agency-about-section">
      <div className="container">
        <div className="agency-about-content">
          {/* Qué hacemos */}
          <div className="agency-services-block">
            <SimpleReveal className="agency-services-title-wrapper">
              <h2 className="agency-services-title">¿Qué hacemos?</h2>
            </SimpleReveal>

            <div className="agency-services-list">
              {services.map((service, index) => (
                <SimpleReveal
                  key={service.number}
                  className="agency-service-item"
                  delay={0.1 + index * 0.1}
                >
                  <div className="agency-service-number">{service.number}</div>
                  <div className="agency-service-content">
                    <span className="agency-service-title">
                      {service.title}
                    </span>
                    <span className="agency-service-description">
                      {service.description}
                    </span>
                  </div>
                </SimpleReveal>
              ))}
            </div>
          </div>

          {/* Nuestra filosofía */}
          <div className="agency-philosophy-block">
            <SimpleReveal
              className="agency-philosophy-title-wrapper"
              delay={0.8}
            >
              <h2 className="agency-philosophy-title">Nuestra filosofía</h2>
            </SimpleReveal>

            <SimpleReveal
              className="agency-philosophy-text-wrapper"
              delay={1.0}
            >
              <p className="agency-philosophy-text">
                En Rue Homes creemos que comprar o vender una vivienda no es
                solo una operación inmobiliaria, sino uno de los momentos más
                importantes en la vida de las personas. Por eso acompañamos a
                nuestros clientes de principio a fin, haciendo que el proceso
                sea <strong>fácil, cómodo y satisfactorio</strong>, y
                asegurándonos de que tomen la mejor decisión posible.
              </p>
            </SimpleReveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agency-about-section {
          padding: 10rem 0;
          background: var(--color-marble-light);
        }

        .agency-about-content {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 8rem;
        }

        /* ===== SERVICIOS SECTION ===== */
        .agency-services-title-wrapper {
          margin-bottom: 4rem;
          text-align: center;
        }

        .agency-services-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-rust);
          font-weight: 400;
          margin: 0;
          position: relative;
        }

        .agency-services-title::after {
          content: "";
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-light) 100%
          );
          border-radius: 2px;
        }

        .agency-services-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .agency-service-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: linear-gradient(
            135deg,
            var(--color-softdune-lighter) 0%,
            var(--color-softdune-light) 100%
          );
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .agency-service-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
          font-size: 1.2rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .agency-service-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .agency-service-title {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          color: var(--color-rust);
          font-weight: 600;
        }

        .agency-service-description {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust-light);
          line-height: 1.6;
          font-weight: 300;
        }

        /* ===== FILOSOFÍA SECTION ===== */
        .agency-philosophy-title-wrapper {
          margin-bottom: 3rem;
          text-align: center;
        }

        .agency-philosophy-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-rust);
          font-weight: 400;
          margin: 0;
          position: relative;
        }

        .agency-philosophy-title::after {
          content: "";
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-light) 100%
          );
          border-radius: 2px;
        }

        .agency-philosophy-text-wrapper {
          max-width: 700px;
          margin: 0 auto;
        }

        .agency-philosophy-text {
          font-family: var(--font-secondary);
          font-size: 1.3rem;
          color: var(--color-rust-light);
          line-height: 1.7;
          font-weight: 300;
          text-align: center;
          margin: 0;
        }

        .agency-philosophy-text strong {
          color: var(--color-rust);
          font-weight: 500;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .agency-about-section {
            padding: 8rem 0;
          }

          .agency-about-content {
            gap: 6rem;
          }

          .agency-services-title,
          .agency-philosophy-title {
            font-size: 2.5rem;
          }

          .agency-service-item {
            padding: 1.5rem;
            gap: 1.5rem;
          }

          .agency-service-number {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }

          .agency-philosophy-text {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 640px) {
          .agency-about-section {
            padding: 6rem 0;
          }

          .agency-about-content {
            gap: 4rem;
          }

          .agency-services-title,
          .agency-philosophy-title {
            font-size: 2rem;
          }

          .agency-service-item {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
            padding: 1.5rem;
          }

          .agency-service-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            align-self: center;
          }

          .agency-service-title {
            font-size: 1rem;
          }

          .agency-service-description {
            font-size: 0.95rem;
          }

          .agency-philosophy-text {
            font-size: 1.1rem;
            text-align: left;
          }

          .agency-services-title-wrapper,
          .agency-philosophy-title-wrapper {
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyAboutUs;
