// src/components/sell/SellMetrics.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

gsap.registerPlugin(ScrollTrigger);

const SellMetrics = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const metricsRef = useRef([]);

  const metrics = [
    {
      id: 1,
      icon: <TrendingUpOutlinedIcon className="metric-icon" />,
      value: "30%",
      label: "Venta más rápida",
      description: "que la media del mercado nacional",
    },
    {
      id: 2,
      icon: <VerifiedOutlinedIcon className="metric-icon" />,
      value: "+90%",
      label: "Tasa de éxito",
      description: "en operaciones de venta y alquiler",
    },
    {
      id: 3,
      icon: <AccessTimeOutlinedIcon className="metric-icon" />,
      value: "25%",
      label: "Menos días en mercado",
      description: "desde el anuncio hasta el cierre",
    },
  ];

  useEffect(() => {
    // Asegurar que los elementos estén visibles inicialmente
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
    }
    if (metricsRef.current) {
      gsap.set(metricsRef.current, { opacity: 1, y: 0 });
    }

    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animación de las métricas con stagger
      gsap.fromTo(
        metricsRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sell-metrics-section">
      <div className="container">
        <h2 ref={titleRef} className="metrics-title">
          Métricas que inspiran confianza
        </h2>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (metricsRef.current[index] = el)}
              className="metric-card"
            >
              <div className="metric-icon-wrapper">{metric.icon}</div>
              <div className="metric-value">{metric.value}</div>
              <h3 className="metric-label">{metric.label}</h3>
              <p className="metric-description">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sell-metrics-section {
          padding: 5rem 0;
          background: var(--color-cinnamon-dark);
          position: relative;
          overflow: hidden;
        }

        .sell-metrics-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-softdune),
            transparent
          );
        }

        .metrics-title {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          color: var(--color-white);
          text-align: center;
          margin-bottom: 4rem;
          font-weight: 400;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .metric-card {
          background: var(--color-marble);
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.4, 0.25, 1);
          box-shadow: 0 4px 20px rgba(147, 88, 53, 0.08);
          position: relative;
          overflow: hidden;
        }

        .metric-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--color-cinnamon),
            var(--color-honeyfield)
          );
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .metric-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 12px 40px rgba(147, 88, 53, 0.15);
        }

        .metric-card:hover::before {
          transform: scaleX(1);
        }

        .metric-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.4s ease;
        }

        .metric-icon {
          width: 3em;
          height: 3em;
        }

        .metric-card :global(.metric-icon) {
          width: 40px;
          height: 40px;
          color: var(--color-cinnamon);
          transition: color 0.4s ease;
        }

        .metric-value {
          font-family: var(--font-primary);
          font-size: 3rem;
          font-weight: 400;
          color: var(--color-cinnamon);
          margin-bottom: 0.75rem;
          line-height: 1;
        }

        .metric-label {
          font-family: var(--font-secondary);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-rust);
          margin-bottom: 0.75rem;
        }

        .metric-description {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          color: var(--color-gray-600);
          line-height: 1.5;
          margin: 0;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .metrics-title {
            font-size: 2.25rem;
            margin-bottom: 3rem;
          }

          .metrics-grid {
            gap: 2rem;
          }

          .metric-card {
            padding: 2.5rem 1.5rem;
          }

          .metric-value {
            font-size: 2.5rem;
          }

          .metric-label {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 768px) {
          .sell-metrics-section {
            padding: 4rem 0;
          }

          .metrics-title {
            font-size: 2rem;
            margin-bottom: 2.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 500px;
          }

          .metric-card {
            padding: 2rem 1.5rem;
          }

          .metric-icon-wrapper {
            width: 70px;
            height: 70px;
            margin-bottom: 1.5rem;
          }

          .metric-card :global(.metric-icon) {
            width: 35px;
            height: 35px;
          }

          .metric-value {
            font-size: 2.25rem;
          }

          .metric-label {
            font-size: 1.125rem;
          }

          .metric-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .sell-metrics-section {
            padding: 3rem 0;
          }

          .metrics-title {
            font-size: 1.75rem;
          }

          .metric-card {
            padding: 1.75rem 1.25rem;
          }

          .metric-value {
            font-size: 2rem;
          }

          .metric-label {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SellMetrics;
