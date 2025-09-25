// src/components/agency/AgencyHero.jsx
import { useEffect, useRef, useState } from "react";
import TextMaskReveal from "../ui/TextMaskReveal";

const AgencyHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Estados para controlar las animaciones del TextMaskReveal
  const [triggerFirstParagraph, setTriggerFirstParagraph] = useState(false);
  const [triggerSecondParagraph, setTriggerSecondParagraph] = useState(false);
  const [triggerThirdParagraph, setTriggerThirdParagraph] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar el título
            if (titleRef.current) {
              setTimeout(() => {
                titleRef.current.style.opacity = "1";
                titleRef.current.style.transform = "translateY(0)";
              }, 300);
            }

            // Animar el contenedor de texto ANTES que se ejecute TextMaskReveal
            if (textRef.current) {
              setTimeout(() => {
                textRef.current.style.opacity = "1";
                textRef.current.style.transform = "translateY(0)";
              }, 600);
            }

            // Activar las animaciones de TextMaskReveal en secuencia
            setTimeout(() => {
              setTriggerFirstParagraph(true);
            }, 300);

            setTimeout(() => {
              setTriggerSecondParagraph(true);
            }, 600); // Después del primero

            setTimeout(() => {
              setTriggerThirdParagraph(true);
            }, 1100); // Después del segundo

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="agency-hero-section">
      <div className="container">
        <div className="agency-hero-content">
          <h1 ref={titleRef} className="agency-hero-title">
            <strong>La Agencia</strong>
          </h1>
          <div ref={textRef} className="agency-hero-text">
            <div className="agency-hero-paragraph-container">
              <TextMaskReveal
                className="agency-hero-paragraph"
                trigger={triggerFirstParagraph}
                delay={0}
              >
                En Rue Homes creemos que cada propiedad guarda una historia y
                cada persona sueña con un lugar donde escribir la suya.
              </TextMaskReveal>
            </div>

            <div className="agency-hero-paragraph-container">
              <TextMaskReveal
                className="agency-hero-paragraph"
                trigger={triggerSecondParagraph}
                delay={0}
              >
                Nuestro nombre y logotipo nacen de un elemento urbano que todos
                reconocemos: las placas que dan nombre a las calles, símbolos
                que identifican y dan personalidad a cada rincón. Con esa misma
                idea, damos identidad a cada inmueble y lo preparamos y
                presentamos para que se convierta en{" "}
                <strong>un lugar al que llamar hogar</strong>.
              </TextMaskReveal>
            </div>

            <div className="agency-hero-paragraph-container">
              <TextMaskReveal
                className="agency-hero-paragraph"
                trigger={triggerThirdParagraph}
                delay={0}
              >
                Más que una agencia inmobiliaria, somos un equipo que escucha,
                acompaña y busca soluciones a medida para cada cliente.
              </TextMaskReveal>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agency-hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 0;
          background: linear-gradient(
            180deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 50%,
            var(--color-softdune-lighter) 100%
          );
          position: relative;
        }

        .agency-hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: left;
        }

        .agency-hero-title {
          font-family: var(--font-primary);
          font-size: 4.5rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .agency-hero-text {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .agency-hero-paragraph-container {
          margin-bottom: 2.5rem;
        }

        .agency-hero-paragraph {
          font-family: var(--font-secondary);
          font-size: 1.4rem;
          color: var(--color-rust);
          line-height: 1.6;
          font-weight: 300;
        }

        .agency-hero-paragraph strong {
          color: var(--color-rust);
          font-weight: 500;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .agency-hero-section {
            padding: 6rem 0;
            min-height: 80vh;
          }

          .agency-hero-title {
            font-size: 3.5rem;
            margin-bottom: 3rem;
            text-align: center;
          }

          .agency-hero-content {
            text-align: center;
          }

          .agency-hero-paragraph {
            font-size: 1.25rem;
          }

          .agency-hero-paragraph-container {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 640px) {
          .agency-hero-section {
            padding: 4rem 0;
            min-height: 70vh;
          }

          .agency-hero-title {
            font-size: 2.8rem;
            margin-bottom: 2.5rem;
          }

          .agency-hero-paragraph {
            font-size: 1.1rem;
          }

          .agency-hero-paragraph-container {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyHero;
