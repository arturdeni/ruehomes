// src/components/home/Hero.jsx
import { useState } from "react";
import RotatingText from "../ui/RotatingText";
import heroImage from "../../assets/images/hero/hero-background.webp";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const words = [
    "casa",
    "piso",
    "apartamento",
    "dúplex",
    "ático",
    "chalet",
    "estudio",
    "loft",
  ];

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

      {/* Gradiente overlay */}
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            Encuentra tu{" "}
            <RotatingText
              texts={words}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 400,
                duration: 1,
              }}
            />
            <br />
            al mejor precio
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
            rgba(154, 116, 78, 0.3) 0%,
            rgba(154, 116, 78, 0.15) 30%,
            rgba(0, 0, 0, 0.25) 70%,
            rgba(0, 0, 0, 0.4) 100%
          );
          z-index: -1;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-subtitle {
          font-family: var(--font-secondary);
          font-size: 2.5rem;
          color: white;
          margin-bottom: 4rem;
          line-height: 1.4;
          text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
          font-weight: 600;
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
          color: var(--color-honeyfield);
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
            var(--color-honeyfield) 0%,
            var(--color-rust-dark) 100%
          );
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
          background: linear-gradient(
            135deg,
            var(--color-cinnamon-dark) 0%,
            var(--color-cinnamon-darker) 100%
          );
          transform: translateY(-2px);
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
            background-attachment: scroll; /* Mejor performance en móviles */
            height: 100vh;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            font-size: 1.5rem;
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
          .hero-background,
          .hero-overlay {
            transform: none !important;
          }
        }

        /* Mejora performance en dispositivos móviles */
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
