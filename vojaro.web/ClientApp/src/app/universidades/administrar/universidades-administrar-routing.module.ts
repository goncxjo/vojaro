import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversidadesEditComponent } from './universidades-edit/universidades-edit.component';
import { GetByIdResolver } from './get-by-id.resolver';
import { UniversidadesListComponent } from './universidades-list/universidades-list.component';

const routes: Routes = [
  {
    path: '',
    component: UniversidadesListComponent,
    data: {
      title: 'Administrar',
      breadcrumb: 'Administrar',
    }
  },
  {
    path: 'create',
    component: UniversidadesEditComponent,
    data: {
      title: 'Crear agenda',
      breadcrumb: 'Crear',
    },
    resolve: {
      //  entity: CreateResolver
    }
  },
  {
    path: ':id',
    component: UniversidadesEditComponent,
    data: {
      title: 'Ver agenda',
      breadcrumb: 'Ver',
      readonly: true,
    },
    resolve: {
      entity: GetByIdResolver
    }
  },
  {
    path: ':id/edit',
    component: UniversidadesEditComponent,
    data: {
      title: 'Editar agenda',
      breadcrumb: 'Editar',
      readonly: false,
    },
    resolve: {
      entity: GetByIdResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule],
  providers: [
  //  CreateResolver,
   GetByIdResolver,
  ]
})
export class UniversidadesAdministrarRoutingModule { }
