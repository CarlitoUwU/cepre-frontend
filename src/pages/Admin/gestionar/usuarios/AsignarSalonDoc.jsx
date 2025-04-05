import React, { useEffect, useState } from "react";
import { TablaHorario } from "@/Components/Horarios";
import { ButtonNegative } from "@/components/ui/ButtonNegative";

function AsignarSalonDoc({ setVista }) {
  const [aulas, setAulas] = useState([]);
  
  useEffect(() => {
    const cargarAulas = async () => {
      const response = await fetch("/src/data/aulas.json");
      const data = await response.json();
      setAulas(data);
    };
    
    cargarAulas();
  }, []);

  const horaMinima = "07:00";
  const horaMaxima = "21:00";
  const horasIni = [
    "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30", "12:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30",
  ];
  const horasFin = [
    "07:40", "08:25", "09:10", "09:55", "10:40", "11:25", "12:10", "12:55", "13:40", "14:25", "15:10", "15:55", "16:40", "17:25", "18:10", "18:55", "19:40", "20:25", "21:10",
  ];
  const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
  const areaColors = {"Ingenierías": "#A4C2F4", "Sociales": "#F7CB9C", "Biomédicas": "#92C47F"};
  const getRow = horaIni => horasIni.indexOf(horaIni) + 2;
  const getRowSpan = (horaIni, horaFin) => horasFin.indexOf(horaFin) - horasIni.indexOf(horaIni) + 1;
  const getColumn = dia => dias.indexOf(dia) + 2;

  return (
    <div className="flex flex-col items-center min-h-screen p-10">
      <div className="overflow-auto w-full max-h-[80vh] p-3">
        <div className="grid grid-cols-7 gap-5 bg-white shadow-md rounded-lg w-full">
          <div></div>
          {dias.map((dia, index) => (
            <div key={index} className="p-8 text-center font-semibold">{dia}</div>
          ))}
          {horasIni.map((hora, index) => (
            <div key={index} className="p-2 text-center font-semibold">{`${hora} - ${horasFin[index]}`}</div>
          ))}
          {dias.flatMap((_, i) =>
            horasIni.map((_, k) => (
              <div key={`${i}-${k}`} className="rounded-lg bg-gray-200" style={{ gridColumn: i + 2, gridRow: k + 2 }}></div>
            ))
          )}
          {aulas.flatMap(salon =>
            salon.horas.map(hora => {
              const startRow = getRow(hora.hora_ini);
              const endRow = startRow + getRowSpan(hora.hora_ini, hora.hora_fin) - 1;
              const color = areaColors[salon.area] || "#f4351c";
              return (
                <div
                  key={hora.id}
                  style={{ gridColumn: getColumn(hora.dia), gridRow: startRow, gridRowEnd: endRow + 1, backgroundColor: color, color: "#fff", padding: "5px", textAlign: "center" }}
                  className="p-2 cursor-pointer rounded-lg"
                >
                  {salon.aula}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="mt-4">
        <ButtonNegative onClick={() => setVista("tabla")}>Atrás</ButtonNegative>
      </div>
    </div>
  );
}

export default AsignarSalonDoc;
