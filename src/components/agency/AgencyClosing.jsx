// src/components/agency/AgencyClosing.jsx
import { useState, useEffect, useRef } from "react";

const AgencyClosing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="agency-closing-section">
      <div className="container">
        <div
          ref={ref}
          className="agency-closing-content"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1)",
          }}
        >
          <h2 className="agency-closing-title">Rue Homes</h2>
          <p className="agency-closing-text">
            Como las calles que dan nombre a un lugar, damos identidad y
            personalidad a cada propiedad para que otra persona pueda encontrar
            un lugar al que llamar hogar.
          </p>
        </div>
      </div>

      <style jsx>{`
        .agency-closing-section {
          padding: 2rem 0 8rem;
          background: var(--color-marble-light);
        }

        .agency-closing-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .agency-closing-title {
          font-family: var(--font-primary);
          font-size: var(--text-4xl);
          color: var(--color-rust);
          margin: 0 0 var(--space-6) 0;
          font-weight: 400;
        }

        .agency-closing-text {
          font-family: var(--font-secondary);
          font-size: var(--text-xl);
          color: var(--color-rust-light);
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .agency-closing-section {
            padding: 5rem 0;
          }

          .agency-closing-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 640px) {
          .agency-closing-section {
            padding: 4rem 0;
          }

          .agency-closing-text {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyClosing;
