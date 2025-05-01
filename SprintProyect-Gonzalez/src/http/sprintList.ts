import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";


// Esta función obtiene la lista completa de sprints
export const getSprintList = async (): Promise<ISprintList | undefined> => {
  try {
    const response = await axios.get<ISprintList>('http://localhost:3002/api/sprints');
    return response.data; // Esto devolverá { sprints: [...] }
  } catch (error) {
    console.error("Error al obtener la lista de sprints:", error);
    return undefined;
  }
};


// Esta función actualiza la lista completa de sprints
export const putSprintList = async (sprints: ISprint[]): Promise<ISprintList | undefined> => {
  try {
    const response = await axios.put<ISprintList>('http://localhost:3002/api/sprints', {
      sprints: sprints,  // Enviamos el array de sprints dentro de 'sprints'
    });
    return response.data; // Esto devolverá el objeto con la propiedad 'sprints'
  } catch (error) {
    console.error("Error al modificar base de datos:", error);
    return undefined;
  }
};