// src/pages/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/propiedades?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  // Datos temporales de propiedades destacadas
  const featuredProperties = [
    {
      id: 1,
      title: "Casa Familiar",
      price: 485000,
      type: "Casa",
      bedrooms: 4,
      bathrooms: 3,
      area: 185,
      description: "Amplia casa familiar con jardín, perfecta para familias.",
    },
    {
      id: 2,
      title: "Piso Moderno",
      price: 320000,
      type: "Piso",
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      description: "Piso moderno en el centro con todas las comodidades.",
    },
    {
      id: 3,
      title: "Casa Clásica",
      price: 675000,
      type: "Casa",
      bedrooms: 5,
      bathrooms: 3,
      area: 240,
      description: "Casa clásica con encanto y vistas espectaculares.",
    },
  ];

  const services = [
    {
      title: "Comprar",
      description:
        "Encuentra la propiedad perfecta con nuestra amplia selección y asesoramiento personalizado",
      link: "/propiedades",
      buttonText: "Ver Propiedades",
      icon: (
        <svg
          className="w-8 h-8 text-camel"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "Vender",
      description:
        "Vendemos tu propiedad al mejor precio con estrategias de marketing innovadoras",
      link: "/vender",
      buttonText: "Valorar Propiedad",
      icon: (
        <svg
          className="w-8 h-8 text-camel"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      title: "Premium",
      description:
        "Servicios exclusivos para clientes VIP con atención personalizada 24/7",
      link: "/tailored-services",
      buttonText: "Descubrir Más",
      icon: (
        <svg
          className="w-8 h-8 text-camel"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-camel text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-marron opacity-20"></div>

        <div className="container text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-primary">
            Encuentra tu <span className="text-beige-light">hogar ideal</span>
          </h1>
          <p className="text-xl mb-8 font-secondary text-beige-lighter max-w-2xl mx-auto">
            Más de 10 años ayudando a familias a encontrar la casa de sus
            sueños. Experiencia, confianza y resultados excepcionales.
          </p>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
            <div className="flex bg-white rounded-xl p-2 shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Dónde te gustaría vivir?"
                className="flex-1 px-4 py-3 text-marron font-secondary bg-transparent border-none outline-none"
              />
              <button type="submit" className="btn btn-primary px-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/propiedades"
              className="btn btn-primary btn-lg hover-lift"
            >
              Ver Propiedades
            </Link>
            <Link
              to="/vender"
              className="btn btn-outline btn-lg bg-white text-camel border-white hover:bg-beige-light"
            >
              Valorar mi casa
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-beige-lighter font-primary">
                500+
              </div>
              <div className="text-beige-light font-secondary text-sm">
                Propiedades
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-beige-lighter font-primary">
                1000+
              </div>
              <div className="text-beige-light font-secondary text-sm">
                Clientes
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-beige-lighter font-primary">
                15+
              </div>
              <div className="text-beige-light font-secondary text-sm">
                Años
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="py-20 bg-beige-lighter">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-marron mb-6 font-primary">
              Propiedades Destacadas
            </h2>
            <p className="text-xl text-marron-light font-secondary max-w-2xl mx-auto">
              Descubre nuestra selección de propiedades exclusivas,
              cuidadosamente elegidas para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="card hover-lift">
                {/* Imagen placeholder */}
                <div className="bg-beige h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-beige-light to-beige flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-camel opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-camel text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Destacado
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-marron font-primary">
                      {property.title}
                    </h3>
                    <span className="text-2xl font-bold text-camel font-primary">
                      €{(property.price / 1000).toFixed(0)}K
                    </span>
                  </div>

                  <p className="text-marron-light mb-4 font-secondary">
                    {property.description}
                  </p>

                  {/* Características */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-marron-light font-secondary">
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                        />
                      </svg>
                      <span>{property.bedrooms} hab.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
                        />
                      </svg>
                      <span>{property.bathrooms} baños</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                      <span>{property.area}m²</span>
                    </div>
                  </div>

                  <Link
                    to={`/propiedad/${property.id}`}
                    className="btn btn-primary w-full hover-scale"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/propiedades" className="btn btn-secondary btn-lg">
              Ver todas las propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-marron mb-6 font-primary">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-marron-light font-secondary">
              Soluciones completas para todas tus necesidades inmobiliarias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card text-center hover-lift">
                <div className="card-body">
                  <div className="w-16 h-16 bg-beige-light rounded-full flex items-center justify-center mx-auto mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-marron mb-4 font-primary">
                    {service.title}
                  </h3>
                  <p className="text-marron-light mb-6 font-secondary">
                    {service.description}
                  </p>
                  <Link to={service.link} className="btn btn-outline">
                    {service.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-marron text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 font-primary">
            ¿Listo para encontrar tu nuevo hogar?
          </h2>
          <p className="text-xl text-beige-light mb-8 max-w-2xl mx-auto font-secondary">
            Nuestro equipo de expertos está aquí para ayudarte en cada paso del
            proceso
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="btn bg-beige text-marron hover:bg-beige-dark btn-lg"
            >
              Contactar Ahora
            </Link>
            <Link
              to="/propiedades"
              className="btn btn-outline btn-lg border-beige-light text-beige-light hover:bg-beige-light hover:text-marron"
            >
              Ver Propiedades
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
