// src/components/common/Header.jsx - Versión mejorada
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Propiedades", href: "/propiedades" },
    { name: "Vender", href: "/vender" },
    { name: "Servicios Premium", href: "/tailored-services" },
    { name: "La Agencia", href: "/la-agencia" },
    { name: "Contacto", href: "/contacto" },
  ];

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="header-main">
      <div className="header-container">
        <nav className="header-nav">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="logo-icon">
              <span className="logo-text">RH</span>
            </div>
            <span className="logo-name">RueHomes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  isActive(item.href) ? "nav-link-active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Button */}
            <Link to="/contacto" className="btn btn-primary btn-sm header-cta">
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Abrir menú"
          >
            <span className="hamburger">
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
              ></span>
            </span>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? "nav-mobile-open" : ""}`}>
          <div className="nav-mobile-content">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-mobile-link ${
                  isActive(item.href) ? "nav-mobile-link-active" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="nav-mobile-cta">
              <Link
                to="/contacto"
                className="btn btn-primary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>

      <style jsx>{`
        .header-main {
          background: linear-gradient(
            135deg,
            var(--color-marron) 0%,
            var(--color-marron-darker) 100%
          );
          box-shadow: 0 4px 20px rgba(72, 50, 40, 0.3);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--color-marron-light);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
        }

        .header-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
        }

        .header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .header-logo:hover {
          transform: scale(1.02);
        }

        .logo-icon {
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
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .logo-text {
          color: white;
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .logo-name {
          color: white;
          font-family: var(--font-primary);
          font-size: 2rem;
          font-weight: 400;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          color: var(--color-beige-light);
          text-decoration: none;
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.75rem 0;
          position: relative;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--color-camel) 0%,
            var(--color-camel-light) 100%
          );
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: white;
          transform: translateY(-2px);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link-active {
          color: white;
        }

        .nav-link-active::after {
          width: 100%;
        }

        .header-cta {
          margin-left: 1rem;
          box-shadow: 0 4px 12px rgba(154, 116, 78, 0.3);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hamburger-line {
          width: 24px;
          height: 3px;
          background-color: var(--color-beige-light);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger-line.active:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .nav-mobile {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(
            135deg,
            var(--color-marron) 0%,
            var(--color-marron-darker) 100%
          );
          border-top: 1px solid var(--color-marron-light);
          box-shadow: 0 8px 32px rgba(72, 50, 40, 0.4);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 90;
        }

        .nav-mobile-open {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .nav-mobile-content {
          padding: 2rem;
        }

        .nav-mobile-link {
          display: block;
          color: var(--color-beige-light);
          text-decoration: none;
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 1.1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-mobile-link:hover {
          color: white;
          padding-left: 1rem;
        }

        .nav-mobile-link-active {
          color: white;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(154, 116, 78, 0.2) 100%
          );
          border-left: 3px solid var(--color-camel);
          padding-left: 1rem;
        }

        .nav-mobile-cta {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 80;
          backdrop-filter: blur(4px);
        }

        @media (max-width: 1024px) {
          .nav-desktop {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
          }

          .header-nav {
            padding: 1rem 0;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;
          }

          .logo-text {
            font-size: 1.2rem;
          }

          .logo-name {
            font-size: 1.5rem;
          }

          .nav-desktop {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
