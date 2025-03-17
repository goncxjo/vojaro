import { Component, AfterContentInit, input, inject } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { distinctUntilChanged, map, Subscription, switchMap, tap } from 'rxjs';
import { CareerList } from '../../backend/models/career/career';
import { CollectionService } from '../../backend/services/collection.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-career-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
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
export class CareerSelectComponent implements AfterContentInit {
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  chlidForm!: FormGroup;
  
  data: CareerList[] = [];
  selected: CareerList | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.chlidForm.controls[this.name()];
  }

  get university() {
    return this.chlidForm.controls['universityId'];
  }

  private service = inject(CollectionService<CareerList>);

  constructor(
    public parentForm: FormGroupDirective
  ) {
    this.service.init('careers');
  }

  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.university.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((value: string) => this.service.getAll().pipe(
      map((res: CareerList[]) => {
        return _.filter(res, (c: CareerList) => c.universityId == value)
      }),
      tap((res) => {
        this.data = res;
        const career = _.find(this.data, (c) => c.id === this.control.value) ?? null;
        this.selectOption(career);
        this.isLoading = false
      })))
    )
    .subscribe()
  }

  selectDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  selectOption(option: CareerList | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
