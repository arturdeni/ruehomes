// src/components/home/ValoresSection.jsx - Versión minimalista
import { useEffect, useRef } from "react";

// Importar los iconos PNG
import transparenciaIcon from "../../assets/images/valores/eye.png";
import profesionalidadIcon from "../../assets/images/valores/professional.png";
import confianzaIcon from "../../assets/images/valores/handshake.png";
import excelenciaIcon from "../../assets/images/valores/excelence.png";

const ValoresSection = () => {
  const sectionRef = useRef(null);
  const valoresRef = useRef([]);

  const valores = [
    {
      title: "Transparencia",
      description:
        "Comunicación honesta y clara en cada paso del proceso, sin sorpresas ni comisiones ocultas.",
      icon: transparenciaIcon,
    },
    {
      title: "Profesionalidad",
      description:
        "Equipo altamente cualificado con años de experiencia en el sector inmobiliario.",
      icon: profesionalidadIcon,
    },
    {
      title: "Confianza",
      description:
        "Más de 15 años construyendo relaciones duraderas basadas en la confianza mutua.",
      icon: confianzaIcon,
    },
    {
      title: "Excelencia",
      description:
        "Compromiso constante con la calidad y la mejora continua en todos nuestros servicios.",
      icon: excelenciaIcon,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar el título primero
            const title = entry.target.querySelector(".section-title");
            const subtitle = entry.target.querySelector(".section-subtitle");

            if (title) {
              title.style.opacity = "1";
              title.style.transform = "translateY(0)";
            }

            if (subtitle) {
              setTimeout(() => {
                subtitle.style.opacity = "1";
                subtitle.style.transform = "translateY(0)";
              }, 200);
            }

            // Animar los valores con delay escalonado
            valoresRef.current.forEach((valor, index) => {
              if (valor) {
                setTimeout(() => {
                  valor.style.opacity = "1";
                  valor.style.transform = "translateY(0)";
                }, 400 + index * 100);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="valores-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Valores</h2>
          <p className="section-subtitle">
            Los pilares fundamentales que guían nuestra forma de trabajar y nos
            han convertido en la agencia inmobiliaria de confianza.
          </p>
        </div>

        <div className="valores-grid">
          {valores.map((valor, index) => (
            <div
              key={index}
              ref={(el) => (valoresRef.current[index] = el)}
              className="valor-item"
            >
              <div className="valor-icon">
                <img
                  src={valor.icon}
                  alt={valor.title}
                  className="icon-image"
                />
              </div>
              <h3 className="valor-title">{valor.title}</h3>
              <p className="valor-description">{valor.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .valores-section {
          padding: 8rem 0;
          background: white;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 4rem;
          flex-wrap: wrap;
          gap: 2rem;
          max-width: 700px;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-rust);
          margin-bottom: 1.5rem;
          font-weight: 400;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
          text-align: center; /* Fuerza el centrado */
        }

        .section-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.2rem;
          color: var(--color-rust-light);
          line-height: 1.6;
          font-weight: 300;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
          text-align: center; /* Fuerza el centrado */
        }

        /* === GRID RESPONSIVO === */
        .valores-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* === ITEMS DE VALORES === */
        .valor-item {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .valor-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .valor-item:hover .icon-image {
          transform: translateY(-2px);
        }

        .valor-title {
          font-family: var(--font-primary);
          font-size: 1.4rem;
          color: var(--color-rust);
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .valor-description {
          font-family: var(--font-secondary);
          color: var(--color-rust-light);
          line-height: 1.6;
          font-size: 0.95rem;
          font-weight: 300;
        }

        /* === RESPONSIVE === */

        /* Tablets grandes y laptops pequeños */
        @media (max-width: 1024px) {
          .valores-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 4rem 3rem;
            max-width: 700px;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .valores-section {
            padding: 6rem 0;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .section-subtitle {
            font-size: 1.1rem;
          }

          .valores-grid {
            gap: 3rem 2rem;
          }

          .valor-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 1.5rem;
          }

          .valor-title {
            font-size: 1.2rem;
            margin-bottom: 0.8rem;
          }

          .valor-description {
            font-size: 0.9rem;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .valores-section {
            padding: 4rem 0;
          }

          .valores-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            max-width: 400px;
          }

          .section-title {
            font-size: 2rem;
          }

          .valor-icon {
            width: 44px;
            height: 44px;
          }

          .valor-title {
            font-size: 1.3rem;
          }
        }

        /* Mobile muy pequeño */
        @media (max-width: 480px) {
          .valores-section {
            padding: 3rem 0;
          }

          .valores-grid {
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ValoresSection;
