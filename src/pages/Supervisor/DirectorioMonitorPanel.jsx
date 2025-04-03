import React, { useEffect, useState } from "react";
import { Tabla } from "@/components/ui/Tabla";
import MonitorServices from "@/services/monitorServices";

export const DirectorioMonitorPanel = ({ aula = {}, volver = () => { }, cambiarVista = () => { } }) => {
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    if (!aula || !aula.id) return; // Evita ejecutar si no hay aula válida

    const getDirectorioDocentes = async (salonId) => {
      try {
        const docentesData = await MonitorServices.cargarDocentes(salonId);
        if (!Array.isArray(docentesData)) {
          console.error("Respuesta inválida de la API:", docentesData);
          return;
        }

        setDocentes(
          docentesData.map((docente, index) => [
            index + 1,
            docente.courseName || "Curso desconocido",
            `${docente.firstName || "Nombre"} ${docente.lastName || "Desconocido"}`,
            docente.email || "Sin correo",
            docente.phoneNumber || "Sin número",
          ])
        );
      } catch (error) {
        console.error("Error al obtener el directorio de docentes:", error);
      }
    };

    getDirectorioDocentes(aula.id)
  }, [aula])

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">
        {`Directorio del Aula ${aula.aula}`}
      </h2>
      <Tabla encabezado={["#", "Curso", "Nombre", "Correo", "Número"]} datos={docentes} />
      <div className="text-center mt-4 flex gap-4 justify-center">
        <button onClick={cambiarVista} className="bg-[#78211E] text-white px-4 py-2 rounded hover:bg-[#5a1815]">
          Visualizar Horario
        </button>
        <button onClick={volver} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
          Volver
        </button>
      </div>
    </div>
  )
};
