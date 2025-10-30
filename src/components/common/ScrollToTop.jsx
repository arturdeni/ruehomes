// src/components/common/ScrollToTop.jsx
// Este componente resetea el scroll al inicio cuando cambias de página
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forzar scroll al inicio de forma más agresiva
    // usando múltiples métodos para asegurar que funcione

    // Método 1: Scroll inmediato
    window.scrollTo(0, 0);

    // Método 2: Scroll al documento
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Método 3: Timeout para páginas con animaciones (como Vender)
    // que pueden interferir con el scroll inicial
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    // Método 4: Segundo timeout para animaciones más lentas
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
