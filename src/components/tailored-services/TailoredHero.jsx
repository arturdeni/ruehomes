// src/components/tailored-services/TailoredHero.jsx
import { useState, useRef, useEffect } from "react";
import Lanyard from "../lanyard/Lanyard";

const TailoredHero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef(null);

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

  // Intentar reproducir el video cuando se cargue
  const handleVideoLoad = () => {
    if (videoRef.current) {
      setVideoLoaded(true);
      videoRef.current.play().catch(() => {
        // Si falla la reproducción, mantener la capa visible
        setVideoLoaded(false);
      });
    }
  };

  return (
    <section className="tailored-hero-section">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        className={`hero-video ${videoLoaded ? "loaded" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={handleVideoLoad}
        onLoadedData={handleVideoLoad}
      >
        <source src="/videos/hero-tailored-services.webm" type="video/webm" />
      </video>

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
            <h1 className="tailored-intro-title">
              Rue Homes{" "}
              <span className="tailored-title-highlight">Tailored</span>
            </h1>

            <p className="tailored-intro-description">
              Nuestro servicio más <strong>personalizado y exclusivo</strong>,
              pensado para clientes exigentes que valoran la{" "}
              <strong>
                excelencia, la privacidad y el cuidado en cada detalle
              </strong>
              , y que buscan{" "}
              <strong>
                optimizar su tiempo mientras encuentran su hogar ideal
              </strong>
              .
            </p>
          </div>
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

        /* === VIDEO DE FONDO === */
        .hero-video {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh;
          object-fit: cover;
          z-index: -2;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          will-change: transform, opacity;
        }

        .hero-video.loaded {
          opacity: 1;
        }

        .tailored-hero-section .hero-overlay {
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

        .tailored-intro-title {
          font-family: var(--font-primary);
          font-size: 4.5rem;
          color: white;
          font-weight: 400;
          margin-bottom: 2rem;
          line-height: 1.1;
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

        .tailored-intro-description strong {
          color: white;
          font-weight: 500;
        }

        /* === RESPONSIVE === */
        @media (max-width: 850px) {
          .hero-overlay {
            background-attachment: scroll;
            height: 100vh;
          }

          .hero-video {
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

          .tailored-intro-title {
            font-size: 2.5rem;
          }

          .tailored-intro-description {
            font-size: 1.1rem;
          }

          /* Lanyard no se renderiza en móvil, no necesita estilos */
        }

        @media (max-width: 768px) {
          .tailored-intro-title {
            font-size: 2.2rem;
          }

          .tailored-intro-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 640px) {
          .tailored-intro-title {
            font-size: 2rem;
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
