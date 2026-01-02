// Importar las imágenes locales
import insta1 from "../../assets/images/insta/insta_ruehomes1.webp";
import insta2 from "../../assets/images/insta/insta_ruehomes2.webp";
import insta3 from "../../assets/images/insta/insta_ruehomes3.webp";
import insta4 from "../../assets/images/insta/insta_ruehomes4.webp";

const InstagramSection = () => {
  // Datos hardcodeados de los posts de Instagram
  const posts = [
    {
      id: "1",
      thumbnail: insta1,
      caption: "¿Sabías que ciertos colores pueden hacer que tu cocina se vea más grande y luminosa sin hacer remodelaciones? ✨",
      link: "https://instagram.com/rue.homes",
    },
    {
      id: "2",
      thumbnail: insta2,
      caption: "Cada piso, una oportunidad de encontrar tu hogar ideal. 🏠✨",
      link: "https://instagram.com/rue.homes",
    },
    {
      id: "3",
      thumbnail: insta3,
      caption: "Según tu sueldo, esta es la vivienda que te puedes permitir. ¿Te atreves a calcularlo? 💬",
      link: "https://instagram.com/rue.homes",
    },
    {
      id: "4",
      thumbnail: insta4,
      caption: "Salimos a preguntar a la gente qué piensa sobre la situación de la vivienda en España.💬",
      link: "https://instagram.com/rue.homes",
    },
  ];

  return (
    <section className="instagram__section">
      <div className="instagram__container">
        <div className="instagram__header">
          <div className="instagram__brand">
            <div className="instagram__logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
                Descubre nuestras propiedades exclusivas y el día a día de Rue
                Homes.
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/rue.homes"
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

        <div className="instagram__grid">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram__post"
            >
              <div className="instagram__post-image-wrapper">
                <img
                  src={post.thumbnail}
                  alt={post.caption}
                  className="instagram__post-image"
                />

                <div className="instagram__post-overlay">
                  <div className="instagram__post-caption">
                    <p>{post.caption}</p>
                  </div>
                </div>

                <div className="instagram__post-badge">
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(154, 116, 78, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .instagram__text {
          flex: 1;
        }

        .instagram__title {
          font-family: var(--font-titles);
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

        .instagram__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .instagram__post {
          position: relative;
          display: block;
          text-decoration: none;
          aspect-ratio: 1;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .instagram__post:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }

        .instagram__post-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .instagram__post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .instagram__post:hover .instagram__post-image {
          transform: scale(1.05);
        }

        .instagram__post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.85) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }

        .instagram__post:hover .instagram__post-overlay {
          opacity: 1;
        }

        .instagram__post-caption {
          color: white;
        }

        .instagram__post-caption p {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        .instagram__post-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

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
      `}</style>
    </section>
  );
};

export default InstagramSection;
