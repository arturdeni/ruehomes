// src/components/home/Hero.jsx
import { useState, useRef, useEffect } from "react";
import RotatingText from "../ui/RotatingText";
import heroImageStatic from "../../assets/images/hero/hero-background-static.png";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const words = isMobile
    ? ["hogar", "piso", "dúplex", "ático", "chalet", "estudio", "loft"]
    : [
        "hogar",
        "piso",
        "apartamento",
        "dúplex",
        "ático",
        "chalet",
        "estudio",
        "loft",
      ];

  // Intentar reproducir el video cuando se cargue
  const handleVideoLoad = () => {
    if (videoRef.current) {
      setVideoLoaded(true);
      videoRef.current.play().catch(() => {
        // Si falla la reproducción, mantener la imagen de fondo visible
        setVideoLoaded(false);
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/propiedades?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  return (
    <section className="hero-section">
      {/* Imagen de fondo estática - siempre visible hasta que cargue el video */}
      <div className="hero-background"></div>

      {/* Video de fondo - siempre activo */}
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
        <source src="/videos/hero-background.webm" type="video/webm" />
      </video>

      {/* Gradiente overlay */}
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            Tu próximo{" "}
            <RotatingText
              texts={words}
              enableWidthTransition={true}
              widthTransitionDuration={0.5}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 400,
                duration: 1,
              }}
            />
            <br />
            está aquí
          </p>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Dónde te gustaría vivir?"
                className="search-input"
              />
              <button type="submit" className="search-button">
                <svg
                  className="search-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* === HERO SECTION === */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        /* === IMAGEN DE FONDO ESTÁTICA === */
        .hero-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh;
          background-image: url("${heroImageStatic}");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          z-index: -3;
          will-change: transform;
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

        .hero-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh;
          background: linear-gradient(
            135deg,
            rgba(154, 116, 78, 0.6) 0%,
            rgba(154, 116, 78, 0.3) 30%,
            rgba(0, 0, 0, 0.55) 70%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: -1;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          margin: 0 auto;
        }

        .hero-subtitle {
          font-family: var(--font-primary);
          font-size: 4.5rem;
          color: white;
          margin-bottom: 4rem;
          line-height: 1.12;
          letter-spacing: 0.5px;
        }

        .search-form {
          margin-bottom: 0;
        }

        .search-container {
          display: flex;
          background: var(--color-marble-lighter);
          border-radius: 60px;
          padding: 7px;
          max-width: 450px;
          margin: 0 auto;
          backdrop-filter: blur(15px);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 1rem 1rem;
          font-size: 1rem;
          color: black;
          font-family: var(--font-secondary);
          background: transparent;
          font-weight: 400;
        }

        .search-input::placeholder {
          color: var(--color-gray-500);
          font-weight: 300;
        }

        .search-button {
          background: var(--color-honeyfield);
          border: none;
          border-radius: 50px;
          padding: 1.2rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-button:hover {
          background: var(--color-rust);
        }

        .search-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .hero-background,
          .hero-overlay {
            background-attachment: scroll;
            height: 100vh;
          }

          .hero-video {
            height: 100vh;
          }

          .hero-subtitle {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }

          .search-container {
            max-width: 320px;
            padding: 6px;
            flex-direction: row;
          }

          .search-input {
            padding: 0.8rem 1rem;
            min-width: 0;
          }

          .search-button {
            padding: 0.8rem 1rem;
            min-width: 50px;
          }

          .search-icon {
            width: 20px;
            height: 20px;
          }
        }

        /* === OPTIMIZACIÓN PARALLAX === */
        @media (max-width: 1024px) {
          .hero-background,
          .hero-overlay {
            transform: none !important;
            background-attachment: scroll;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
