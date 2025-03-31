import React from "react";
import { Tabla } from "./ui/Tabla";
import meetIcon from "../assets/meet.png";
import classroomIcon from "../assets/classroom.png";
import { Button } from "./ui/button.tsx";

export const FuncionesMonitor = ({ monitorInfo }) => {
  const { meetLink, classroomLink, openEditPage } = monitorInfo;
  const encabezado = ["Aula", "Monitor", "Meet", "Classroom"];
  const datos = [
    [
      "I-102",
      "Joel Antonio Chino Pari",
      <a href={meetLink} target="_blank" rel="noopener noreferrer">
        <img src={meetIcon} alt="Meet" className="mx-auto" style={{ maxWidth: "100px", maxHeight: "50px" }} />
      </a>,
      <a href={classroomLink} target="_blank" rel="noopener noreferrer">
        <img src={classroomIcon} alt="Classroom" className="mx-auto" style={{ maxWidth: "50px", maxHeight: "50px" }} />
      </a>,
    ],
  ];

  return (
    <div className="col-span-5 mt-8">
      <Tabla encabezado={encabezado} datos={datos} />
      <div className="grid grid-cols-5 mt-6">
        <div></div>
        <div className="flex justify-center">
          <Button onClick={() => openEditPage("meet", meetLink)}>Añadir Enlace Meet</Button>
        </div>
        <div></div>
        <div className="flex justify-center">
          <Button onClick={() => openEditPage("classroom", classroomLink)}>Añadir Enlace Classroom</Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};
