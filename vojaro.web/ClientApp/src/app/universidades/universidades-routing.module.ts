import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'administrar', pathMatch: 'full' },
  {
    path: 'administrar',
    data: { breadcrumb: 'Administrar' },
    loadChildren: () => import('./administrar/universidades-administrar.module').then(m => m.UniversidadesAdministrarModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(
    routes
  )],
  exports: [RouterModule],
  providers: []
})
export class UniversidadesRoutingModule { }
