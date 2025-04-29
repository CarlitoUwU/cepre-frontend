import React, { useState } from "react";
import { GoogleButton } from "./GoogleButton";
import escudo from "@/assets/escudo_unsa.png";
import logo from "@/assets/logo-light.png";

export const LoginCard = ({ onGoogleLogin, isLoading }) => {
  return (
    <div className="w-full max-w-md bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-300 animate-fadeIn">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex flex-row items-center justify-center gap-12">
          <Escudo />
          <Logo />
        </div>
        <div className="w-full border-t-2 border-gray-300" />
      </div>
      <h1 className="text-xl text-gray-800 font-semibold text-center mb-6">
        Universidad Nacional de San Agustín
      </h1>
      <div className="space-y-4">
        <div className="text-center text-gray-700">
          <p>Accede con tu cuenta institucional</p>
          <p className="text-sm text-gray-500 mt-1">Usa tu correo CEPRUNSA</p>
        </div>
        <div className="px-2 md:px-3">
          <GoogleButton onClick={onGoogleLogin} isLoading={isLoading} />
        </div>
        <div className="flex justify-end mt-2">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Aviso de Cookies
          </a>
        </div>
      </div>
    </div>
  );
};


export const Escudo = () => (
  <div className="h-12 w-auto">
    <OptimizedImage
      src={escudo}
      alt="LOGO CEPRUNSA"
      className="h-full w-auto object-contain"
    />
  </div>
);

export const Logo = () => (
  <div className="h-12 w-auto">
    <OptimizedImage
      src={logo}
      alt="ESCUDO CEPRUNSA"
      className="h-full w-auto object-contain"
    />
  </div>
);

const OptimizedImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};
