import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import background from "@/assets/cepr-background.jpg"; 

export const LoginPanel = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Precargamos la imagen de fondo
    const img = new Image();
    img.src = background;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Color dominante para usar mientras carga
  const dominantColor = "#e0e0e0"; // Ajusta esto al color que mejor represente tu imagen

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Capa de fondo con un ligero blur permanente */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundColor: dominantColor,
          filter: 'blur(3px)', // Blur ligero - ajusta este valor según prefieras
          transform: 'scale(1.05)' // Ligero escalado para evitar bordes transparentes
        }}
      />
      
      {/* Color o gradiente mientras carga la imagen */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: dominantColor }}
      />
      
      {/* Componente Login - siempre nítido */}
      <div className="relative z-10">
        <Login />
      </div>
    </div>
  );
};

export default LoginPanel;