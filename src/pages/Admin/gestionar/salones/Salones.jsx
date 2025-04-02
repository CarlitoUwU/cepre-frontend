import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Select } from "@/components/ui/Select";
import { AgregarSalon } from "./AgregarSalon"; // Importa el componente de agregar salón
import  EditarSalon  from "./EditarSalon";
import ClassesServices from "@/services/classesServices.js";
import AreaServices from "@/services/areaServices.js";
import ShiftsServices from "@/services/shiftsServices.js";

const encabezadoCursos = ["N° de Aula", "Área", "Turno", "Estado", "Acciones"];

export const Salones = () => {
  const [aulas, setAulas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ name: "", areaId: 0, turnoId: 0 });
  const [vistaActual, setVistaActual] = useState("lista"); // Estado para cambiar entre lista y agregar

  useEffect(() => {
    const fetchSalones = async () => {
      const data = await ClassesServices.getClasses();
      const areasData = await AreaServices.getAreas();
      const shiftsData = await ShiftsServices.getShifts();

      setAreas(areasData);
      setTurnos(shiftsData);
      setFiltro({
        1: areasData.map((area) => area.name),
        2: shiftsData.map((turno) => turno.name),
        3: ["Listo", "Falta Docentes"]
      });

      if (Array.isArray(data)) {
        const aulas = data.map((aula) => ({
          ...aula,
          area: aula.area.name,
          turno: aula.shift.name,
          estado: "Listo",
        }));

        setAulas(aulas);
      }
    }
    fetchSalones();
  }, []);

  const handleModificar = (aula) => {
    setEditandoId(aula.id);
    setFormData({ name: aula.name, areaId: areas.find(a => a.name === aula.area)?.id, turnoId: turnos.find(t => t.name === aula.turno)?.id });
  };

  const handleGuardar = async () => {
    const area = areas.find(a => a.id === parseInt(formData.areaId));

    const dataClase = {
      id: editandoId,
      name: `${area.name[0]}-${formData.name.slice(2)}`,
      areaId: area.id,
      shiftId: parseInt(formData.turnoId),
    }

    let claseActualizada = await ClassesServices.updateClass(dataClase);
    claseActualizada = {
      ...claseActualizada,
      area: claseActualizada.area.name,
      turno: claseActualizada.shift.name,
      estado: "Listo",
    }

    setAulas(aulas.map(a => (a.id === editandoId ? { ...claseActualizada } : a)));
    setEditandoId(null);
    setFormData({ name: "", areaId: 0, turnoId: 0 });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({ name: "", areaId: 0, turnoId: 0 });
  };

  const handleBorrar = async (id) => {
    try {
      const eliminado = await ClassesServices.deleteClass(id);  // retornara "" si se elimino correctamente

      if (eliminado === "") {
        setAulas(aulas.filter((aula) => aula.id !== id));
      } else {
        console.error("Error al eliminar el aula:", eliminado);
      }
    } catch (error) {
      console.error("Error al eliminar el aula:", error);
    }
  };


  const handleAgregarSalon = (nuevoSalon) => {
    setAulas([...aulas, { ...nuevoSalon }]);
    setVistaActual("lista"); // Volver a la vista de lista después de agregar
  };

  const handleEditarSalon = (id) => {
    setVistaActual("asignarEditarSalon");
  };

  const getAcciones = (aula) =>
    editandoId === aula.id ? (
      <div className="inline-flex gap-10">
        <Button onClick={handleGuardar}>Guardar</Button>
        <ButtonNegative onClick={handleCancelar}>Cancelar</ButtonNegative>
      </div>
    ) : (
      <div className="inline-flex gap-10">
        <Button onClick={() => handleEditarSalon(aula)}>Modificar</Button> 
        <ButtonNegative onClick={() => handleBorrar(aula.id)}>Borrar</ButtonNegative>
      </div>
    );

  const getDatosAulas = () => {
    return aulas.map((aula) => [
      aula.name,
      editandoId === aula.id ? (
        <Select
          name="areaId"
          value={formData.areaId}
          onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
          options={areas}
        />
      ) : (
        aula.area
      ),
      editandoId === aula.id ? (
        <Select
          name="turnoId"
          value={formData.turnoId}
          onChange={(e) => setFormData({ ...formData, turnoId: e.target.value })}
          options={turnos}
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
    return <AgregarSalon onAgregarSalon={handleAgregarSalon} setVistaActual={setVistaActual} areas={areas} turnos={turnos} />;
  }

  if (vistaActual === "asignarEditarSalon") {
    return <EditarSalon />;
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