import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from '../../backend/services/subject.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subject } from '../../backend/models/subject/subject';
import { UniversitySelectComponent } from '../university-select/university-select.component';
import { CareerSelectComponent } from '../career-select/career-select.component';
import { CareerTrackMultiSelectComponent } from '../career-track-multiselect/career-track-multiselect.component';

@Component({
  selector: 'app-subject-edit-modal',
  imports: [
    ToastrModule,
    ReactiveFormsModule,
    UniversitySelectComponent,
    CareerSelectComponent,
    CareerTrackMultiSelectComponent
  ],
  templateUrl: './subject-edit-modal.component.html',
  styleUrl: './subject-edit-modal.component.scss'
})
export class SubjectEditModalComponent {
  form!: FormGroup;
  subject!: Subject;
  readonly: boolean = false;
  title: string = 'Editar';

  constructor(
    private service: SubjectService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService

  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      year: [1, Validators.required],
      quarter: [1, Validators.required],
      mustApproved: [],
      mustRegularize: [],
      careerTracks: [],
    });
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  ngAfterViewInit() {
    this.form.controls['universityId'].addValidators(Validators.required); 
    this.form.controls['careerId'].addValidators(Validators.required);
    this.form.patchValue(this.subject);

    if (this.readonly) {
      this.form.disable()
    }
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
      const entity: Subject = {
        id: form.id,
        name: form.name,
        universityId: form.universityId,
        careerId: form.careerId,
        year: form.year,
        quarter: form.quarter,
        mustApproved: form.mustApproved,
        mustRegularize: form.mustRegularize,
        careerTracks: form.careerTracks
      };

      if (entity.id) {
        this.service.update(entity).then(onSuccess, onError);
      } else {
        this.service.create(entity).then(onSuccess, onError);
      }
    } catch (error) {
      this.toastr.error('Ha ocurrido un problema', 'Error');
    }
  }
}
