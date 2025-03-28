import React, { useState, useEffect } from "react";
import { Tabla } from "../../../../components/ui/Tabla";
import { ButtonCabecera } from "../../../../components/ui/ButtonCabecera";
import { Button } from "../../../../components/ui/Button";
import { ButtonNegative } from "../../../../components/ui/ButtonNegative";
import { Input } from "../../../../components/ui/Input";
import { AgregarUsuarios } from "./AgregarUsuarios";

// Definir roles
const roles = {
  Docente: "Docente",
  Monitor: "Monitor",
  Supervisor: "Supervisor",
};

// Ruta de los datos
const dataSources = {
  Docente: "/src/data/docentes.json",
  Monitor: "/src/data/monitores.json",
  Supervisor: "/src/data/supervisores.json",
};

export const Usuarios = () => {
  // "vista" define si se muestra la tabla ("tabla") o el formulario ("formulario")
  const [vista, setVista] = useState("tabla");
  const [rol, setRol] = useState(roles.Docente);
  const [datosRol, setDatosRol] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ nombre: "", correo: "", numero: "" });


  useEffect(() => {
    const datosGuardados = localStorage.getItem(`usuarios_${rol}`);
    if (datosGuardados) {
      setDatosRol(JSON.parse(datosGuardados));
    } else if (dataSources[rol]) {
      fetch(dataSources[rol])
        .then((response) => response.json())
        .then((data) => {
          const dataConId = data.map((usuario, index) => ({
            ...usuario,
            id: index + 1, // Asigna un id único basado en el índice
          }));
          setDatosRol(dataConId);
          localStorage.setItem(`usuarios_${rol}`, JSON.stringify(dataConId));
        })
        .catch((error) => console.error("Error cargando los datos:", error));
    } else {
      setDatosRol([]);
    }
    // Al cambiar de rol se vuelve a la vista de tabla
    setVista("tabla");
  }, [rol]);

  const handleClick = (nuevoRol) => setRol(nuevoRol);

  // Función para borrar un usuario
  const handleBorrar = (id) => {
    const nuevosDatos = datosRol.filter((usuario) => usuario.id !== id);
    setDatosRol(nuevosDatos);
    localStorage.setItem(`usuarios_${rol}`, JSON.stringify(nuevosDatos));
  };

  // Función para iniciar la edición en línea:
const handleModificar = (id) => {
  const usuario = datosRol.find((u) => u.id === id);
  if (usuario) {
    let nombre = "";
    if (rol === roles.Docente) {
      nombre = usuario.docente;
    } else if (rol === roles.Monitor) {
      nombre = usuario.monitor;
    } else if (rol === roles.Supervisor) {
      nombre = usuario.supervisor;
    }
    setEditingId(id);
    setEditFormData({
      nombre: nombre,
      correo: usuario.correo,
      numero: usuario.numero || usuario.Número,
    });
  }
};

// Función para manejar cambios en la edición:
const handleEditChange = (e) => {
  setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
};

