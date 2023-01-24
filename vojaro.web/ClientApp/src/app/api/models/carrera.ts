import { Departamento } from "./departamento";
import { Universidad } from "./universidad";

export interface Carrera {
   id: number;
   nombre: string;
   universidadId: number | undefined;
   departamentoId: number | undefined;
   universidad?: Universidad | null;
   departamento?: Departamento | null;
  }
