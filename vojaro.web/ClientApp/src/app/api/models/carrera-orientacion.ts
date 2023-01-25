import { Carrera } from "./carrera";

export interface CarreraOrientacion {
   id: number;
   nombre: string;
   carrera: Carrera | null;
   carreraId: number | null;
  }
