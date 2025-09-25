import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextMaskReveal = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const originalText =
      typeof children === "string" ? children : container.textContent;

    // Primero renderizar el texto normalmente para que el navegador calcule las líneas
    container.innerHTML = originalText;
    container.style.lineHeight = "1.4";

    // Esperar a que se renderice completamente
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

      // Limpiar y crear las líneas con máscaras
      container.innerHTML = "";

      lines.forEach((lineText, index) => {
        // Contenedor con máscara
        const maskWrapper = document.createElement("div");
        maskWrapper.style.overflow = "hidden";
        maskWrapper.style.height = actualLineHeight + "px";
        maskWrapper.style.position = "relative";

        // El texto que se va a animar
        const textLine = document.createElement("div");
        textLine.textContent = lineText;
        textLine.style.transform = "translateY(100%)";
        textLine.style.lineHeight = actualLineHeight + "px";
        textLine.style.position = "relative";

        maskWrapper.appendChild(textLine);
        container.appendChild(maskWrapper);

        // Animar cada línea
        gsap.to(textLine, {
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: index * 0.1 + 0.3,
        });
      });
    }, 100); // Dar tiempo suficiente para el renderizado
  }, [children]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextMaskReveal;
