// src/components/common/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
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

  // Detectar dirección del scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determinar si estamos scrolleando
          setIsScrolled(currentScrollY > 10);

          // Determinar dirección del scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolleando hacia abajo - ocultar header
            setIsHeaderVisible(false);
          } else {
            // Scrolleando hacia arriba o en la parte superior - mostrar header
            setIsHeaderVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`header-main ${
          isHeaderVisible ? "header-visible" : "header-hidden"
        } ${isScrolled ? "header-scrolled" : ""}`}
      >
        <div className="header-container">
          <nav className="header-nav">
            {/* Logo */}
            <Link to="/" className="header-logo">
              <img src="/logo-mini.svg" alt="RueHomes" className="logo-image" />
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
                  {/* Iconos sociales */}
                  <div className="social-icons">
                    <a
                      href="#"
                      className="social-icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg
                        className="social-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    <a
                      href="#"
                      className="social-icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <svg
                        className="social-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
                      </svg>
                    </a>
                  </div>

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
            background-color: var(--color-marble-lighter);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            z-index: 100;
            transition: all 0.3s ease;
            width: 100%;
            transform: translateY(0);
          }

          .header-visible {
            transform: translateY(0);
          }

          .header-hidden {
            transform: translateY(-100%);
          }

          .header-scrolled {
            background-color: var(--color-marble-lighter);
          }

          .header-main:hover {
            background-color: var(--color-marble-lighter);
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
            padding: 1rem 0;
            width: 100%;
          }

          .header-logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            z-index: 102;
          }

          .logo-image {
            height: 2rem;
            width: auto;
            object-fit: contain;
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

          .hamburger {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }

          .hamburger-line {
            width: 24px;
            height: 2px;
            background-color: black;
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
            background: var(--color-marble-lighter);
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
            color: black;
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
              var(--color-marble-lighter) 0%,
              var(--color-rust-light) 100%
            );
            transition: width 0.3s ease;
          }

          .nav-menu-link:hover {
            color: var(--color-rust);
          }

          .nav-menu-link:hover::after {
            width: 60px;
          }

          .nav-menu-link-active {
            color: var(--color-rust);
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
          }

          .contact-info {
            text-align: center;
          }

          /* === SOCIAL ICONS === */
          .social-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
          }

          .social-icon-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            color: black;
            transition: all 0.3s ease;
            border-radius: 6px;
            padding: 6px;
          }

          .social-icon-link:hover {
            color: var(--color-rust);
            background: rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
          }

          .social-icon {
            width: 20px;
            height: 20px;
          }

          .contact-email {
            display: block;
            color: black;
            text-decoration: none;
            font-family: var(--font-secondary);
            font-weight: 500;
            padding: 0.5rem;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .contact-email:hover {
            background: rgba(0, 0, 0, 0.05);
            color: var(--color-rust);
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

            .logo-image {
              height: 1.5rem;
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

            .social-icons {
              gap: 1rem;
            }
          }

          @media (min-width: 1200px) {
            .nav-menu {
              width: 450px;
            }
          }

          /* === PREVENT HORIZONTAL SCROLL === */
          @media (max-width: 480px) {
            .logo-image {
              height: 1.3rem;
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
