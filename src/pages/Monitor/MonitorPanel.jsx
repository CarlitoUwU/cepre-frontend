import React from "react";

export const MonitorPanel = () => {
  const CourseTable = () => {
    const courses = [
      { course: "BIOLOGÍA", teacher: "GUTIÉRREZ QUISPE JUAN CARLOS", email: "juan.gutierrez@cepr.unsa.pe" },
      { course: "CÍVICA", teacher: "RAMIREZ MAMANI MAYRA", email: "mayra.ramirez@cepr.unsa.pe" },
      { course: "FÍSICA", teacher: "BALDARRAGO VILCA ELVIS", email: "elvis.baldarrago@cepr.unsa.pe" },
      { course: "FILOSOFÍA", teacher: "GÓMEZ ROSELLÓ ANDRÉI", email: "andrei.gomez@cepr.unsa.pe" },
      { course: "GEOGRAFÍA", teacher: "QUISPE MACHACA JOHN RICHARD", email: "john.quispe@cepr.unsa.pe" },
      { course: "HISTORIA", teacher: "CACERES RIOJA JESUS MARTÍN", email: "jesus.caceres@cepr.unsa.pe" },
      { course: "INGLÉS", teacher: "ESPINEL ESCARZA VÍCTOR ROMÁN", email: "victor.espinel@cepr.unsa.pe" },
      { course: "LENGUAJE", teacher: "PUMACHARA LIMA RICHAR NINO", email: "richar.pumachara@cepr.unsa.pe" },
      { course: "LITERATURA", teacher: "SANTANDER PAREDES FLOR DE MARIA MILAGROS", email: "flor.santander@cepr.unsa.pe" },
      { course: "PSICOLOGÍA", teacher: "PEREZ ZÚÑIGA EDUARDO GONZALO", email: "eduardo.perez@cepr.unsa.pe" },
      { course: "QUÍMICA", teacher: "ZANABRIA YUCRA JESUS GUILLERMO", email: "jesus.zanabria@cepr.unsa.pe" },
      { course: "MATEMÁTICA", teacher: "PRADO POLANCO GILBERT RAUL", email: "gilbert.prado@cepr.unsa.pe" },
      { course: "RAZ. LÓGICO", teacher: "SERRANO PACCA FLOR DE MARÍA", email: "flor.pacco@cepr.unsa.pe" },
      { course: "RAZ. MATEMÁTICO", teacher: "QUISPE RUELAS MIGUEL", email: "miguel.quispe@cepr.unsa.pe" },
      { course: "RAZ. VERBAL", teacher: "CCALLA MAMANI JULIAN", email: "julian.ccalla@cepr.unsa.pe" }
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-2 px-4 border-b border-gray-300">CURSO</th>
              <th className="py-2 px-4 border-b border-gray-300">DOCENTE</th>
              <th className="py-2 px-4 border-b border-gray-300">CORREO</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{course.course}</td>
                <td className="py-2 px-4 border-b border-gray-300">{course.teacher}</td>
                <td className="py-2 px-4 border-b border-gray-300">{course.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const ScheduleTable = () => {
    const schedule = [
      { time: "11:30 - 12:10", monday: "RAZ. VERBAL", tuesday: "RAZ. LÓGICO", wednesday: "INGLÉS", thursday: "RAZ. VERBAL", friday: "RAZ. MATEMÁTICO", saturday: "GEOGRAFÍA" },
      { time: "12:15 - 12:55", monday: "BIOLOGÍA", tuesday: "PSICOLOGÍA", wednesday: "BIOLOGÍA", thursday: "PSICOLOGÍA", friday: "BIOLOGÍA", saturday: "LENGUAJE" },
      { time: "13:45 - 14:25", monday: "MATEMÁTICA", tuesday: "QUÍMICA", wednesday: "MATEMÁTICA", thursday: "LITERATURA", friday: "FÍSICA", saturday: "HISTORIA" },
      { time: "14:30 - 15:10", monday: "FILOSOFÍA", tuesday: "FÍSICA", wednesday: "HISTORIA", thursday: "CÍVICA", friday: "MATEMÁTICA", saturday: "QUÍMICA" }
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 px-4 border-b border-gray-300">Hrs</th>
              <th className="py-2 px-4 border-b border-gray-300">LUNES</th>
              <th className="py-2 px-4 border-b border-gray-300">MARTES</th>
              <th className="py-2 px-4 border-b border-gray-300">MIÉRCOLES</th>
              <th className="py-2 px-4 border-b border-gray-300">JUEVES</th>
              <th className="py-2 px-4 border-b border-gray-300">VIERNES</th>
              <th className="py-2 px-4 border-b border-gray-300">SÁBADO</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{item.time}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-red-500 text-white">{item.monday}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-purple-500 text-white">{item.tuesday}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-yellow-500 text-white">{item.wednesday}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-red-500 text-white">{item.thursday}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-red-700 text-white">{item.friday}</td>
                <td className="py-2 px-4 border-b border-gray-300 bg-blue-500 text-white">{item.saturday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const App = () => {
    return (
      <div className="bg-gray-200 p-4">
        <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseTable />
            <ScheduleTable />
          </div>
        </div>
      </div>
    );
  };
}
