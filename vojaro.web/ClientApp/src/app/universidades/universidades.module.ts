import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversidadesRoutingModule } from './universidades-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SedesUniversitariasComponent } from './sedes/sedes.component';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  SedesUniversitariasComponent,
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
