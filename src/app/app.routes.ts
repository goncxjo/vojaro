import { Routes } from '@angular/router';
import { NetworkComponent } from './components/network/network.component';

export const routes: Routes = [
    {
      path: '',
      component: NetworkComponent,
    },  
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    },
];

