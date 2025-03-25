import api from "./api";
const token = localStorage.getItem("token");

const ClassesServices = {
  /**
   * Obtiene la lista de classes.
   * @returns {Promise<Array<{ id: number, name: string, color: string }>> | null}
   */
  async getClasses() {
    try {
      console.log("Obteniendo las classes...");
      console.log({ token });
      const response = await api.get("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al obtener las classes", e.message, e);
      return null;
    }
  },


  /**
   * Obtiene una classe por su ID.
   * @param {number} id - ID de la classe a obtener.
   * @returns {Promise<Object | null>}
   */
  async getClassById(id) {
    try {
      const response = await api.get(`/classes/${id}`);
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al obtener la clase", e.message, e);
      return null;
    }
  },

  /**
   * Crea una nueva clase.
   * @param {Object} newClass - Datos de la clase a crear.
   * @param {string} newClass.name - Nombre de la clase.
   * @param {number} newClass.idSede - ID de la sede de la clase.
   * @param {number} newClass.areaId - ID del area de la clase.
   * @param {number} newClass.shiftId - ID del turno de la clase.
   * @param {numbre} newClass.capacity - Capacidad de la clase.
   * @param {string} newClass.urlMeet - URL de la clase.
   * @param {number} newClass.monitorId - ID del monitor de la clase.
   */
  async createClass({ name, idSede, areaId, shiftId, capacity, urlMeet, monitorId }) {
    try {
      console.log({ name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
      const response = await api.post('/classes', { name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al crear la clase", e.message, e);
      return null;
    }
  },

  /**
   * Actualiza una clase existente.
   * @param {Object} classData - Datos de la clase a actualizar.
   * @param {number} classData.id - ID de la clase a actualizar.
   * @param {string} classData.name - Nombre de la clase.
   * @param {number} classData.idSede - ID de la sede de la clase.
   * @param {number} classData.areaId - ID del area de la clase.
   * @param {number} classData.shiftId - ID del turno de la clase.
   * @param {numbre} classData.capacity - Capacidad de la clase.
   * @param {string} classData.urlMeet - URL de la clase.
   * @param {number} classData.monitorId - ID del monitor de la clase.
   */
  async updateClass({ id, name, idSede, areaId, shiftId, capacity, urlMeet, monitorId }) {
    try {
      console.log({ id, name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
      const response = await api.put(`/classes/${id}`, { name, idSede, areaId, shiftId, capacity, urlMeet, monitorId });
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al actualizar la clase", e.message, e);
      return null;
    }
  },

  /**
   * Elimina una clase por su ID.
   * @param {number} id - ID de la clase a eliminar.
   */
  async deleteClass(id) {
    try {
      const response = await api.delete(`/classes/${id}`);
      const data = response.data;
      console.log({ data });

      return data;
    } catch (e) {
      console.error("Error al eliminar la clase", e.message, e);
      return null;
    }
  },

};

export default ClassesServices;