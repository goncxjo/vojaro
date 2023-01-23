import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'} },
  {
    path: 'admin',
    data: { breadcrumb: 'Administración' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
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
