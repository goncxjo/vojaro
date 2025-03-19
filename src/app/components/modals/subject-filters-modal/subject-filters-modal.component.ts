import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubjectFilterComponent } from '../../subject-filters/subject-filters.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectFilters } from '../../../api/models/subject/subject';

@Component({
  selector: 'app-subject-filters-modal',
  imports: [ReactiveFormsModule, SubjectFilterComponent],
  templateUrl: './subject-filters-modal.component.html',
  styleUrl: './subject-filters-modal.component.scss'
})
export class SubjectFiltersModalComponent implements OnInit, AfterViewInit {
  filters!: Partial<SubjectFilters>;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({});
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.filters) {
        this.form.setValue(this.filters);
      }
    }, 500);
  }

  get disableSubmit(): boolean {
    return !this.form.get('careerId')?.value;
  }

  submit() {
    this.activeModal.close(this.form.getRawValue())
  }
}
