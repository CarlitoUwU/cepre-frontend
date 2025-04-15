import React, { useState } from "react";
import { Tabla } from "@/components/ui/Tabla.jsx";
import meetIcon from "@/assets/meet.png";
import classroomIcon from "@/assets/classroom.png";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input.tsx";

export const FuncionesMonitor = ({ monitorInfo }) => {
  const { meetLink, classroomLink, salon, monitor } = monitorInfo;
  const encabezado = ["Aula", "Monitor", "Meet", "Classroom"];

  const [editMeet, setEditMeet] = useState(false);
  const [editClassroom, setEditClassroom] = useState(false);
  const [newMeetLink, setNewMeetLink] = useState(meetLink);
  const [newClassroomLink, setNewClassroomLink] = useState(classroomLink);

  const datos = [
    [
      `${salon}`,
      `${monitor}`,
      editMeet ? (
        <Input type="text" value={newMeetLink} onChange={(e) => setNewMeetLink(e.target.value)} />
      ) : (
        <a href={newMeetLink} target="_blank" rel="noopener noreferrer">
          <img src={meetIcon} alt="Meet" className="mx-auto" style={{ maxWidth: "100px", maxHeight: "50px" }} />
        </a>
      ),
      editClassroom ? (
        <Input type="text" value={newClassroomLink} onChange={(e) => setNewClassroomLink(e.target.value)} />
      ) : (
        <a href={newClassroomLink} target="_blank" rel="noopener noreferrer">
          <img src={classroomIcon} alt="Classroom" className="mx-auto" style={{ maxWidth: "50px", maxHeight: "50px" }} />
        </a>
      ),
    ],
  ];

  return (
    <div className="col-span-5 mt-8">
      <Tabla encabezado={encabezado} datos={datos} />
      <div className="grid grid-cols-5 mt-6">
        <div></div>
        <div className="flex justify-center">
          <Button onClick={() => setEditMeet(!editMeet)}>
            {editMeet ? "Guardar Enlace Meet" : "Añadir Enlace Meet"}
          </Button>
        </div>
        <div></div>
        <div className="flex justify-center">
          <Button onClick={() => setEditClassroom(!editClassroom)}>
            {editClassroom ? "Guardar Enlace Classroom" : "Añadir Enlace Classroom"}
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};
