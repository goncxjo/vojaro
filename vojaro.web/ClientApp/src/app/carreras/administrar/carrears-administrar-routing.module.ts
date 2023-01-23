import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasEditComponent } from './carreras-edit/carreras-edit.component';
import { CarrerasListComponent } from './carreras-list/carreras-list.component';
import { CreateResolver } from './create.resolver';
import { GetByIdResolver } from './get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: CarrerasListComponent,
    data: {
      title: 'Administrar',
      breadcrumb: 'Administrar',
    }
  },
  {
    path: 'crear',
    component: CarrerasEditComponent,
    data: {
      title: 'Crear carrera',
      breadcrumb: 'Crear',
    },
    // resolve: {
    //    entity: CreateResolver
    // }
  },
  {
    path: ':id',
    component: CarrerasEditComponent,
    data: {
      title: 'Ver carrera',
      breadcrumb: 'Ver',
      readonly: true,
    },
    // resolve: {
    //   entity: GetByIdResolver
    // }
  },
  {
    path: ':id/editar',
    component: CarrerasEditComponent,
    data: {
      title: 'Editar carrera',
      breadcrumb: 'Editar',
      readonly: false,
    },
    // resolve: {
    //   entity: GetByIdResolver
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule],
  providers: [
   CreateResolver,
   GetByIdResolver,
  ]
})
export class CarrerasAdministrarRoutingModule { }
