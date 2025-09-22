"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { motion, AnimatePresence } from "motion/react";

import "./RotatingText.css";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "70%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-70%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 3000,
    staggerDuration = 0.01,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    // Nueva prop para habilitar/deshabilitar la transición de ancho
    enableWidthTransition = true,
    // Duración de la transición de ancho
    widthTransitionDuration = 0.5,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs para medir el contenido
  const containerRef = useRef(null);
  const hiddenTextRef = useRef(null);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  // Función para medir el ancho del texto
  const measureTextWidth = useCallback(
    (text) => {
      if (!hiddenTextRef.current || !enableWidthTransition) return "auto";

      // Limpiar el contenido anterior
      hiddenTextRef.current.innerHTML = "";

      // Crear el contenido con la misma estructura que el componente visible
      if (splitBy === "characters") {
        const words = text.split(" ");
        words.forEach((word, i) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = cn("text-rotate-word", splitLevelClassName);

          splitIntoCharacters(word).forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = cn(
              "text-rotate-element",
              elementLevelClassName
            );
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });

          if (i !== words.length - 1) {
            const spaceSpan = document.createElement("span");
            spaceSpan.className = "text-rotate-space";
            spaceSpan.textContent = " ";
            wordSpan.appendChild(spaceSpan);
          }

          hiddenTextRef.current.appendChild(wordSpan);
        });
      } else if (splitBy === "words") {
        text.split(" ").forEach((word, i, arr) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = cn("text-rotate-word", splitLevelClassName);

          const charSpan = document.createElement("span");
          charSpan.className = cn("text-rotate-element", elementLevelClassName);
          charSpan.textContent = word;
          wordSpan.appendChild(charSpan);

          if (i !== arr.length - 1) {
            const spaceSpan = document.createElement("span");
            spaceSpan.className = "text-rotate-space";
            spaceSpan.textContent = " ";
            wordSpan.appendChild(spaceSpan);
          }

          hiddenTextRef.current.appendChild(wordSpan);
        });
      } else {
        // Para otros casos, usar texto simple
        hiddenTextRef.current.textContent = text;
      }

      // Obtener el ancho
      const width = hiddenTextRef.current.offsetWidth; // +30px para evitar cortes
      return `${width}px`;
    },
    [splitBy, splitLevelClassName, elementLevelClassName, enableWidthTransition]
  );

  // Establecer el ancho inicial
  useEffect(() => {
    if (enableWidthTransition && texts[currentTextIndex]) {
      const width = measureTextWidth(texts[currentTextIndex]);
      setContainerWidth(width);
    }
  }, [texts, currentTextIndex, measureTextWidth, enableWidthTransition]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      if (enableWidthTransition) {
        setIsTransitioning(true);

        // Medir el ancho del siguiente texto
        const nextWidth = measureTextWidth(texts[newIndex]);
        setContainerWidth(nextWidth);

        // Pequeño delay para que la transición de ancho termine antes del cambio de texto
        setTimeout(() => {
          setCurrentTextIndex(newIndex);
          setIsTransitioning(false);
          if (onNext) onNext(newIndex);
        }, widthTransitionDuration * 1000 * 0.3); // 30% de la duración de la transición
      } else {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      }
    },
    [
      onNext,
      enableWidthTransition,
      measureTextWidth,
      texts,
      widthTransitionDuration,
    ]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <>
      {/* Elemento oculto para medir el ancho */}
      {enableWidthTransition && (
        <span
          ref={hiddenTextRef}
          className={cn("text-rotate", "text-rotate-hidden", mainClassName)}
          style={{
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            top: "-9999px",
            left: "-9999px",
          }}
        />
      )}

      <motion.span
        ref={containerRef}
        className={cn("text-rotate", mainClassName)}
        {...rest}
        layout
        transition={transition}
        style={{
          ...rest.style,
          // ✅ Alineación vertical crítica
          verticalAlign: "baseline",
          ...(enableWidthTransition && {
            width: containerWidth,
            transition: `width ${widthTransitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
            overflow: "hidden",
            display: "inline-block",
            // ✅ Mantener la alineación incluso con inline-block
            verticalAlign: "baseline",
          }),
        }}
      >
        <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.span
            key={currentTextIndex}
            className={cn(
              splitBy === "lines" ? "text-rotate-lines" : "text-rotate"
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span
                  key={wordIndex}
                  className={cn("text-rotate-word", splitLevelClassName)}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce(
                            (sum, word) => sum + word.characters.length,
                            0
                          )
                        ),
                      }}
                      className={cn(
                        "text-rotate-element",
                        elementLevelClassName
                      )}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && (
                    <span className="text-rotate-space"> </span>
                  )}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
