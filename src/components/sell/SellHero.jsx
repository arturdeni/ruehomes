// src/components/sell/SellHero.jsx
import { useEffect, useRef, useState } from "react";

const SellHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Animar el título
            if (titleRef.current) {
              setTimeout(() => {
                titleRef.current.style.opacity = "1";
                titleRef.current.style.transform = "translateY(0)";
              }, 300);
            }

            // Animar el texto
            if (textRef.current) {
              setTimeout(() => {
                textRef.current.style.opacity = "1";
                textRef.current.style.transform = "translateY(0)";
              }, 600);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="sell-hero">
      <div className="container">
        <div className="sell-hero-content">
          <h1 ref={titleRef} className="sell-hero-title">
            <strong>Vender tu propiedad con Rue Homes</strong>
          </h1>
          <div ref={textRef} className="sell-hero-text">
            <p>
              <strong>
                En Rue Homes, cada venta es el inicio de una nueva historia.
              </strong>
            </p>
            <p>
              Nuestro nombre y logotipo nacen de un símbolo urbano universal:
              las placas que nombran las calles, capaces de otorgar identidad a
              un lugar y hacerlo único.
            </p>
            <p>
              Así concebimos nuestro trabajo: dotamos a cada propiedad de una
              identidad propia, la posicionamos estratégicamente mediante un
              sistema respaldado por datos y la acompañamos hasta encontrar a
              sus nuevos propietarios.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sell-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            var(--color-marble-lighter) 0%,
            var(--color-marble) 50%,
            var(--color-softdune-lighter) 100%
          );
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .sell-hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23935835' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
        }

        .sell-hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .sell-hero-title {
          font-family: var(--font-primary);
          font-size: 3.5rem;
          line-height: 1.2;
          color: var(--color-rust);
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .sell-hero-text {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--color-rust-dark);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1);
        }

        .sell-hero-text p {
          margin-bottom: 1.5rem;
        }

        .sell-hero-text p:first-child {
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--color-cinnamon);
          margin-bottom: 2rem;
        }

        .sell-hero-text p:last-child {
          margin-bottom: 0;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .sell-hero-title {
            font-size: 3rem;
          }

          .sell-hero-text {
            font-size: 1.125rem;
          }

          .sell-hero-text p:first-child {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .sell-hero {
            padding: 4rem 0;
            text-align: left;
          }

          .sell-hero-content {
            max-width: 100%;
          }

          .sell-hero-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            text-align: left;
          }

          .sell-hero-text {
            font-size: 1rem;
            text-align: left;
          }

          .sell-hero-text p:first-child {
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .sell-hero {
            padding: 3rem 0;
          }

          .sell-hero-title {
            font-size: 2rem;
          }

          .sell-hero-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SellHero;
