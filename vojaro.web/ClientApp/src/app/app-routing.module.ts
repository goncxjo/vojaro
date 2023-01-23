import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'} },
  {
    path: 'universidades',
    data: { breadcrumb: 'Universidades' },
    loadChildren: () => import('./universidades/universidades.module').then(m => m.UniversidadesModule),
  },
  {
    path: 'carreras',
    data: { breadcrumb: 'Carreras' },
    loadChildren: () => import('./carreras/carreras.module').then(m => m.CarrerasModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: false, enableTracing: false }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
