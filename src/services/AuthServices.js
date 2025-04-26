import { request } from "./api";

export const AuthServices = {

  /**
   * Obtiene el token de acceso del usuario.
   * @returns {Promise<{id: string, email:string, role:string, firstName:string, lastName:string } | null>} - El token de acceso del usuario o null si no está autenticado.
   */
  async getUserInfo() {
    return await request("get", "/auth/user-info");
  },
}