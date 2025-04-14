import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/Button";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "../AgregarUsuarios";
import { AsignarSalonSup } from "./AsignarSalonSup";

export const SupervisorUsuarios = () => {
  const [vista, setVista] = useState("tabla");
  const [supervisores, setSupervisores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    correo: "",
    numero: "",
  });

  const dataSource = "/src/data/supervisores.json";

  useEffect(() => {
    const guardados = localStorage.getItem("usuarios_Supervisor");
    if (guardados) {
      setSupervisores(JSON.parse(guardados));
    } else {
      fetch(dataSource)
        .then((res) => res.json())
        .then((data) => {
          const conId = data.map((u, i) => ({ ...u, id: i + 1 }));
          setSupervisores(conId);
          localStorage.setItem("usuarios_Supervisor", JSON.stringify(conId));
        })
        .catch((err) => console.error("Error cargando supervisores:", err));
    }
    setVista("tabla");
  }, []);

  const handleModificar = (id) => {
    const supervisor = supervisores.find((s) => s.id === id);
    if (supervisor) {
      setEditingId(id);
      setEditFormData({
        nombre: supervisor.supervisor,
        correo: supervisor.correo,
        numero: supervisor.numero || supervisor.Número,
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (id) => {
    const actualizados = supervisores.map((supervisor) =>
      supervisor.id === id
        ? {
          ...supervisor,
          supervisor: editFormData.nombre,
          correo: editFormData.correo,
          numero: editFormData.numero,
        }
        : supervisor
    );
    setSupervisores(actualizados);
    localStorage.setItem("usuarios_Supervisor", JSON.stringify(actualizados));
    setEditingId(null);
  };

  const handleBorrar = (id) => {
    const nuevos = supervisores.filter((s) => s.id !== id);
    setSupervisores(nuevos);
    localStorage.setItem("usuarios_Supervisor", JSON.stringify(nuevos));
  };

  const handleAgregar = () => {
    setEditFormData({ nombre: "", correo: "", numero: "" });
    setVista("formulario");
  };

  const handleAsignarSalonSup = (id) => {
    setEditingId(id);
    setVista("asignarSalonSup");
  }

  const encabezado = ["N°", "Nombres y Apellidos", "Correo", "Número", "Acciones"];

  const datos = supervisores.map((supervisor, index) => {
    const esEdicion = editingId === supervisor.id;

    if (esEdicion) {
      return [
        index + 1,
        <Input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} />,
        <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />,
        <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />,
        <div className="flex gap-2 justify-center">
          <Button onClick={() => handleGuardar(supervisor.id)}>Guardar</Button>
          <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
        </div>,
      ];
    }

    return [
      index + 1,
      supervisor.supervisor,
      supervisor.correo,
      supervisor.numero || supervisor.Número,
      <div className="flex gap-2 justify-center">
        <Button onClick={() => handleAsignarSalonSup(supervisor.id)}>Asignar Salón</Button>
        <Button onClick={() => handleModificar(supervisor.id)}>Modificar</Button>
        <ButtonNegative onClick={() => handleBorrar(supervisor.id)}>Borrar</ButtonNegative>
      </div>,
    ];
  });

  return vista === "tabla" ? (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">GESTIÓN DE SUPERVISORES</h2>
        <div className="absolute right-4">
          <Button onClick={handleAgregar}>Agregar Supervisor</Button>
        </div>
      </div>
      {datos.length > 0 ? (
        <Tabla encabezado={encabezado} datos={datos} />
      ) : (
        <p className="text-center text-gray-500">No hay supervisores registrados.</p>
      )}
    </div>
  ) : vista === "asignarSalonSup" ? (
    <AsignarSalonSup
      setVista={setVista}
      idSupervisor={editingId}
    />
  ) : (
    <AgregarUsuarios
      rol="Supervisor"
      formData={editFormData}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      handleGuardarNuevoUsuario={() => { }}
      setVista={setVista}
    />
  );
};
