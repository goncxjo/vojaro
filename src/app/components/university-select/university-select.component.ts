import { Component, Input, AfterContentInit } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UniversityList } from '../../backend/models/university/university';
import { CollectionService } from '../../backend/services/collection.service';

@Component({
  selector: 'app-university-select',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './university-select.component.html',
  styleUrl: './university-select.component.scss',
  providers: [CollectionService],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class UniversitySelectComponent implements AfterContentInit {
  data$!: Observable<UniversityList[]>;
  chlidForm!: FormGroup;

  @Input() isDisabled: boolean = false;
  @Input() showOptionAll: boolean = false;
  @Input() name: string = '';

  constructor(
    private service: CollectionService<UniversityList>,
    public parentForm: FormGroupDirective
  ) {
    this.service.init('universities');
  }

  ngOnInit() {
    this.data$ = this.service.getAll();
  }
  
  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name, new FormControl({value: '', disabled: this.isDisabled}));
  }
}
