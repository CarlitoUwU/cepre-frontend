import React from "react";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { useClases } from "@/hooks/useClases";  // Asegúrate de que useClases esté importado correctamente

export const EditarSalon = ({ idSalon, regresar }) => {
  // Obtener las clases (salones) desde el hook useClases
  const { clases } = useClases(); // Si el hook devuelve un objeto con clases, asegúrate de que esté bien configurado

  // Buscar el aula por su id
  const aula = clases ? clases.find((a) => a.id === idSalon) : null;

  const nombreAula = aula ? aula.name : "Aula no encontrada"; // Si no se encuentra, mostrar "Aula no encontrada"

  return (
    <div className="overflow-x-auto w-full text-center p-6">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">
          Modificación de Aula: {nombreAula} {/* Mostrar el nombre del aula */}
        </h2>
      </div>

      <div className="mt-4">
        <ButtonNegative onClick={regresar}> {/* Ajusta el valor aquí según el nombre correcto de la vista */}
          Atrás
        </ButtonNegative>
      </div>
    </div>
  );
}