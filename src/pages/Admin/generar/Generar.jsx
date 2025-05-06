import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { AdmissionsServices } from '@/services/AdmissionsServices';
import { toast } from 'react-toastify';

export const Generar = () => {
  const [procesoSeleccionado, setProcesoSeleccionado] = useState('');
  const [nuevoProceso, setNuevoProceso] = useState('');
  const [anio, setAnio] = useState(2025);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dominioSeleccionado, setDominioSeleccionado] = useState('');
  const [nuevoDominio, setNuevoDominio] = useState('');
  const [generarHorarios, setGenerarHorarios] = useState(false);
  const [turnosSeleccionados, setTurnosSeleccionados] = useState([]);
  const [salonesPorTurno, setSalonesPorTurno] = useState({});

  const navigate = useNavigate();
  const procesos = ['Ciclo Quintos', 'Ordinario Primera Fase', 'Ordinario Segunda Fase', 'Nuevo proceso'];
  const dominios = ['@unsa.edu.pe', '@cepr.unsa.pe', 'nuevo dominio'];
  const turnos = [
    { nombre: 'Turno 01', horaInicio: '07:00', horaFin: '12:10' },
    { nombre: 'Turno 02', horaInicio: '11:30', horaFin: '16:40' },
    { nombre: 'Turno 03', horaInicio: '16:00', horaFin: '21:10' },
  ];

  const handleSalonesChange = (turno, area, cantidad) => {
    setSalonesPorTurno((prev) => ({
      ...prev,
      [turno]: {
        ...prev[turno],
        [area]: Math.max(0, parseInt(cantidad) || 0)
      }
    }));
  };

  const handleSubmit = async () => {
    if (procesoSeleccionado === 'Nuevo proceso' && nuevoProceso.trim() === '') {
      alert('Por favor ingresa un nombre para el nuevo proceso.');
      return;
    }

    if (anio < 2025) {
      alert('Por favor ingresa un año válido (2025 o posterior).');
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    const dominioValido = /^@([\w-]+\.)+[a-zA-Z]{2,}$/;
    if (dominioSeleccionado === 'nuevo dominio' && !dominioValido.test(nuevoDominio.trim())) {
      alert('Por favor ingresa un dominio válido, como @unsa.edu.pe');
      return;
    }

    const objeto = {
      name: procesoSeleccionado === 'Nuevo proceso' ? nuevoProceso : procesoSeleccionado,
      year: anio,
      started: fechaInicio,
      finished: fechaFin,
      configuration: {
        emailDomain: dominioSeleccionado === 'nuevo dominio' ? nuevoDominio : dominioSeleccionado,
        createSchedules: generarHorarios,
        shifts: turnosSeleccionados.map((turno) => ({
          name: turno.nombre,
          startTime: turno.horaInicio,
          endTime: turno.horaFin,
          classesToAreas: ['Biomédicas', 'Ingenierías', 'Sociales'].map(area => ({
            area,
            quantityClasses: salonesPorTurno[turno.nombre]?.[area] || 0
          }))
        }))
      }
    };

    //localStorage.setItem('procesoAdmision', JSON.stringify(objeto));
    console.log('Datos a enviar:', objeto);
    try {
      const response = await AdmissionsServices.crearAdmission(objeto)
      console.log('Respuesta del servidor:', response);
      if (response.status === 200) {
        toast.success('Proceso de admisión creado exitosamente.');
      } else {
        toast.error('Error al crear el proceso de admisión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear el proceso de admisión:', error);
      toast.error('Error al crear el proceso de admisión. Por favor, inténtalo de nuevo.');
    }
  };

  const toggleTurnoSeleccionado = (turno) => {
    const index = turnosSeleccionados.findIndex(t => t.nombre === turno.nombre);
    if (index >= 0) {
      setTurnosSeleccionados(turnosSeleccionados.filter(t => t.nombre !== turno.nombre));
    } else {
      setTurnosSeleccionados([...turnosSeleccionados, turno]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 h-screen md:h-[82vh] md:m-5 items-center justify-center">
      <div className="w-full mt-25 max-w-3xl bg-white shadow-md p-6 rounded">
        <h1 className="text-center text-2xl font-bold mb-4">Crear proceso de Admisión</h1>

        {/* Proceso */}
        <label className="block mb-2">Nombre del proceso</label>
        <select value={procesoSeleccionado} onChange={(e) => setProcesoSeleccionado(e.target.value)} className="w-full mb-4 border p-2">
          <option value="">Selecciona un proceso</option>
          {procesos.map((proceso) => (
            <option key={proceso} value={proceso}>{proceso}</option>
          ))}
        </select>
        {procesoSeleccionado === 'Nuevo proceso' && (
          <input
            type="text"
            placeholder="Nuevo proceso"
            className="w-full mb-4 border p-2"
            value={nuevoProceso}
            onChange={(e) => setNuevoProceso(e.target.value)}
          />
        )}

        {/* Año */}
        <label className="block mb-2">Año</label>
        <input
          type="number"
          min={2025}
          value={anio}
          onChange={(e) => setAnio(parseInt(e.target.value))}
          className="w-full mb-4 border p-2"
        />

        {/* Fechas */}
        <label className="block mb-2">Fecha de inicio</label>
        <input type="date" className="w-full mb-4 border p-2" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

        <label className="block mb-2">Fecha de fin</label>
        <input type="date" className="w-full mb-4 border p-2" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

        {/* Dominio */}
        <label className="block mb-2">Dominio de correo</label>
        <select value={dominioSeleccionado} onChange={(e) => setDominioSeleccionado(e.target.value)} className="w-full mb-4 border p-2">
          <option value="">Selecciona un dominio</option>
          {dominios.map((dominio) => (
            <option key={dominio} value={dominio}>{dominio}</option>
          ))}
        </select>
        {dominioSeleccionado === 'nuevo dominio' && (
          <input
            type="text"
            placeholder="@ejemplo.com"
            className="w-full mb-4 border p-2"
            value={nuevoDominio}
            onChange={(e) => setNuevoDominio(e.target.value)}
          />
        )}

        {/* Generar horarios */}
        <label className="block mb-2">¿Generar Horarios?</label>
        <div className="mb-4">
          <input type="checkbox" checked={generarHorarios} onChange={(e) => setGenerarHorarios(e.target.checked)} className="mr-2" />
          <span className="text-sm text-gray-600">Recomendamos ingresar esta opción</span>
        </div>

        {/* Selector de turnos */}
        <label className="block mb-2">Selecciona Turnos</label>
        <div className="mb-4">
          {turnos.map((turno) => (
            <div key={turno.nombre} className="mb-2">
              <input
                type="checkbox"
                checked={turnosSeleccionados.some(t => t.nombre === turno.nombre)}
                onChange={() => toggleTurnoSeleccionado(turno)}
                className="mr-2"
              />
              {turno.nombre} ({turno.horaInicio} - {turno.horaFin})
            </div>
          ))}
        </div>

        {/* Salones por área */}
        {turnosSeleccionados.map((turno) => (
          <div key={turno.nombre} className="mb-4 border p-3 rounded">
            <h2 className="font-bold mb-2">Configuración de turnos - {turno.nombre}</h2>
            <p className="mb-2">Salones por área:</p>
            {['Biomédicas', 'Sociales', 'Ingenierías'].map((area) => (
              <div key={area} className="flex items-center mb-2">
                <span className="w-1/2">{area}</span>
                <input
                  type="number"
                  min={0}
                  value={salonesPorTurno[turno.nombre]?.[area] || 0}
                  onChange={(e) => handleSalonesChange(turno.nombre, area, e.target.value)}
                  className="border p-1 w-20"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Botón enviar */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Registrar proceso
        </button>
        <div className="mt-5 w-full text-center">
          <Button onClick={() => navigate("..")}>
            Menú Principal
          </Button>
        </div>
      </div>
    </div>
  );
};