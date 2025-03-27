import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/auth/google';

const login = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error en la autenticación con Google:", error);
    throw error;
  }
};

export default { login };
