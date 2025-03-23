import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes" // Importamos el router desde `routes.js`

function App() {
  return <RouterProvider router={router} />;
}

export default App;
