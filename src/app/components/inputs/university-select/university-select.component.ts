import { Component, AfterContentInit, input, inject } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription, tap } from 'rxjs';
import { UniversityList } from '../../../backend/models/university/university';
import { CollectionService } from '../../../backend/services/collection.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-university-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
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
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  chlidForm!: FormGroup;
  
  data: UniversityList[] = [];
  selected: UniversityList | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.chlidForm.controls[this.name()];
  }

  private service = inject(CollectionService<UniversityList>);

  constructor(
    public parentForm: FormGroupDirective
  ) {
    this.service.init('universities');
  }

  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.service.getAll().pipe(
      tap(() => this.isLoading = true)
    ).subscribe((res) => {
      this.data = res;
      const entity = _.find(this.data, (c) => c.id === this.control.value) ?? null;
      this.selectOption(entity);
      this.isLoading = false;
    })
  }

  selectDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  selectOption(option: UniversityList | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
