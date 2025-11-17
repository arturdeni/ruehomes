// src/components/common/ScrollToTop.jsx
// Este componente resetea el scroll al inicio cuando cambias de página
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Configurar scrollRestoration para control manual
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Solo ejecutar si realmente cambió la ruta
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Forzar scroll de forma SÍNCRONA antes de cualquier render
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Método 1: Inmediato y síncrono
      scrollToTop();

      // Método 2: En el siguiente frame (antes del paint)
      requestAnimationFrame(() => {
        scrollToTop();
      });

      // Método 3: Doble requestAnimationFrame para asegurar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToTop();
        });
      });

      // Método 4: Timeout mínimo como fallback
      const timeout = setTimeout(scrollToTop, 0);

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
