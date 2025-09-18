// src/components/ui/AnimatedImageContainer.jsx
import { useState, useEffect, useRef } from "react";

const AnimatedImageContainer = ({ src, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        opacity: isVisible ? 1 : 0,
        transition: "all 2s cubic-bezier(0.25, 0.4, 0.25, 1)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "150%",
          height: "150%",
          position: "absolute",
          top: "-25%",
          left: "-25%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: isVisible ? "scale(0.67)" : "scale(0.8)",
          transition: "transform 2s cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
      />
    </div>
  );
};

export default AnimatedImageContainer;
