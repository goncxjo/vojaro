import { Component, input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { UniversitySelectComponent } from '../university-select/university-select.component';
import { CareerSelectComponent } from '../career-select/career-select.component';
import { CareerTrackSelectComponent } from '../career-track-select/career-track-select.component';

@Component({
  selector: 'app-subject-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UniversitySelectComponent,
    CareerSelectComponent,
    CareerTrackSelectComponent,
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
  isDisabled = input<boolean>(false);
  
  constructor(
    public parentForm: FormGroupDirective,
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
  }
}
