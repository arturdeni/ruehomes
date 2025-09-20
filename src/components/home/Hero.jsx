// src/components/home/HeroWithShader.jsx
import { useState } from "react";
import AnimatedGradientBackground from "../ui/AnimatedGradientBackground";
import heroImage from "../../assets/images/hero/hero-background.webp";

const HeroWithShader = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      {/* Imagen de fondo con parallax */}
      <div className="hero-background"></div>

      {/* ShaderGradient como overlay animado con opacidad */}
      <AnimatedGradientBackground
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        animate={true}
      />

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Rue Homes</h1>
          <p className="hero-subtitle">
            Encuentra un lugar al que llamar hogar
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
        /* === HERO SECTION CON PARALLAX === */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 120vh; /* Más alto para el efecto parallax */
          background-image: url("${heroImage}");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          z-index: -2;
          will-change: transform;
          /* Quitamos la opacidad reducida de la imagen para que se vea bien */
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-title {
          font-family: var(--font-primary);
          font-size: 5rem;
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
          letter-spacing: 1px;
        }

        .hero-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.5rem;
          color: var(--color-marble-lighter);
          margin-bottom: 4rem;
          line-height: 1.4;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .search-form {
          margin-bottom: 0;
        }

        .search-container {
          display: flex;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 60px;
          padding: 9px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          max-width: 550px;
          margin: 0 auto;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 1rem 1rem;
          font-size: 1rem;
          color: var(--color-rust);
          font-family: var(--font-secondary);
          background: transparent;
          font-weight: 400;
        }

        .search-input::placeholder {
          color: var(--color-gray-500);
          font-weight: 300;
        }

        .search-button {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon) 0%,
            var(--color-cinnamon-dark) 100%
          );
          border: none;
          border-radius: 50px;
          padding: 1.2rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(154, 116, 78, 0.3);
        }

        .search-button:hover {
          background: linear-gradient(
            135deg,
            var(--color-cinnamon-dark) 0%,
            var(--color-cinnamon-darker) 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(154, 116, 78, 0.4);
        }

        .search-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .hero-background {
            background-attachment: scroll; /* Mejor performance en móviles */
            height: 100vh;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
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
        @media (prefers-reduced-motion: reduce) {
          .hero-background {
            transform: none !important;
          }
        }

        /* Mejora performance en dispositivos móviles */
        @media (max-width: 1024px) {
          .hero-background {
            transform: none !important;
            background-attachment: scroll;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroWithShader;
