import { AfterContentInit, AfterViewInit, Component, DoCheck, forwardRef, Injector, input, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, ControlContainer, FormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { Item } from '../../../api/models/item.type';

@Component({
  selector: 'app-subject-state-select',
  templateUrl: './subject-state-select.component.html',
  styleUrls: ['./subject-state-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class SubjectStateSelectComponent implements AfterContentInit {
  childForm!: FormGroup;
  
  readonly isDisabled = input<boolean>(false);
  // readonly showOptionAll = input<boolean>(false);
  readonly name = input<string>('');

  readonly statuses: Item[] = [
    { id: '', name: '(Ninguna)' },
    { id: 'approved', name: 'Aprobada' },
    { id: 'regularized', name: 'Regularizada' },
    { id: 'in-progress', name: 'Cursando' }
  ] 
  
  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({ value: '', disabled: this.isDisabled() }));
  }
}
