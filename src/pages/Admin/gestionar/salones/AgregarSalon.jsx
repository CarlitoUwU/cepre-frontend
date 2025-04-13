import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export const AgregarSalon = ({ onAgregarSalon, regresar, areas, turnos }) => {
  const [nuevoSalon, setNuevoSalon] = useState({
    name: "",
    areaId: (areas && areas.length > 0) ? areas[0].id : 0,
    shiftId: (turnos && turnos.length > 0) ? turnos[0].id : 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNuevoSalon({ ...nuevoSalon, [e.target.name]: e.target.value });
  };

  const handleCrearSalon = async () => {
    if (nuevoSalon.name.trim() === "") {
      setError("El número de aula no puede estar vacío.");
      return;
    }

    const area = areas.find((a) => a.id === parseInt(nuevoSalon.areaId));

    const dataSalon = {
      ...nuevoSalon,
      name: `${area.name[0]}-${nuevoSalon.name}`,
      areaId: parseInt(nuevoSalon.areaId),
      shiftId: parseInt(nuevoSalon.shiftId),
      idSede: 1,
      capacity: 100,
    };

    setError("");
    onAgregarSalon(dataSalon);
  };

  return (
    <div className="bg-gray-200 w-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Nuevo Salón</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <label className="block font-semibold">N° de Aula:</label>
        <Input type="text" name="name" value={nuevoSalon.name} onChange={handleChange} />

        <label className="block font-semibold mt-3">Área:</label>
        <Select name="areaId" value={nuevoSalon.areaId} onChange={handleChange} options={areas ? areas : []} />

        <label className="block font-semibold mt-3">Turno:</label>
        <Select name="shiftId" value={nuevoSalon.shiftId} onChange={handleChange} options={turnos ? turnos : []} />

        <div className="flex justify-between mt-4">
          <ButtonNegative onClick={regresar}>Atrás</ButtonNegative>
          <Button onClick={handleCrearSalon}>Crear Salón</Button>
        </div>
      </div>
    </div>
  );
};
