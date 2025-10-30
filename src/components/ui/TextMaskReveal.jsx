import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextMaskReveal = ({
  children,
  className = "",
  trigger = true,
  delay = 0,
}) => {
  const containerRef = useRef(null);
  const animationExecutedRef = useRef(false);
  const textLinesRef = useRef([]);
  const resizeTimeoutRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Función para preparar las líneas de texto
  const prepareTextLines = (container, originalText, keepVisible = false) => {
    const lineHeight = parseFloat(
      window.getComputedStyle(container).lineHeight
    );
    const actualLineHeight = isNaN(lineHeight) ? 22 : lineHeight;

    // Dividir el texto en líneas según el ancho real del contenedor
    const words = originalText.split(" ");
    const lines = [];

    // Crear un elemento temporal para medir el ancho de las palabras
    const measureElement = document.createElement("span");
    measureElement.style.visibility = "hidden";
    measureElement.style.position = "absolute";
    measureElement.style.whiteSpace = "nowrap";
    measureElement.style.font = window.getComputedStyle(container).font;
    container.appendChild(measureElement);

    const containerWidth = container.offsetWidth;
    let currentLine = "";

    words.forEach((word, index) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      measureElement.textContent = testLine;

      if (measureElement.offsetWidth > containerWidth && currentLine) {
        // La línea es demasiado ancha, guardar la línea actual y empezar una nueva
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }

      // Agregar la última línea
      if (index === words.length - 1 && currentLine) {
        lines.push(currentLine);
      }
    });

    // Limpiar el elemento de medición
    container.removeChild(measureElement);

    // Limpiar y crear las líneas con máscaras
    container.innerHTML = "";
    textLinesRef.current = [];

    lines.forEach((lineText) => {
      // Contenedor con máscara
      const maskWrapper = document.createElement("div");
      maskWrapper.style.overflow = "hidden";
      maskWrapper.style.height = actualLineHeight + "px";
      maskWrapper.style.position = "relative";

      // El texto que se va a animar
      const textLine = document.createElement("div");
      textLine.textContent = lineText;
      // Si ya fue animado, mantener visible; si no, ocultar
      textLine.style.transform = keepVisible || hasAnimatedRef.current ? "translateY(0)" : "translateY(100%)";
      textLine.style.lineHeight = actualLineHeight + "px";
      textLine.style.position = "relative";

      maskWrapper.appendChild(textLine);
      container.appendChild(maskWrapper);

      // Guardar referencia para animar luego
      textLinesRef.current.push(textLine);
    });
  };

  // Preparar el texto con máscaras desde el inicio
  useEffect(() => {
    if (!containerRef.current || animationExecutedRef.current) return;

    const container = containerRef.current;
    const originalText =
      typeof children === "string" ? children : container.textContent;

    // Renderizar el texto normalmente para calcular líneas
    container.innerHTML = originalText;
    container.style.lineHeight = "1.4";

    // Preparar la estructura animada
    setTimeout(() => {
      prepareTextLines(container, originalText);
      animationExecutedRef.current = true;
    }, 100);

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (containerRef.current && animationExecutedRef.current) {
          container.innerHTML = originalText;
          prepareTextLines(container, originalText, true);
        }
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [children]);

  // Ejecutar la animación cuando trigger sea true
  useEffect(() => {
    if (!trigger || textLinesRef.current.length === 0) return;

    setTimeout(() => {
      textLinesRef.current.forEach((textLine, index) => {
        gsap.to(textLine, {
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: index * 0.1 + 0.3,
          onComplete: () => {
            if (index === textLinesRef.current.length - 1) {
              hasAnimatedRef.current = true;
            }
          },
        });
      });
    }, delay);
  }, [trigger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextMaskReveal;
