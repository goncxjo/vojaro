import { Component } from '@angular/core';
import { GraphControllerService } from './graph-controller.service';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-plan-viewer',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './plan-viewer.component.html',
  styleUrl: './plan-viewer.component.scss',
  providers: [GraphControllerService]
})
export class PlanViewerComponent {
}
