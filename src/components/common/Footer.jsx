// src/components/common/Footer.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import LegalModal from "./LegalModal";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const navigation = {
    legal: [
      { name: "Política de Privacidad" },
      { name: "Términos y Condiciones" },
      { name: "Cookies" },
      { name: "Aviso Legal" },
    ],
  };

  const handleLegalClick = (name) => {
    setSelectedSection(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/rue.homes/",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/rue-homes",
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
      name: "WhatsApp",
      href: "https://wa.me/34642709257",
      icon: (
        <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* Sección principal del footer */}
        <div className="footer-content">
          {/* Logo */}
          <Link to="/" className="footer-logo">
            <img src="/logo.png" alt="RueHomes" className="footer-logo-image" />
          </Link>

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
                <button
                  onClick={() => handleLegalClick(item.name)}
                  className="legal-link"
                >
                  {item.name}
                </button>
                {index < navigation.legal.length - 1 && (
                  <span className="legal-separator">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Legal */}
        <LegalModal
          isOpen={modalOpen}
          onClose={closeModal}
          section={selectedSection}
        />

        {/* Copyright */}
        <div className="copyright">
          <p className="copyright-text">
            © {new Date().getFullYear()} RueHomes. Todos los derechos
            reservados.
          </p>
          <p className="copyright-subtitle">
            Desarrollado por Lexmake | lexmake.com
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-main {
          background: linear-gradient(
            180deg,
            var(--color-rust) 0%,
            var(--color-rust-light) 100%
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
            var(--color-cinnamon) 50%,
            transparent 100%
          );
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2rem;
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 1rem 0;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .footer-logo:hover {
          transform: scale(1.05);
        }

        .footer-logo-image {
          height: 80px;
        }

        .social-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .social-title {
          color: var(--color-softdune-light);
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: var(--color-softdune-light);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: var(--color-cinnamon);
          color: white;
          transform: translateY(-2px);
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
          margin-left: auto;
        }

        .legal-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .legal-link {
          color: var(--color-softdune-light);
          text-decoration: none;
          font-size: 0.9rem;
          font-family: var(--font-secondary);
          transition: color 0.3s ease;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .legal-link:hover {
          color: white;
        }

        .legal-separator {
          color: var(--color-rust-light);
        }

        .copyright {
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        .copyright-text {
          color: var(--color-softdune-light);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .copyright-subtitle {
          color: var(--color-honeyfield);
          font-family: var(--font-secondary);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 2rem 1rem;
          }

          .footer-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-logo-image {
            height: 60px;
          }

          .social-section {
            flex-direction: column;
            gap: 0.75rem;
          }

          .legal-links {
            flex-direction: column;
            gap: 0.75rem;
            margin-left: 0;
          }

          .legal-item {
            flex-direction: column;
            gap: 0.5rem;
          }

          .legal-separator {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
