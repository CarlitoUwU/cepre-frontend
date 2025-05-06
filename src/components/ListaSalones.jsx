import React from 'react';
import { Tabla } from './ui/Tabla';

const encabezado = ['N°', 'Apellidos y Nombres', 'Aula', 'Enlace Meet'];

export const ListaSalones = ({ items }) => {

  const datos = items.map((item, index) => [
    index + 1,
    item.monitor,
    item.aula,
    item?.enlace ?
      <a href={item.enlace} target='_blank' className="text-blue-500 underline hover:text-blue-700">{item.enlace}</a> :
      <span className="text-gray-500">Sin enlace</span>
  ]);

  return (
    <Tabla encabezado={encabezado} datos={datos} />
  );
};
