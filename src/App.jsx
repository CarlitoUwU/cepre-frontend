import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPanel } from './pages/Login/LoginPanel';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { DocentePanel } from './pages/Docente/DocentePanel';
import { MonitorPanel } from './pages/Monitor/MonitorPanel';
import { SupervisorPanel } from './pages/Supervisor/SupervisorPanel';







const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  )
}

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/docente" element={<DocentePanel />} />
          <Route path="/monitor" element={<MonitorPanel />} />
          <Route path="/estudiante" element={<SupervisorPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
