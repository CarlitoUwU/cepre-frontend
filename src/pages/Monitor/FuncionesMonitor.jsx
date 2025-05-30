import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla.jsx";
import meetIcon from "@/assets/meet.png";
import classroomIcon from "@/assets/classroom.png";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input.tsx";
import { ClassesServices } from "@/services/ClassesServices.js";
import { toast } from "react-toastify";

export const FuncionesMonitor = ({ monitorInfo }) => {
  const { meetLink, classroomLink, salon, monitor } = monitorInfo;
  const encabezado = ["Aula", "Monitor", "Meet", "Classroom"];

  const oldData = [monitorInfo?.meetLink, monitorInfo?.classroomLink];

  const [editMeet, setEditMeet] = useState(false);
  const [editClassroom, setEditClassroom] = useState(false);
  const [newMeetLink, setNewMeetLink] = useState(meetLink);
  const [newClassroomLink, setNewClassroomLink] = useState(classroomLink);

  const handleSaveMeetLink = async () => {
    try {
      setEditMeet(false);
      if (newMeetLink === oldData[0]) {
        return;
      }

      await ClassesServices.setLinkMeet({ classId: monitorInfo?.salon_id, urlMeet: newMeetLink });
      toast.success("Enlace Meet actualizado correctamente.");
    } catch (error) {
      toast.error("Error al actualizar el enlace Meet.");
      console.error(error);
    }
  }

  const handleSaveClassroomLink = async () => {
    try {
      setEditClassroom(false);
      if (newClassroomLink === oldData[1]) {
        return;
      }

      await ClassesServices.setLinkClassroom({ classId: monitorInfo?.salon_id, urlClassroom: newClassroomLink });
      toast.success("Enlace Classroom actualizado correctamente.");
    } catch (error) {
      toast.error("Error al actualizar el enlace Classroom.");
      console.error(error);
    }
  }

  useEffect(() => {
    setNewMeetLink(meetLink);
    setNewClassroomLink(classroomLink);
  }, [meetLink, classroomLink]);

  const datos = [
    [
      `${salon}`,
      `${monitor}`,
      editMeet ? (
        <Input type="text" value={newMeetLink} onChange={(e) => setNewMeetLink(e.target.value)} />
      ) : (
        <a href={newMeetLink} target="_blank" rel="noopener noreferrer">
          <img
            src={meetIcon}
            alt="Meet"
            className="mx-auto max-w-[60px] max-h-[30px] md:max-w-[100px] md:max-h-[50px] w-auto h-auto"
          />
        </a>
      ),
      editClassroom ? (
        <Input type="text" value={newClassroomLink} onChange={(e) => setNewClassroomLink(e.target.value)} />
      ) : (
        <a href={newClassroomLink} target="_blank" rel="noopener noreferrer">
          <img
            src={classroomIcon}
            alt="Classroom"
            className="mx-auto max-w-[30px] max-h-[30px] md:max-w-[50px] md:max-h-[50px] w-auto h-auto"
          />
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
          <Button onClick={editMeet ? handleSaveMeetLink : () => setEditMeet(!editMeet)}>
            {editMeet ? "Guardar Enlace Meet" : "Añadir Enlace Meet"}
          </Button>
        </div>
        <div></div>
        <div className="flex justify-center">
          <Button onClick={editClassroom ? handleSaveClassroomLink : () => setEditClassroom(!editClassroom)}>
            {editClassroom ? "Guardar Enlace Classroom" : "Añadir Enlace Classroom"}
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};
