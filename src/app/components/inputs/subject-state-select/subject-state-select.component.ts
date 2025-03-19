import { Component, AfterContentInit, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Item } from '../../../api/models/item.type';
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
  
  chlidForm!: FormGroup;
  
  data: Item[] = [
      { id: '', name: '(Ninguna)' },
      { id: 'approved', name: 'Aprobada' },
      { id: 'regularized', name: 'Regularizada' },
      { id: 'in-progress', name: 'Cursando' }
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
  }

  selectOption(option: Item | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }
}
