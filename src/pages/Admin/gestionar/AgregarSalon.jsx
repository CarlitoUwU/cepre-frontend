import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { ButtonNegative } from "../../../components/ui/ButtonNegative";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select"; 

const opcionesArea = ["Biomédicas", "Ingenierías", "Sociales"];
const opcionesTurno = ["Mañana", "Tarde", "Noche"];

export const AgregarSalon = ({ onAgregarSalon, setVistaActual }) => {
  const [nuevoSalon, setNuevoSalon] = useState({
    aula: "",
    area: opcionesArea[0],
    turno: opcionesTurno[0],
  });

  const handleChange = (e) => {
    setNuevoSalon({ ...nuevoSalon, [e.target.name]: e.target.value });
  };

  const handleCrearSalon = () => {
    if (nuevoSalon.aula.trim() === "") {
      alert("El número de aula no puede estar vacío.");
      return;
    }
    onAgregarSalon(nuevoSalon);
  };

  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Salón</h2>

        {/* Campo N° de Aula */}
        <label className="block font-semibold">N° de Aula:</label>
        <Input type="text" name="aula" value={nuevoSalon.aula} onChange={handleChange} />

        {/* Campo Área */}
        <label className="block font-semibold mt-3">Área:</label>
        <Select name="area" value={nuevoSalon.area} onChange={handleChange} options={opcionesArea} />

        {/* Campo Turno */}
        <label className="block font-semibold mt-3">Turno:</label>
        <Select name="turno" value={nuevoSalon.turno} onChange={handleChange} options={opcionesTurno} />

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <ButtonNegative onClick={() => setVistaActual("lista")}>Atrás</ButtonNegative>
          <Button onClick={handleCrearSalon}>Crear Salón</Button>
        </div>
      </div>
    </div>
  );
};
