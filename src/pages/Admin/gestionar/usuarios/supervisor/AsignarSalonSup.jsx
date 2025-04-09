import React, { useState } from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Tabla } from "@/components/ui/Tabla";
import supervisoresData from "@/data/supervisores.json";

export const AsignarSalonSup = ({ idSupervisor, setVista }) => {
  const supervisor = supervisoresData.find((sup) => sup.id === idSupervisor);
  const supervisorNombre = supervisor ? supervisor.supervisor : "Desconocido";

  // Estado local para los salones asignados
  const [salonesAsignados, setSalonesAsignados] = useState(
    supervisor?.salones_asignados || []
  );

  // Estado para el nuevo salón a asignar
  const [nuevoSalon, setNuevoSalon] = useState("");

  // Agregar salón
  const handleAsignarSalon = () => {
    if (nuevoSalon.trim() === "") return;
    if (salonesAsignados.includes(nuevoSalon)) return;

    setSalonesAsignados((prev) => [...prev, nuevoSalon.trim()]);
    setNuevoSalon("");
  };

  // Eliminar salón
  const handleEliminarSalon = (index) => {
    const nuevosSalones = salonesAsignados.filter((_, i) => i !== index);
    setSalonesAsignados(nuevosSalones);
  };

  // Convertir salones en formato para la tabla
  const getSalonesAsignados = () => {
    return salonesAsignados.map((salon, index) => [
      index + 1,
      salon,
      "-", // Monitor no disponible
      "-", // Enlace no disponible
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={() => handleEliminarSalon(index)}
      >
        Eliminar
      </button>,
    ]);
  };

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">
          Asignación de salones - {supervisorNombre}
        </h2>
      </div>

      {/* Formulario para agregar salón */}
      <div className="flex justify-center gap-2 my-4">
        <input
          type="text"
          placeholder="Nuevo salón"
          value={nuevoSalon}
          onChange={(e) => setNuevoSalon(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={handleAsignarSalon}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Asignar salón
        </button>
      </div>

      {/* Tabla de salones */}
      {salonesAsignados.length > 0 ? (
        <Tabla
          encabezado={["N°", "Aula", "Monitor", "Enlace", "Acciones"]}
          datos={getSalonesAsignados()}
        />
      ) : (
        <p className="text-center text-gray-500">No hay salones asignados.</p>
      )}

      <div className="flex justify-center mt-4">
        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div>
    </div>
  );
};