// src/components/common/Header.jsx - Versión con fade in y nav links elegantes
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Propiedades", href: "/propiedades" },
    { name: "Vender", href: "/vender" },
    { name: "Tailored Service", href: "/tailored-services" },
    { name: "La Agencia", href: "/la-agencia" },
    { name: "Contacto", href: "/contacto" },
  ];

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
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

            {/* Hamburger menu button - Siempre visible */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hamburger-btn"
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

          {/* Navigation Menu - Fade In */}
          <div className={`nav-menu ${isMenuOpen ? "nav-menu-open" : ""}`}>
            <div className="nav-menu-content">
              <nav className="nav-menu-links">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-menu-link ${
                      isActive(item.href) ? "nav-menu-link-active" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="nav-link-text">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="nav-menu-footer">
                <div className="contact-info">
                  <a href="tel:+34123456789" className="contact-phone">
                    +34 123 456 789
                  </a>
                  <a href="mailto:info@ruehomes.com" className="contact-email">
                    info@ruehomes.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Overlay */}
          {isMenuOpen && (
            <div
              className="menu-overlay"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
        </div>

        <style jsx>{`
          /* === BASE STYLES === */
          * {
            box-sizing: border-box;
          }

          .header-main {
            background: rgba(72, 50, 40, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(154, 116, 78, 0.2);
            position: fixed;
            top: 0;
            z-index: 100;
            transition: all 0.3s ease;
            width: 100%;
          }

          .header-main:hover {
            background: rgba(72, 50, 40, 0.95);
          }

          .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            width: 100%;
          }

          .header-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 0;
            width: 100%;
          }

          .header-logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: transform 0.3s ease;
            z-index: 102;
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
            flex-shrink: 0;
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
            white-space: nowrap;
          }

          /* === HAMBURGER BUTTON === */
          .hamburger-btn {
            display: flex;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: all 0.3s ease;
            z-index: 102;
            flex-shrink: 0;
          }

          .hamburger-btn:hover .hamburger-line {
            background-color: var(--color-camel-light);
          }

          .hamburger {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .hamburger-line {
            width: 24px;
            height: 2px;
            background-color: white;
            border-radius: 1px;
            transition: all 0.3s ease;
          }

          .hamburger-line.active:nth-child(1) {
            transform: translateY(5px) rotate(45deg);
          }

          .hamburger-line.active:nth-child(2) {
            opacity: 0;
          }

          .hamburger-line.active:nth-child(3) {
            transform: translateY(-5px) rotate(-45deg);
          }

          /* === NAVIGATION MENU - FADE IN === */
          .nav-menu {
            position: fixed;
            top: 0;
            right: 0;
            width: 400px;
            height: 100vh;
            height: 100dvh;
            background: linear-gradient(
              135deg,
              var(--color-marron) 0%,
              var(--color-marron-darker) 100%
            );
            z-index: 101;
            transition: opacity 0.4s ease, visibility 0.4s ease;
            overflow-y: auto;
            overflow-x: hidden;
            opacity: 0;
            visibility: hidden;
          }

          .nav-menu-open {
            opacity: 1;
            visibility: visible;
          }

          .nav-menu-content {
            padding: 6rem 2rem 2rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 100%;
          }

          /* === NAVIGATION LINKS - ELEGANTES === */
          .nav-menu-links {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0;
            padding-top: 2rem;
          }

          .nav-menu-link {
            display: block;
            color: var(--color-beige-light);
            text-decoration: none;
            font-family: var(--font-secondary);
            font-weight: 500;
            font-size: 1.2rem;
            padding: 1.2rem 0;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            animation: slideInUp 0.5s ease forwards;
            position: relative;
          }

          .nav-menu-link:last-child {
            border-bottom: none;
          }

          .nav-menu-link::after {
            content: "";
            position: absolute;
            bottom: 10px;
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

          .nav-menu-link:hover {
            color: white;
            transform: translateX(8px) translateY(0);
          }

          .nav-menu-link:hover::after {
            width: 60px;
          }

          .nav-menu-link-active {
            color: white;
            font-weight: 600;
          }

          .nav-menu-link-active::after {
            width: 60px;
          }

          .nav-link-text {
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: inherit;
          }

          /* === MENU FOOTER === */
          .nav-menu-footer {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .contact-info {
            text-align: center;
          }

          .contact-phone,
          .contact-email {
            display: block;
            color: white;
            text-decoration: none;
            font-family: var(--font-secondary);
            font-weight: 500;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .contact-phone:hover,
          .contact-email:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--color-camel-light);
          }

          /* === OVERLAY === */
          .menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 95;
            backdrop-filter: blur(4px);
            animation: fadeIn 0.3s ease;
          }

          /* === ANIMATIONS === */
          @keyframes slideInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* === RESPONSIVE === */
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

            .nav-menu {
              width: 100%;
              max-width: 100vw;
            }

            .nav-menu-content {
              padding: 5rem 1.5rem 2rem;
            }

            .nav-menu-link {
              font-size: 1rem;
              padding: 1rem 0;
            }
          }

          @media (min-width: 1200px) {
            .nav-menu {
              width: 450px;
            }
          }

          /* === PREVENT HORIZONTAL SCROLL === */
          @media (max-width: 480px) {
            .logo-name {
              font-size: 1.3rem;
            }

            .header-container {
              padding: 0 0.75rem;
            }
          }
        `}</style>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
