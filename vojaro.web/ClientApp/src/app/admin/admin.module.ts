import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { UniversidadesListComponent } from './universidades/administrar/universidades-list/universidades-list.component';
import { UniversidadesEditComponent } from './universidades/administrar/universidades-edit/universidades-edit.component';
import { UniversidadesFilterComponent } from './universidades/administrar/universidades-filter/universidades-filter.component';
import { CarrerasListComponent } from './carreras/carreras-list/carreras-list.component';
import { CarrerasEditComponent } from './carreras/carreras-edit/carreras-edit.component';
import { CarrerasFilterComponent } from './carreras/carreras-filter/carreras-filter.component';
import { SedesUniversidadesComponent } from './universidades/sedes/sedes.component';
import { DepartamentosUniversidadesComponent } from './universidades/departamentos/departamentos.component';
import { DepartamentosUniversidadesEditComponent } from './universidades/departamentos/edit/departamentos-edit.component';
import { SedesUniversidadesEditComponent } from './universidades/sedes/edit/sedes-edit.component';
import { AdminComponent } from './admin.component';
import { UniversidadSelectComponent } from './universidades/universidad-select/universidad-select.component';
import { DepartamentoSelectComponent } from './universidades/departamentos/departamento-select/departamento-select.component';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  UniversidadesListComponent,
  UniversidadesEditComponent,
  UniversidadesFilterComponent,

  DepartamentosUniversidadesComponent,
  DepartamentosUniversidadesEditComponent,
  SedesUniversidadesComponent,
  SedesUniversidadesEditComponent,

  CarrerasListComponent,
  CarrerasEditComponent,
  CarrerasFilterComponent,
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
    AdminComponent,
    UniversidadSelectComponent,
    DepartamentoSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})
export class AdminModule { }
