import React, { useState, useEffect } from "react";
import { Tabla } from "../../../components/ui/Tabla";
import { ButtonCabecera } from "../../../components/ui/ButtonCabecera";

// Definir roles
const roles = {
  Docente: "Docente",
  Monitor: "Monitor",
  Supervisor: "Supervisor",
};

// Ruta de los datos
const dataSources = {
  Docente: "/src/data/docentes.json",
  Monitor: "/src/data/monitores.json",
  Supervisor: "/src/data/supervisores.json",
};

export const Usuarios = () => {
  const [rol, setRol] = useState(roles.Docente);
  const [datosRol, setDatosRol] = useState([]);

  useEffect(() => {
    if (dataSources[rol]) {
      fetch(dataSources[rol])
        .then((response) => response.json())
        .then((data) => setDatosRol(data))
        .catch((error) => console.error("Error cargando los datos:", error));
    } else {
      setDatosRol([]);
    }
  }, [rol]);

  const handleClick = (nuevoRol) => setRol(nuevoRol);

  // Funciones vacías para implementar más adelante
  const handleModificar = (id) => {
    if (rol === roles.Docente) {
      // Implementación futura para modificar un Docente
    } else if (rol === roles.Monitor) {
      // Implementación futura para modificar un Monitor
    } else if (rol === roles.Supervisor) {
      // Implementación futura para modificar un Supervisor
    }
  };

  const handleBorrar = (id) => {
    if (rol === roles.Docente) {
      // Implementación futura para borrar un Docente
    } else if (rol === roles.Monitor) {
      // Implementación futura para borrar un Monitor
    } else if (rol === roles.Supervisor) {
      // Implementación futura para borrar un Supervisor
    }
  };

  const handleAsignarSalon = (id) => {
    if (rol === roles.Docente) {
      // Implementación futura para asignar un salón a un Docente
    }
  };

  const handleAgregar = () => {
    if (rol === roles.Docente) {
      // Implementación futura para agregar un Docente
    } else if (rol === roles.Monitor) {
      // Implementación futura para agregar un Monitor
    } else if (rol === roles.Supervisor) {
      // Implementación futura para agregar un Supervisor
    }
  };

  // Definir encabezados de la tabla
  let encabezado = [];
  if (rol === roles.Docente) {
    encabezado = ["#", "Curso", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  } else if (rol === roles.Monitor) {
    encabezado = ["#", "Salón", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  } else if (rol === roles.Supervisor) {
    encabezado = ["#", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  }

  // Generar los datos para la tabla con botones de acción
  const datos = datosRol.map((usuario, index) => {
    const idUsuario = usuario.monitor || usuario.docente || usuario.supervisor;

    const acciones = (
      <div className="flex gap-2 justify-center">
        {rol === roles.Docente && (
          <button
            className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
            onClick={() => handleAsignarSalon(idUsuario)}
          >
            Asignar Salón
          </button>
        )}
        <button
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
          onClick={() => handleModificar(idUsuario)}
        >
          Modificar
        </button>
        <button
          className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]"
          onClick={() => handleBorrar(idUsuario)}
        >
          Borrar
        </button>
      </div>
    );

    if (rol === roles.Docente) {
      return [index + 1, usuario.curso, usuario.docente, usuario.correo, usuario.Número || usuario.numero, acciones];
    } else if (rol === roles.Monitor) {
      return [index + 1, usuario.aula, usuario.monitor, usuario.correo, usuario.Número || usuario.numero, acciones];
    } else if (rol === roles.Supervisor) {
      return [index + 1, usuario.supervisor, usuario.correo, usuario.Número || usuario.numero, acciones];
    }
  });

  return (
    <div className="p-4 bg-gray-200 relative">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">GESTIÓN DE USUARIOS</h2>

        {/* Navegación de roles */}
        <div className="flex w-80 justify-between mx-auto mb-4">
          {Object.values(roles).map((tipoRol) => (
            <ButtonCabecera
              key={tipoRol}
              text={tipoRol}
              handleClick={() => handleClick(tipoRol)}
              className={`${rol === tipoRol ? "bg-gray-300 font-bold" : "bg-white"} px-4 py-2 rounded shadow`}
            />
          ))}
        </div>

        {/* Tabla de usuarios */}
        {datos.length > 0 ? (
          <Tabla encabezado={encabezado} datos={datos} />
        ) : (
          <p className="text-center text-gray-500">No hay datos disponibles para este rol.</p>
        )}

        {/* Botón flotante para agregar usuario */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            className="bg-[#0077B6] text-white font-bold px-6 py-4 rounded-full shadow-lg border-4 border-white hover:bg-[#005B8F] hover:scale-105 transition-all flex items-center gap-2"
            onClick={handleAgregar}
          >
            + Agregar {rol}
          </button>
        </div>
      </div>
    </div>
  );
};
