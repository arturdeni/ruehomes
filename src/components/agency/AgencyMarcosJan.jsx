// src/components/agency/AgencyMarcosJan.jsx
import { useState, useEffect, useRef } from "react";
import AnimatedImageContainer from "../ui/AnimatedImageContainer";

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

const AgencyMarcosJan = () => {
  const teamMembers = [
    {
      name: "Marcos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description:
        "Se caracteriza por su dedicación y compromiso con el cliente, garantizando que cada experiencia sea clara, cómoda y satisfactoria. Gracias a su profundo conocimiento del mercado y a su amplia red de contactos, logra conectar a las personas con la propiedad adecuada, convirtiendo cada transacción en algo más que un negocio: en una experiencia auténtica y memorable.",
    },
    {
      name: "Jan",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Apasionado por ayudar a las personas a dar el siguiente paso en sus vidas, Jan combina su experiencia en el sector inmobiliario y financiero con una visión cercana y honesta. Cree que cada cliente merece atención personalizada, comunicación clara y la tranquilidad de saber que su propiedad está en buenas manos.",
    },
  ];

  return (
    <section className="agency-team-section">
      <div className="container">
        <div className="agency-team-content">
          <div className="agency-team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="agency-team-member">
                {/* Imagen del miembro */}
                <SimpleReveal
                  className="agency-team-member-image-wrapper"
                  delay={index * 0.2}
                >
                  <div className="agency-team-member-image-container">
                    <AnimatedImageContainer
                      src={member.image}
                      delay={0.3 + index * 0.2}
                    />
                  </div>
                </SimpleReveal>

                {/* Información del miembro */}
                <div className="agency-team-member-info">
                  <SimpleReveal
                    className="agency-team-member-name-wrapper"
                    delay={0.3 + index * 0.2}
                  >
                    <h3 className="agency-team-member-name">{member.name}</h3>
                  </SimpleReveal>

                  <SimpleReveal
                    className="agency-team-member-description-wrapper"
                    delay={0.5 + index * 0.2}
                  >
                    <p className="agency-team-member-description">
                      {member.description}
                    </p>
                  </SimpleReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .agency-team-section {
          padding: 10rem 0;
          background: var(--color-softdune-lighter);
        }

        .agency-team-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .agency-team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6rem;
          align-items: start;
        }

        .agency-team-member {
          text-align: center;
        }

        .agency-team-member-image-wrapper {
          margin-bottom: 2.5rem;
        }

        .agency-team-member-image-container {
          width: 280px;
          height: 280px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .agency-team-member-info {
          max-width: 450px;
          margin: 0 auto;
        }

        .agency-team-member-name-wrapper {
          margin-bottom: 1.5rem;
        }

        .agency-team-member-name {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          color: var(--color-rust);
          font-weight: 400;
          margin: 0;
        }

        .agency-team-member-description-wrapper {
          margin: 0;
        }

        .agency-team-member-description {
          font-family: var(--font-secondary);
          font-size: 1.1rem;
          color: var(--color-rust-light);
          line-height: 1.7;
          font-weight: 300;
          margin: 0;
          text-align: left;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .agency-team-section {
            padding: 8rem 0;
          }

          .agency-team-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .agency-team-member-image-container {
            width: 250px;
            height: 250px;
          }

          .agency-team-member-name {
            font-size: 2.2rem;
          }

          .agency-team-member-description {
            font-size: 1.05rem;
            text-align: center;
          }

          .agency-team-member-info {
            max-width: 500px;
          }
        }

        @media (max-width: 640px) {
          .agency-team-section {
            padding: 6rem 0;
          }

          .agency-team-grid {
            gap: 3rem;
          }

          .agency-team-member-image-container {
            width: 200px;
            height: 200px;
          }

          .agency-team-member-name {
            font-size: 1.8rem;
          }

          .agency-team-member-description {
            font-size: 1rem;
          }

          .agency-team-member-info {
            max-width: 100%;
          }

          .agency-team-member-image-wrapper {
            margin-bottom: 2rem;
          }

          .agency-team-member-name-wrapper {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyMarcosJan;
