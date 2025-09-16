// src/components/common/Header.jsx
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
    <header className="bg-marron text-white shadow-lg sticky top-0 z-50">
      <nav className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-camel rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-primary">
                RH
              </span>
            </div>
            <span className="text-2xl font-bold font-primary">RueHomes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-secondary text-sm font-medium transition-colors duration-200 hover:text-beige-light ${
                  isActive(item.href)
                    ? "text-beige-light border-b-2 border-camel pb-1"
                    : "text-beige-light"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Button */}
            <Link to="/contacto" className="btn btn-primary btn-sm">
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-beige-light hover:text-white hover:bg-marron-light transition-colors"
          >
            <span className="sr-only">Abrir menú</span>
            {!isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-marron-light">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 rounded-md font-secondary transition-colors ${
                    isActive(item.href)
                      ? "text-white bg-camel"
                      : "text-beige-light hover:text-white hover:bg-marron-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  to="/contacto"
                  className="block mx-4 text-center btn btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
