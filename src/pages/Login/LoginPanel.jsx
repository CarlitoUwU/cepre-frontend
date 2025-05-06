import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import background from "@/assets/cepr-background.jpg"; 

export const LoginPanel = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden select-none">
      {/* Fondo degradado siempre visible */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 1) 0%, rgba(220, 38, 38, 1) 100%)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Capa con la imagen de fondo que aparece cuando se carga */}
      {imageLoaded && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-100"
            style={{ 
              backgroundImage: `url(${background})`,
              
              transform: 'scale(1.05)'
            }}
          />
          {/* Capa de degradado oscuro */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-red-900/80" />
          <div className="absolute inset-0 bg-black/30" />

          {/* Componente Login */}
          <div className="relative z-10">
            <Login />
          </div>
        </>
      )}
    </div>
  );
};