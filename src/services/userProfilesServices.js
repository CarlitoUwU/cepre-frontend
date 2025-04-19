import { request } from "./api";

const UserProfilesServices = {
  /**
   * Obtiene la lista de perfiles de usuario activos.
   * @returns {Promise<Array<{ id: string, dni?: string, firstName: string, lastName: string, phone: string, phonesAdditional: string[], address: string, personalEmail: string, isActive: boolean }>>}
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
   * @param {string} [newUserProfile.dni] - DNI del usuario (opcional).
   * @param {string} newUserProfile.firstName - Primer nombre del usuario.
   * @param {string} newUserProfile.lastName - Apellido del usuario.
   * @param {string} newUserProfile.phone - Teléfono del usuario.
   * @param {Array<string>} newUserProfile.phonesAdditional - Teléfonos adicionales.
   * @param {string} newUserProfile.address - Dirección del usuario.
   * @param {string} newUserProfile.personalEmail - Correo personal.
   * @param {boolean} [newUserProfile.isActive=true] - Estado del usuario.
   * @returns {Promise<Object | null>}
   */
  async createUserProfile({
    dni,
    firstName,
    lastName,
    phone,
    phonesAdditional = [],
    address,
    personalEmail,
    isActive = true,
  }) {
    const payload = {
      firstName,
      lastName,
      phone,
      phonesAdditional,
      address,
      personalEmail,
      isActive,
    };

    if (dni) payload.dni = dni;

    return request("post", "/user-profiles", payload);
  },

  /**
   * Actualiza un perfil de usuario existente.
   * @param {Object} userProfileData - Datos a actualizar.
   * @param {string} userProfileData.id - ID del perfil.
   * @param {string} [userProfileData.dni] - DNI del usuario (opcional).
   * @param {string} userProfileData.firstName - Primer nombre.
   * @param {string} userProfileData.lastName - Apellido.
   * @param {string} userProfileData.phone - Teléfono.
   * @param {Array<string>} userProfileData.phonesAdditional - Teléfonos adicionales.
   * @param {string} userProfileData.address - Dirección.
   * @param {string} userProfileData.personalEmail - Correo personal.
   * @param {boolean} userProfileData.isActive - Estado del perfil.
   * @returns {Promise<Object | null>}
   */
  async updateUserProfile({
    id,
    dni,
    firstName,
    lastName,
    phone,
    phonesAdditional,
    address,
    personalEmail,
    isActive,
  }) {
    const payload = {
      firstName,
      lastName,
      phone,
      phonesAdditional,
      address,
      personalEmail,
      isActive,
    };

    if (dni) payload.dni = dni;

    return request("patch", `/user-profiles/${id}`, payload);
  },

  /**
   * Elimina un perfil de usuario por su ID.
   * @param {string} id - ID del perfil.
   * @returns {Promise<boolean>}
   */
  async deleteUserProfile(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/user-profiles/${id}`);
  },

  /**
   * Desactiva un perfil de usuario por su ID.
   * @param {string} id - ID del perfil.
   * @returns {Promise<boolean>}
   */
  async deactivateUserProfile(id) {
    if (!id) throw new Error("ID inválido");
    return request("patch", `/user-profiles/${id}/deactivate`);
  }
};

export default UserProfilesServices;