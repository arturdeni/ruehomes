import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextMaskReveal = ({
  children,
  className = "",
  trigger = true,
  delay = 0,
  textAlign = "left", // "left", "center", "right", "justify"
}) => {
  const containerRef = useRef(null);
  const animationExecutedRef = useRef(false);
  const textLinesRef = useRef([]);
  const resizeTimeoutRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Función para preparar las líneas de texto
  const prepareTextLines = (container, originalText, keepVisible = false) => {
    const computedStyle = window.getComputedStyle(container);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const actualLineHeight = isNaN(lineHeight) ? 22 : lineHeight;

    // Renderizar el texto normalmente y obtener el textAlign del contenedor
    const tempDiv = document.createElement("div");
    tempDiv.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: ${container.offsetWidth}px;
      font: ${computedStyle.font};
      line-height: ${computedStyle.lineHeight};
      text-align: ${container.style.textAlign || "left"};
      word-spacing: ${computedStyle.wordSpacing};
      letter-spacing: ${computedStyle.letterSpacing};
    `;
    tempDiv.innerHTML = originalText;
    document.body.appendChild(tempDiv);

    document.body.removeChild(tempDiv);

    // Crear un contenedor único con el texto completo y aplicar la máscara por palabra
    container.innerHTML = "";
    textLinesRef.current = [];

    // Dividir en palabras y crear spans
    const words = originalText.split(/(\s+)/); // Mantener los espacios
    const wordsWrapper = document.createElement("div");
    wordsWrapper.style.textAlign = container.style.textAlign || "left";
    wordsWrapper.style.lineHeight = actualLineHeight + "px";

    words.forEach((word) => {
      if (word.trim()) {
        // Es una palabra
        const wordSpan = document.createElement("span");
        wordSpan.innerHTML = word;
        wordSpan.style.display = "inline";
        wordSpan.style.opacity = keepVisible || hasAnimatedRef.current ? "1" : "0";
        wordSpan.style.transform = keepVisible || hasAnimatedRef.current ? "translateY(0)" : "translateY(20px)";
        wordsWrapper.appendChild(wordSpan);
        textLinesRef.current.push(wordSpan);
      } else {
        // Es un espacio
        wordsWrapper.appendChild(document.createTextNode(word));
      }
    });

    container.appendChild(wordsWrapper);
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
      textLinesRef.current.forEach((wordSpan, index) => {
        gsap.to(wordSpan, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.03,
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
    <div ref={containerRef} className={className} style={{ textAlign }}>
      {children}
    </div>
  );
};

export default TextMaskReveal;
