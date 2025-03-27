import React, { useState } from "react"
import { AulaInfo } from "../../components/AulaInfo"
import { ListaSalones } from "../../components/ListaSalones"
import { TablaHorario } from "../../components/Horarios"
import listaSalones from "../../data/aulas.json"

export const DocentePanel = () => {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {/* Horario General */}
        <div className="col-span-1 md:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-5xl font-semibold mb-4">Horario General</h2>
          <TablaHorario listaSalones={listaSalones} setClaseSeleccionada={setClaseSeleccionada} />
        </div>

        {/* Información del Aula */}
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
          <AulaInfo {...(claseSeleccionada || {})} />
        </div>

        {/* Lista de Salones */}
        <div className="col-span-1 md:col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
          <ListaSalones items={listaSalones} />
        </div>
      </div>

    </div>

  )
}