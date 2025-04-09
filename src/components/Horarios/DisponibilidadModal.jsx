import React, { useState } from "react";

const horasInicio = [
  "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30", "12:15", "13:00", 
  "13:45", "14:30", "15:15", "16:00", "16:45",  "17:30", "18:15", "19:00", "19:45", "20:30",
];

const horasFin = [
  "07:40", "08:25", "09:10", "09:55", "10:40", "11:25", "12:10", "12:55", "13:40",
  "14:25", "15:10", "15:55", "16:40", "17:25", "18:10", "18:55", "19:40", "20:25", "21:10",
];

const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

function DisponibilidadModal({ onClose, onSave }) {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFin, setHoraFin] = useState("07:40");

  const toggleDia = (dia) => {
    setDiasSeleccionados(prev =>
      prev.includes(dia)
        ? prev.filter(d => d !== dia)
        : [...prev, dia]
    );
  };

  const handleGuardar = () => {
    const disponibilidad = diasSeleccionados.map(dia => ({
      dia,
      hora_ini: horaInicio,
      hora_fin: horaFin,
      tipo: "disponibilidad",
    }));
    onSave(disponibilidad);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Ingresar Disponibilidad</h3>

        <div className="mb-4">
          <p className="font-semibold mb-2">Días:</p>
          <div className="flex flex-wrap gap-2">
            {dias.map(dia => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`px-3 py-1 rounded border 
                  ${diasSeleccionados.includes(dia)
                    ? "bg-green-200 font-bold"
                    : "bg-gray-100"
                  }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Hora Inicio:</label>
          <select value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="w-full p-2 border rounded">
            {horasInicio.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Hora Fin:</label>
          <select value={horaFin} onChange={e => setHoraFin(e.target.value)} className="w-full p-2 border rounded">
            {horasFin.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={handleGuardar} className="px-4 py-2 bg-green-500 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default DisponibilidadModal;
