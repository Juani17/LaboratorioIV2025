import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3002/api/backlog";
const TASKS_URL = "http://localhost:3002/api/tasks";

// 🔹 Obtener tareas del backlog
export const getBackLogsController = async (): Promise<ITarea[] | undefined> => {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    return response.data.tareas;
  } catch (error) {
    console.log("Problemas en getBackLogsController", error);
  }
};

// 🔹 Obtener tarea por ID (opcional si ya las tenés todas)
export const getBackLogByIdController = async (id: string): Promise<ITarea | null> => {
  try {
    const tareas = await getBackLogsController();
    if (tareas) {
      const tarea = tareas.find((t) => t.id === id);
      return tarea || null;
    }
    return null;
  } catch (error) {
    console.error(`Error al traer backlog ${id}:`, error);
    return null;
  }
};

// 🔹 Crear nueva tarea y agregarla al backlog
export const createBackLogController = async (nuevaTarea: ITarea): Promise<ITarea | undefined> => {
  try {
    // 1. Crear la tarea
    const { data: tareaCreada } = await axios.post(TASKS_URL, nuevaTarea);

    // 2. Agregarla al backlog
    await axios.put(`${API_URL}/add-task/${tareaCreada.id}`);

    return tareaCreada;
  } catch (error) {
    console.error("Error al crear y agregar tarea al backlog:", error);
  }
};

// 🔹 Actualizar una tarea
export const updateBackLogController = async (tareaActualizada: ITarea): Promise<ITarea | undefined> => {
  try {
    const { data } = await axios.put(`${TASKS_URL}/${tareaActualizada.id}`, tareaActualizada);
    return data;
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
  }
};

// 🔹 Eliminar tarea 
export const deleteBackLogController = async (id: string) => {
  try {
    await axios.delete(`${TASKS_URL}/${id}`);
  
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
};

// 🔹 Reemplazar toda la lista de tareas del backlog
export const putBackLogList = async (tareas: ITarea[]): Promise<void> => {
  try {
    const tareasIds = tareas.map(t => t.id);
    await axios.put(API_URL, { tareas: tareasIds });
  } catch (error) {
    console.error("Error al reemplazar tareas del backlog:", error);
  }
};
