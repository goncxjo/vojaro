import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GraphControllerService } from '../plan-viewer/graph-controller.service';
@Component({
  selector: 'app-plan-graph-view',
  imports: [],
  templateUrl: './plan-graph-view.component.html',
  styleUrl: './plan-graph-view.component.scss'
})
export class PlanGraphViewComponent {
  container = viewChild<ElementRef<HTMLDivElement>>('graph');

  graphControllerService = inject(GraphControllerService);

  ngAfterViewInit() {
    this.graphControllerService.init(this.container()!);
  }

}
