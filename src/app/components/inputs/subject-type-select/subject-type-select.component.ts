import { Component, AfterContentInit, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SubjectTypeOption, SUBJECT_TYPE_OPTIONS } from '../../../api/models/subject/subject-type';

@Component({
  selector: 'app-subject-type-select',
  templateUrl: './subject-type-select.component.html',
  styleUrls: ['./subject-type-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class SubjectTypeSelectComponent implements AfterContentInit { 
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  childForm!: FormGroup;
  
  data: SubjectTypeOption[] = SUBJECT_TYPE_OPTIONS;
  
  selected: SubjectTypeOption | null = null;

  get control() {
    return this.childForm.controls[this.name()];
  }

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));
    setTimeout(() => {
      const entity = _.find(this.data, (c) => c.id === this.control.value) ?? this.data[0];
      this.selectOption(entity);
    }, 500);
  }

  selectOption(option: SubjectTypeOption | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  disableInput() {
    return this.isDisabled();
  }
}
