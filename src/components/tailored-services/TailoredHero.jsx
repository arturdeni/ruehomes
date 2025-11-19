// src/components/tailored-services/TailoredHero.jsx
import { useState, useEffect } from "react";
import Lanyard from "../lanyard/Lanyard";
import TextMaskReveal from "../ui/TextMaskReveal";

const TailoredHero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar si es desktop (> 850px)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 850);
    };

    // Verificar al montar
    checkIsDesktop();

    // Añadir listener para cambios de tamaño
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Manejar la carga de la imagen
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="tailored-hero-section">
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

      {/* Componente Lanyard a la derecha - Solo en desktop > 850px */}
      {isDesktop && (
        <div className="tailored-lanyard-container">
          <Lanyard
            position={[0, 0, 24]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
          />
        </div>
      )}

      <div className="container">
        <div className="tailored-hero-content">
          {/* Contenido de texto */}
          <div className="tailored-intro-text">
            <TextMaskReveal
              className="tailored-intro-description"
              delay={0}
              textAlign="justify"
            >
              Nuestro servicio más personalizado y exclusivo, pensado para
              clientes exigentes que valoran la excelencia, la privacidad y el
              cuidado en cada detalle , y que buscan optimizar su tiempo
              mientras encuentran su hogar ideal .
            </TextMaskReveal>
          </div>
        </div>
      </div>

      {/* Título en la parte inferior */}
      <div className="tailored-title-bottom">
        <div className="container">
          <h1 className="tailored-intro-title">
            Rue Homes <span className="tailored-title-highlight">Tailored</span>
          </h1>
        </div>
      </div>

      <style jsx>{`
        /* === HERO SECTION === */
        .tailored-hero-section {
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
          height: 100vh;
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

        .tailored-hero-section .hero-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(
            135deg,
            rgba(154, 116, 78, 0.3) 20%,
            rgba(0, 0, 0, 0.55) 70%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: -1;
        }

        .tailored-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          height: 100%;
        }

        .tailored-intro-text {
          flex: 0 0 auto;
          max-width: 600px;
          text-align: left;
          z-index: 3;
        }

        .tailored-lanyard-container {
          position: absolute;
          right: 0;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: all;
          z-index: 55;
        }

        .tailored-title-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding-bottom: 3rem;
        }

        .tailored-intro-title {
          font-family: var(--font-titles);
          font-size: clamp(2rem, 10vw, 9.5rem);
          color: white;
          margin: 0;
          line-height: 0.2;
        }

        .tailored-title-highlight {
          color: var(--color-honeyfield);
        }

        .tailored-intro-description {
          font-family: var(--font-secondary);
          font-size: 1.35rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          font-weight: 300;
        }

        /* === RESPONSIVE === */
        @media (max-width: 850px) {
          .hero-overlay {
            background-attachment: scroll;
            height: 100vh;
          }

          .hero-background {
            height: 100vh;
          }

          .tailored-hero-content {
            flex-direction: column;
            gap: 2rem;
            justify-content: center;
          }

          .tailored-intro-text {
            max-width: 100%;
            text-align: center;
          }

          .tailored-title-bottom {
            padding-bottom: 2rem;
          }

          .tailored-intro-title {
            text-align: center;
          }

          .tailored-intro-description {
            font-size: 1.1rem;
          }

          /* Lanyard no se renderiza en móvil, no necesita estilos */
        }

        @media (max-width: 768px) {
          .tailored-title-bottom {
            padding-bottom: 1.5rem;
          }

          .tailored-intro-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 640px) {
          .tailored-title-bottom {
            padding-bottom: 1rem;
          }

          .tailored-intro-description {
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

export default TailoredHero;
