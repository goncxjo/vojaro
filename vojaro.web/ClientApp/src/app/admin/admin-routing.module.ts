import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasEditComponent } from './carreras/carreras-edit/carreras-edit.component';
import { CarrerasListComponent } from './carreras/carreras-list/carreras-list.component';
import { CreateResolver as CreateUniversidadResolver } from './universidades/create.resolver';
import { GetByIdResolver as GetByIdUniversidadResolver } from './universidades/get-by-id.resolver';
import { CreateResolver as CreateCarreraResolver } from './carreras/create.resolver';
import { GetByIdResolver as GetByIdCarreraResolver } from './carreras/get-by-id.resolver';
import { CreateResolver as CreateAsignaturaResolver } from './asignaturas/create.resolver';
import { GetByIdResolver as GetByIdAsignaturaResolver } from './asignaturas/get-by-id.resolver';
import { UniversidadesEditComponent } from './universidades/universidades-edit/universidades-edit.component';
import { UniversidadesListComponent } from './universidades/universidades-list/universidades-list.component';
import { AdminComponent } from './admin.component';
import { AsignaturasListComponent } from './asignaturas/asignaturas-list/asignaturas-list.component';
import { AsignaturasEditComponent } from './asignaturas/asignaturas-edit/asignaturas-edit.component';


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
  {
    path: 'asignaturas',
    data: {
      title: 'Asignaturas',
      breadcrumb: 'Asignaturas',
    },
    children: [
      {
        path: '',
        component: AsignaturasListComponent,
      },
      {
        path: 'crear',
        component: AsignaturasEditComponent,
        data: {
          title: 'Crear asignatura',
          breadcrumb: 'Crear',
        },
        resolve: {
           entity: CreateAsignaturaResolver
        }
      },
      {
        path: ':id',
        component: AsignaturasEditComponent,
        data: {
          title: 'Ver asignatura',
          breadcrumb: 'Ver',
          readonly: true,
        },
        resolve: {
          entity: GetByIdAsignaturaResolver
        }
      },
      {
        path: ':id/editar',
        component: AsignaturasEditComponent,
        data: {
          title: 'Editar asignatura',
          breadcrumb: 'Editar',
          readonly: false,
        },
        resolve: {
          entity: GetByIdAsignaturaResolver
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
    CreateAsignaturaResolver,
    GetByIdAsignaturaResolver,
  ]
})
export class AdminRoutingModule { }
