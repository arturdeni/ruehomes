// src/components/home/VentaSection.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "../ui/ScrollReveal";
import AnimatedImageContainer from "../ui/AnimatedImageContainer";
import AnimatedButton from "../ui/AnimatedButton";
import turullCuina from "../../assets/images/vender/Turull-cuina.webp";
import turullPiano from "../../assets/images/vender/Turull-piano.webp";

gsap.registerPlugin(ScrollTrigger);

const VentaSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className="venta-section">
      <div className="container">
        <div className="venta-content">
          {/* Texto */}
          <div className="venta-text">
            <h3 ref={titleRef} className="venta-text__title">
              el estándar más alto para vender tu propiedad
            </h3>
            <ScrollReveal
              containerClassName="mb-6"
              size="xs"
              align="left"
              baseOpacity={0.2}
              baseRotation={0}
            >
              En Rue Homes te acompañamos en todo el proceso de venta de tu
              propiedad. Desde la valoración inicial hasta la firma del
              contrato, nos encargamos de que obtengas el mejor precio en el
              menor tiempo posible.
            </ScrollReveal>

            <AnimatedButton
              to="/vender"
              className="btn btn-primary btn-sm"
              delay={1.3}
            >
              Vender
            </AnimatedButton>
          </div>

          {/* Imágenes */}
          <div className="venta-images">
            <AnimatedImageContainer
              src={turullCuina}
              className="image-large"
              delay={0.3}
            />
            <AnimatedImageContainer
              src={turullPiano}
              className="image-small"
              delay={0.5}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .venta-section {
          padding: 5rem 0;
          background: white;
        }

        .venta-content {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 4rem;
        }

        .venta-text {
          margin-left: 100px;
        }

        .venta-text__title {
          font-family: var(--font-titles);
        }

        .venta-images {
          position: relative;
          height: 660px;
        }

        .venta-images .image-large {
          height: 650px !important;
          width: 550px !important;
          top: 10px;
        }

        .venta-images .image-small {
          width: 550px !important;
          height: 390px !important;
          top: -380px;
          left: -654px;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1305px) {
          .venta-images .image-small {
            width: 400px !important;
            height: 350px !important;
            top: -340px;
            left: -500px;
          }
        }

        @media (max-width: 1220px) {
          .venta-images .image-large {
            height: 550px !important;
            width: 450px !important;
            top: 20px;
          }

          .venta-images .image-small {
            width: 350px !important;
            height: 300px !important;
            top: -260px;
            left: -480px;
          }
        }

        @media (max-width: 1060px) {
          .venta-section {
            padding: 4rem 0;
            height: auto;
          }

          .venta-images .image-large {
            display: none;
          }

          .venta-content {
            display: flex;
            flex-direction: column-reverse;
            gap: 2rem;
          }

          .venta-text {
            max-width: 80%;
            text-align: center;
          }

          .venta-images {
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .venta-images .image-small {
            position: relative;
            width: 80% !important;
            height: 500px !important;
            top: 0;
            left: 0;

        }

        @media (max-width: 760px) {
          .venta-section {
            padding: 1rem 0 2rem;
          }
          
          .venta-content {
            gap: 1.5rem;
          }

          .venta-text {
            max-width: 100%;
            margin: 0;
          }

          .venta-images .image-small {
            height: 350px !important;
            width: 100% !important;
          }
      }
      `}</style>
    </section>
  );
};

export default VentaSection;
