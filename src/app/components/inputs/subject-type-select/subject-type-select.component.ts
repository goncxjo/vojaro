import { Component, AfterContentInit, input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Item } from '../../../api/models/item.type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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
  
  chlidForm!: FormGroup;
  
  data: Item[] = [
      { id: '', name: 'Normal' },
      { id: 'cross-disciplinary', name: 'Interdisciplinaria' },
      { id: 'elective', name: 'Electiva' },
      { id: 'placeholder', name: 'Espacio para electiva' },
      { id: 'final', name: 'Final' }
  ]; 
  selected: Item | null = null;

  get control() {
    return this.chlidForm.controls[this.name()];
  }

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));
    setTimeout(() => {
      const entity = _.find(this.data, (c) => c.id === this.control.value) ?? this.data[0];
      this.selectOption(entity);
    }, 500);
  }

  selectOption(option: Item | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  disableInput() {
    return this.isDisabled();
  }
}
