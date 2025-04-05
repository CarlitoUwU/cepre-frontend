import React, { useState } from "react";
import { ButtonCabecera } from "@/components/ui/ButtonCabecera";
import { useNavigate } from "react-router-dom";
import CSV from "@/services/CSV";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";

const roles = {
  Profesor: "Profesor",
  Monitor: "Monitor",
  Supervisor: "Supervisor"
};

const app_estados = {
  SinArchivo: "SinArchivo",
  ConArchivo: "ConArchivo",
  Error: "Error"
};

export const Importar = () => {
  const [rol, setRol] = useState(roles.Profesor);
  const [file, setFile] = useState(null);
  const [app_estado, setAppEstado] = useState(app_estados.SinArchivo);

  const navigate = useNavigate();

  const handleClick = (e) => {
    const selectedRol = e.target.getAttribute("data-role");
    setRol(roles[selectedRol]);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (!e.target.files.length) return;

    const fileForm = e.target.files[0];

    if (!fileForm.name.endsWith(".csv")) {
      console.error("El archivo seleccionado no es un CSV.");
      setAppEstado(app_estados.Error);
      return;
    }

    console.log("Archivo seleccionado:", fileForm);
    setFile(fileForm);
    setAppEstado(app_estados.ConArchivo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No se ha seleccionado un archivo.");
      setAppEstado(app_estados.Error);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("rol", rol);

    try {
      const response = await CSV.create(formData);
      console.log("Archivo enviado correctamente:", response);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setAppEstado(app_estados.Error);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto m-5 mt-25">
      <div className="flex w-full mb-3 gap-1">
        <ButtonCabecera text={roles.Profesor} handleClick={handleClick} data_role="Profesor" className={`${rol === roles.Profesor ? 'bg-gray-200' : ''}`} />
        <ButtonCabecera text={roles.Monitor} handleClick={handleClick} data_role="Monitor" className={`${rol === roles.Monitor ? 'bg-gray-200' : ''}`} />
        <ButtonCabecera text={roles.Supervisor} handleClick={handleClick} data_role="Supervisor" className={`${rol === roles.Supervisor ? 'bg-gray-200' : ''}`} />
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg w-full mx-auto flex flex-col min-h-[60vh] max-w-screen-lg">
        <label htmlFor="file-upload" className={`${app_estado === app_estados.SinArchivo ? 'cursor-pointer' : ''} flex flex-col items-center justify-center flex-grow w-full rounded-lg border-4 border-black border-dashed bg-gray-100`}>
          {app_estado === app_estados.SinArchivo ? (
            <>
              <img src="../subir.png" alt="Upload icon" className="w-25 h-25 sm:w-45 sm:h-45" />
              <p>Haz clic para subir</p>
              <input type="file" id="file-upload" className="hidden" accept=".csv" name="file" onChange={handleFileChange} />
            </>
          ) : app_estado === app_estados.ConArchivo ? (
            <h1 className="text-2xl">{file.name}</h1>
          ) : (
            <p className="text-red-600">Error al cargar archivo. Inténtalo de nuevo.</p>
          )}
        </label>

        {app_estado === app_estados.ConArchivo && (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer">
            Enviar Archivo
          </button>
        )}
      </form>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="flex justify-center space-x-8 mt-5">
        <ButtonNegative onClick={() => navigate('..')}>Menú Principal</ButtonNegative>
        <Button>Generar Guía</Button>
      </div>
    </div>
  );
};
