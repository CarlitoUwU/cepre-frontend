import { request } from "./api";

const UserProfilesServices = {

  /**
   * Obtiene la lista de perfiles de usuario.
   * @returns {Promise<Array<{ id: number, dni: string, firsName: string, lastName: string, phone: string, phoneAdditional: string, address: string, personalEmail: string, isActive: boolean }>> | null}
   */
  async getUserProfiles() {
    return request("get", "/user-profiles", null, true);
  },

  /**
   * Obtiene un perfil de usuario por su ID.
   * @param {string} id - ID del perfil de usuario a obtener.
   * @returns {Promise<Object | null>}
   */
  async getUserProfileById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/user-profiles/${id}`);
  },

  /**
   * Crea un nuevo perfil de usuario.
   * @param {Object} newUserProfile - Datos del perfil de usuario a crear.
   * @param {string} newUserProfile.dni - DNI del usuario.
   * @param {string} newUserProfile.firsName - Primer nombre del usuario.
   * @param {string} newUserProfile.lastName - Apellido del usuario.
   * @param {string} newUserProfile.phone - Teléfono del usuario.
   * @param {Array<string>} newUserProfile.phoneAdditional - Teléfono adicional del usuario.
   * @param {string} newUserProfile.address - Dirección del usuario.
   * @param {string} newUserProfile.personalEmail - Correo electrónico personal del usuario.
   * @param {boolean} newUserProfile.isActive - Estado del usuario.
   * @returns {Promise<{ id: number, dni: string, firsName: string, lastName: string, phone: string, phoneAdditional: string, address: string, personalEmail: string, isActive: boolean } | null>}
   */
  async createUserProfile({ dni, firsName, lastName, phone, phoneAdditional = [], address, personalEmail, isActive = true }) {
    return request("post", "/user-profiles", { dni, firsName, lastName, phone, phoneAdditional, address, personalEmail, isActive });
  },

  /**
   * Actualiza un perfil de usuario existente.
   * @param {Object} userProfileData - Datos del perfil de usuario a actualizar.
   * @param {string} userProfileData.id - ID del perfil de usuario a actualizar.
   * @param {string} userProfileData.dni - DNI del usuario. 
   * @param {string} userProfileData.firsName - Primer nombre del usuario.
   * @param {string} userProfileData.lastName - Apellido del usuario.
   * @param {string} userProfileData.phone - Teléfono del usuario.
   * @param {Array<string>} userProfileData.phoneAdditional - Teléfono adicional del usuario.
   * @param {string} userProfileData.address - Dirección del usuario.
   * @param {string} userProfileData.personalEmail - Correo electrónico personal del usuario.
   * @param {boolean} userProfileData.isActive - Estado del usuario.
   * @returns {Promise<{ id: number, dni: string, firsName: string, lastName: string, phone: string, phoneAdditional: string, address: string, personalEmail: string, isActive: boolean } | null>}
   */
  async updateUserProfile({ id, dni, firsName, lastName, phone, phoneAdditional, address, personalEmail, isActive }) {
    return request("patch", `/user-profiles/${id}`, { dni, firsName, lastName, phone, phoneAdditional, address, personalEmail, isActive });
  },

  /**
   * Elimina un perfil de usuario por su ID.
   * @param {number} id - ID del perfil de usuario a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteUserProfile(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/user-profiles/${id}`);
  },

  /**
   * Desactiva un perfil de usuario por su ID.
   * @param {number} id - ID del perfil de usuario a desactivar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async desactivateUserProfile(id) {
    if (!id) throw new Error("ID inválido");
    return request("patch", `/user-profiles/${id}/deactivate`);
  }

};

export default UserProfilesServices;