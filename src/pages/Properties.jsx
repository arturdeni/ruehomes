// src/pages/Properties.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import PropertiesFilters from "../components/property/PropertiesFilters";
import { getProperties } from "../services/hygraph";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializar filtros desde URL
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    search: searchParams.get("search") || "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const propertiesPerPage = 9;

  // Fetch properties from Hygraph
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(
          "Error al cargar las propiedades. Por favor, intenta de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...allProperties];

    // Filtro por ciudad
    if (filters.city) {
      filtered = filtered.filter((property) =>
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    // Filtro por número de habitaciones
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    // Filtro por rango de precio
    if (filters.minPrice) {
      filtered = filtered.filter(
        (property) => property.price >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (property) => property.price <= parseInt(filters.maxPrice)
      );
    }

    // Filtro por búsqueda de texto
    if (filters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.address
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          property.city.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        filtered.sort((a, b) => b.area - a.area);
        break;
      case "recent":
      default:
        // Mantener orden original (más recientes primero)
        break;
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset a la primera página al aplicar filtros
  }, [filters, sortBy, allProperties]);

  // Paginación
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    // Actualizar URL con los nuevos filtros
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (loading) {
    return (
      <div className="properties-page">
        <section className="properties__hero py-20">
          <div className="container">
            <div className="properties__hero-content text-center">
              <h1 className="properties__hero-title font-primary text-rust mb-6">
                Nuestras Propiedades
              </h1>
            </div>
          </div>
        </section>
        <section className="properties__content py-12">
          <div className="container">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cinnamon mx-auto mb-4"></div>
                <p className="font-secondary text-rust">
                  Cargando propiedades...
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="properties-page">
        <section className="properties__hero py-20">
          <div className="container">
            <div className="properties__hero-content text-center">
              <h1 className="properties__hero-title font-primary text-rust mb-6">
                Nuestras Propiedades
              </h1>
            </div>
          </div>
        </section>
        <section className="properties__content py-12">
          <div className="container">
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="font-primary text-rust text-xl mb-4">Error</h3>
                <p className="font-secondary text-rust-light mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  Recargar página
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="properties-page">
      {/* Hero Section */}
      <section className="properties__hero py-8">
        <div className="container">
          <div className="properties__hero-content text-center">
            <h1 className="properties__hero-title text-rust mb-6">
              Nuestras Propiedades
            </h1>
            <p className="properties__hero-subtitle font-secondary text-rust-light text-xl max-w-2xl mx-auto">
              Descubre una selección exclusiva de propiedades que hemos elegido
              especialmente para ti. Cada inmueble cuenta con nuestra garantía
              de calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="properties__content py-12">
        <div className="container">
          {/* Filtros */}
          <div className="properties__filters mb-12">
            <PropertiesFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalResults={filteredProperties.length}
            />
          </div>

          {/* Barra de resultados y ordenamiento */}
          <div className="properties__results-bar mb-8 flex justify-between items-center">
            <div className="properties__results-info">
              <p className="font-secondary text-rust">
                {filteredProperties.length} propiedades encontradas
                {filteredProperties.length !== allProperties.length &&
                  ` de ${allProperties.length} total`}
              </p>
            </div>
            <div className="properties__sort">
              <label className="font-secondary text-rust mr-3">
                Ordenar por:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="properties__sort-select form-input py-2 px-3 min-w-[180px]"
              >
                <option value="recent">Más recientes</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="area-desc">Mayor superficie</option>
              </select>
            </div>
          </div>

          {/* Grid de propiedades */}
          {console.log(currentProperties)}
          {currentProperties.length > 0 ? (
            <div className="properties__grid grid grid-3 mb-12">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="properties__no-results text-center py-20">
              <div className="properties__no-results-icon mb-6">
                <svg
                  className="text-softdune mx-auto w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-primary text-rust text-2xl mb-4">
                No se encontraron propiedades
              </h3>
              <p className="font-secondary text-rust-light mb-6">
                Intenta ajustar los filtros de búsqueda para encontrar más
                resultados.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    city: "",
                    propertyType: "",
                    bedrooms: "",
                    minPrice: "",
                    maxPrice: "",
                    search: "",
                  })
                }
                className="btn btn-outline"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="properties__pagination">
              <div className="properties__pagination-container flex justify-center items-center space-x-2">
                {/* Botón anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="properties__pagination-btn properties__pagination-btn--prev"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="ml-1">Anterior</span>
                </button>

                {/* Números de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Mostrar solo algunas páginas alrededor de la actual
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`properties__pagination-number ${
                            currentPage === page
                              ? "properties__pagination-number--active"
                              : ""
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          className="properties__pagination-dots"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                {/* Botón siguiente */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="properties__pagination-btn properties__pagination-btn--next"
                >
                  <span className="mr-1">Siguiente</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .properties-page {
          min-height: 100vh;
        }

        .properties__hero {
          position: relative;
          overflow: hidden;
          margin-top: 6rem;
        }

        .properties__hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.3;
          z-index: 0;
        }

        .properties__hero-content {
          position: relative;
          z-index: 1;
        }

        .properties__hero-title {
          font-family: var(--font-titles);
          font-size: 3.5rem;
          line-height: 1.2;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) 0.2s
            forwards;
        }

        .properties__hero-subtitle {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) 0.4s
            forwards;
        }

        .properties__content {
          position: relative;
          background: var(--color-dune-light);
          backdrop-filter: blur(10px);
        }

        .properties__results-bar {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--color-softdune);
          margin-bottom: 2rem !important;
        }

        .properties__sort-select {
          background-color: white;
          border: 2px solid var(--color-softdune);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .properties__sort-select:focus {
          outline: none;
          border-color: var(--color-cinnamon);
          transform: translateY(-1px);
        }

        .properties__grid {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease 0.6s forwards;
        }

        .properties__no-results {
          background: white;
          border-radius: 16px;
          margin: 2rem 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .properties__pagination {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-softdune);
        }

        .properties__pagination-container {
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .properties__pagination-btn {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: white;
          color: var(--color-rust);
          border: 2px solid var(--color-softdune);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .properties__pagination-btn:hover:not(:disabled) {
          background: var(--color-softdune);
          transform: translateY(-2px);
        }

        .properties__pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .properties__pagination-number {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: var(--color-rust);
          border: 2px solid var(--color-softdune);
          border-radius: 8px;
          font-family: var(--font-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .properties__pagination-number:hover {
          background: var(--color-softdune);
          transform: translateY(-2px);
        }

        .properties__pagination-number--active {
          background: var(--color-cinnamon);
          color: white;
          border-color: var(--color-cinnamon);
        }

        .properties__pagination-number--active:hover {
          background: var(--color-cinnamon-dark);
          border-color: var(--color-cinnamon-dark);
        }

        .properties__pagination-dots {
          color: var(--color-rust-light);
          font-weight: bold;
          padding: 0 0.5rem;
        }

        /* Animaciones */
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .properties__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .properties__hero-title {
            font-size: 2.5rem;
          }

          .properties__hero-subtitle {
            font-size: 1rem;
          }

          .properties__grid {
            grid-template-columns: 1fr;
          }

          .properties__results-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .properties__pagination-container {
            justify-content: center;
            gap: 0.25rem;
          }

          .properties__pagination-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .properties__pagination-number {
            width: 2.25rem;
            height: 2.25rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Properties;
