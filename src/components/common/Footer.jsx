// src/components/common/Footer.jsx - Versión mejorada
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAgencyInfo } from "../../services/hygraph";

const Footer = () => {
  const [agencyInfo, setAgencyInfo] = useState(null);

  useEffect(() => {
    const loadAgencyInfo = async () => {
      try {
        const info = await getAgencyInfo();
        setAgencyInfo(info);
      } catch (error) {
        console.error("Error loading agency info:", error);
      }
    };

    loadAgencyInfo();
  }, []);

  const navigation = {
    propiedades: [
      { name: "Todas las Propiedades", href: "/propiedades" },
      { name: "Casas", href: "/propiedades?type=house" },
      { name: "Pisos", href: "/propiedades?type=apartment" },
      { name: "Locales Comerciales", href: "/propiedades?type=commercial" },
    ],
    servicios: [
      { name: "Vender Propiedad", href: "/vender" },
      { name: "Servicios Premium", href: "/tailored-services" },
      { name: "Valoraciones", href: "/contacto" },
      { name: "Asesoramiento", href: "/contacto" },
    ],
    empresa: [
      { name: "Sobre Nosotros", href: "/la-agencia" },
      { name: "Contacto", href: "/contacto" },
      { name: "Blog", href: "#" },
      { name: "Trabajar con Nosotros", href: "#" },
    ],
    legal: [
      { name: "Política de Privacidad", href: "#" },
      { name: "Términos y Condiciones", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Aviso Legal", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 7.989.013 7.041.072 6.095.131 5.431.16 4.925.207 3.746.295 2.823.717 2.058 1.482.823 2.717.295 4.171.207 5.019.131 5.431.072 7.989.072 12.017c0 4.024.013 4.408.072 5.356.131.849.207 1.302.295 2.482.717 3.246 2.058 4.482 2.823 5.717 1.482 7.177 1.482 8.396 1.31 9.344 1.239 10.102.717 10.867-.548 11.632-1.483 12.16-2.936 12.248-4.784 12.307-5.431 12.307-7.989v-.001c-.001-4.024-.014-4.408-.072-5.356-.131-.849-.207-1.302-.295-2.482-.717-3.246-2.058-4.482-2.823-5.717-1.482-7.177-1.482-8.396-1.31-9.344-1.239-10.102-.717-10.867.548-11.632 1.483-12.16 2.936-12.248 4.784-12.307 5.431-12.307 7.989zM8.5 12a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm7.93-3.94a.82.82 0 11-1.64 0 .82.82 0 011.64 0z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-content">
          {/* Información de la empresa */}
          <div className="footer-company">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <span className="footer-logo-text">RH</span>
              </div>
              <span className="footer-logo-name">RueHomes</span>
            </Link>

            {agencyInfo && (
              <div className="company-description">
                <div
                  dangerouslySetInnerHTML={{
                    __html: agencyInfo.description?.html || "",
                  }}
                />
              </div>
            )}

            {/* Información de contacto */}
            <div className="contact-info">
              {agencyInfo?.phone && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <a href={`tel:${agencyInfo.phone}`} className="contact-link">
                    {agencyInfo.phone}
                  </a>
                </div>
              )}

              {agencyInfo?.email && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a
                    href={`mailto:${agencyInfo.email}`}
                    className="contact-link"
                  >
                    {agencyInfo.email}
                  </a>
                </div>
              )}

              {agencyInfo?.address && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="contact-text">{agencyInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="footer-links">
            {/* Propiedades */}
            <div className="footer-section">
              <h3 className="footer-title">Propiedades</h3>
              <ul className="footer-list">
                {navigation.propiedades.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div className="footer-section">
              <h3 className="footer-title">Servicios</h3>
              <ul className="footer-list">
                {navigation.servicios.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div className="footer-section">
              <h3 className="footer-title">Empresa</h3>
              <ul className="footer-list">
                {navigation.empresa.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            {/* Redes sociales */}
            <div className="social-section">
              <span className="social-title">Síguenos:</span>
              <div className="social-links">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Enlaces legales */}
            <div className="legal-links">
              {navigation.legal.map((item, index) => (
                <span key={item.name} className="legal-item">
                  <Link to={item.href} className="legal-link">
                    {item.name}
                  </Link>
                  {index < navigation.legal.length - 1 && (
                    <span className="legal-separator">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p className="copyright-text">
              © {new Date().getFullYear()} RueHomes. Todos los derechos
              reservados.
            </p>
            <p className="copyright-subtitle">
              Desarrollado por Lexmake (lexmake.com)
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-main {
          background: linear-gradient(
            135deg,
            var(--color-marron-darker) 0%,
            var(--color-marron) 100%
          );
          color: white;
          position: relative;
          overflow: hidden;
        }

        .footer-main::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--color-camel) 50%,
            transparent 100%
          );
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-company {
          max-width: 400px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-bottom: 2rem;
          transition: transform 0.3s ease;
        }

        .footer-logo:hover {
          transform: scale(1.02);
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(
            135deg,
            var(--color-camel) 0%,
            var(--color-camel-dark) 100%
          );
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          box-shadow: 0 4px 12px rgba(154, 116, 78, 0.3);
        }

        .footer-logo-text {
          color: white;
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .footer-logo-name {
          color: white;
          font-family: var(--font-primary);
          font-size: 2rem;
          font-weight: 400;
        }

        .company-description {
          margin-bottom: 2rem;
          color: var(--color-beige-light);
          line-height: 1.6;
        }

        .company-description p {
          margin-bottom: 1rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          width: 20px;
          height: 20px;
          color: var(--color-camel);
          flex-shrink: 0;
        }

        .contact-icon svg {
          width: 100%;
          height: 100%;
        }

        .contact-link {
          color: var(--color-beige-light);
          text-decoration: none;
          transition: color 0.3s ease;
          font-family: var(--font-secondary);
        }

        .contact-link:hover {
          color: white;
        }

        .contact-text {
          color: var(--color-beige-light);
          font-family: var(--font-secondary);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .footer-section {
        }

        .footer-title {
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .footer-title::after {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--color-camel) 0%,
            var(--color-camel-light) 100%
          );
        }

        .footer-list {
          list-style: none;
          padding: 0;
        }

        .footer-list li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          color: var(--color-beige-light);
          text-decoration: none;
          font-family: var(--font-secondary);
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link:hover {
          color: white;
          padding-left: 0.5rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--color-marron-light);
          padding-top: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .social-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .social-title {
          color: var(--color-beige-light);
          font-family: var(--font-secondary);
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: var(--color-beige-light);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: var(--color-camel);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(154, 116, 78, 0.3);
        }

        .social-icon {
          width: 20px;
          height: 20px;
        }

        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          align-items: center;
        }

        .legal-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .legal-link {
          color: var(--color-beige-light);
          text-decoration: none;
          font-size: 0.9rem;
          font-family: var(--font-secondary);
          transition: color 0.3s ease;
        }

        .legal-link:hover {
          color: white;
        }

        .legal-separator {
          color: var(--color-marron-light);
        }

        .copyright {
          text-align: center;
          border-top: 1px solid var(--color-marron-light);
          padding-top: 2rem;
        }

        .copyright-text {
          color: var(--color-beige-light);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .copyright-subtitle {
          color: var(--color-marron-light);
          font-family: var(--font-secondary);
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 3rem 1rem 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-bottom: 2rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-logo-name {
            font-size: 1.5rem;
          }

          .footer-logo-icon {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;
          }

          .footer-logo-text {
            font-size: 1.2rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .legal-links {
            justify-content: center;
          }

          .social-section {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
