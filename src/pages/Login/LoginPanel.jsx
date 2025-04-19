import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import backgroundDesktop from "@/assets/ceprunsa_v1.webp";
import backgroundMobile from "@/assets/ceprunsa_v2.webp";

export const LoginPanel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al montar
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${isMobile ? backgroundMobile : backgroundDesktop})` 
      }}
    >
      <Login />
    </div>
  );
};

export default LoginPanel;