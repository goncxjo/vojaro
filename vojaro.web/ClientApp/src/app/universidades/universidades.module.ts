import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversidadesRoutingModule } from './universidades-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SedesUniversidadesComponent } from './sedes/sedes.component';
import { DepartamentosUniversidadesComponent } from './departamentos/departamentos.component';
import { DepartamentosUniversidadesEditComponent } from './departamentos/edit/departamentos-edit.component';
import { SedesUniversidadesEditComponent } from './sedes/edit/sedes-edit.component';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  SedesUniversidadesComponent,
  DepartamentosUniversidadesComponent,
  DepartamentosUniversidadesEditComponent,
  SedesUniversidadesEditComponent
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UniversidadesRoutingModule,
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})
export class UniversidadesModule { }
