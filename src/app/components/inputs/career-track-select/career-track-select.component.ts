import { Component, AfterContentInit, input, inject } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { distinctUntilChanged, map, Subscription, switchMap, tap } from 'rxjs';
import { CareerList } from '../../../api/models/career/career';
import { CollectionService } from '../../../api/services/collection.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CareerTrack } from '../../../api/models/career-track/career-track';

@Component({
  selector: 'app-career-track-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './career-track-select.component.html',
  styleUrl: './career-track-select.component.scss',
  providers: [CollectionService],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class CareerTrackSelectComponent implements AfterContentInit {
  name = input<string>('');
  isDisabled = input<boolean>(false);
  showOptionAll = input<boolean>(false);
  
  chlidForm!: FormGroup;
  
  data: CareerTrack[] = [];
  selected: CareerTrack | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.chlidForm.controls[this.name()];
  }

  get university() {
    return this.chlidForm.controls['careerId'];
  }

  private service = inject(CollectionService<CareerList>);

  constructor(
    public parentForm: FormGroupDirective
  ) {
    this.service.init('careerTracks');
  }

  ngAfterContentInit(): void {
    this.chlidForm = this.parentForm.form;
    this.chlidForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.university.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((value: string) => this.service.getAll().pipe(
      map((res: CareerTrack[]) => {
        return _.filter(res, (c: CareerTrack) => c.careerId == value)
      }),
      tap((res) => {
        this.data = res;
        const track = _.find(this.data, (c) => c.id === this.control.value) ?? null;
        this.selectOption(track);
        this.isLoading = false
      })))
    )
    .subscribe()
  }

  selectDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  selectOption(option: CareerTrack | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  cleanSelected() {
    this.selected = null;
  }

  hideOptionAll() {
    return !this.showOptionAll;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
