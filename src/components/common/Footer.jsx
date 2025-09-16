// src/components/common/Footer.jsx
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Información de la empresa */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RH</span>
              </div>
              <span className="text-2xl font-bold">RueHomes</span>
            </Link>

            {agencyInfo && (
              <div className="space-y-4 text-gray-300">
                <div
                  className="prose prose-sm prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: agencyInfo.description?.html || "",
                  }}
                />
              </div>
            )}

            {/* Información de contacto */}
            <div className="mt-6 space-y-3 text-gray-300">
              {agencyInfo?.phone && (
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${agencyInfo.phone}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {agencyInfo.phone}
                  </a>
                </div>
              )}

              {agencyInfo?.email && (
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${agencyInfo.email}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {agencyInfo.email}
                  </a>
                </div>
              )}

              {agencyInfo?.address && (
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                  <span>{agencyInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Propiedades</h3>
            <ul className="space-y-3">
              {navigation.propiedades.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-3">
              {navigation.servicios.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Redes sociales y enlaces legales */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Redes sociales */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Síguenos:</span>
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Enlaces legales */}
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {navigation.legal.map((item, index) => (
                <span key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                  {index < navigation.legal.length - 1 && (
                    <span className="text-gray-600 ml-6">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RueHomes. Todos los derechos
              reservados.
              <span className="block sm:inline sm:ml-2">
                Desarrollado con ❤️ para encontrar tu hogar ideal.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
