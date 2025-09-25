// src/components/tailored-service/TailoredContact.jsx
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

const TailoredContact = () => {
  return (
    <section className="tailored-contact-section">
      <div className="container">
        <div className="tailored-contact-content">
          <SimpleReveal className="tailored-contact-subtitle-wrapper">
            <p className="tailored-contact-subtitle">
              Si lo puedes soñar, lo podemos encontrar
            </p>
          </SimpleReveal>

          <SimpleReveal className="tailored-contact-title-wrapper" delay={0.2}>
            <h2 className="tailored-contact-title">
              ¿Quieres que busquemos tu hogar ideal?
            </h2>
          </SimpleReveal>

          <SimpleReveal className="tailored-contact-button-wrapper" delay={0.4}>
            <a href="/contacto" className="btn btn-primary btn-lg">
              Contactar
            </a>
          </SimpleReveal>
        </div>
      </div>

      <style jsx>{`
        .tailored-contact-section {
          padding: 8rem 0;
          background: var(--color-marble-lighter);
        }

        .tailored-contact-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .tailored-contact-subtitle-wrapper {
          margin-bottom: 1.5rem;
        }

        .tailored-contact-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          color: var(--color-rust-light);
          font-style: italic;
          font-weight: 300;
          margin: 0;
        }

        .tailored-contact-title-wrapper {
          margin-bottom: 3rem;
        }

        .tailored-contact-title {
          font-family: var(--font-primary);
          font-size: 3.5rem;
          color: var(--color-rust);
          font-weight: 400;
          line-height: 1.2;
          margin: 0;
        }

        .tailored-contact-button-wrapper {
          margin-top: 2rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .tailored-contact-section {
            padding: 6rem 0;
          }

          .tailored-contact-title {
            font-size: 2.8rem;
          }

          .tailored-contact-subtitle {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 640px) {
          .tailored-contact-section {
            padding: 5rem 0;
          }

          .tailored-contact-title {
            font-size: 2.2rem;
          }

          .tailored-contact-subtitle {
            font-size: 1.1rem;
          }

          .tailored-contact-title-wrapper {
            margin-bottom: 2.5rem;
          }

          .tailored-contact-subtitle-wrapper {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TailoredContact;
