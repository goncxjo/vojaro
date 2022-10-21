import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CarrerasListComponent } from './administrar/carreras-list/carreras-list.component';
import { CarrerasEditComponent } from './administrar/carreras-edit/carreras-edit.component';
import { CarrerasFilterComponent } from './administrar/carreras-filter/carreras-filter.component';
import { CarrerasAdministrarRoutingModule } from './administrar/carrears-administrar-routing.module';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  CarrerasListComponent,
  CarrerasEditComponent,
  CarrerasFilterComponent,
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarrerasAdministrarRoutingModule,
    CarrerasModule,
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})

export class CarrerasModule { }
