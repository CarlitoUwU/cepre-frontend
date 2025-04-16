import { useState, useEffect } from "react";

/**
 * Hook que detecta si la pantalla es móvil (por defecto < 768px)
 * @param maxWidth Ancho máximo para considerarlo móvil (opcional, por defecto 768)
 * @returns boolean
 */
export const useIsMobile = (maxWidth = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < maxWidth);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [maxWidth]);

  return isMobile;
};
