import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { UniversitySelectComponent } from '../university-select/university-select.component';
import { CareerSelectComponent } from '../career-select/career-select.component';

@Component({
  selector: 'app-subject-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UniversitySelectComponent,
    CareerSelectComponent
  ],
  templateUrl: './subject-filters.component.html',
  styleUrl: './subject-filters.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SubjectFilterComponent {
  childForm!: FormGroup<any>;
  @Input() isDisabled: boolean = false;
  
  constructor(
    public parentForm: FormGroupDirective,
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl('universityId', new FormControl({ value: '', disabled: this.isDisabled }));
    this.childForm.addControl('careerId', new FormControl({ value: '', disabled: this.isDisabled }));
  }
}
