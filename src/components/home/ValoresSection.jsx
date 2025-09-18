// src/components/home/ValoresSection.jsx

const ValoresSection = () => {
  const valores = [
    {
      title: "Transparencia",
      description:
        "Comunicación honesta y clara en cada paso del proceso, sin sorpresas ni comisiones ocultas.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      title: "Profesionalidad",
      description:
        "Equipo altamente cualificado con años de experiencia en el sector inmobiliario.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
    },
    {
      title: "Confianza",
      description:
        "Más de 15 años construyendo relaciones duraderas basadas en la confianza mutua.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Excelencia",
      description:
        "Compromiso constante con la calidad y la mejora continua en todos nuestros servicios.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="valores-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Valores</h2>
          <p className="section-subtitle">
            Los pilares fundamentales que guían nuestra forma de trabajar y nos
            han convertido en la agencia inmobiliaria de confianza.
          </p>
        </div>

        <div className="valores-grid">
          {valores.map((valor, index) => (
            <div key={index} className="valor-card">
              <div className="valor-icon">{valor.icon}</div>
              <h3 className="valor-title">{valor.title}</h3>
              <p className="valor-description">{valor.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .valores-section {
          padding: 8rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          color: var(--color-marron);
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          color: var(--color-marron-light);
          line-height: 1.6;
        }

        .valores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .valor-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--color-beige-light);
          transition: all 0.3s ease;
        }

        .valor-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        }

        .valor-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(
            135deg,
            var(--color-beige-light) 0%,
            var(--color-beige) 100%
          );
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          color: var(--color-camel);
        }

        .valor-icon svg {
          width: 40px;
          height: 40px;
        }

        .valor-title {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          color: var(--color-marron);
          margin-bottom: 1rem;
        }

        .valor-description {
          font-family: var(--font-secondary);
          color: var(--color-marron-light);
          line-height: 1.6;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .valores-section {
            padding: 4rem 0;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .valores-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .valor-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ValoresSection;
