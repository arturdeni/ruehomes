// src/components/home/TailoredSection.jsx
import { Link } from "react-router-dom";

const TailoredSection = () => {
  return (
    <section className="tailored-section">
      <div className="container">
        <div className="tailored-content">
          {/* Imagen */}
          <div className="tailored-image">
            <div className="image-placeholder">
              <svg
                className="placeholder-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>

          {/* Texto */}
          <div className="tailored-text">
            <h2 className="section-title">Servicio Premium Exclusivo</h2>
            <p className="section-description">
              Nuestro servicio Tailored está diseñado para clientes que buscan
              una experiencia inmobiliaria única y personalizada. Acceso
              exclusivo a propiedades fuera de mercado, atención 24/7 y un
              equipo dedicado solo para ti.
            </p>
            <div className="tailored-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span>Propiedades exclusivas fuera de mercado</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span>Atención personalizada 24/7</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span>Equipo de expertos dedicado</span>
              </div>
            </div>
            <Link to="/tailored-services" className="btn btn-primary btn-lg">
              Descubrir Servicio Premium
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tailored-section {
          padding: 8rem 0;
          background: var(--color-beige-lighter);
        }

        .tailored-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-marron);
          margin-bottom: 2rem;
          line-height: 1.2;
        }

        .section-description {
          font-family: var(--font-secondary);
          font-size: 1.2rem;
          color: var(--color-marron-light);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .tailored-features {
          margin-bottom: 3rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-secondary);
          color: var(--color-marron);
          font-weight: 500;
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          color: var(--color-camel);
          flex-shrink: 0;
        }

        .tailored-image {
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--color-camel-light) 0%,
            var(--color-camel) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-icon {
          width: 80px;
          height: 80px;
          color: white;
          opacity: 0.9;
        }

        /* === RESPONSIVE === */
        @media (max-width: 968px) {
          .tailored-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .tailored-image {
            height: 300px;
          }

          .section-title {
            font-size: 2.5rem;
            text-align: center;
          }

          .section-description {
            text-align: center;
          }

          .tailored-features {
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 768px) {
          .tailored-section {
            padding: 4rem 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-description {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TailoredSection;
