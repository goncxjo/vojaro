import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasEditComponent } from './carreras/carreras-edit/carreras-edit.component';
import { CarrerasListComponent } from './carreras/carreras-list/carreras-list.component';
import { CreateResolver as CreateUniversidadResolver } from './universidades/administrar/create.resolver';
import { GetByIdResolver as GetByIdUniversidadResolver } from './universidades/administrar/get-by-id.resolver';
import { CreateResolver as CreateCarreraResolver } from './carreras/create.resolver';
import { GetByIdResolver as GetByIdCarreraResolver } from './carreras/get-by-id.resolver';
import { UniversidadesEditComponent } from './universidades/administrar/universidades-edit/universidades-edit.component';
import { UniversidadesListComponent } from './universidades/administrar/universidades-list/universidades-list.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
      path: '',
      component: AdminComponent,
      data: {
        title: "Administración",
      }
  },
  {
    path: 'universidades',
    data: {
      title: 'Universidades',
      breadcrumb: 'Universidades',
    },
    children: [
      {
        path: '',
        component: UniversidadesListComponent,
      },
      {
        path: 'crear',
        component: UniversidadesEditComponent,
        data: {
          title: 'Crear universidad',
          breadcrumb: 'Crear',
        },
        resolve: {
           entity: CreateUniversidadResolver
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
          entity: GetByIdUniversidadResolver
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
          entity: GetByIdUniversidadResolver
        }
      },
    ]
  },
  {
    path: 'carreras',
    data: {
      title: 'Carreras',
      breadcrumb: 'Carreras',
    },
    children: [
      {
        path: '',
        component: CarrerasListComponent,
      },
      {
        path: 'crear',
        component: CarrerasEditComponent,
        data: {
          title: 'Crear carrera',
          breadcrumb: 'Crear',
        },
        resolve: {
           entity: CreateCarreraResolver
        }
      },
      {
        path: ':id',
        component: CarrerasEditComponent,
        data: {
          title: 'Ver carrera',
          breadcrumb: 'Ver',
          readonly: true,
        },
        resolve: {
          entity: GetByIdCarreraResolver
        }
      },
      {
        path: ':id/editar',
        component: CarrerasEditComponent,
        data: {
          title: 'Editar carrera',
          breadcrumb: 'Editar',
          readonly: false,
        },
        resolve: {
          entity: GetByIdCarreraResolver
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule],
  providers: [
    CreateUniversidadResolver,
    GetByIdUniversidadResolver,
    CreateCarreraResolver,
    GetByIdCarreraResolver,
  ]
})
export class AdminRoutingModule { }
