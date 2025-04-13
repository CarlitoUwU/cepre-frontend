import React from "react"; 
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="w-full ">
      <Header />
      <main className="w-full  pt-20">
        <Outlet /> {/* Aquí se renderizarán las demás vistas */}
      </main>
    </div>
  );
};
