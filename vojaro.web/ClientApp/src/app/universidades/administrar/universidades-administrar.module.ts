import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversidadesListComponent } from './universidades-list/universidades-list.component';
import { UniversidadesEditComponent } from './universidades-edit/universidades-edit.component';
import { UniversidadesFilterComponent } from './universidades-filter/universidades-filter.component';
import { SharedModule } from 'src/app/shared';
import { UniversidadesAdministrarRoutingModule } from './universidades-administrar-routing.module';
import { UniversidadesModule } from '../universidades.module';


const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  UniversidadesListComponent,
  UniversidadesEditComponent,
  UniversidadesFilterComponent,
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UniversidadesAdministrarRoutingModule,
    UniversidadesModule,
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})
export class UniversidadesAdministrarModule { }
