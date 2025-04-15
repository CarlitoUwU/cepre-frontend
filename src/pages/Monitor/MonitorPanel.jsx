import React, { useState, useEffect } from "react";
import { TablaHorarioMonitor } from "@/components/Horarios/indexMonitor";
import { ListaCursosMonitor } from "@/components/ListaCursosMonitor";
import { FuncionesMonitor } from "./FuncionesMonitor";
import { MonitorsServices } from "@/services/MonitorsServices";
import { DIAS } from "@/constants/dias";
import { formatTimeToHHMM } from "@/utils/formatTime";
import { toast } from "react-toastify";
import { SkeletonTabla } from "@/components/skeletons/SkeletonTabla";

const TYPE_ERROR = {
  SIN_HORARIO: "No se encontró horario",
  SIN_PROFESORES: "No se encontró profesores",
  SIN_DATOS: "No se encontraron datos",
  default: "Error desconocido, contacte al administrador",
};

const fetchHorarioData = async () => {
  try {
    const horario = await MonitorsServices.cargarHorario();
    return horario.map((hora) => ({
      dia: DIAS[hora.weekday],
      hora_ini: formatTimeToHHMM(hora.startTime),
      hora_fin: formatTimeToHHMM(hora.endTime),
      curso: hora.courseName,
    }));
  } catch (error) {
    console.error("Error fetching horario data", error);
    throw new Error(TYPE_ERROR.SIN_HORARIO);
  }
};

const fetchProfesoresData = async () => {
  try {
    const profesores = await MonitorsServices.cargarDocentes();
    return profesores.map((profesor) => ({
      curso: profesor.courseName,
      docente: `${profesor.firstName} ${profesor.lastName}`,
      correo: profesor.email,
    }))
  }
  catch (error) {
    console.error("Error fetching profesores data", error);
    throw new Error(TYPE_ERROR.SIN_PROFESORES);
  }
}

const fetchDatosMonitor = async () => {
  try {
    const data = await MonitorsServices.getInformacion();
    return {
      meetLink: data?.urlMeet || "",
      classroomLink: data?.urlClassroom || "",
      salon: data?.salon || "",
      monitor: `${data?.nombres || ""} ${data?.apellidos || ""}`,
      salon_id: data?.salon_id || "",
      monitor_id: data?.monitorId || "",
    };
  }
  catch (error) {
    console.error("Error fetching monitor data", error);
    throw new Error(TYPE_ERROR.SIN_DATOS);
  }
}

export const MonitorPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [horario, setHorario] = useState([]);
  const [listaProfesores, setListaProfesores] = useState([]);
  const [monitorInfo, setMonitorInfo] = useState({});

  useEffect(() => {
    const loadHorario = async () => {
      const cachedHorario = sessionStorage.getItem("horario");
      const cachedProfesores = sessionStorage.getItem("profesores");
      const cachedData = sessionStorage.getItem("data_clase");

      if (cachedHorario && cachedProfesores && cachedData) {
        // Usa los datos del cache
        setHorario(JSON.parse(cachedHorario));
        setListaProfesores(JSON.parse(cachedProfesores));
        setMonitorInfo(JSON.parse(cachedData));
      } else {
        // Si no hay cache, obtener los datos del servidor
        try {
          const profesores = await fetchProfesoresData();
          const horario = await fetchHorarioData();
          const monitor = await fetchDatosMonitor();

          if (!horario.length || !profesores.length || !monitor) {
            setHorario([]);
            setListaProfesores([]);
            setMonitorInfo({});
            toast.error("No se encontraron datos para mostrar.");
            return;
          }

          setIsLoading(false);

          // Guardar en el estado
          setHorario(horario);
          setListaProfesores(profesores);
          setMonitorInfo(monitor);

          // Guardar en sessionStorage
          sessionStorage.setItem("horario", JSON.stringify(horario));
          sessionStorage.setItem("profesores", JSON.stringify(profesores));
        } catch (error) {
          console.error("Error en loadHorario", error);
          const tipo = error?.message || TYPE_ERROR.default;
          toast.error(tipo);
        }
      }
    };

    loadHorario();
  }, []);

  return (
    <div className="bg-gray-200 p-4 m-5 text-center">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Lista de Cursos */}
        <div className="col-span-2 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">CURSOS</h2>
          {isLoading ? (
            <SkeletonTabla numRows={15} nuColumns={3} />
          ) : (
            <ListaCursosMonitor cursos={listaProfesores} />
          )}
        </div>

        {/* Horario del Monitor */}
        <div className="col-span-3 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">HORARIO {monitorInfo?.salon || ""}</h2>
          <TablaHorarioMonitor horas={horario} />

          {/* Funciones del Monitor */}
          <div className="col-span-5 mt-8">
            <FuncionesMonitor monitorInfo={monitorInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};