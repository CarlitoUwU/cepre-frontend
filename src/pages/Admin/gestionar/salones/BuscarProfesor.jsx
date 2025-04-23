import React, { useState } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";

const encabezado = ["N°", "Docente", "Correo", "Telefono", "Acciones"];
export const BuscarProfesor = ({ curso, profesor, horario, idSalon }) => {
  console.log({ profesor, curso })
  const a = [
    {
      id: 1,
      docente: "Juan Perez",
      correo: "juan@gmail.com",
      numero: 923423242
    },
    {
      id: 2,
      docente: "Maria Lopez",
      correo: "maria@gmail.com",
      numero: 936234242
    },
    {
      id: 3,
      docente: "Pedro Gonzalez",
      correo: "pedro@gmail.com",
      numero: 946282342
    },
  ]
  console.log({ curso, horario, idSalon })
  const [profesoresDisponibles, setProfesoresDisponibles] = useState(a);

  const handleAsignar = (idProfesor, idSalon) => {
    console.log("Asignar profesor", idProfesor, "al salón", idSalon);

    // Aqui se agrega el servicio para asignar el profesor al salón

    setProfesoresDisponibles((prev) => prev?.filter((profesor) => profesor.id !== idProfesor));
  }

  const getDatos = () => {
    return profesoresDisponibles.map((profesor, i) =>
      [
        i + 1,
        profesor.docente,
        profesor.correo,
        profesor.numero,
        <Button key={profesor.id} onClick={() => { handleAsignar(profesor.id, idSalon) }}>
          Asignar
        </Button>,
      ]
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-center text-lg font-bold mb-4">Seleccionar Profesor - {curso?.name}</h2>
        {profesor && (
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Profesor Asignado:</h3>
            <p>{profesor.firstName} {profesor.lastName}</p>
            <p>{profesor.email}</p>
          </div>
        )}
      </div>
      <Tabla encabezado={encabezado} datos={getDatos()} />
    </div>
  )
}