// Función para guardar los cambios de la edición:
const handleSaveEdit = (id) => {
  const nuevosDatos = datosRol.map((usuario) => {
    if (usuario.id === id) {
      if (rol === roles.Docente) {
        return {
          ...usuario,
          docente: editFormData.nombre,
          correo: editFormData.correo,
          numero: editFormData.numero,
        };
      } else if (rol === roles.Monitor) {
        return {
          ...usuario,
          monitor: editFormData.nombre,
          correo: editFormData.correo,
          numero: editFormData.numero,
        };
      } else if (rol === roles.Supervisor) {
        return {
          ...usuario,
          supervisor: editFormData.nombre,
          correo: editFormData.correo,
          numero: editFormData.numero,
        };
      }
    }
    return usuario;
  });
  setDatosRol(nuevosDatos);
  localStorage.setItem(`usuarios_${rol}`, JSON.stringify(nuevosDatos));
  setEditingId(null);
};

  const handleAsignarSalon = (id) => {
    if (rol === roles.Docente) {
      // Implementación futura para asignar un salón a un Docente
    }
  };

  // Función para ir al formulario de agregar usuario
  const handleAgregar = () => {
    // Inicializamos los campos del formulario según el rol
    if (rol === roles.Docente) {
      setFormData({ docente: "", curso: "", correo: "", numero: "", salones_asignados: "" });
    } else if (rol === roles.Monitor) {
      setFormData({ monitor: "", aula: "", correo: "", numero: "", carrera: "" });
    } else if (rol === roles.Supervisor) {
      setFormData({ supervisor: "", correo: "", numero: "", carrera: "", salones_asignados: "" });
    }
    setVista("formulario");
  };

  // Manejo de cambio en los inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar el nuevo usuario y volver a la vista de tabla
  const handleGuardarNuevoUsuario = (e) => {
    e.preventDefault();
    const nuevoId = datosRol.length > 0 ? Math.max(...datosRol.map(u => u.id)) + 1 : 1;
    let nuevoUsuario = { ...formData, id: nuevoId };

    // Si es Docente, se convierte el string de salones a array
    if (rol === roles.Docente && typeof nuevoUsuario.salones_asignados === "string") {
      nuevoUsuario.salones_asignados = nuevoUsuario.salones_asignados.split(",").map(s => s.trim());
    }

    // Para Supervisor, si se ingresan salones como string separados por coma, también se convierte a array
    if (rol === roles.Supervisor && typeof nuevoUsuario.salones_asignados === "string") {
      nuevoUsuario.salones_asignados = nuevoUsuario.salones_asignados.split(",").map(s => s.trim());
    }

    const nuevosDatos = [...datosRol, nuevoUsuario];
    setDatosRol(nuevosDatos);
    localStorage.setItem(`usuarios_${rol}`, JSON.stringify(nuevosDatos));
    setVista("tabla");
  };

  // Encabezados de la tabla según el rol
  let encabezado = [];
  if (rol === roles.Docente) {
    encabezado = ["N°", "Curso", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  } else if (rol === roles.Monitor) {
    encabezado = ["N°", "Salón", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  } else if (rol === roles.Supervisor) {
    encabezado = ["N°", "Nombres y Apellidos", "Correo", "Número", "Acciones"];
  }

  // Datos para la tabla
  const datos = datosRol.map((usuario, index) => {
    const idUsuario = usuario.id;
    if (editingId === idUsuario) {
      // Modo edición: muestra inputs para editar nombre, correo y número.
      if (rol === roles.Supervisor) {
        // Supervisor: 5 columnas
        return [
          index + 1, // N°
          <Input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange}/>, // Nombre
          <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange}/>, // Correo
          <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange}/>, // Número
          
          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleSaveEdit(idUsuario)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>,
        ];
      } else {
        // Docente y Monitor: 6 columnas
        return [
          index + 1, // N°
          rol === roles.Docente ? usuario.curso : usuario.aula, // 2da columna (Curso o Salón)
          <Input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditChange}/>, // Nombre
          <Input type="email" name="correo" value={editFormData.correo} onChange={handleEditChange}/>, // Correo  
          <Input type="text" name="numero" value={editFormData.numero} onChange={handleEditChange}/>, // Número 

          <div className="flex gap-2 justify-center">
            <Button onClick={() => handleSaveEdit(idUsuario)}>Guardar</Button>
            <ButtonNegative onClick={() => setEditingId(null)}>Cancelar</ButtonNegative>
          </div>,
        ];
      }
    } else {
      // Modo visualización normal:
      const acciones = (
        <div className="flex gap-2 justify-center">
          {rol === roles.Docente && (
            <Button onClick={() => handleAsignarSalon(idUsuario)}>Asignar Salón</Button>
          )}
          <Button onClick={() => handleModificar(idUsuario)}>Modificar</Button>
          <ButtonNegative onClick={() => handleBorrar(idUsuario)}>Borrar</ButtonNegative>
        </div>
      );
      if (rol === roles.Docente) {
        return [index + 1, usuario.curso, usuario.docente, usuario.correo, usuario.numero || usuario.Número, acciones];
      } else if (rol === roles.Monitor) {
        return [index + 1, usuario.aula, usuario.monitor, usuario.correo, usuario.numero || usuario.Número, acciones];
      } else if (rol === roles.Supervisor) {
        return [index + 1, usuario.supervisor, usuario.correo, usuario.numero || usuario.Número, acciones];
      }
    }
  });

  // Vista de tabla
  if (vista === "tabla") {
    return (
      <div className="overflow-x-auto w-full text-center">
        {/* Contenedor del título y botón en la misma fila */}
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-2xl font-bold">GESTIÓN DE USUARIOS</h2>
          <div className="absolute right-4">
            <Button onClick={handleAgregar}>Agregar {rol}</Button>
          </div>
        </div>
    
        {/* Navegación de roles */}
        <div className="flex w-80 justify-between mx-auto mb-4">
          {Object.values(roles).map((tipoRol) => (
            <ButtonCabecera
              key={tipoRol}
              text={tipoRol}
              handleClick={() => handleClick(tipoRol)}
              className={`${rol === tipoRol ? "bg-gray-300 font-bold" : "bg-white"} px-4 py-2 rounded shadow`}
            />
          ))}
        </div>
    
        {/* Tabla de usuarios */}
        {datos.length > 0 ? (
          <Tabla encabezado={encabezado} datos={datos} />
        ) : (
          <p className="text-center text-gray-500">No hay datos disponibles para este rol.</p>
        )}
      </div>
    );     
  }

  // Vista de formulario (solo se muestra el formulario)
  if (vista === "formulario") {
    return <AgregarUsuarios rol={rol} formData={formData} handleChange={handleChange} handleGuardarNuevoUsuario={handleGuardarNuevoUsuario} setVista={setVista} />;
  }  

  return null;
};