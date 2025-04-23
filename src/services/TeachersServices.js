import { request } from "./api";

export const TeachersServices = {
  /**
   * Obtiene la lista de teachers paginada (solo activos).
   * @returns {Promise<{ data: Array, total: number, page: number, limit: number }>}
   */
  async getTeachers(page = 1, limit = 20) {
    return request("get", `/teachers?page=${page}&limit=${limit}`, null, true);
  },

  /**
   * Obtiene un teacher por su ID.
   * @param {string} id - ID del teacher.
   */
  async getTeacherById(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/teachers/${id}`);
  },

  /**
   * Crea un nuevo teacher.
   * @param {Object} newTeacher - Datos del teacher a crear.
   * @returns {Promise<Object>}
   */
  async createTeacher({
    email,
    personalEmail,
    maxHours = 30,
    scheduledHours = 0,
    jobStatus,
    courseId,
    dni,
    firstName,
    lastName,
    phone,
    phonesAdditional = [],
    isCoordinator = false,
  }) {
    if (!email || !courseId || !firstName || !lastName || !dni) {
      throw new Error("Faltan datos obligatorios");
    }

    return request("post", "/teachers", {
      email,
      personalEmail,
      maxHours,
      scheduledHours,
      jobStatus,
      courseId,
      dni,
      firstName,
      lastName,
      phone,
      phonesAdditional,
      isCoordinator,
    });
  },

  /**
   * Actualiza un teacher existente.
   * @param {Object} teacherData - Datos del teacher a actualizar.
   * @returns {Promise<Object>}
   */
  async updateTeacher({ userId, firstName, lastName, personalEmail, phone }) {
    if (!userId) throw new Error("ID inválido");
    return request("put", `/teachers/${userId}`, { firstName, lastName, personalEmail, phone });
  },

  /**
   * Elimina un teacher por su ID.
   * @param {string} id - ID del teacher.
   * @returns {Promise<Object>}
   */
  async deleteTeacher(id) {
    if (!id) throw new Error("ID inválido");
    return request("delete", `/teachers/${id}`);
  },

  /**
   * Desactiva un teacher (soft delete del usuario relacionado).
   * @param {string} id - ID del teacher.
   * @returns {Promise<Object>}
   */
  async deactivate(id) {
    if (!id) throw new Error("ID inválido");
    return request("patch", `/teachers/${id}/deactivate`);
  },

  async getHorario(id) {
    if (!id) throw new Error("ID inválido");
    return request("get", `/teachers/${id}/schedules`);
  },

  /**
   * Crea múltiples teachers desde archivo JSON.
   * @param {File} archivo - Archivo JSON.
   * @returns {Promise<Object>}
   */
  async teacherJson(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/teachers/json", formData, false, true);
  },

  /**
   * Crea múltiples teachers desde archivo CSV.
   * @param {File} archivo - Archivo CSV.
   * @returns {Promise<Object>}
   */
  async teacherCsv(archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    return request("post", "/teachers/csv", formData, false, true);
  },
};
