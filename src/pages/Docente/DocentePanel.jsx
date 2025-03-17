import React from "react"
import { useState } from "react"
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
    <div>
      <h1>Docente</h1>
      <TablaHorario listaSalones={listaSalones} setClaseSeleccionada={setClaseSeleccionada} />
      <AulaInfo {...claseSeleccionada} />
      <ListaSalones items={listaSalones} />
    </div>
  )
}