import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  LoginPanel from './pages/Login/LoginPanel';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { DocentePanel } from './pages/Docente/DocentePanel';
import { MonitorPanel } from './pages/Monitor/MonitorPanel';
import { SupervisorPanel } from './pages/Supervisor/SupervisorPanel';
import { HorarioMonitorPanel } from './pages/Supervisor/HorarioMonitorPanel';
import { MainLayout } from './components/MainLayout';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 Not Found</h1>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Login sin header */}
      <Route path="/" element={<LoginPanel />} />

      {/* Todas las demás rutas dentro del layout */}
      <Route path="/" element={<MainLayout />}>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/docente" element={<DocentePanel />} />
        <Route path="/monitor" element={<MonitorPanel />} />
        <Route path="/supervisor" element={<SupervisorPanel />} />
        <Route path="/supervisor/horario" element={<HorarioMonitorPanel />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
