import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import aulasData from "@/data/todasAulas.json";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Select } from "@/components/ui/Select";
import { AgregarSalon } from "./AgregarSalon"; // Importa el componente de agregar salón

const encabezadoCursos = ["N° de Aula", "Área", "Turno", "Estado", "Acciones"];
const opciones = {
  area: ["Biomédicas", "Ingenierías", "Sociales"],
  turno: ["Mañana", "Tarde", "Noche"],
};

export const Salones = () => {
  const [aulas, setAulas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ aula: "", area: "", turno: "" });
  const [vistaActual, setVistaActual] = useState("lista"); // Estado para cambiar entre lista y agregar
  const filtro = {
    1: ["Biomédicas", "Ingenierías", "Sociales"],
    2: ["Mañana", "Tarde", "Noche"],
    3: ["Listo", "Faltan Docentes"]
  }

  useEffect(() => {
    setAulas(aulasData);
  }, []);

  const handleModificar = (aula) => {
    setEditandoId(aula.id);
    setFormData({ aula: aula.aula, area: aula.area, turno: aula.turno });
  };

  const handleGuardar = () => {
    setAulas(aulas.map(a => (a.id === editandoId ? { ...a, ...formData } : a)));
    setEditandoId(null);
    setFormData({ aula: "", area: "", turno: "" });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({ aula: "", area: "", turno: "" });
  };

  const handleBorrar = (id) => setAulas(aulas.filter((aula) => aula.id !== id));

  const handleAgregarSalon = (nuevoSalon) => {
    setAulas([...aulas, { id: aulas.length + 1, ...nuevoSalon }]);
    setVistaActual("lista"); // Volver a la vista de lista después de agregar
  };

  const getAcciones = (aula) =>
    editandoId === aula.id ? (
      <div className="inline-flex gap-10">
        <Button onClick={handleGuardar}>Guardar</Button>
        <ButtonNegative onClick={handleCancelar}>Cancelar</ButtonNegative>
      </div>
    ) : (
      <div className="inline-flex gap-10">
        <Button onClick={() => handleModificar(aula)}>Modificar</Button>
        <ButtonNegative onClick={() => handleBorrar(aula.id)}>Borrar</ButtonNegative>
      </div>
    );

  const getDatosAulas = () => {
    return aulas.map((aula) => [
      aula.aula,
      editandoId === aula.id ? (
        <Select
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          options={opciones.area}
        />
      ) : (
        aula.area
      ),
      editandoId === aula.id ? (
        <Select
          value={formData.turno}
          onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
          options={opciones.turno}
        />
      ) : (
        aula.turno
      ),
      aula.estado,
      getAcciones(aula),
    ]);
  };

  // Si la vista es "agregar", mostrar el formulario de AgregarSalon
  if (vistaActual === "agregar") {
    return <AgregarSalon onAgregarSalon={handleAgregarSalon} setVistaActual={setVistaActual} />;
  }

  return (
    <div className="overflow-x-auto w-full text-center">
      {/* Contenedor para el título y el botón */}
      <div className="flex justify-between items-center mt-1 mb-6 px-4">
        <h2 className="text-2xl font-bold text-center flex-1">GESTIÓN DE SALONES</h2>
        <Button onClick={() => setVistaActual("agregar")}>Agregar Salón</Button>
      </div>
  
      {/* Tabla reutilizable */}
      <Tabla encabezado={encabezadoCursos} datos={getDatosAulas()} filtroDic={filtro} />
    </div>
  );  
};