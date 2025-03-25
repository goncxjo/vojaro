import { Component, inject } from '@angular/core';
import { SubjectStore } from '../../core/stores/subject.store';

@Component({
  selector: 'app-plan-grid-view',
  imports: [],
  templateUrl: './plan-grid-view.component.html',
  styleUrl: './plan-grid-view.component.scss'
})
export class PlanGridViewComponent {
  subjectStore = inject(SubjectStore);
}
