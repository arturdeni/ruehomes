// src/components/sell/SellingSection.jsx

// Importar las imágenes
import fase1Image from "../../assets/images/selling-section/fase-1.webp";
import fase2Image from "../../assets/images/selling-section/fase-2.webp";
import fase3Image from "../../assets/images/selling-section/fase-3.webp";
import fase4Image from "../../assets/images/selling-section/fase-4.webp";

const SellingSection = () => {
  const phases = [
    {
      id: 1,
      title: "Fase 1 – Análisis y Preparación",
      subtitle: "Analizamos tu propiedad, el entorno y el mercado.",
      points: [
        "Visita inicial para conocer tu propiedad y el entorno en el que se encuentra.",
        "Estudio de mercado detallado con datos reales.",
        "Consejos de presentación y mejoras para maximizar el valor.",
      ],
      image: fase1Image,
    },
    {
      id: 2,
      title: "Fase 2 – Plan de Marketing Personalizado",
      subtitle: "Llevamos tu vivienda a su mejor escaparate.",
      points: [
        "Reportaje fotográfico, vídeo y tour virtual profesional.",
        "Publicación en portales líderes nacionales e internacionales.",
        "Difusión estratégica a nuestra red de inversores privados.",
        "Campañas segmentadas en redes sociales y Google Ads.",
      ],
      image: fase2Image,
    },
    {
      id: 3,
      title: "Fase 3 – Gestión y Negociación",
      subtitle: "Conectamos con el comprador ideal.",
      points: [
        "Filtro de compradores cualificados, asegurando el interés real y la capacidad de adquisición.",
        "Informes de visitas con métricas claras y seguimiento continuo.",
        "Negociación estratégica para lograr el mejor precio y condiciones.",
      ],
      image: fase3Image,
    },
    {
      id: 4,
      title: "Fase 4 – Cierre y Acompañamiento",
      subtitle: "Seguridad y confianza hasta el final.",
      points: [
        "Revisión de contratos y gestión documental completa.",
        "Coordinación con notaría y todos los agentes implicados.",
        "Entrega de llaves y asistencia postventa.",
      ],
      image: fase4Image,
    },
  ];

  return (
    <section className="selling-section">
      <div className="selling-section-container">
        <div className="selling-section-phases-container">
          {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={phase.id} className="selling-section-phase-wrapper">
                {/* Círculo con número - por encima de la línea */}
                <div className={`selling-section-phase-number-wrapper ${isLeft ? 'selling-section-align-left' : 'selling-section-align-right'}`}>
                  <div className="selling-section-phase-number">{phase.id}</div>
                </div>

                {/* Contenido de la fase - por encima de la línea */}
                <div className={`selling-section-phase-content ${isLeft ? 'selling-section-content-left' : 'selling-section-content-right'}`}>
                  <img src={phase.image} alt={phase.title} loading="lazy" className="selling-section-phase-image" />

                  <div className="selling-section-phase-text">
                    <h2 className="selling-section-phase-title">{phase.title}</h2>
                    <p className="selling-section-phase-subtitle">{phase.subtitle}</p>

                    <ul className="selling-section-phase-points">
                      {phase.points.map((point, idx) => (
                        <li key={idx} className="selling-section-phase-point">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .selling-section {
          background-color: var(--color-softdune);
          padding: 4rem 0;
        }

        .selling-section-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .selling-section-phases-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Wrapper de cada fase */
        .selling-section-phase-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 350px;
        }

        /* Wrapper del círculo con número - por encima de la línea */
        .selling-section-phase-number-wrapper {
          position: absolute;
          z-index: 3;
        }

        .selling-section-phase-number-wrapper.selling-section-align-left {
          left: 150px;
          top: 50%;
          transform: translateY(-50%);
        }

        .selling-section-phase-number-wrapper.selling-section-align-right {
          right: 150px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Círculo con número sobre la línea */
        .selling-section-phase-number {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: var(--color-rust);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
          font-size: 1.35rem;
          font-weight: bold;
        }

        /* Contenido de cada fase - por encima de la línea */
        .selling-section-phase-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 2rem;
          color: var(--color-rust);
          padding: 1.5rem;
          background-color: var(--color-softdune);
        }

        .selling-section-phase-content.selling-section-content-left {
          margin-left: auto;
          padding-left: 140px;
          max-width: calc(100% - 50px);
        }

        .selling-section-phase-content.selling-section-content-right {
          margin-right: auto;
          padding-right: 140px;
          flex-direction: row-reverse;
          text-align: right;
          max-width: calc(100% - 50px);
        }

        .selling-section-phase-image {
          width: 180px;
          height: auto;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .selling-section-phase-text {
          flex: 1;
        }

        .selling-section-phase-title {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .selling-section-phase-subtitle {
          font-family: var(--font-secondary);
          font-size: 1rem;
          margin-bottom: 1rem;
          font-style: italic;
          opacity: 0.8;
        }

        .selling-section-phase-points {
          list-style: none;
          padding: 0;
          margin: 0;
          font-family: var(--font-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .selling-section-phase-content.selling-section-content-right .selling-section-phase-points {
          text-align: left;
        }

        .selling-section-phase-point {
          margin-bottom: 0.4rem;
          padding-left: 1.1rem;
          position: relative;
        }

        .selling-section-phase-point::before {
          content: "•";
          position: absolute;
          left: 0;
          opacity: 0.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .selling-section {
            padding: 3rem 0;
          }

          .selling-section-phase-number-wrapper {
            display: none;
          }

          .selling-section-phases-container {
            gap: 3rem;
          }

          .selling-section-phase-wrapper {
            min-height: auto;
          }

          .selling-section-phase-content,
          .selling-section-phase-content.selling-section-content-left,
          .selling-section-phase-content.selling-section-content-right {
            flex-direction: column;
            text-align: left;
            padding: 0;
            margin: 0;
            max-width: 100%;
          }

          .selling-section-phase-image {
            width: 200px;
            margin: 0 0 1.5rem 0;
          }

          .selling-section-phase-title {
            font-size: 1.4rem;
            margin-bottom: 0.75rem;
          }

          .selling-section-phase-subtitle {
            font-size: 1rem;
            margin-bottom: 1.25rem;
          }

          .selling-section-phase-points {
            text-align: left;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SellingSection;
