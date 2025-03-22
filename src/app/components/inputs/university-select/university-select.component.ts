import { Component, AfterContentInit, input, inject } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { finalize, Subscription, tap } from 'rxjs';
import { University } from '../../../api/models/university/university';
import { UniversityService } from '../../../api/services/university.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-university-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './university-select.component.html',
  styleUrl: './university-select.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class UniversitySelectComponent implements AfterContentInit {
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  childForm!: FormGroup;
  
  data: University[] = [];
  selected: University | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.childForm.controls[this.name()];
  }

  private service = inject(UniversityService);

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.service.getAll().pipe(
      tap(() => this.isLoading = true),
      finalize(() => this.isLoading = false)
    ).subscribe((res: University[]) => {
      this.data = res;
      const entity = _.find(this.data, (c) => c.id === this.control.value) ?? null;
      this.selectOption(entity);
    })
  }

  selectDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  selectOption(option: University | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
