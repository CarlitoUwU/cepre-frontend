import React from "react";
import { useCursos } from "@/hooks/useCursos";
import { Button } from "@/components/ui/Button";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";
import { Tabla } from "@/components/ui/Tabla";

const encabezado = ["Curso", "Docente", "Correo del docente", "Acciones"];

export const TablaCursos = ({ docentes = [], buscarProfesor }) => {
  const { cursos, isLoading, isError, error } = useCursos();

  if (isLoading) return <SkeletonTabla numRows={5} numColums={4} />;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los cursos: {error.message}
      </div>
    );
  }

  const docentesPorCurso = {}
  docentes.map((docente) => {
    if (docente.teacherId !== "no asignado") {
      const cursoId = docente.courseName;
      docentesPorCurso[cursoId] = {
        id: docente.teacherId,
        firstName: docente.firstName,
        lastName: docente.lastName,
        email: docente.email,
      };
    }
  }, {});

  const datos = cursos.map((curso) => {
    const docente = docentesPorCurso[curso.name];

    return [
      curso.name,
      docente ? `${docente.firstName} ${docente.lastName}` : "-",
      docente?.email || "-",
      <Button key={curso.id} onClick={() => { buscarProfesor(curso, docente) }}>
        Modificar
      </Button>,
    ];
  });

  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full text-center">
        <Tabla encabezado={encabezado} datos={datos} />
      </div>
    </div>
  );
};
