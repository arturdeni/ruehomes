// src/components/home/InstagramSection.jsx

const InstagramSection = () => {
  // Datos temporales de posts de Instagram
  const instagramPosts = [
    {
      id: 1,
      image: null, // placeholder
      caption: "Nueva propiedad disponible en zona premium...",
      likes: 125,
      comments: 8,
    },
    {
      id: 2,
      image: null,
      caption: "Casa familiar con jardín privado...",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      image: null,
      caption: "Piso moderno en el centro de la ciudad...",
      likes: 156,
      comments: 6,
    },
    {
      id: 4,
      image: null,
      caption: "Oficinas de lujo con vistas panorámicas...",
      likes: 203,
      comments: 15,
    },
    {
      id: 5,
      image: null,
      caption: "Local comercial en zona de alto tránsito...",
      likes: 76,
      comments: 4,
    },
    {
      id: 6,
      image: null,
      caption: "Villa exclusiva con piscina privada...",
      likes: 298,
      comments: 22,
    },
  ];

  return (
    <section className="instagram-section">
      <div className="container">
        <div className="section-header">
          <div className="header-content">
            <div className="instagram-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="header-text">
              <h2 className="section-title">Síguenos en Instagram</h2>
              <p className="section-subtitle">
                Descubre las últimas propiedades y novedades de Rue Homes
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/ruehomes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Seguir @ruehomes
          </a>
        </div>

        <div className="instagram-grid">
          {instagramPosts.map((post) => (
            <div key={post.id} className="instagram-post">
              <div className="post-image">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                {/* Overlay al hacer hover */}
                <div className="post-overlay">
                  <div className="post-stats">
                    <div className="stat-item">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="stat-item">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .instagram-section {
          padding: 8rem 0;
          background: var(--color-beige-lighter);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .instagram-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(
            45deg,
            #f09433 0%,
            #e6683c 25%,
            #dc2743 50%,
            #cc2366 75%,
            #bc1888 100%
          );
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .instagram-icon svg {
          width: 32px;
          height: 32px;
        }

        .header-text {
          flex: 1;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          color: var(--color-marron);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-family: var(--font-secondary);
          color: var(--color-marron-light);
          font-size: 1.1rem;
        }

        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .instagram-post {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .instagram-post:hover {
          transform: scale(1.02);
        }

        .post-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--color-beige) 0%,
            var(--color-beige-light) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-icon {
          width: 40px;
          height: 40px;
          color: var(--color-camel);
          opacity: 0.7;
        }

        .post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .instagram-post:hover .post-overlay {
          opacity: 1;
        }

        .post-stats {
          display: flex;
          gap: 2rem;
          color: white;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-secondary);
          font-weight: 600;
        }

        .stat-item svg {
          width: 20px;
          height: 20px;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .instagram-section {
            padding: 4rem 0;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }

        @media (min-width: 1200px) {
          .instagram-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default InstagramSection;
