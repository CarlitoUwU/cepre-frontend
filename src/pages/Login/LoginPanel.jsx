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
          backgroundImage: 'radial-gradient(circle,rgba(254, 252, 245, 1) 0%, rgba(119, 224, 200, 1) 60%, rgba(240, 247, 230, 1) 100%)',
          filter: 'blur(3px)',
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
              filter: 'blur(3px)',
              transform: 'scale(1.05)'
            }}
          />
          {/* Componente Login */}
          <div className="relative z-10">
            <Login />
          </div>
        </>
      )}
    </div>
  );
};