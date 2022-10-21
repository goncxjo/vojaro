import { Universidad } from "./universidad";

export interface Carrera {
   id: number;
   nombre: string;
   universidad?: Universidad | null;
   duracion: number;
   nivel: any;
  }
