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
      // Obtener la altura total del texto
      const totalHeight = container.offsetHeight;
      const lineHeight = parseFloat(
        window.getComputedStyle(container).lineHeight
      );
      const actualLineHeight = isNaN(lineHeight) ? 22 : lineHeight;

      // Calcular número de líneas
      const numberOfLines = Math.max(
        1,
        Math.round(totalHeight / actualLineHeight)
      );

      // Dividir el texto en líneas
      const words = originalText.split(" ");
      const lines = [];

      if (numberOfLines === 1) {
        lines.push(originalText);
      } else {
        // Dividir palabras entre las líneas calculadas
        const wordsPerLine = Math.ceil(words.length / numberOfLines);

        for (let i = 0; i < numberOfLines; i++) {
          const start = i * wordsPerLine;
          const end = Math.min(start + wordsPerLine, words.length);
          const lineText = words.slice(start, end).join(" ");
          if (lineText.trim()) {
            lines.push(lineText);
          }
        }
      }

      // Limpiar y crear las líneas con máscaras (OCULTAS inicialmente)
      container.innerHTML = "";
      textLinesRef.current = [];

      lines.forEach((lineText, index) => {
        // Contenedor con máscara
        const maskWrapper = document.createElement("div");
        maskWrapper.style.overflow = "hidden";
        maskWrapper.style.height = actualLineHeight + "px";
        maskWrapper.style.position = "relative";

        // El texto que se va a animar - OCULTO inicialmente
        const textLine = document.createElement("div");
        textLine.textContent = lineText;
        textLine.style.transform = "translateY(100%)";
        textLine.style.lineHeight = actualLineHeight + "px";
        textLine.style.position = "relative";

        maskWrapper.appendChild(textLine);
        container.appendChild(maskWrapper);

        // Guardar referencia para animar luego
        textLinesRef.current.push(textLine);
      });

      animationExecutedRef.current = true;
    }, 100);
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
