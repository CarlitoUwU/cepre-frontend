import React, { useState, useEffect } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import docentesData from "@/data/docentes.json";
import TurnosSelector from "@/components/Horarios/TurnosSelector.jsx";

export const AsignarSalonDoc = ({ idDocente, setVista }) => {
  const docente = docentesData.find((doc) => doc.id === idDocente);
  const nombreDocente = docente ? docente.docente : "Desconocido";

  const listaSalones = [];

  const [disponibilidadDocentes, setDisponibilidadDocentes] = useState({});

  // Cargar disponibilidad desde localStorage al montar el componente
  useEffect(() => {
    const data = localStorage.getItem(`disponibilidad-${idDocente}`);
    if (data) {
      setDisponibilidadDocentes((prev) => ({
        ...prev,
        [idDocente]: JSON.parse(data),
      }));
    }
  }, [idDocente]);

  // Actualizar disponibilidad específica para el docente
  const handleDisponibilidadChange = (nuevaDisponibilidad) => {
    setDisponibilidadDocentes((prev) => {
      const updatedDisponibilidad = {
        ...prev,
        [idDocente]: nuevaDisponibilidad,  // Filtramos solo el docente actual
      };

      // Guardar en localStorage la disponibilidad del docente específico
      localStorage.setItem(
        `disponibilidad-${idDocente}`,
        JSON.stringify(nuevaDisponibilidad)
      );

      return updatedDisponibilidad;
    });
  };

  return (
    <div className="overflow-x-auto w-full text-center p-2">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold">
          Asignación de Salones Docente - {nombreDocente}
        </h2>

        {/* Aquí estamos pasando el idDocente a TurnosSelector */}
        <TurnosSelector
          listaSalones={listaSalones}
          disponibilidad={disponibilidadDocentes[idDocente] || []}  // Aseguramos que se pasa la disponibilidad específica
          idDocente={idDocente}  // Pasamos el idDocente a TurnosSelector
          setDisponibilidadDocentes={handleDisponibilidadChange}  // Pasamos la función para actualizar disponibilidad
        />

        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};


