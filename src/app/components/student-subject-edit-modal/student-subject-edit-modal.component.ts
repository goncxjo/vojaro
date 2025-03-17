import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UniversitySelectComponent } from '../university-select/university-select.component';
import { CareerSelectComponent } from '../career-select/career-select.component';
import { SubjectStateSelectComponent } from '../subject-state-select/subject-state-select.component';
import { UserService } from '../../core/services/user.service';
import { StudentSubject } from '../../backend/models/subject/subject-subject';
import { StudentSubjectService } from '../../backend/services/student-subject.service';
import _ from 'lodash';
import { Subject } from '../../backend/models/subject/subject';

@Component({
  selector: 'app-student-subject-edit-modal',
  imports: [ToastrModule, ReactiveFormsModule, UniversitySelectComponent, CareerSelectComponent, SubjectStateSelectComponent],
  templateUrl: './student-subject-edit-modal.component.html',
  styleUrl: './student-subject-edit-modal.component.scss'
})
export class StudentSubjectEditModalComponent {
  form!: FormGroup;

  subject!: Subject;
  entity!: StudentSubject;

  constructor(
    private service: StudentSubjectService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private userService: UserService

  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: '',
      name: [{ value: '' }],
      userId: [{ value: this.userService.getUserId() }, Validators.required],
      approved: [{ value: [] }],
      regularized: [{ value: [] }],
      inProgress: [{ value: [] }],
    });
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  ngAfterViewInit() {
    this.form.patchValue(this.entity);
    this.form.controls['name'].patchValue(this.subject.name)
    
    if (this.entity.approved && this.entity.approved.includes(this.subject.id)) {
      this.form.controls['status'].setValue('approved')
    }
    else if (this.entity.regularized && this.entity.regularized.includes(this.subject.id)) {
      this.form.controls['status'].setValue('regularized')
    }
    else if (this.entity.inProgress && this.entity.inProgress.includes(this.subject.id)) {
      this.form.controls['status'].setValue('in-progress')
    }
    
    this.form.controls['universityId'].addValidators(Validators.required); 
    this.form.controls['careerId'].addValidators(Validators.required);
    this.form.controls['universityId'].disable();
    this.form.controls['careerId'].disable();
    this.form.controls['name'].disable();
  }

  save() {
    const onSuccess = () => {
      this.toastr.success('El registro fue guardado.', 'Guardar');
      this.activeModal.close(this.form.getRawValue())
    }
  
    const onError = (err: Error) => {
      console.log(err);
      this.toastr.error('Ha ocurrido un error', 'Error');
    }

    if (this.form.invalid) {
      this.toastr.error('Por favor, completa los campos requeridos.', 'Error');
      return;
    }

    try {
      const form = this.form.getRawValue();

      if (form.status === 'approved') {
        form.approved.push(this.subject.id);
        _.remove(form.regularized, (s: string) => s === this.subject.id);
        _.remove(form.inProgress, (s: string) => s === this.subject.id);
      }
      else if (form.status === 'regularized') {
        form.regularized.push(this.subject.id)
        _.remove(form.approved, (s: string) => s === this.subject.id);
        _.remove(form.inProgress, (s: string) => s === this.subject.id);
      }
      else if (form.status === 'in-progress') {
        form.inProgress.push(this.subject.id);
        _.remove(form.approved, (s: string) => s === this.subject.id);
        _.remove(form.regularized, (s: string) => s === this.subject.id);
      }

      const entity: StudentSubject = {
        id: form.id,
        userId: form.userId,
        universityId: form.universityId,
        careerId: form.careerId,
        approved: form.approved,
        regularized: form.regularized,
        inProgress: form.inProgress 
      };

      if (entity.id) {
        this.service.update(entity).then(onSuccess, onError);
      } else {
        return;
      }
    } catch (error) {
      this.toastr.error('Ha ocurrido un problema', 'Error');
    }
  }
}
