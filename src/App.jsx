import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginPanel } from './pages/Login/LoginPanel';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { DocentePanel } from './pages/Docente/DocentePanel';
import { MonitorPanel } from './pages/Monitor/MonitorPanel';
import { SupervisorPanel } from './pages/Supervisor/SupervisorPanel';
import { HorarioMonitorPanel } from './pages/Supervisor/HorarioMonitorPanel';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 Not Found</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Contenido */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<LoginPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/docente" element={<DocentePanel />} />
          <Route path="/monitor" element={<MonitorPanel />} />
          <Route path="/supervisor" element={<SupervisorPanel />} />
          <Route path="/supervisor/horario" element={<HorarioMonitorPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
