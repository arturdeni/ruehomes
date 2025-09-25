// src/components/sell/SellingSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Importar las imágenes
import fase1Image from "../../assets/images/selling-section/fase-1.png";
import fase2Image from "../../assets/images/selling-section/fase-2.png";
import fase3Image from "../../assets/images/selling-section/fase-3.png";
import fase4Image from "../../assets/images/selling-section/fase-4.png";

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

const SellingSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const pointsRef = useRef(null);
  const imageRef = useRef(null);

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
      bgColor: "#e7d2c3",
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
      bgColor: "#C1946A",
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
      bgColor: "#b97e59",
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
      bgColor: "#b97e59",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      let currentPhaseIndex = 0;

      // Función para actualizar contenido
      const updateContent = (phase) => {
        const elements = [
          titleRef.current,
          subtitleRef.current,
          pointsRef.current,
          imageRef.current,
        ];

        // Fade out
        elements.forEach((el) => {
          if (el) {
            el.style.transition = "opacity 0.2s ease";
            el.style.opacity = "0";
          }
        });

        // Actualizar contenido después del fade out
        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.innerHTML = `<strong>${phase.title}</strong>`;
          }
          if (subtitleRef.current) {
            subtitleRef.current.innerHTML = `<em>${phase.subtitle}</em>`;
          }
          if (pointsRef.current) {
            pointsRef.current.innerHTML = phase.points
              .map((point) => `<li class="phase-point">${point}</li>`)
              .join("");
          }
          if (imageRef.current) {
            imageRef.current.src = phase.image;
            imageRef.current.alt = `Ilustración ${phase.title}`;
          }

          // Fade in
          requestAnimationFrame(() => {
            elements.forEach((el) => {
              if (el) {
                el.style.transition = "opacity 0.3s ease";
                el.style.opacity = "1";
              }
            });
          });
        }, 200);
      };

      // Inicializar con la primera fase
      updateContent(phases[0]);

      // Timeline principal para el pin scrolling y cambios de color
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          markers: true,
          scrub: 1,
          pin: contentRef.current,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = Math.max(0, Math.min(1, self.progress));

            // Distribución más equilibrada: Fase 1 más corta, Fase 4 más larga
            let newPhaseIndex;
            if (progress < 0.2) {
              newPhaseIndex = 0;
            } else if (progress < 0.5) {
              newPhaseIndex = 1;
            } else if (progress < 0.7) {
              newPhaseIndex = 2;
            } else {
              newPhaseIndex = 3;
            }

            // Solo actualizar si cambia la fase
            if (newPhaseIndex !== currentPhaseIndex) {
              currentPhaseIndex = newPhaseIndex;
              updateContent(phases[newPhaseIndex]);
            }
          },
        },
      });

      // Animaciones de cambio de color de fondo
      tl.to(
        sectionRef.current,
        {
          backgroundColor: phases[1].bgColor,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.3
      )
        .to(
          sectionRef.current,
          {
            backgroundColor: phases[2].bgColor,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.6
        )
        .to(
          sectionRef.current,
          {
            backgroundColor: phases[3].bgColor,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.85
        );

      // Animación inicial cuando la sección es visible
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          pointsRef.current,
          imageRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .to(
          [
            titleRef.current,
            subtitleRef.current,
            pointsRef.current,
            imageRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
          }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [phases]);

  return (
    <section
      ref={sectionRef}
      className="selling-section"
      style={{ backgroundColor: phases[0].bgColor }}
    >
      <div ref={contentRef} className="selling-content">
        <div className="container">
          <div className="phase-layout">
            <div className="phase-text">
              <h2 ref={titleRef} className="phase-title"></h2>
              <p ref={subtitleRef} className="phase-subtitle"></p>
              <ul ref={pointsRef} className="phase-points"></ul>
            </div>

            <div className="phase-visual">
              <div className="phase-image">
                <img
                  ref={imageRef}
                  src={phases[0].image}
                  alt="Ilustración fase"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .selling-section {
          height: 250vh;
          position: relative;
          transition: background-color 0.3s ease;
        }

        .selling-content {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .selling-content .container {
          justify-content: space-around;
          width: 100%;
        }

        .phase-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 70vh;
        }

        .phase-text {
          max-width: 600px;
          padding-right: 2rem;
        }

        .phase-title {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          line-height: 1.2;
          color: var(--color-rust);
          margin-bottom: 1.5rem;
        }

        .phase-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-cinnamon);
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .phase-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .phase-points .phase-point {
          font-family: var(--font-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--color-rust-dark);
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .phase-points .phase-point::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-cinnamon);
          font-size: 1.5rem;
          line-height: 1;
        }

        .phase-points .phase-point:last-child {
          margin-bottom: 0;
        }

        .phase-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 2rem;
        }

        .phase-image {
          max-width: 500px;
          width: 100%;
        }

        .phase-image img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          display: block;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .phase-layout {
            gap: 3rem;
          }

          .phase-title {
            font-size: 2.25rem;
          }

          .phase-subtitle {
            font-size: 1.125rem;
          }

          .phase-points .phase-point {
            font-size: 1rem;
          }

          .phase-text {
            padding-right: 1rem;
          }

          .phase-visual {
            padding-left: 1rem;
          }
        }

        @media (max-width: 768px) {
          .selling-section {
            height: auto;
            min-height: 100vh;
          }

          .selling-content {
            position: static;
            height: auto;
            min-height: 100vh;
            padding: 4rem 0;
          }

          .phase-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
            min-height: auto;
          }

          .phase-visual {
            order: -1;
            padding-left: 0;
            justify-content: center;
          }

          .phase-text {
            max-width: 100%;
            padding-right: 0;
            text-align: center;
          }

          .phase-title {
            font-size: 2rem;
          }

          .phase-subtitle {
            font-size: 1rem;
          }

          .phase-image {
            max-width: 350px;
          }

          .phase-points .phase-point {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .selling-content {
            padding: 2rem 0;
          }

          .phase-title {
            font-size: 1.75rem;
          }

          .phase-points .phase-point {
            font-size: 0.95rem;
          }

          .phase-image {
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default SellingSection;
