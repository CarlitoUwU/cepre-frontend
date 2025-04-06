import React, { useState, useEffect } from "react";

import { Tabla } from "@/components/ui/Tabla";
import { ButtonCabecera } from "@/components/ui/ButtonCabecera";
import { Button } from "@/components/ui/button.tsx";
import { ButtonNegative } from "@/components/ui/ButtonNegative";
import { Input } from "@/components/ui/Input";
import { AgregarUsuarios } from "./AgregarUsuarios";
import  AsignarSalonDoc  from "./AsignarSalonDoc";
import  AsignarSalonSup  from "./AsignarSalonSup";

const roles = {
  Docente: "Docente",
  Monitor: "Monitor",
  Supervisor: "Supervisor",
};

const camposPorRol = {
  Docente: { nombre: "docente", extra: "curso" },
  Monitor: { nombre: "monitor", extra: "aula" },
  Supervisor: { nombre: "supervisor", extra: null },
};

const encabezadosPorRol = {
  Docente: ["N°", "Curso", "Nombres y Apellidos", "Correo", "Número", "Acciones"],
  Monitor: ["N°", "Salón", "Nombres y Apellidos", "Correo", "Número", "Acciones"],
  Supervisor: ["N°", "Nombres y Apellidos", "Correo", "Número", "Acciones"],
};

const dataSources = {
  Docente: "/src/data/docentes.json",
  Monitor: "/src/data/monitores.json",
  Supervisor: "/src/data/supervisores.json",
};

export const Usuarios = () => {
  const [vista, setVista] = useState("tabla");
  const [rol, setRol] = useState(roles.Docente);
  const [datosRol, setDatosRol] = useState([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ nombre: "", correo: "", numero: "", extra: "" });

  useEffect(() => {
    const datosGuardados = localStorage.getItem(`usuarios_${rol}`);
    if (datosGuardados) {
      setDatosRol(JSON.parse(datosGuardados));
    } else {
      fetch(dataSources[rol])
        .then((response) => response.json())
        .then((data) => {
          const dataConId = data.map((usuario, index) => ({ ...usuario, id: index + 1 }));
          setDatosRol(dataConId);
          localStorage.setItem(`usuarios_${rol}`, JSON.stringify(dataConId));
        })
        .catch((error) => console.error("Error cargando los datos:", error));
    }
    setVista("tabla");
  }, [rol]);

  const handleClick = (nuevoRol) => setRol(nuevoRol);

  const handleBorrar = (id) => {
    const nuevosDatos = datosRol.filter((usuario) => usuario.id !== id);
    setDatosRol(nuevosDatos);
    localStorage.setItem(`usuarios_${rol}`, JSON.stringify(nuevosDatos));
  };
  

  const handleModificar = (id) => {
    const usuario = datosRol.find((u) => u.id === id);
    if (usuario) {
      setEditingId(id);
      setEditFormData({
        nombre: usuario[camposPorRol[rol].nombre],
        correo: usuario.correo,
        numero: usuario.numero || usuario.Número,
        extra: usuario[camposPorRol[rol].extra] || "",
      });
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (id) => {
    const nuevosDatos = datosRol.map((usuario) =>
      usuario.id === id
        ? {
            ...usuario,
            [camposPorRol[rol].nombre]: editFormData.nombre,
            correo: editFormData.correo,
            numero: editFormData.numero,
            [camposPorRol[rol].extra]: editFormData.extra,
          }
        : usuario
    );

    setDatosRol(nuevosDatos);
    localStorage.setItem(`usuarios_${rol}`, JSON.stringify(nuevosDatos));
    setEditingId(null);
  };

  const handleAgregar = () => {
    setEditFormData({ nombre: "", correo: "", numero: "", extra: "" });
    setVista("formulario");
  };

  const handleAsignarSalonDoc = (id) => {
    setVista("asignarSalonDoc");
  };

  const handleAsignarSalonSup = (id) => {
    setSelectedSupervisorId(id);
    setVista("asignarSalonSup");
  };

  const generarFilaUsuario = (usuario, index) => {
    const idUsuario = usuario.id;
    const esEdicion = editingId === idUsuario;

    const acciones = (
      <div className="flex gap-2 justify-center">
        {rol === roles.Docente && (
          <Button onClick={() => handleAsignarSalonDoc(idUsuario)}>Asignar Salón</Button>
        )}
        {rol === roles.Supervisor && (
          <Button onClick={() => handleAsignarSalonSup(idUsuario)}>Asignar Salón</Button>
        )}
        <Button onClick={() => handleModificar(idUsuario)}>Modificar</Button>
        <ButtonNegative onClick={() => handleBorrar(idUsuario)}>Borrar</ButtonNegative>
      </div>
    );

    if (esEdicion) {
      return [
        index + 1,
        rol === roles.Docente ? usuario.curso : rol === roles.Monitor ? usuario.aula : null,
        <Input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange} />,
        <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange} />,
        <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange} />,
        <div className="flex gap-2 justify-center">
          <Button onClick={() => handleSaveEdit(idUsuario)}>Guardar</Button>
          <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
        </div>,
      ].filter(Boolean); 
    }

    return [
      index + 1,
      rol === roles.Docente ? usuario.curso : rol === roles.Monitor ? usuario.aula : null,
      rol === roles.Docente ? usuario.docente : rol === roles.Monitor ? usuario.monitor : usuario.supervisor,
      usuario.correo,
      usuario.numero || usuario.Número,
      acciones,
    ].filter(Boolean);
  };

  const datos = datosRol.map(generarFilaUsuario);
  const encabezado = encabezadosPorRol[rol];

  if (vista === "tabla") {
    return (
      <div className="overflow-x-auto w-full text-center">
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-2xl font-bold">GESTIÓN DE USUARIOS</h2>
          <div className="absolute right-4">
            <Button onClick={handleAgregar}>Agregar {rol}</Button>
          </div>
        </div>

        <div className="flex w-80 justify-between mx-auto mb-4">
          {Object.values(roles).map((tipoRol) => (
            <ButtonCabecera key={tipoRol} text={tipoRol} handleClick={() => handleClick(tipoRol)} className={`${rol === tipoRol ? "bg-gray-300 font-bold" : "bg-white"} px-4 py-2 rounded shadow`} />
          ))}
        </div>

        {datos.length > 0 ? (
          <Tabla encabezado={encabezado} datos={datos} />
        ) : (
          <p className="text-center text-gray-500">No hay datos disponibles para este rol.</p>
        )}
      </div>
    );
  }

  if (vista === "asignarSalonDoc") return <AsignarSalonDoc setVista={setVista} />;

  if (vista === "asignarSalonSup") return <AsignarSalonSup idSupervisor={selectedSupervisorId} setVista={setVista} />;



  return vista === "formulario" ? (
    <AgregarUsuarios rol={rol} formData={editFormData} handleChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })} handleGuardarNuevoUsuario={() => { }}
      setVista={setVista} />
  ) : null;
};
