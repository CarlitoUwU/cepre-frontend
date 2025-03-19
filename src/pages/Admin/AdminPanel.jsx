import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Importar } from './Importar';
import { Gestionar } from './Gestionar';
import { Visualizar } from './Visualizar';
import { Validar } from './Validar';
import { Exportar } from './Exportar';
import { Publicar } from './Publicar';
import { Home } from './Home';

export const AdminPanel = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/importar" element={<Importar />} />
        <Route path="/gestionar" element={<Gestionar />} />
        <Route path="/visualizar" element={<Visualizar />} />
        <Route path="/validar" element={<Validar />} />
        <Route path="/exportar" element={<Exportar />} />
        <Route path="/publicar" element={<Publicar />} />
      </Routes>

    </div>
  )
}
