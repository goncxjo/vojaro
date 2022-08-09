import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateResolver } from './create.resolver';
import { GetByIdResolver } from './get-by-id.resolver';
import { UniversidadesEditComponent } from './universidades-edit/universidades-edit.component';
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
    path: 'crear',
    component: UniversidadesEditComponent,
    data: {
      title: 'Crear universidad',
      breadcrumb: 'Crear',
    },
    resolve: {
       entity: CreateResolver
    }
  },
  {
    path: ':id',
    component: UniversidadesEditComponent,
    data: {
      title: 'Ver universidad',
      breadcrumb: 'Ver',
      readonly: true,
    },
    resolve: {
      entity: GetByIdResolver
    }
  },
  {
    path: ':id/editar',
    component: UniversidadesEditComponent,
    data: {
      title: 'Editar universidad',
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
   CreateResolver,
   GetByIdResolver,
  ]
})
export class UniversidadesAdministrarRoutingModule { }
