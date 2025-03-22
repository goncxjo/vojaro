import { Component, AfterContentInit, inject, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';
import { Career } from '../../../api/models/career/career';
import { CareerService } from '../../../api/services/career.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-career-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './career-select.component.html',
  styleUrl: './career-select.component.scss',
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
  
  childForm!: FormGroup;
  
  data: Career[] = [];
  selected: Career | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.childForm.controls[this.name()];
  }

  get university() {
    return this.childForm.controls['universityId'];
  }

  private service = inject(CareerService);

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.university.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.data = [];
        this.selectOption(null);
      }),
      switchMap((universityId: string) => 
        universityId ? this.service.getByUniversity(universityId) : of([])
      ),
    ).subscribe((careers) => {
      this.data = careers;
      const selectedCareer = _.find(careers, (c) => c.id === this.control.value) ?? null;
      this.selectOption(selectedCareer);
      this.isLoading = false;
    });
  }

  selectDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  selectOption(option: Career | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

