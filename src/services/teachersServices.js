import { request } from "./api";

const TeacherServices = {
  /**
   * Obtiene la lista de teachers.
   * @returns {Promise<Array<{ userId: string, courseId: string, maxHours: number, scheduledHours: number, isActive: boolean, jobShiftType: string, createdAt: string, updatedAt: string }>> | null}
   */
  async getTeachers(page = 1, limit = 20) {
    return request("get", `/teachers?page=${page}&limit=${limit}`, null, true);
  },

  /**
   * Obtiene un teacher por su ID.
   * @param {string} userId - ID del teacher a obtener.
   */
  async getTeacherById(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("get", `/teachers/${userId}`);
  },

  /**
   * Crea un nuevo teacher.
   * @param {Object} newTeacher - Datos del teacher a crear.
   * @param {string} newTeacher.userId - ID del usuario.
   * @param {string} newTeacher.courseId - ID del curso.
   * @param {number} newTeacher.maxHours - Horas máximas.
   * @param {number} newTeacher.scheduledHours - Horas programadas.
   * @param {boolean} newTeacher.isActive - Estado del teacher.
   * @param {string} newTeacher.jobShiftType - Tipo de turno.
   * @returns {Promise<{ userId: string, courseId: string, maxHours: number, scheduledHours: number, isActive: boolean, jobShiftType: string, createdAt: string, updatedAt: string } | null>}
   */
  async createTeacher({ userId, courseId, maxHours, scheduledHours, isActive = true, jobShiftType }) {
    const now = new Date().toISOString();
    return request("post", "/teachers", { userId, courseId, maxHours, scheduledHours, isActive, jobShiftType, createdAt: now, updatedAt: now });
  },

  /**
   * Actualiza un teacher existente.
   * @param {Object} teacherData - Datos del teacher a actualizar.
   * @param {string} teacherData.userId - ID del teacher a actualizar.
   * @param {string} teacherData.courseId - ID del curso.
   * @param {number} teacherData.maxHours - Horas máximas.
   * @param {number} teacherData.scheduledHours - Horas programadas.
   * @param {boolean} teacherData.isActive - Estado del teacher.
   * @param {string} teacherData.jobShiftType - Tipo de turno.
   * @returns {Promise<{ userId: string, courseId: string, maxHours: number, scheduledHours: number, isActive: boolean, jobShiftType: string, createdAt: string, updatedAt: string } | null>}
   * @throws {Error} Si el ID del teacher no es válido.
   */
  async updateTeacher({ userId, courseId, maxHours, scheduledHours, isActive, jobShiftType }) {
    if (!userId) throw new Error("ID inválido");
    const now = new Date().toISOString();
    return request("put", `/teachers/${userId}`, { userId, courseId, maxHours, scheduledHours, isActive, jobShiftType, updatedAt: now });
  },

  /**
   * Elimina un teacher por su ID.
   * @param {string} userId - ID del teacher a eliminar.
   * @returns {Promise<boolean>}
   * @throws {Error} Si el ID no es válido.
   */
  async deleteTeacher(userId) {
    if (!userId) throw new Error("ID inválido");
    return request("delete", `/teachers/${userId}`);
  },

  async teacherJson() {
    return request("get", "/teachers/json", null);
  },

  async teacherCsv() {
    return request("get", "/teachers/csv", null);
  }


};

export default TeacherServices;