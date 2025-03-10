import { Component, Input, AfterContentInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged, map, Observable, Subscription, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CareerList } from '../../backend/models/career/career';
import { CollectionService } from '../../backend/services/collection.service';

@Component({
  selector: 'app-career-select',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './career-select.component.html',
  styleUrl: './career-select.component.scss',
  providers: [CollectionService],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class CareerSelectComponent implements AfterContentInit, AfterViewChecked {
  data$!: Observable<CareerList[]>;
  chlidForm!: FormGroup;
  susc!: Subscription;

  @Input() isDisabled: boolean = false;
  @Input() showOptionAll: boolean = false;
  @Input() name: string = '';

  constructor(
    private service: CollectionService<CareerList>,
    public parentForm: FormGroupDirective
  ) {
    this.service.init('careers');
  }

  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name, new FormControl({value: '', disabled: this.isDisabled}));
    this.disableInput(true);
  }

  ngAfterViewChecked() {
    this.susc = this.chlidForm.controls['universityId'].valueChanges
    .pipe(
      tap(() => this.disableInput(true)),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((value: string) => {
      if (value) {
        this.data$ = this.service.getAll().pipe(
          map((res: CareerList[]) => {
            return _.filter(res, (c: CareerList) => c.universityId == value)
          })
        );
        this.disableInput(false)
      }
    });
  }

  get ctrl(): FormControl {
    return this.chlidForm.controls[this.name] as FormControl;
  }

  disableInput(value: boolean): void {
    value ? this.ctrl.disable() : this.ctrl.enable();
  }

  ngOnDestroy() {
    this.susc.unsubscribe();
  }
}
