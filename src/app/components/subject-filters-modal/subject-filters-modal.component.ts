import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubjectFilterComponent } from '../subject-filters/subject-filters.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subject-filters-modal',
  imports: [ReactiveFormsModule, SubjectFilterComponent],
  templateUrl: './subject-filters-modal.component.html',
  styleUrl: './subject-filters-modal.component.scss'
})
export class SubjectFiltersModalComponent implements OnInit {
  @ViewChild('subjectFilters') filters!: SubjectFilterComponent;
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

  sendFilters() {
    this.activeModal.close(this.filters?.childForm?.getRawValue() ?? {})
  }
}
