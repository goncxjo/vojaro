import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CarrerasRoutingModule } from './carreras-routing.module';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarrerasRoutingModule,
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})

export class CarrerasModule { }
