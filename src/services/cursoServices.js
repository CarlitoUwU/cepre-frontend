import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Esto permite enviar cookies o tokens en las peticiones
});

export const fetchCourses = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/areas", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return null;
  }
};
