// src/components/tailored-service/TailoredMain.jsx
import { useState, useEffect, useRef } from "react";

// Importar los iconos de Material UI
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

// Componente ScrollReveal simplificado para evitar dependencias
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

const TailoredMain = () => {
  const processSteps = [
    {
      number: "1",
      title: "Cuéntanos tu necesidad",
      description:
        "Explícanos las características, ubicación y presupuesto del inmueble que deseas comprar o alquilar.",
    },
    {
      number: "2",
      title: "Nos ponemos en marcha",
      description:
        "Nuestro equipo realiza una búsqueda integral en todo el mercado, accediendo a oportunidades exclusivas más allá de los listados públicos.",
    },
    {
      number: "3",
      title: "Selección exclusiva",
      description:
        "Recibirás únicamente las propiedades que cumplan al 100% con tus requisitos.",
    },
    {
      number: "4",
      title: "Acompañamiento completo",
      description:
        "Te acompañamos en todo el proceso, desde la primera visita hasta la firma final con nuestro equipo comercial y legal.",
    },
  ];

  const benefits = [
    {
      title: "Exclusividad",
      description:
        "Acceso privilegiado a propiedades únicas a través de nuestra amplia red de contactos.",
      icon: DiamondOutlinedIcon,
    },
    {
      title: "Ahorro de tiempo",
      description:
        "Recibes únicamente propiedades que cumplen al 100% con tus necesidades, evitando búsquedas interminables en portales o visitas innecesarias.",
      icon: AccessTimeOutlinedIcon,
    },
    {
      title: "Personalización total",
      description:
        "Cada búsqueda se adapta a tus criterios exactos para ofrecer solo opciones que cumplan con tus necesidades.",
      icon: TuneOutlinedIcon,
    },
    {
      title: "Confianza y discreción",
      description:
        "Gestionamos tu búsqueda y transacción con la máxima profesionalidad y absoluta confidencialidad.",
      icon: VerifiedUserOutlinedIcon,
    },
  ];

  return (
    <div className="tailored-main">
      {/* Cómo funciona Section */}
      <section className="tailored-process-section">
        <div className="container">
          <SimpleReveal className="tailored-process-header">
            <h2 className="tailored-process-title">
              ¿Cómo funciona Rue Homes Tailored?
            </h2>
          </SimpleReveal>

          <div className="tailored-process-grid">
            {processSteps.map((step, index) => (
              <SimpleReveal
                key={index}
                className="tailored-process-card"
                delay={index * 0.15}
              >
                <div className="tailored-process-number">{step.number}</div>
                <h3 className="tailored-process-card-title">{step.title}</h3>
                <p className="tailored-process-card-description">
                  {step.description}
                </p>
              </SimpleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegir Section */}
      <section className="tailored-benefits-section">
        <div className="container">
          <SimpleReveal className="tailored-benefits-header">
            <h2 className="tailored-benefits-title">
              ¿Por qué elegir Rue Homes Tailored?
            </h2>
          </SimpleReveal>

          <div className="tailored-benefits-grid">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <SimpleReveal
                  key={index}
                  className="tailored-benefit-item"
                  delay={index * 0.1}
                >
                  <div className="tailored-benefit-icon">
                    <IconComponent className="mui-icon" />
                  </div>
                  <h3 className="tailored-benefit-title">{benefit.title}</h3>
                  <p className="tailored-benefit-description">
                    {benefit.description}
                  </p>
                </SimpleReveal>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .tailored-main {
          min-height: 100vh;
        }

        /* ===== PROCESS SECTION ===== */
        .tailored-process-section {
          padding: 7rem 0 1rem;
          background: white;
        }

        .tailored-process-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .tailored-process-title {
          font-family: var(--font-titles);
          font-size: 3rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .tailored-process-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tailored-process-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: var(--color-marble-lighter);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tailored-process-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .tailored-process-number {
          width: 60px;
          height: 60px;
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
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 auto 1.5rem;
        }

        .tailored-process-card-title {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-rust);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .tailored-process-card-description {
          font-family: var(--font-secondary);
          color: var(--color-rust-light);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* ===== BENEFITS SECTION ===== */
        .tailored-benefits-section {
          padding: 8rem 0;
          background: white;
        }

        .tailored-benefits-header {
          margin-bottom: 4rem;
          text-align: center;
        }

        .tailored-benefits-title {
          font-family: var(--font-titles);
          font-size: 3rem;
          color: var(--color-rust);
          font-weight: 400;
        }

        .tailored-benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .tailored-benefit-item {
          text-align: center;
        }

        .tailored-benefit-icon {
          margin: 0 auto 2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tailored-benefit-icon svg {
          font-size: 2.5rem;
          color: var(--color-rust);
          transition: all 0.3s ease;
        }

        .tailored-benefit-item:hover .tailored-benefit-icon :global(.mui-icon) {
          transform: translateY(-4px);
          color: var(--color-cinnamon);
        }

        .tailored-benefit-title {
          font-family: var(--font-titles);
          font-size: 1.4rem;
          color: var(--color-rust);
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .tailored-benefit-description {
          font-family: var(--font-secondary);
          color: var(--color-rust-light);
          line-height: 1.6;
          font-size: 0.95rem;
          font-weight: 300;
        }

        /* ===== RESPONSIVE DESIGN ===== */

        /* Tablets grandes y laptops pequeños */
        @media (max-width: 1024px) {
          .tailored-benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 4rem 3rem;
            max-width: 700px;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .tailored-process-section,
          .tailored-benefits-section {
            padding: 6rem 0;
          }

          .tailored-process-title,
          .tailored-benefits-title {
            font-size: 2.5rem;
          }

          .tailored-process-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
          }

          .tailored-benefits-grid {
            gap: 3rem 2rem;
          }

          .tailored-benefit-icon :global(.mui-icon) {
            font-size: 40px;
          }

          .tailored-benefit-title {
            font-size: 1.2rem;
            margin-bottom: 0.8rem;
          }

          .tailored-benefit-description {
            font-size: 0.9rem;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .tailored-process-section,
          .tailored-benefits-section {
            padding: 4rem 0;
          }

          .tailored-process-title,
          .tailored-benefits-title {
            font-size: 2rem;
          }

          .tailored-process-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 2rem;
          }

          .tailored-process-card {
            padding: 2rem 1.5rem;
          }

          .tailored-benefits-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            max-width: 400px;
          }

          .tailored-benefit-icon :global(.mui-icon) {
            font-size: 44px;
          }

          .tailored-benefit-title {
            font-size: 1.3rem;
          }
        }

        /* Mobile muy pequeño */
        @media (max-width: 480px) {
          .tailored-process-section,
          .tailored-benefits-section {
            padding: 3rem 0;
          }

          .tailored-benefits-grid {
            gap: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TailoredMain;
