import React from "react";
import { Dia } from "./Dia";
import { Hora } from "./Hora";
import { Curso } from "./Curso";

const horasIni = [
  "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30", "12:15", "13:00",
  "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30",
];

const horasFin = [
  "07:40", "08:25", "09:10", "09:55", "10:40", "11:25", "12:10", "12:55", "13:40",
  "14:25", "15:10", "15:55", "16:40", "17:25", "18:10", "18:55", "19:40", "20:25", "21:10",
];

const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

const areaColors = {
  "Ingenierías": "#A4C2F4",
  "Sociales": "#F7CB9C",
  "Biomédicas": "#92C47F",
};

const TablaTurno = ({
  nombreTurno,
  listaSalones,
  setClaseSeleccionada,
  horaInicio,
  horaFin,
  docentes = [],
}) => {
  const minIndex = horasIni.indexOf(horaInicio);
  const maxIndex = horasFin.indexOf(horaFin);

  const getRow = (horaIni) => horasIni.indexOf(horaIni) - minIndex + 2;
  const getRowSpan = (horaIni, horaFin) =>
    horasFin.indexOf(horaFin) - horasIni.indexOf(horaIni) + 1;
  const getColumn = (dia) => dias.indexOf(dia) + 2;

  const [seleccionadas, setSeleccionadas] = React.useState(() => {
    const stored = localStorage.getItem("docentes_seleccionados");
    return stored ? JSON.parse(stored) : [];
  });

  const [celdaSeleccionada, setCeldaSeleccionada] = React.useState(null);

  const toggleSeleccion = (dia, horaIni, horaFin, docenteId) => {
    const nueva = { dia, hora_ini: horaIni, hora_fin: horaFin, docenteId };
    const existe = seleccionadas.find(
      (sel) =>
        sel.dia === dia &&
        sel.hora_ini === horaIni &&
        sel.hora_fin === horaFin &&
        sel.docenteId === docenteId
    );
    let nuevasSeleccionadas;
    if (existe) {
      nuevasSeleccionadas = seleccionadas.filter(
        (sel) =>
          !(
            sel.dia === dia &&
            sel.hora_ini === horaIni &&
            sel.hora_fin === horaFin &&
            sel.docenteId === docenteId
          )
      );
    } else {
      nuevasSeleccionadas = [...seleccionadas, nueva];
    }
    setSeleccionadas(nuevasSeleccionadas);
    localStorage.setItem("docentes_seleccionados", JSON.stringify(nuevasSeleccionadas));
  };

  const pintarPorTurnos = (horaIni, horaFin) => {
    const turnos = [
      { nombre: "Turno 1", inicio: "07:00", fin: "12:10" },
      { nombre: "Turno 2", inicio: "11:30", fin: "16:40" },
      { nombre: "Turno 3", inicio: "16:00", fin: "21:10" },
    ];

    return turnos.map((turno) => {
      const inicioTurno = Math.max(horaIni, turno.inicio);
      const finTurno = Math.min(horaFin, turno.fin);

      if (inicioTurno < finTurno) {
        return (
          <div
            key={turno.nombre}
            className="rounded-lg"
            style={{
              backgroundColor: "#b5e6b5",
              gridColumn: getColumn(dia),
              gridRow: getRow(inicioTurno),
              gridRowEnd: `span ${getRowSpan(inicioTurno, finTurno)}`,
            }}
          />
        );
      }
      return null;
    });
  };

  const handleClickDia = (dia) => {
    const diaIndex = dias.indexOf(dia);
    const rowsToPaint = [];
    for (let i = 7; i <= 9; i++) {
      const row = horasIni.findIndex((hora) => hora.startsWith(`${i}:`));
      rowsToPaint.push({ row, diaIndex });
    }
    setCeldaSeleccionada({ tipo: "dias", rows: rowsToPaint });
  };

  const handleClickHora = (hora) => {
    const row = horasIni.indexOf(hora);
    setCeldaSeleccionada({ tipo: "hora", row });
  };

  const renderCeldasSeleccionadas = () => {
    if (!celdaSeleccionada) return null;

    if (celdaSeleccionada.tipo === "dia") {
      return celdaSeleccionada.rows.map((rowData, index) => (
        <div
          key={`dia-${index}`}
          className="rounded-lg"
          style={{
            backgroundColor: "#b5e6b5", 
            gridColumn: rowData.diaIndex + 2,
            gridRow: rowData.row + 2,
            gridRowEnd: `span 1`,
          }}
        />
      ));
    }

    if (celdaSeleccionada.tipo === "hora") {
      return dias.map((dia, diaIndex) => (
        <div
          key={`hora-${diaIndex}`}
          className="rounded-lg"
          style={{
            backgroundColor: "#b5e6b5", 
            gridColumn: diaIndex + 2,
            gridRow: celdaSeleccionada.row + 2,
            gridRowEnd: `span 1`,
          }}
        />
      ));
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{nombreTurno}</h2>
      <div className="grid grid-cols-7 gap-1 bg-white shadow-md rounded-lg p-4 relative">
        <div></div>
        {dias.map((dia) => (
          <Dia key={dia} nombre={dia} onClick={() => handleClickDia(dia)} />
        ))}

        {horasIni.slice(minIndex, maxIndex + 1).map((hora, index) => (
          <Hora
            key={`${hora}-${horasFin[minIndex + index]}`}
            hora={`${hora} - ${horasFin[minIndex + index]}`}
            onClick={() => handleClickHora(hora)} 
          />
        ))}

        {dias.flatMap((dia, i) =>
          horasIni.slice(minIndex, maxIndex + 1).map((horaIni, k) => {
            const horaFin = horasFin[minIndex + k];
            const seleccionada = seleccionadas.find(
              (sel) =>
                sel.dia === dia &&
                sel.hora_ini === horaIni &&
                sel.hora_fin === horaFin
            );
            return (
              <div
                key={`bg-${i}-${k}`}
                className="rounded-lg cursor-pointer transition-all"
                onClick={() => toggleSeleccion(dia, horaIni, horaFin)}
                style={{
                  backgroundColor: seleccionada ? "#b5e6b5" : "#f4f4f4",
                  gridColumn: i + 2,
                  gridRow: k + 2,
                }}
              />
            );
          })
        )}

        {docentes
          .filter(
            (disp) =>
              horasIni.indexOf(disp.hora_ini) >= minIndex &&
              horasFin.indexOf(disp.hora_fin) <= maxIndex &&
              dias.includes(disp.dia)
          )
          .map((disp, index) => (
            <div
              key={`disp-${index}`}
              className="rounded-lg"
              style={{
                backgroundColor: "#b5e6b5", 
                gridColumn: getColumn(disp.dia),
                gridRow: getRow(disp.hora_ini),
                gridRowEnd: `span ${getRowSpan(disp.hora_ini, disp.hora_fin)}`,
              }}
            />
          ))}

        {dias.flatMap((dia, i) =>
          horasIni.slice(minIndex, maxIndex + 1).map((hora) =>
            pintarPorTurnos(hora, horasFin[minIndex + i])
          )
        )}

        {listaSalones.flatMap((salon) =>
          salon.horas
            .filter(
              (h) =>
                horasIni.indexOf(h.hora_ini) >= minIndex &&
                horasFin.indexOf(h.hora_fin) <= maxIndex
            )
            .map((hora) => (
              <Curso
                key={`${salon.aula}-${hora.dia}-${hora.hora_ini}`}
                clase={{
                  aula: salon.aula,
                  monitor: salon.monitor,
                  area: salon.area,
                  numHoras: salon.numHoras,
                  enlace: salon.enlace,
                }}
                nombre={salon.aula}
                backgroundColor={areaColors[salon.area] || "#f4351c"}
                gridColumn={getColumn(hora.dia)}
                gridRow={getRow(hora.hora_ini)}
                gridSpan={getRowSpan(hora.hora_ini, hora.hora_fin)}
                setClaseSeleccionada={setClaseSeleccionada}
              />
            ))
        )}

        {renderCeldasSeleccionadas()}
      </div>
    </div>
  );
};

export const Horarios = ({
  listaSalones = [],
  setClaseSeleccionada = () => {},
  turno = "",
  docentes = [],
}) => {
  return (
    <div className="p-4 space-y-10">
      {turno === "Turno 1" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="07:00"
          horaFin="12:10"
          docentes={docentes}
        />
      )}
      {turno === "Turno 2" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="11:30"
          horaFin="16:40"
          docentes={docentes}
        />
      )}
      {turno === "Turno 3" && (
        <TablaTurno
          listaSalones={listaSalones}
          setClaseSeleccionada={setClaseSeleccionada}
          horaInicio="16:00"
          horaFin="21:10"
          docentes={docentes}
        />
      )}
    </div>
  );
};
