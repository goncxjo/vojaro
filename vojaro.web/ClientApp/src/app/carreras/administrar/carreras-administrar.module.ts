import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasListComponent } from './carreras-list/carreras-list.component';
import { CarrerasEditComponent } from './carreras-edit/carreras-edit.component';
import { CarrerasFilterComponent } from './carreras-filter/carreras-filter.component';
import { SharedModule } from 'src/app/shared';
import { CarrerasAdministrarRoutingModule } from './carrears-administrar-routing.module';
import { CarrerasModule } from '../carreras.module';


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
export class CarrerasAdministrarModule { }
