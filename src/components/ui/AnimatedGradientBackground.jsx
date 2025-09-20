// src/components/ui/AnimatedGradientBackground.jsx
import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const AnimatedGradientBackground = ({
  style = {},
  animate = true,
  opacity = 0.4, // Opacidad configurable para que se vea la imagen de fondo
  className = "",
}) => {
  // Tu nueva configuración personalizada desde shadergradient.co
  const customGradientUrl = `https://www.shadergradient.co/customize?animate=${
    animate ? "on" : "off"
  }&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.4&cPolarAngle=95&cameraZoom=1&color1=%23935835&color2=%23B27C51&color3=%23D7C0A9&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-2.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=225&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.8&uFrequency=5.5&uSpeed=0.1&uStrength=3&uTime=0.2&wireframe=false`;

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <ShaderGradientCanvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: opacity, // Aplicar opacidad al canvas completo
        }}
      >
        <ShaderGradient control="query" urlString={customGradientUrl} />
      </ShaderGradientCanvas>
    </div>
  );
};

// Componente alternativo usando props directas con tu configuración exacta
export const CustomShaderGradient = ({
  style = {},
  animate = true,
  opacity = 0.6, // También añadir opacidad aquí
  className = "",
}) => {
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: opacity,
        }}
      >
        <ShaderGradient
          animate={animate ? "on" : "off"}
          type="waterPlane"
          color1="#935835" // Rust
          color2="#B27C51" // Cinnamon
          color3="#D7C0A9" // SoftDune
          brightness={1.2}
          lightType="3d"
          grain="off"
          uSpeed={0.2} // Más lento
          uStrength={3}
          uDensity={1.8} // Mayor densidad
          uFrequency={5.5}
          uTime={0.2}
          uAmplitude={0} // Nuevo parámetro
          positionX={0}
          positionY={-2.1} // Nueva posición Y
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={225} // Nueva rotación
          reflection={0.1}
          envPreset="city"
          cAzimuthAngle={180}
          cDistance={2.4} // Nueva distancia
          cPolarAngle={95} // Nuevo ángulo polar
          cameraZoom={1}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default AnimatedGradientBackground;
