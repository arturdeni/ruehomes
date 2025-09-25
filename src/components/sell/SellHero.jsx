// src/components/sell/SellHero.jsx
import { useEffect, useRef, useState } from "react";
import TextMaskReveal from "../ui/TextMaskReveal";

const SellHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Estados para controlar las animaciones del TextMaskReveal
  const [triggerFirstParagraph, setTriggerFirstParagraph] = useState(false);
  const [triggerSecondParagraph, setTriggerSecondParagraph] = useState(false);

  // Función para manejar el scroll suave
  const handleScrollDown = () => {
    const viewportHeight = window.innerHeight;
    const currentPosition = window.scrollY;
    const targetPosition = currentPosition + viewportHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

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
            }, 100);

            setTimeout(() => {
              setTriggerSecondParagraph(true);
            }, 600); // Ligeramente después del primero

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
    <section ref={sectionRef} className="sell-hero">
      <div className="container">
        <div className="sell-hero-content">
          <h1 ref={titleRef} className="sell-hero-title">
            <strong>Vender tu propiedad con Rue Homes</strong>
          </h1>
          <div ref={textRef} className="sell-hero-text">
            <div className="text-paragraph-container">
              <TextMaskReveal
                className="text-paragraph"
                trigger={triggerFirstParagraph}
                delay={0}
              >
                En Rue Homes, cada venta es el inicio de una nueva historia.
                Nuestro nombre y logotipo nacen de un símbolo urbano universal:
                las placas que nombran las calles, capaces de otorgar identidad
                a un lugar y hacerlo único.
              </TextMaskReveal>
            </div>

            <div className="text-paragraph-container">
              <TextMaskReveal
                className="text-paragraph"
                trigger={triggerSecondParagraph}
                delay={0}
              >
                Así concebimos nuestro trabajo: dotamos a cada propiedad de una
                identidad propia, la posicionamos estratégicamente mediante un
                sistema respaldado por datos y la acompañamos hasta encontrar a
                sus nuevos propietarios.
              </TextMaskReveal>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator movido fuera del content y posicionado absolutamente */}
      <div className="sell-hero-scroll-down">
        <p>Conoce el proceso de venta</p>
        <span
          className="scroll-down-indicator"
          aria-label="Desplázate hacia abajo"
          onClick={handleScrollDown}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ display: "block", margin: "0 auto" }}
          >
            <g>
              <circle
                cx="16"
                cy="16"
                r="15"
                stroke="#935835"
                strokeWidth="2"
                fill="none"
                opacity="0.15"
              />
              <polyline
                points="12,14 16,20 20,14"
                fill="none"
                stroke="#935835"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <style jsx>{`
            .scroll-down-indicator {
              display: inline-block;
              animation: bounce 1.6s infinite;
              cursor: pointer;
              transition: transform 0.2s ease;
            }
            .scroll-down-indicator:hover {
              transform: translateY(4px);
            }
            .scroll-down-indicator:active {
              transform: translateY(6px);
            }
            @keyframes bounce {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(12px);
              }
            }
          `}</style>
        </span>
      </div>

      <style jsx>{`
        .sell-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            180deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 50%,
            var(--color-softdune-lighter) 100%
          );
          position: relative;
          overflow: hidden;
        }

        .sell-hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23935835' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sell-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          text-align: center;
          flex: 1;
          justify-content: center;
        }

        .sell-hero-title {
          font-family: var(--font-primary);
          font-size: 4.5rem;
          line-height: 1.2;
          max-width: 600px;
          color: var(--color-rust);
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .sell-hero-text {
          display: flex;
          justify-content: space-between;
          gap: 3rem;
          margin-left: 1rem;
          width: 90%;
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          line-height: 1.4;
          color: var(--color-rust-dark);
          opacity: 0;
          margin-top: 3rem;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        /* Estilos para los párrafos dentro de TextMaskReveal */
        .text-paragraph-container {
          max-width: 520px;
        }

        .sell-hero-text .text-paragraph-container:first-child {
          text-align: left;
        }

        .sell-hero-text .text-paragraph-container:last-child {
          text-align: left;
        }

        /* Scroll indicator posicionado en la parte inferior */
        .sell-hero-scroll-down {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: var(--color-rust);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
        }

        .sell-hero-scroll-down p {
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .sell-hero-title {
            font-size: 3rem;
          }

          .sell-hero-text {
            font-size: 1.125rem;
          }

          .sell-hero-text :global(.text-paragraph:first-child) {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .sell-hero {
            padding: 4rem 0 2rem 0;
            text-align: left;
          }

          .sell-hero-content {
            max-width: 100%;
          }

          .sell-hero-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            text-align: left;
          }

          .sell-hero-text {
            font-size: 1rem;
            text-align: left;
            flex-direction: column;
            gap: 2rem;
          }

          .sell-hero-text :global(.text-paragraph:first-child) {
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
            text-align: left;
          }

          .sell-hero-text :global(.text-paragraph:last-child) {
            text-align: left;
            margin-top: 0;
          }

          .sell-hero-scroll-down {
            bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .sell-hero {
            padding: 3rem 0 2rem 0;
          }

          .sell-hero-title {
            font-size: 2rem;
          }

          .sell-hero-text {
            font-size: 0.95rem;
          }

          .sell-hero-scroll-down {
            bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SellHero;
