import React from 'react'
import { useNavigate } from "react-router-dom";


const Button = ({ path, title, img, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(path)}
      className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all cursor-pointer"
    >
      <img src={img} alt={title} className="w-10 h-10 mb-2" />
      <p className="text-sm font-semibold">{title}</p>
    </button>
  );
};


export const Home = () => {
  const navigate = useNavigate();
  const options = [{
    path: 'importar',
    title: 'Importar Archivos',
    img: 'importar.png'
  }, {
    path: 'gestionar',
    title: 'Gestionar Datos',
    img: 'gestionar.png'
  }, {
    path: 'visualizar',
    title: 'Visualizar Horarios',
    img: 'visualizar.png'
  }, {
    path: 'validar',
    title: 'Validar Informacion',
    img: 'validar.png'
  }, {
    path: 'exportar',
    title: 'Exportar Horarios',
    img: 'exportar.png'
  }, {
    path: 'publicar',
    title: 'Publicar Horarios',
    img: 'publicar.png'
  }
  ]

  const handleClick = (path) => {
    navigate(`${path}`)
  }
  return (
    <div className="flex justify-center pt-20  items-center  px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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


  )
}

