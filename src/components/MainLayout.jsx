import React from "react"; 
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="w-full mt-20">
        <Outlet /> {/* Aquí se renderizarán las demás vistas */}
      </main>
    </div>
  );
};