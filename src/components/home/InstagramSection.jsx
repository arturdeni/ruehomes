import React from "react";

const InstagramSection = () => {
  return (
    <section className="instagram__section">
      <div className="instagram__container">
        {/* Header Section */}
        <div className="instagram__header">
          <div className="instagram__brand">
            <div className="instagram__logo">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="var(--color-rust)"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="var(--color-rust)"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1.5" fill="var(--color-rust)" />
              </svg>
            </div>
            <div className="instagram__text">
              <h2 className="instagram__title">Síguenos en Instagram</h2>
              <p className="instagram__subtitle">
                Descubre nuestras propiedades exclusivas y el día a día de
                RueHomes
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/ruehomes"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram__cta"
          >
            <span>Visitar perfil</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 3h6v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 14L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Placeholder Grid */}
        <div className="instagram__grid">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="instagram__placeholder">
              <div className="instagram__placeholder-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path
                    d="M21 15l-5-5L5 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="instagram__placeholder-text">Próximamente</div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="instagram__notice">
          <p className="instagram__notice-text">
            📸 Estamos preparando contenido increíble para mostrar nuestras
            mejores propiedades
          </p>
        </div>
      </div>

      <style jsx>{`
        .instagram__section {
          padding: 6rem 0;
          background-color: #f0e5d5;
          position: relative;
          overflow: hidden;
        }

        .instagram__container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Header Styles */
        .instagram__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .instagram__brand {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .instagram__logo {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .instagram__text {
          flex: 1;
        }

        .instagram__title {
          font-family: "Crimson Text", serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: #483228;
          margin: 0;
          line-height: 1.2;
        }

        .instagram__subtitle {
          font-family: "Inter", sans-serif;
          font-size: 1.1rem;
          font-weight: 300;
          color: #5d433a;
          margin: 0.5rem 0 0 0;
          line-height: 1.4;
        }

        .instagram__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 14px 28px;
          background: transparent;
          color: var(--color-rust, #9a744e);
          border: 2px solid var(--color-rust, #9a744e);
          border-radius: 50px;
          text-decoration: none;
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .instagram__cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--color-rust, #9a744e);
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .instagram__cta:hover::before {
          left: 0;
        }

        .instagram__cta:hover {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(154, 116, 78, 0.3);
        }

        /* Grid Styles */
        .instagram__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .instagram__placeholder {
          aspect-ratio: 1;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.7) 100%
          );
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .instagram__placeholder::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 25%,
            rgba(154, 116, 78, 0.03) 25%,
            rgba(154, 116, 78, 0.03) 50%,
            transparent 50%,
            transparent 75%,
            rgba(154, 116, 78, 0.03) 75%
          );
          background-size: 30px 30px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .instagram__placeholder:hover::before {
          opacity: 1;
        }

        .instagram__placeholder:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(154, 116, 78, 0.15);
          border-color: rgba(154, 116, 78, 0.2);
        }

        .instagram__placeholder-icon {
          color: var(--color-rust, #9a744e);
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .instagram__placeholder:hover .instagram__placeholder-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .instagram__placeholder-text {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #5d433a;
          text-align: center;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .instagram__placeholder:hover .instagram__placeholder-text {
          opacity: 1;
        }

        /* Notice Styles */
        .instagram__notice {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin-top: 2rem;
        }

        .instagram__notice-text {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: #5d433a;
          margin: 0;
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .instagram__section {
            padding: 4rem 0;
          }

          .instagram__container {
            padding: 0 1.5rem;
          }

          .instagram__header {
            flex-direction: column;
            text-align: center;
            margin-bottom: 3rem;
          }

          .instagram__brand {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .instagram__title {
            font-size: 2rem;
          }

          .instagram__subtitle {
            font-size: 1rem;
          }

          .instagram__grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .instagram__cta {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .instagram__grid {
            grid-template-columns: 1fr;
          }

          .instagram__title {
            font-size: 1.75rem;
          }
        }

        /* Animation for future content loading */
        @keyframes instagram__shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .instagram__loading-animation {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200px 100%;
          animation: instagram__shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default InstagramSection;
