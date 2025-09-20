// src/components/ui/AnimatedLogo.jsx
import { useState, useEffect } from "react";

const AnimatedLogo = ({ className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`animated-logo ${className}`}>
      {/* Círculos decorativos */}
      <div className="circles-container">
        {/* Círculo superior izquierdo */}
        <div
          className={`circle circle-top-left ${isVisible ? "animate" : ""}`}
          style={{ animationDelay: "0.3s" }}
        />

        {/* Círculo superior derecho */}
        <div
          className={`circle circle-top-right ${isVisible ? "animate" : ""}`}
          style={{ animationDelay: "0.6s" }}
        />

        {/* Círculo inferior izquierdo */}
        <div
          className={`circle circle-bottom-left ${isVisible ? "animate" : ""}`}
          style={{ animationDelay: "0.9s" }}
        />

        {/* Círculo inferior derecho */}
        <div
          className={`circle circle-bottom-right ${isVisible ? "animate" : ""}`}
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      {/* Texto del logo con efecto reveal */}
      <div className="logo-text-container">
        <div className={`logo-text ${isVisible ? "animate" : ""}`}>
          <div className="logo-line">
            {"RUE".split("").map((char, index) => (
              <span
                key={index}
                className="char"
                style={{
                  animationDelay: `${1.2 + index * 0.08}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="logo-line">
            {"HOMES".split("").map((char, index) => (
              <span
                key={index + 3}
                className="char"
                style={{
                  animationDelay: `${1.2 + (index + 4) * 0.08}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-logo {
          position: relative;
          display: inline-block;
          padding: 2rem;
        }

        .circles-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
        }

        .circle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
          transition: all 0.6s cubic-bezier(0.25, 0.4, 0.25, 1);
          box-shadow: 0 4px 15px rgba(154, 116, 78, 0.3);
          z-index: 10;
        }

        .circle.animate {
          opacity: 1;
          transform: scale(1);
        }

        /* Posicionamiento de círculos */
        .circle-top-left {
          top: 0;
          left: 0;
        }

        .circle-top-right {
          top: 0;
          right: 0;
        }

        .circle-bottom-left {
          bottom: 0;
          left: 0;
        }

        .circle-bottom-right {
          bottom: 0;
          right: 0;
        }

        .logo-text-container {
          position: relative;
          z-index: 2;
        }

        .logo-text {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 500;
          font-size: 5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.9;
        }

        .logo-line {
          display: flex;
        }

        .char {
          display: inline-block;
          opacity: 0;
          transform: translateY(100px) rotateX(-90deg);
          animation-fill-mode: forwards;
        }

        .logo-text.animate .char {
          animation: textReveal 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) forwards;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(100px) rotateX(-90deg);
          }
          50% {
            opacity: 0.5;
            transform: translateY(20px) rotateX(-45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        /* Hover effect */
        .animated-logo:hover .circle {
          transform: scale(1.2);
          box-shadow: 0 6px 25px rgba(154, 116, 78, 0.5);
        }

        .animated-logo:hover .logo-text {
          text-shadow: 0 6px 30px rgba(0, 0, 0, 0.8);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .animated-logo {
            padding: 1.5rem;
          }

          .logo-text {
            font-size: 3.5rem;
            letter-spacing: 0.1em;
          }

          .circle {
            width: 8px;
            height: 8px;
          }
        }

        @media (max-width: 480px) {
          .animated-logo {
            padding: 1rem;
          }

          .logo-text {
            font-size: 2.8rem;
            letter-spacing: 0.08em;
          }

          .circle {
            width: 6px;
            height: 6px;
          }
        }

        /* Animación adicional para los círculos en hover */
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animated-logo:hover .circle {
          animation: pulse 2s infinite ease-in-out;
        }

        /* Asegurar que Barlow Condensed esté disponible */
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&display=swap");
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
