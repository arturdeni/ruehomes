// src/components/sell/SellHero.jsx
import { useState, useEffect } from "react";
import TextMaskReveal from "../ui/TextMaskReveal";

const SellHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [triggerFirstParagraph, setTriggerFirstParagraph] = useState(false);
  const [triggerSecondParagraph, setTriggerSecondParagraph] = useState(false);

  // Manejar la carga de la imagen
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";
    img.onload = () => {
      setImageLoaded(true);
      // Activar las animaciones de TextMaskReveal en secuencia después de que cargue la imagen
      setTimeout(() => {
        setTriggerFirstParagraph(true);
      }, 800);

      setTimeout(() => {
        setTriggerSecondParagraph(true);
      }, 1300);
    };
  }, []);

  return (
    <section className="sell-hero-section">
      {/* Imagen de fondo */}
      <div
        className={`hero-background ${imageLoaded ? "loaded" : ""}`}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop)",
        }}
      ></div>

      {/* Gradiente overlay */}
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="sell-hero-content">
          {/* Contenido de texto */}
          <div className="sell-intro-text">
            <div className="sell-paragraph-container">
              <TextMaskReveal
                className="sell-paragraph"
                trigger={triggerFirstParagraph}
                delay={0}
                textAlign="justify"
              >
                En Rue Homes, cada venta es el inicio de una nueva historia.
                Nuestro nombre y logotipo nacen de un símbolo urbano universal:
                las placas que nombran las calles, capaces de otorgar identidad
                a un lugar y hacerlo único.
              </TextMaskReveal>
            </div>

            <div className="sell-paragraph-container">
              <TextMaskReveal
                className="sell-paragraph"
                trigger={triggerSecondParagraph}
                delay={0}
                textAlign="justify"
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

      {/* Título en la parte inferior */}
      <div className="sell-title-bottom">
        <div className="container">
          <h1 className="sell-intro-title">
            Vender tu propiedad con
            <br className="title-break-mobile" />
            {" "}
            <span className="sell-title-highlight">Rue Homes</span>
          </h1>
        </div>
      </div>

      <style jsx>{`
        /* === HERO SECTION === */
        .sell-hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        /* === IMAGEN DE FONDO === */
        .hero-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          will-change: opacity;
        }

        .hero-background.loaded {
          opacity: 1;
        }

        .sell-hero-section .hero-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh;
          background: linear-gradient(
            135deg,
            rgba(154, 116, 78, 0.3) 20%,
            rgba(0, 0, 0, 0.55) 70%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: -1;
        }

        .sell-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          height: 100%;
        }

        .sell-intro-text {
          flex: 1;
          text-align: left;
          z-index: 3;
          display: flex;
          flex-direction: row;
          gap: 4rem;
          justify-content: center;
        }

        .sell-paragraph-container {
          flex: 1;
          max-width: 520px;
        }

        .sell-paragraph {
          font-family: var(--font-secondary);
          font-size: 1.35rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-weight: 300;
        }

        .sell-title-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding-bottom: 3rem;
        }

        .sell-intro-title {
          font-family: var(--font-titles);
          font-size: clamp(2rem, 6vw, 5.5rem);
          color: white;
          margin: 0;
          line-height: 0.2;
        }

        .sell-title-highlight {
          color: var(--color-honeyfield);
        }

        /* Ocultar el salto de línea en desktop */
        .title-break-mobile {
          display: none;
        }

        /* === RESPONSIVE === */
        @media (max-width: 850px) {
          /* Mostrar el salto de línea en mobile/tablet */
          .title-break-mobile {
            display: block;
          }
          .hero-overlay {
            background-attachment: scroll;
            height: 100vh;
          }

          .hero-background {
            height: 100vh;
          }

          .sell-hero-content {
            flex-direction: column;
            gap: 2rem;
            justify-content: center;
          }

          .sell-intro-text {
            max-width: 100%;
            text-align: center;
            flex-direction: column;
            gap: 1.5rem;
          }

          .sell-paragraph-container {
            max-width: 100%;
          }

          .sell-title-bottom {
            padding-bottom: 2rem;
          }

          .sell-intro-title {
            text-align: center;
            line-height: 1.3;
          }

          .sell-paragraph {
            font-size: 1.1rem;
          }

          /* Lanyard no se renderiza en móvil, no necesita estilos */
        }

        @media (max-width: 768px) {
          .sell-title-bottom {
            padding-bottom: 1.5rem;
          }

          .sell-paragraph {
            font-size: 1rem;
          }
        }

        @media (max-width: 640px) {
          .sell-title-bottom {
            padding-bottom: 1rem;
          }

          .sell-paragraph {
            font-size: 1rem;
          }
        }

        /* === OPTIMIZACIÓN === */
        @media (max-width: 1024px) {
          .hero-overlay {
            transform: none !important;
            background-attachment: scroll;
          }
        }
      `}</style>
    </section>
  );
};

export default SellHero;
