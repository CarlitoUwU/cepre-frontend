import React, { useState, useEffect } from "react";
import { Tabla } from "@/components/ui/Tabla";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "./AgregarUsuarios";

export const MonitorUsuarios = () => {
  const [vista, setVista] = useState("tabla");
  const [monitores, setMonitores] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    correo: "",
    numero: "",
    extra: "",
  });

  const dataSource = "/src/data/monitores.json";

  useEffect(() => {
    const guardados = localStorage.getItem("usuarios_Monitor");
    if (guardados) {
      setMonitores(JSON.parse(guardados));
    } else {
      fetch(dataSource)
        .then((res) => res.json())
        .then((data) => {
          const conId = data.map((u, i) => ({ ...u, id: i + 1 }));
          setMonitores(conId);
          localStorage.setItem("usuarios_Monitor", JSON.stringify(conId));
        })
        .catch((err) => console.error("Error cargando monitores:", err));
    }
    setVista("tabla");
  }, []);

  const handleModificar = (id) => {
    const monitor = monitores.find((m) => m.id === id);
    if (monitor) {
      setEditingId(id);
      setEditFormData({
        nombre: monitor.monitor,
        correo: monitor.correo,
        numero: monitor.numero || monitor.Número,
        extra: monitor.aula || "",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (id) => {
    const actualizados = monitores.map((monitor) =>
      monitor.id === id
        ? {
            ...monitor,
            monitor: editFormData.nombre,
            correo: editFormData.correo,
            numero: editFormData.numero,
            aula: editFormData.extra,
          }
        : monitor
    );
    setMonitores(actualizados);
    localStorage.setItem("usuarios_Monitor", JSON.stringify(actualizados));
    setEditingId(null);
  };

  const handleBorrar = (id) => {
    const nuevos = monitores.filter((m) => m.id !== id);
    setMonitores(nuevos);
    localStorage.setItem("usuarios_Monitor", JSON.stringify(nuevos));
  };

  const handleAgregar = () => {
    setEditFormData({ nombre: "", correo: "", numero: "", extra: "" });
    setVista("formulario");
  };

  const encabezado = ["N°", "Salón", "Nombres y Apellidos", "Correo", "Número", "Acciones"];

  const datos = monitores.map((monitor, index) => {
    const esEdicion = editingId === monitor.id;

    if (esEdicion) {
      return [
        index + 1,
        <Input type="text" name="extra" value={editFormData.extra} onChange={handleEditChange} />,
        <Input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} />,
        <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />,
        <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />,
        <div className="flex gap-2 justify-center">
          <Button onClick={() => handleGuardar(monitor.id)}>Guardar</Button>
          <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
        </div>,
      ];
    }

    return [
      index + 1,
      monitor.aula,
      monitor.monitor,
      monitor.correo,
      monitor.numero || monitor.Número,
      <div className="flex gap-2 justify-center">
        <Button onClick={() => handleModificar(monitor.id)}>Modificar</Button>
        <ButtonNegative onClick={() => handleBorrar(monitor.id)}>Borrar</ButtonNegative>
      </div>,
    ];
  });

  return vista === "tabla" ? (
    <div className="overflow-x-auto w-full text-center">
      <div className="relative flex justify-center items-center py-2">
        <h2 className="text-2xl font-bold">GESTIÓN DE MONITORES</h2>
        <div className="absolute right-4">
          <Button onClick={handleAgregar}>Agregar Monitor</Button>
        </div>
      </div>
      {datos.length > 0 ? (
        <Tabla encabezado={encabezado} datos={datos} />
      ) : (
        <p className="text-center text-gray-500">No hay monitores registrados.</p>
      )}
    </div>
  ) : (
    <AgregarUsuarios
      rol="Monitor"
      formData={editFormData}
      handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
      handleGuardarNuevoUsuario={() => {}}
      setVista={setVista}
    />
  );
};
