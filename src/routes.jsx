import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { LoginPanel } from "./pages/Login/LoginPanel";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { Importar } from "./pages/Admin/importar/Importar";
import { Gestionar } from "./pages/Admin/gestionar/Gestionar";
import { Visualizar } from "./pages/Admin/visualizar/Visualizar";
import { Validar } from "./pages/Admin/validar/Validar";
import { Exportar } from "./pages/Admin/exportar/Exportar";
import { Publicar } from "./pages/Admin/publicar/Publicar";
import { Home } from "./pages/Admin/Home";
import { DocentePanel } from "./pages/Docente/DocentePanel";
import { MonitorPanel } from "./pages/Monitor/MonitorPanel";
import { SupervisorPanel } from "./pages/Supervisor/SupervisorPanel";
import { HorarioMonitorPanel } from "./pages/Supervisor/HorarioMonitorPanel";
import { NotFound } from "./pages/NotFound";

// Definicion de rutas usando Data Router API
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPanel />, // Página de login
  },
  {
    path: "/",
    element: <MainLayout />, // Layout principal que envuelve las rutas protegidas
    children: [
      {
        path: "admin/*",
        element: <AdminPanel />, // Panel de admin
        children: [
          { index: true, element: <Home /> }, // Página principal de admin
          { path: "importar", element: <Importar /> },
          { path: "gestionar", element: <Gestionar /> },
          { path: "visualizar", element: <Visualizar /> },
          { path: "validar", element: <Validar /> },
          { path: "exportar", element: <Exportar /> },
          { path: "publicar", element: <Publicar /> },
        ],
      },
      {
        path: "docente",
        element: <DocentePanel />, // Página de docentes
      },
      {
        path: "monitor",
        element: <MonitorPanel />, // Página de monitores
      },
      {
        path: "supervisor",
        element: <SupervisorPanel />, // Página de supervisores
      },
      {
        path: "supervisor/horario",
        element: <HorarioMonitorPanel />, // Sección de horarios para supervisores
      },
      {
        path: "*",
        element: <NotFound />, // Página 404
      },
    ],
  },
]);
