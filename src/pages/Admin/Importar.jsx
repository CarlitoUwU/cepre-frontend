import React, { useState } from "react";
import { ButtonCabecera } from "../../components/ui/ButtonCabecera";
import { useNavigate } from "react-router-dom";
import CSV from "../../services/CSV";

const roles = {
  Profesor: "Profesor",
  Monitor: "Monitor",
  Supervisor: "Supervisor"
};

const app_estados = {
  SinArchivo: "SinArchivo",
  ConArchivo: "ConArchivo",
  Error: "Error"
}

export const Importar = () => {
  const [rol, setRol] = useState(roles.Profesor);
  const [file, setFile] = useState(null);
  const [app_estado, setAppEstado] = useState(app_estados.SinArchivo);

  const navigate = useNavigate();

  const handleClick = ({ target }) => {
    setRol(roles[target.innerText]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No se ha seleccionado un archivo.");
      return;
    }

    const formData = {
      file: file,
      rol: rol
    }

    CSV.create(formData)
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });

  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (!e.target.files.length) return;

    const fileForm = e.target.files[0];
    console.log("Archivo seleccionado:", fileForm);
    setFile(fileForm);
    setAppEstado(app_estados.ConArchivo);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex w-80 justify-between">
        <ButtonCabecera text={roles.Profesor} handleClick={handleClick} className={`${rol === roles.Profesor ? 'bg-gray-200' : ''}`} />
        <ButtonCabecera text={roles.Monitor} handleClick={handleClick} className={`${rol === roles.Monitor ? 'bg-gray-200' : ''}`} />
        <ButtonCabecera text={roles.Supervisor} handleClick={handleClick} className={`${rol === roles.Supervisor ? 'bg-gray-200' : ''}`} />
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className={`bg-gray-200 p-4 rounded-lg -translate-y-[4px] ${app_estado === app_estados.SinArchivo ? 'h-90' : 'h-100'} max-w-2xl mx-auto`}>
        <label htmlFor="file-upload" className={`${app_estado === app_estados.SinArchivo ? 'cursor-pointer' : ''} flex flex-col items-center justify-center h-80 rounded-lg border-4 border-black border-dashed bg-gray-100`}>
          {app_estado === app_estados.SinArchivo ? (<>
            <img src="../subir.png" alt="Upload icon" className="w-30 h-30" />
            <p>Haz clic para subir</p>
            <input type="file" id="file-upload" className="hidden" accept=".csv" name="file" onChange={handleFileChange} />
          </>
          ) : (
            <h1 className="text-2xl"  >{file.name}</h1>
          )}

        </label>
        {(app_estado === app_estados.ConArchivo) && (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer">Enviar Archivo</button>
        )}
      </form>
      <div className="flex justify-center space-x-8 mt-4">
        <button onClick={()=> {navigate('..')}} className="bg-[#6D1D1D] text-white px-6 py-2 rounded-md shadow-md cursor-pointer">
          Menú Principal
        </button>
        <button className="bg-[#6D1D1D] text-white px-6 py-2 rounded-md shadow-md cursor-pointer">
          Generar Guía
        </button>
      </div>

    </div>
  );
};
