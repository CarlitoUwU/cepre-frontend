import React from 'react';
import { useNavigate } from "react-router-dom";

const Button = ({ path, title, img, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(path)}
      className="flex flex-col items-center justify-center w-60 h-60 bg-gray-200 rounded-xl shadow-lg hover:bg-gray-300 transition-all cursor-pointer"
    >
      <img src={img} alt={title} className="w-16 h-16 mb-3" />
      <p className="text-lg font-semibold">{title}</p>
    </button>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const options = [
    { path: 'importar', title: 'Importar Archivos', img: 'importar.png' },
    { path: 'gestionar', title: 'Gestionar Datos', img: 'gestionar.png' },
    { path: 'publicar', title: 'Publicar Horarios', img: 'publicar.png' }
  ];

  const handleClick = (path) => {
    navigate(`${path}`);
  };

  return (
      <div className="w-full h-[83vh] min-h-screen flex flex-col items-center justify-center bg-[#F4F4F4] overflow-hidden">  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
          {options.map((option, index) => (
            <Button
              key={index}
              path={option.path}
              title={option.title}
              img={option.img}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
  );
  
};

