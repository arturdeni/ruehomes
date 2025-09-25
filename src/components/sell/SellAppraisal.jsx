// src/components/sell/SellAppraisal.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextMaskReveal from "../ui/TextMaskReveal";

const SellAppraisal = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  // Estado para controlar cuándo debe animarse el TextMaskReveal
  const [triggerTextAnimation, setTriggerTextAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar todos los elementos en secuencia
            setTimeout(() => {
              if (titleRef.current) {
                titleRef.current.style.opacity = "1";
                titleRef.current.style.transform = "translateY(0)";
              }
            }, 200);

            setTimeout(() => {
              if (subtitleRef.current) {
                subtitleRef.current.style.opacity = "1";
                subtitleRef.current.style.transform = "translateY(0)";
              }
            }, 400);

            // Activar la animación del TextMaskReveal cuando corresponde
            setTimeout(() => {
              setTriggerTextAnimation(true);
            }, 600);

            setTimeout(() => {
              if (buttonRef.current) {
                buttonRef.current.style.opacity = "1";
                buttonRef.current.style.transform = "translateY(0)";
              }
            }, 1200); // Dar tiempo al TextMaskReveal para terminar

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
    <section ref={sectionRef} className="sell-appraisal">
      <div className="container">
        <div className="sell-appraisal-content">
          <h2 ref={titleRef} className="sell-appraisal-title">
            Valoración gratuita
          </h2>

          <p ref={subtitleRef} className="sell-appraisal-subtitle">
            Descubre el valor real de tu propiedad.
          </p>

          <div className="sell-appraisal-text">
            <TextMaskReveal
              className="sell-appraisal-paragraph"
              trigger={triggerTextAnimation}
              delay={0}
            >
              En Rue Homes realizamos una valoración{" "}
              <strong>gratuita y sin compromiso</strong>. Concertamos una
              reunión, nos acercamos a tu vivienda y, gracias a nuestro sistema
              de datos, nuestro historial de ventas y conocimiento del mercado
              local, proporcionamos una valoración{" "}
              <strong>precisa y totalmente fiable</strong>.
            </TextMaskReveal>
          </div>

          <div ref={buttonRef} className="sell-appraisal-button">
            <Link to="/contacto" className="btn btn-primary btn-lg">
              Solicitar valoración gratuita
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sell-appraisal {
          background: linear-gradient(
            180deg,
            var(--color-rust-lighter) 20%,
            var(--color-rust) 100%
          );
          min-height: 800px;
          padding: 8rem 0;
          position: relative;
        }

        .sell-appraisal-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .sell-appraisal-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          line-height: 1.2;
          color: white;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .sell-appraisal-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.375rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          font-weight: 500;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .sell-appraisal-text {
          margin-bottom: 3rem;
          color: white;
        }

        .sell-appraisal-text :global(.sell-appraisal-paragraph) {
          font-family: var(--font-secondary);
          font-size: 1.125rem;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }

        .sell-appraisal-text :global(.sell-appraisal-paragraph strong) {
          color: white;
          font-weight: 600;
        }

        .sell-appraisal-button {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        /* Sobrescribir colores del botón para que se vea bien en fondo rust */
        .sell-appraisal-button .btn-primary {
          background: var(--color-rust-darker);
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .sell-appraisal {
            padding: 5rem 0;
          }

          .sell-appraisal-title {
            font-size: 2.5rem;
          }

          .sell-appraisal-subtitle {
            font-size: 1.25rem;
          }

          .sell-appraisal-text :global(.sell-appraisal-paragraph) {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .sell-appraisal {
            padding: 4rem 0;
          }

          .sell-appraisal-content {
            max-width: 100%;
          }

          .sell-appraisal-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .sell-appraisal-subtitle {
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .sell-appraisal-text {
            margin-bottom: 2.5rem;
          }

          .sell-appraisal-text :global(.sell-appraisal-paragraph) {
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }

        @media (max-width: 480px) {
          .sell-appraisal {
            padding: 3rem 0;
          }

          .sell-appraisal-title {
            font-size: 1.75rem;
          }

          .sell-appraisal-subtitle {
            font-size: 1rem;
          }

          .sell-appraisal-text :global(.sell-appraisal-paragraph) {
            font-size: 0.9rem;
          }

          .sell-appraisal-button :global(.btn-lg) {
            padding: 14px 28px;
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default SellAppraisal;
