import React from "react";
import Login from "../../components/Login";
import background from "../../assets/ceprunsa.jpg"; 

const LoginPanel = () => {
  
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
          <Login />
    </div>
    
  );
  // Verifica la ruta de la imagen en la consola

};

export default LoginPanel;
