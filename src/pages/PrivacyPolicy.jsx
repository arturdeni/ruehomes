// src/pages/PrivacyPolicy.jsx
import { useEffect, useRef } from "react";

const PrivacyPolicy = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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

            // Animar el contenido
            if (contentRef.current) {
              setTimeout(() => {
                contentRef.current.style.opacity = "1";
                contentRef.current.style.transform = "translateY(0)";
              }, 400);
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
    <div className="privacy-policy-page">
      <section ref={sectionRef} className="privacy-policy-section">
        <div className="container">
          {/* Título */}
          <div ref={titleRef} className="privacy-policy-header">
            <h1 className="privacy-policy-main-title">Política de Privacidad</h1>
            <p className="privacy-policy-subtitle">
              En RueHomes nos comprometemos a proteger tu privacidad y tus datos personales.
            </p>
          </div>

          {/* Contenido */}
          <div ref={contentRef} className="privacy-policy-content">
            <section className="privacy-section">
              <h2>1. Responsable del Tratamiento</h2>
              <p>
                Rue Homes Properties S.L., con NIF B22870430 y domicilio en Calle Lepant, 108 3o 4a - Sabadell (08203),
                es el responsable del tratamiento de los datos personales que nos facilites a través de esta web.
              </p>
            </section>

            <section className="privacy-section">
              <h2>2. Datos que Recopilamos</h2>
              <p>
                Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:
              </p>
              <ul>
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>ID de usuario de redes sociales (cuando interactúas con nosotros a través de estas plataformas)</li>
                <li>Información sobre propiedades de interés</li>
              </ul>
              <p>
                <strong>Uso de la API de Instagram:</strong> Esta aplicación propiedad de Rue Homes Properties S.L.
                utiliza los datos de la API de Instagram para gestionar comentarios y mensajes de la cuenta de Rue Homes
                con fines de atención al cliente. No compartimos datos con terceros.
              </p>
            </section>

            <section className="privacy-section">
              <h2>3. Finalidad del Tratamiento</h2>
              <p>
                Utilizamos tus datos personales para:
              </p>
              <ul>
                <li>Gestionar consultas y solicitudes de información</li>
                <li>Proporcionar servicios inmobiliarios</li>
                <li>Enviar comunicaciones comerciales (con tu consentimiento)</li>
                <li>Mejorar nuestros servicios</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>4. Base Legal</h2>
              <p>
                El tratamiento de tus datos se basa en tu consentimiento y en la ejecución de servicios solicitados.
              </p>
            </section>

            <section className="privacy-section">
              <h2>5. Tus Derechos</h2>
              <p>
                Tienes derecho a acceder, rectificar, suprimir, limitar, portabilidad y oposición al tratamiento
                de tus datos. Para ejercer estos derechos, contacta con nosotros en{" "}
                <a href="mailto:info@ruehomes.com" className="privacy-link">
                  info@ruehomes.com
                </a>.
              </p>
            </section>

            <section className="privacy-section">
              <h2>6. Conservación de Datos</h2>
              <p>
                Conservaremos tus datos mientras mantengas relación con nosotros o durante el tiempo necesario
                para cumplir con obligaciones legales.
              </p>
            </section>

            <section className="privacy-section">
              <h2>7. Contacto</h2>
              <p>
                Si tienes cualquier pregunta sobre nuestra Política de Privacidad o deseas ejercer tus derechos,
                puedes contactarnos en:
              </p>
              <ul className="contact-details">
                <li><strong>Email:</strong> <a href="mailto:info@ruehomes.com" className="privacy-link">info@ruehomes.com</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34642711331" className="privacy-link">+34 642 71 13 31</a></li>
                <li><strong>Dirección:</strong> Calle Lepant, 108 3o 4a - Sabadell (08203)</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <style jsx>{`
        .privacy-policy-page {
          min-height: 100vh;
        }

        .privacy-policy-section {
          min-height: 100vh;
          padding: 8rem 0 6rem;
          background: linear-gradient(
            180deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 50%,
            var(--color-softdune-lighter) 100%
          );
        }

        .privacy-policy-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .privacy-policy-main-title {
          font-family: var(--font-titles);
          font-size: 5rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .privacy-policy-subtitle {
          font-family: var(--font-secondary);
          font-size: 1.125rem;
          color: var(--color-rust);
          font-weight: 300;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        .privacy-policy-content {
          max-width: 900px;
          margin: 0 auto;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-lg);
          padding: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.25, 0.4, 0.25, 1);
          backdrop-filter: blur(10px);
        }

        .privacy-section {
          margin-bottom: 3rem;
        }

        .privacy-section:last-child {
          margin-bottom: 0;
        }

        .privacy-section h2 {
          font-family: var(--font-titles);
          font-size: 1.75rem;
          color: var(--color-rust);
          font-weight: 400;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .privacy-section p {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust);
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .privacy-section ul {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust);
          line-height: 1.8;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .privacy-section li {
          margin-bottom: 0.5rem;
        }

        .contact-details {
          list-style: none;
          margin-left: 0;
        }

        .privacy-link {
          color: var(--color-rust);
          text-decoration: underline;
          transition: color var(--transition-normal);
        }

        .privacy-link:hover {
          color: var(--color-rust-dark);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .privacy-policy-section {
            padding: 6rem 0 4rem;
          }

          .privacy-policy-main-title {
            font-size: 3.5rem;
          }

          .privacy-policy-subtitle {
            font-size: 1rem;
          }

          .privacy-policy-content {
            padding: 2.5rem;
          }

          .privacy-section h2 {
            font-size: 1.5rem;
          }

          .privacy-section p,
          .privacy-section ul {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 640px) {
          .privacy-policy-section {
            padding: 4rem 0 3rem;
          }

          .privacy-policy-header {
            margin-bottom: 3rem;
          }

          .privacy-policy-main-title {
            font-size: 2.8rem;
          }

          .privacy-policy-subtitle {
            font-size: 0.95rem;
          }

          .privacy-policy-content {
            padding: 2rem 1.5rem;
          }

          .privacy-section {
            margin-bottom: 2rem;
          }

          .privacy-section h2 {
            font-size: 1.35rem;
          }

          .privacy-section p,
          .privacy-section ul {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
