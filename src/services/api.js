import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Define la base de la API
  withCredentials: true, // Permite enviar cookies para autenticación
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
