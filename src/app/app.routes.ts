import { Routes } from '@angular/router';
import { PlanViewerComponent } from './components/plan-viewer/plan-viewer.component';
import { PlanGraphViewComponent } from './components/plan-graph-view/plan-graph-view.component';
import { PlanGridViewComponent } from './components/plan-grid-view/plan-grid-view.component';

export const routes: Routes = [
    {
      path: '',
      component: PlanViewerComponent,
      children: [
        {
          path: '',
          component: PlanGridViewComponent
        },    
        {
          path: 'graph',
          component: PlanGraphViewComponent
        },
        {
          path: 'grid',
          component: PlanGridViewComponent
        },
      ]
    },  
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    },
];

