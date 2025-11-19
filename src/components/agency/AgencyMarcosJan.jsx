// src/components/agency/AgencyMarcosJan.jsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedImageContainer from "../ui/AnimatedImageContainer";
import marcosImage from "../../assets/images/agency/Agency-Marcos.webp";
import janImage from "../../assets/images/agency/Agency-Jan.webp";

gsap.registerPlugin(ScrollTrigger);

// Componente ScrollReveal simplificado reutilizado
const SimpleReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
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
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
};

const AgencyMarcosJan = () => {
  const titleRef = useRef(null);

  const teamMembers = [
    {
      name: "Marcos",
      image: marcosImage,
      description:
        "Destaca por su compromiso con el cliente y su conocimiento del mercado, conectando a las personas con la propiedad ideal y ofreciendo experiencias auténticas y satisfactorias.",
    },
    {
      name: "Jan",
      image: janImage,
      description:
        "Combina su experiencia inmobiliaria y financiera con una visión cercana y honesta, ofreciendo atención personalizada y confianza en cada paso del proceso.",
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
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
    <section className="agency-team-section">
      <div className="container">
        <div className="agency-team-content">
          <h1 ref={titleRef} className="agency-team-title">Conócenos</h1>
          <div className="agency-team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="agency-team-member">
                {/* Imagen del miembro */}
                <SimpleReveal
                  className="agency-team-member-image-wrapper"
                  delay={index * 0.2}
                >
                  <div className="agency-team-member-image-container">
                    <AnimatedImageContainer
                      src={member.image}
                      delay={0.3 + index * 0.2}
                    />
                  </div>
                </SimpleReveal>

                {/* Información del miembro */}
                <div className="agency-team-member-info">
                  <SimpleReveal
                    className="agency-team-member-name-wrapper"
                    delay={0.3 + index * 0.2}
                  >
                    <h3 className="agency-team-member-name">{member.name}</h3>
                  </SimpleReveal>

                  <SimpleReveal
                    className="agency-team-member-description-wrapper"
                    delay={0.5 + index * 0.2}
                  >
                    <p className="agency-team-member-description">
                      {member.description}
                    </p>
                  </SimpleReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .agency-team-section {
          padding: 4rem 0;
          background: var(--color-softdune);
        }

        .agency-team-content {
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .agency-team-title {
          font-family: var(--font-titles);
          text-align: center;
        }

        .agency-team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-items: start;
          justify-content: space-between;
          width: 100%;
          margin-top: 3rem;
        }

        .agency-team-member {
          text-align: center;
        }

        .agency-team-member-image-wrapper {
          margin-bottom: 2.5rem;
        }

        .agency-team-member-image-container {
          width: 330px;
          height: 480px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .agency-team-member-info {
          max-width: 450px;
          margin: 0 auto;
        }

        .agency-team-member-name-wrapper {
          margin-bottom: 1.5rem;
        }

        .agency-team-member-name {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          color: var(--color-rust);
          font-weight: 400;
          margin: 0;
        }

        .agency-team-member-description-wrapper {
          margin: 0 auto;
          max-width: 330px;
        }

        .agency-team-member-description {
          font-family: var(--font-secondary);
          font-size: 1rem;
          color: var(--color-rust-light);
          line-height: 1.5;
          font-weight: 300;
          margin: 0;
          text-align: justify;
          max-width: 400px;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 968px) {
          .agency-team-section {
            padding: 8rem 0;
          }

          .agency-team-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .agency-team-member-image-container {
            width: 290px;
            height: 350px;
          }

          .agency-team-member-name {
            font-size: 2.2rem;
          }

          .agency-team-member-info {
            max-width: 500px;
          }
        }

        @media (max-width: 640px) {
          .agency-team-section {
            padding: 6rem 0;
          }

          .agency-team-grid {
            gap: 3rem;
          }

          .agency-team-member-image-container {
            width: 250px;
            height: 320px;
          }

          .agency-team-member-name {
            font-size: 1.8rem;
          }

          .agency-team-member-info {
            max-width: 100%;
          }

          .agency-team-member-image-wrapper {
            margin-bottom: 2rem;
          }

          .agency-team-member-name-wrapper {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AgencyMarcosJan;
