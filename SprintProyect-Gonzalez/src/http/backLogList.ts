import axios from "axios";
import { IBackLogList } from "../types/IBackLogList";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3002/api/backlog";
// Esta función actualiza la lista completa de sprints
export const putBackLogList = async (tareas: ITarea[]): Promise<IBackLogList | undefined> => {
  try {

    const ids = tareas.map((t) => t.id); // Obtener los IDs de las tareas
    const response = await axios.put<IBackLogList>(API_URL, {
      tareas: ids,
    });
    return response.data;
  } catch (error) {
    console.error("Error al modificar base de datos:", error);
    return undefined;
  }
};