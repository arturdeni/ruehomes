import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AnimatedButton = ({ to, className, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

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
      { threshold: 0.5 }
    );

    const currentElement = buttonRef.current;
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
    <Link
      ref={buttonRef}
      to={to}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(15px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </Link>
  );
};

export default AnimatedButton;
