// src/components/tailored-service/TailoredMain.jsx
import { useState, useEffect, useRef } from "react";
import AnimatedImageContainer from "../ui/AnimatedImageContainer";

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
    },
    {
      title: "Ahorro de tiempo",
      description:
        "Recibes únicamente propiedades que cumplen al 100% con tus necesidades, evitando búsquedas interminables en portales o visitas innecesarias.",
    },
    {
      title: "Personalización total",
      description:
        "Cada búsqueda se adapta a tus criterios exactos para ofrecer solo opciones que cumplan con tus necesidades.",
    },
    {
      title: "Confianza y discreción",
      description:
        "Gestionamos tu búsqueda y transacción con la máxima profesionalidad y absoluta confidencialidad.",
    },
  ];

  return (
    <div className="tailored-main">
      {/* Hero Section */}
      <section className="tailored-intro-section">
        <div className="container">
          <div className="tailored-intro-content">
            {/* Contenido de texto */}
            <div className="tailored-intro-text">
              <SimpleReveal className="tailored-intro-title-wrapper">
                <h1 className="tailored-intro-title">
                  Rue Homes{" "}
                  <span className="tailored-title-highlight">Tailored</span>
                </h1>
              </SimpleReveal>

              <SimpleReveal
                className="tailored-intro-description-wrapper"
                delay={0.2}
              >
                <p className="tailored-intro-description">
                  Nuestro servicio más{" "}
                  <strong>personalizado y exclusivo</strong>, pensado para
                  clientes exigentes que valoran la{" "}
                  <strong>
                    excelencia, la privacidad y el cuidado en cada detalle
                  </strong>
                  , y que buscan{" "}
                  <strong>
                    optimizar su tiempo mientras encuentran su hogar ideal
                  </strong>
                  .
                </p>
              </SimpleReveal>
            </div>

            {/* Imagen principal */}
            <div className="tailored-intro-visual">
              <div className="tailored-intro-image-wrapper">
                <AnimatedImageContainer
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="tailored-benefits-content">
            {/* Imagen lateral */}
            <div className="tailored-benefits-visual">
              <div className="tailored-benefits-image-wrapper">
                <AnimatedImageContainer
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  delay={0.2}
                />
              </div>
            </div>

            {/* Contenido de texto */}
            <div className="tailored-benefits-text">
              <SimpleReveal className="tailored-benefits-header">
                <h2 className="tailored-benefits-title">
                  ¿Por qué elegir Rue Homes Tailored?
                </h2>
              </SimpleReveal>

              <div className="tailored-benefits-list">
                {benefits.map((benefit, index) => (
                  <SimpleReveal
                    key={index}
                    className="tailored-benefit-card"
                    delay={index * 0.1}
                  >
                    <div className="tailored-benefit-content">
                      <h3 className="tailored-benefit-title">
                        {benefit.title}
                      </h3>
                      <p className="tailored-benefit-description">
                        {benefit.description}
                      </p>
                    </div>
                  </SimpleReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tailored-main {
          min-height: 100vh;
        }

        /* ===== INTRO SECTION ===== */
        .tailored-intro-section {
          padding: 8rem 0;
          background: var(--color-marble-lighter);
          background: linear-gradient(
            135deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 100%
          );
        }

        .tailored-intro-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          min-height: 60vh;
        }

        .tailored-intro-title-wrapper {
          margin-bottom: 1.5rem;
        }

        .tailored-intro-title {
          font-family: var(--font-primary);
          font-size: 4rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 2rem;
          line-height: 1.1;
        }

        .tailored-title-highlight {
          color: var(--color-cinnamon);
        }

        .tailored-intro-description-wrapper {
          margin-bottom: 2rem;
        }

        .tailored-intro-description {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-rust-light);
          line-height: 1.7;
          font-weight: 300;
        }

        .tailored-intro-description strong {
          color: var(--color-rust);
          font-weight: 500;
        }

        .tailored-intro-image-wrapper {
          width: 100%;
          height: 500px;
          position: relative;
        }

        /* ===== PROCESS SECTION ===== */
        .tailored-process-section {
          padding: 10rem 0;
          background: white;
        }

        .tailored-process-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .tailored-process-title {
          font-family: var(--font-primary);
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
          padding: 10rem 0;
          background: var(--color-softdune-lighter);
        }

        .tailored-benefits-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .tailored-benefits-image-wrapper {
          width: 100%;
          height: 1000px;
          position: relative;
        }

        .tailored-benefits-header {
          margin-bottom: 2rem;
        }

        .tailored-benefits-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .tailored-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .tailored-benefit-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .tailored-benefit-card:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .tailored-benefit-title {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-rust);
          font-weight: 600;
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .tailored-benefit-title::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: var(--color-cinnamon);
          border-radius: 50%;
        }

        .tailored-benefit-description {
          font-family: var(--font-secondary);
          color: var(--color-rust-light);
          line-height: 1.6;
          font-size: 0.95rem;
          padding-left: 1.5rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .tailored-intro-content,
          .tailored-benefits-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .tailored-intro-title {
            font-size: 3rem;
          }

          .tailored-process-title,
          .tailored-benefits-title {
            font-size: 2.5rem;
          }

          .tailored-intro-image-wrapper,
          .tailored-benefits-image-wrapper {
            height: 400px;
          }

          .tailored-intro-section {
            padding: 6rem 0;
          }

          .tailored-process-section,
          .tailored-benefits-section {
            padding: 8rem 0;
          }

          .tailored-process-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .tailored-intro-title {
            font-size: 2.5rem;
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

          .tailored-benefits-list {
            gap: 1.5rem;
          }

          .tailored-benefit-card {
            padding: 1.5rem;
          }

          .tailored-intro-image-wrapper,
          .tailored-benefits-image-wrapper {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default TailoredMain;
