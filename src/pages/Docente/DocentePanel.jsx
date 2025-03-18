import React, { useState } from "react"
import { AulaInfo } from "../../components/AulaInfo"
import { ListaSalones } from "../../components/ListaSalones"
import { TablaHorario } from "../../components/Horarios"

const listaSalones = [
  {
    aula: 'B - 103',
    monitor: 'Carlo Joaquin Valdivia Luna',
    area: 'Biomédicas',
    numHoras: 6,
    enlace: 'https://meet.google.com/abc-123',
    id: 1,
    horas: [
      {
        id: 2,
        dia: "VIERNES",
        hora_ini: "11:30",
        hora_fin: "13:10"
      }
    ]
  },
  {
    aula: 'B - 104',
    monitor: 'Jorge Luis Valdivia Luna',
    area: 'Sociales',
    numHoras: 6,
    enlace: 'https://meet.google.com/abc-123',
    id: 2,
    horas: [
      {
        id: 4,
        dia: "JUEVES",
        hora_ini: "11:30",
        hora_fin: "13:10"
      }
    ]
  },
  {
    aula: 'B - 105',
    monitor: 'Carlo Joaquin Valdivia Luna',
    area: 'Ingenierías',
    numHoras: 6,
    enlace: 'https://meet.google.com/abc-123',
    id: 3,
    horas: [
      {
        id: 5,
        dia: "MIERCOLES",
        hora_ini: "07:00",
        hora_fin: "08:40"
      },
      {
        id: 6,
        dia: "VIERNES",
        hora_ini: "07:00",
        hora_fin: "08:40"
      }
    ]
  }
]

export const DocentePanel = () => {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)

  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-4">
        {/* Horario General */}
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="col-span-3 bg-gray-100 p-4">
            {/*font size mas grande*/}
            <h2 className="text-5xl font-semibold ">Horario General</h2>
          </div>
          <TablaHorario listaSalones={listaSalones} setClaseSeleccionada={setClaseSeleccionada} />
        </div>

        {/* Información del Aula */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center items-center">
          <AulaInfo {...(claseSeleccionada || {})} />
        </div>

        {/* Lista de Salones */}
        <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
          <ListaSalones items={listaSalones} />
        </div>
      </div>
    </div>

  )
}