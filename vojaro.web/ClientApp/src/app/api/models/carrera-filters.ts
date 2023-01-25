import { Departamento } from "./departamento";
import { Universidad } from "./universidad";

export class CarreraFilters {
  id: number | null = null;
  nombre: string | null = null;
  
  universidad: Universidad | null = null;
  departamento: Departamento | null = null;
  
  universidadId: string | null = null;
  departamentoId: string | null = null;
}
  