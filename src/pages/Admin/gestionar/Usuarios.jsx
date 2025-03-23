import React from "react";
import { Tabla } from "../../../components/ui/Tabla";

const arrayObjetosDatos = [
  {
    nombre: 'Juan Pérez',
    correo: 'jperez@unsa.edu.pe',
    curso: 'Matemática'
  },
  {
    nombre: 'Ana Gómez',
    correo: 'agomez@unsa.edu.pe',
    curso: 'Física'
  },
  {
    nombre: 'Carlos Vargas',
    correo: 'cvargas@unsa.edu.pe',
    curso: 'Química'
  },
  {
    nombre: 'Luisa Torres',
    correo: 'ltorres@unsa.edu.pe',
    curso: 'Biología'
  }];



export const Usuarios = () => {
  const encabezado = ['Nombres y Apellidos', 'Correo', 'Curso'];

  const array = arrayObjetosDatos.map((objeto) => Object.values(objeto));
  
  return (
    <div>
      <Tabla encabezado={encabezado} datos={array} index_key={1}/>
      <h1>Gestión de Usuarios</h1>
    </div>
  );
};
