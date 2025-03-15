import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from '../../backend/services/subject.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subject } from '../../backend/models/subject/subject';

@Component({
  selector: 'app-subject-to-subject-modal',
  imports: [ToastrModule],
  templateUrl: './subject-to-subject-modal.component.html',
  styleUrl: './subject-to-subject-modal.component.scss'
})
export class SubjectToSubjectModalComponent {
  subject_A!: Subject;
  subject_B!: Subject;

  constructor(
    private service: SubjectService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService

  ) { }

  save(mustRegularize: boolean, mustAproved: boolean) {
    const onSuccess = () => {
      this.toastr.success('El registro fue guardado.', 'Guardar');
      this.activeModal.close({ id: this.subject_B });
    }
  
    const onError = (err: Error) => {
      console.log(err);
      this.toastr.error('Ha ocurrido un error', 'Error');
    }

    debugger;

    try {
      if (!this.subject_B.mustRegularize) {
        this.subject_B.mustRegularize = [];
      }
      if (!this.subject_B.mustApproved) {
        this.subject_B.mustApproved = [];
      }
  
      if (mustRegularize) {
        this.subject_B.mustRegularize.push(this.subject_A.id)
      }
      if (mustAproved) {
        this.subject_B.mustApproved.push(this.subject_A.id)
      }
      this.service.update(this.subject_B).then(onSuccess, onError);
    } catch (error) {
      this.toastr.error('Ha ocurrido un problema', 'Error');
    }
  }
}