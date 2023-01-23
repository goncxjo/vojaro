import { Departamento } from "./departamento";
import { Universidad } from "./universidad";

export interface Carrera {
   id: number;
   nombre: string;
   universidad?: Universidad | null;
   departamento?: Departamento | null;
  }
