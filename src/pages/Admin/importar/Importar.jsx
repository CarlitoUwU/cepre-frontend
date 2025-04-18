import React, { useState } from "react";
import { ButtonCabecera } from "@/components/ui/ButtonCabecera";
import { useNavigate } from "react-router-dom";
import { MonitorsServices } from "@/services/MonitorsServices";
import { SupervisorsServices } from "@/services/SupervisorsServices";
import { TeachersServices } from "@/services/TeachersServices";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { toast } from "react-toastify";

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

    console.log("Archivo seleccionado:", fileForm);
    console.log(!fileForm.name.endsWith(".csv"), !fileForm.name.endsWith(".json"));

    if (!fileForm.name.endsWith(".csv") && !fileForm.name.endsWith(".json")) {
      toast.error("El archivo seleccionado no es un CSV o JSON.");
      setAppEstado(app_estados.Error);
      return;
    }

    console.log("Archivo seleccionado:", fileForm);
    setFile(fileForm);
    setAppEstado(app_estados.ConArchivo);
  };

  const enviarArchivo = async () => {
    if (rol === roles.Monitor) {
      if (file.name.endsWith(".csv")) {
        await MonitorsServices.monitorCsv(file);
      }
      else if (file.name.endsWith(".json")) {
        await MonitorsServices.monitorJson(file);
      }
    }
    else if (rol === roles.Supervisor) {
      if (file.name.endsWith(".csv")) {
        await SupervisorsServices.supervisorCsv(file);
      }
      else if (file.name.endsWith(".json")) {
        await SupervisorsServices.supervisorJson(file);
      }
    }
    else if (rol === roles.Profesor) {
      if (file.name.endsWith(".csv")) {
        await TeachersServices.teacherCsv(file);
      }
      else if (file.name.endsWith(".json")) {
        await TeachersServices.teacherJson(file);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No se ha seleccionado un archivo.");
      toast.error("No se ha seleccionado un archivo.");
      setAppEstado(app_estados.Error);
      setTimeout(() => {
        setAppEstado(app_estados.SinArchivo);
        setFile(null);
      }, 2000);
      return;
    }

    try {
      await enviarArchivo();
      setAppEstado(app_estados.ConArchivo);
      toast.success("Archivo enviado correctamente.");
      navigate('..');
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      toast.error("Error al enviar el archivo.");
      setAppEstado(app_estados.Error);
      setTimeout(() => {
        setAppEstado(app_estados.SinArchivo);
        setFile(null);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto m-5">
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
              <input type="file" id="file-upload" className="hidden" accept=".csv,application/json" name="file" onChange={handleFileChange} />
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
