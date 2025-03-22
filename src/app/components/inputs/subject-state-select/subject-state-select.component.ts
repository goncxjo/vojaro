import { Component, AfterContentInit, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { SubjectStateOption, SUBJECT_STATE_OPTIONS } from '../../../api/models/subject/subject-state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subject-state-select',
  templateUrl: './subject-state-select.component.html',
  styleUrls: ['./subject-state-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class SubjectStateSelectComponent implements AfterContentInit { 
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  childForm!: FormGroup;
  
  data: SubjectStateOption[] = SUBJECT_STATE_OPTIONS;
  selected: SubjectStateOption | null = null;

  get control() {
    return this.childForm.controls[this.name()];
  }

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));
  }

  selectOption(option: SubjectStateOption | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }
}
