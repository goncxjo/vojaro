import { Carrera } from "./carrera";
import { CarreraOrientacion } from "./carrera-orientacion";
import { Universidad } from "./universidad";

export interface Asignatura {
   id: number;
   codigo: string;
   nombre: string;
   anio: number;
   cuatrimestre: number;
   cargaHoraria: number;
   creditos: number;
   esInterdisciplinaria: boolean;

   correlativas: any[] | null;
   universidad: Universidad | null;
   carrera: Carrera | null;
   carreraOrientacion: CarreraOrientacion | null;

   correlativasId: number[] | null;
   universidadId: number;
   carreraId: number;
   carreraOrientacionId: number | null;
  }
