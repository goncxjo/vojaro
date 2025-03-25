import { Component, inject, OnInit } from '@angular/core';
import { GraphControllerService } from '../plan-graph-view/graph-controller.service';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubjectStore } from '../../core/stores/subject.store';
import { ModalService } from '../../core/services/modal.service';
import { ConfirmComponent } from '../modals/confirm/confirm.component';

@Component({
  selector: 'app-plan-viewer',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './plan-viewer.component.html',
  styleUrl: './plan-viewer.component.scss',
  providers: []
})
export class PlanViewerComponent implements OnInit {

  subjectStore = inject(SubjectStore);
  modalService = inject(ModalService);

  ngOnInit() {
    this.subjectStore.loadSubjects();
  }

  openModal() {
    this.modalService.open(ConfirmComponent, { title: 'Confirm', message: 'Are you sure you want to delete this subject?' });
  }
}
