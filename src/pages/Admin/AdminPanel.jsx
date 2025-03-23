import React from 'react';
import { Outlet } from "react-router-dom";

export const AdminPanel = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
