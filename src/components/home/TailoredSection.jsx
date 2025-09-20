// src/components/home/TailoredSection.jsx - Versión refactorizada
import { ScrollReveal } from "../ui/ScrollReveal";
import AnimatedImageContainer from "../ui/AnimatedImageContainer";
import AnimatedButton from "../ui/AnimatedButton";

const TailoredSection = () => {
  // Aquí puedes cambiar las rutas de las imágenes por las que necesites
  const mainImage = "/src/assets/images/tailored/turull-salon.webp"; // Imagen principal izquierda
  const smallImage = "/src/assets/images/tailored/render-cocina2.webp"; // Imagen pequeña derecha

  return (
    <section className="tailored-section">
      <div className="container">
        <div className="tailored-content">
          {/* Imagen principal - Columna izquierda */}
          <div className="tailored-main-image">
            <AnimatedImageContainer
              src={mainImage}
              className="main-image-container"
              delay={0.2}
            />
          </div>

          {/* Contenido derecha - Imagen pequeña + Texto + Botón */}
          <div className="tailored-text-column">
            {/* Imagen pequeña arriba */}
            <div className="tailored-small-image">
              <AnimatedImageContainer
                src={smallImage}
                className="small-image-container"
                delay={0.4}
              />
            </div>

            {/* Texto con ScrollReveal */}
            <div className="tailored-text-content">
              <ScrollReveal
                containerClassName="mb-8"
                size="sm"
                align="left"
                baseOpacity={0.2}
                baseRotation={0}
              >
                Nuestro servicio premium está diseñado para clientes que buscan
                una experiencia única y personalizada. Acceso exclusivo a
                propiedades fuera de mercado, atención 24/7 y un equipo dedicado
                solo para ti.
              </ScrollReveal>

              {/* Botón animado */}
              <AnimatedButton
                to="/tailored-services"
                className="btn btn-primary btn-sm"
                delay={1.2}
              >
                Tailored Services
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tailored-section {
          min-height: 100vh;
          padding: 8rem 0;
          background: var(--color-softdune-lighter);
        }

        .tailored-content {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 5rem;
          align-items: start;
        }

        /* === IMAGEN PRINCIPAL IZQUIERDA === */
        .tailored-main-image {
          height: 650px;
          position: relative;
        }

        .tailored-main-image .main-image-container {
          height: 100% !important;
          width: 100% !important;
          overflow: hidden;
        }

        /* === COLUMNA DERECHA === */
        .tailored-text-column {
          display: flex;
          flex-direction: column;
          height: 650px;
          margin-right: 100px;
        }

        /* Imagen pequeña arriba */
        .tailored-small-image {
          height: 280px;
          width: 100%;
          margin-bottom: 2rem;
          position: relative;
        }

        .tailored-small-image .small-image-container {
          height: 100% !important;
          width: 100% !important;
          overflow: hidden;
        }

        /* Contenido de texto */
        .tailored-text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 1rem;
        }

        .tailored-text-content .btn {
          width: fit-content;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1305px) {
          .tailored-text-column {
            margin-right: 50px;
          }
        }

        @media (max-width: 1220px) {
          .tailored-content {
            gap: 3rem;
          }

          .tailored-main-image {
            height: 650px;
          }

          .tailored-text-column {
            height: 550px;
            margin-right: 20px;
          }

          .tailored-small-image {
            height: 240px;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 1060px) {
          .tailored-section {
            padding: 4rem 0;
            min-height: auto;
          }

          .tailored-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          /* Ocultar imagen principal en mobile */
          .tailored-main-image {
            display: none;
          }

          .tailored-text-column {
            height: auto;
            margin-right: 0;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
          }

          .tailored-small-image {
            height: 350px;
            margin-bottom: 2rem;
          }

          .tailored-text-content {
            text-align: center;
            padding-top: 0;
          }
        }

        @media (max-width: 768px) {
          .tailored-section {
            padding: 3rem 0;
          }

          .tailored-content {
            gap: 1.5rem;
          }

          .tailored-text-column {
            max-width: 100%;
          }

          .tailored-text-content .btn {
            align-self: center;
          }

          .tailored-small-image {
            height: 280px;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .tailored-section {
            padding: 2rem 0;
          }

          .tailored-small-image {
            height: 240px;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TailoredSection;
