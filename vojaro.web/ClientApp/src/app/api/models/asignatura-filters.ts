import { Carrera } from "./carrera";
import { CarreraOrientacion } from "./carrera-orientacion";
import { Departamento } from "./departamento";
import { Universidad } from "./universidad";

export class AsignaturaFilters {
	id: number | null = null;
	nombre: string | null = null;
	anio: number | null = null;
	cuatrimestre: number | null = null;
	
	universidad: Universidad | null = null;
	departamento: Departamento | null = null;
	carrera: Carrera | null = null;
	carreraOrientacion: CarreraOrientacion | null = null;
	
	universidadId: string | null = null;
	departamentoId: string | null = null;
	carreraId: string | null = null;
	carreraOrientacionId: string | null = null;
  }
	