// src/pages/Contact.jsx
import { useEffect, useRef } from "react";
import ContactForm from "../components/common/ContactForm";

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar el título
            if (titleRef.current) {
              setTimeout(() => {
                titleRef.current.style.opacity = "1";
                titleRef.current.style.transform = "translateY(0)";
              }, 200);
            }

            // Animar el formulario
            if (formRef.current) {
              setTimeout(() => {
                formRef.current.style.opacity = "1";
                formRef.current.style.transform = "translateY(0)";
              }, 400);
            }

            // Animar la información
            if (infoRef.current) {
              setTimeout(() => {
                infoRef.current.style.opacity = "1";
                infoRef.current.style.transform = "translateY(0)";
              }, 600);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page">
      <section ref={sectionRef} className="contact-hero-section">
        <div className="container">
          {/* Título y subtítulo */}
          <div ref={titleRef} className="contact-header">
            <h1 className="contact-main-title">¿Hablamos?</h1>
            <p className="contact-subtitle">
              Estamos aquí para ayudarte a encontrar tu próximo hogar o vender
              tu propiedad. Contáctanos y te responderemos lo antes posible.
            </p>
          </div>

          {/* Formulario de contacto - Ancho completo */}
          <div ref={formRef} className="contact-form-wrapper">
            <ContactForm type="general" />
          </div>

          {/* Información de contacto - Abajo */}
          <div ref={infoRef} className="contact-info-wrapper">
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Teléfono</p>
                  <a href="tel:+34642709257" className="contact-info-value">
                    +34 642 70 92 57
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Email</p>
                  <a
                    href="mailto:info@ruehomes.com"
                    className="contact-info-value"
                  >
                    info@ruehomes.com
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Ubicación</p>
                  <p className="contact-info-value">Barcelona, España</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Horario</p>
                  <p className="contact-info-value">Lun-Vie: 9:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
        }

        .contact-hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 0;
          background: linear-gradient(
            180deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 50%,
            var(--color-softdune-lighter) 100%
          );
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .contact-main-title {
          font-family: var(--font-titles);
          font-size: 5rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .contact-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.125rem;
          color: var(--color-rust);
          font-weight: 300;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-form-wrapper {
          max-width: 800px;
          margin: 0 auto 5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .contact-info-wrapper {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-info-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 2rem 1rem;
          background-color: transparent;
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }

        .contact-info-card:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .contact-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background-color: var(--color-rust);
          color: var(--color-white);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .contact-info-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-info-label {
          font-family: var(--font-secondary);
          font-size: 0.8rem;
          color: var(--color-rust);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .contact-info-value {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust);
          font-weight: 400;
          text-decoration: none;
          transition: color var(--transition-normal);
        }

        .contact-info-value:hover {
          color: var(--color-rust-dark);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .contact-hero-section {
            padding: 6rem 0;
            min-height: auto;
          }

          .contact-main-title {
            font-size: 3.5rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-form-wrapper {
            margin-bottom: 4rem;
          }

          .contact-info-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .contact-hero-section {
            padding: 4rem 0;
          }

          .contact-header {
            margin-bottom: 3rem;
          }

          .contact-main-title {
            font-size: 2.8rem;
          }

          .contact-subtitle {
            font-size: 0.95rem;
          }

          .contact-form-wrapper {
            margin-bottom: 3rem;
          }

          .contact-info-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .contact-info-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
