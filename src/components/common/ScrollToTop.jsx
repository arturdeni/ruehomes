// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Para la página de vender, añadir un pequeño delay
    // para que no interfiera con las animaciones
    if (pathname === "/vender") {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // Sin animación para ser más directo
        });
      }, 100);
    } else {
      // Para las demás páginas, scroll inmediato y suave
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  // No renderiza nada
  return null;
};

export default ScrollToTop;
