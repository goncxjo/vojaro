import { Component, AfterContentInit, inject, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';
import { CareerTrack } from '../../../api/models/career-track/career-track';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CareerTrackService } from '../../../api/services/career-track.service';

@Component({
  selector: 'app-career-track-select',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './career-track-select.component.html',
  styleUrl: './career-track-select.component.scss',
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
  
  childForm!: FormGroup;
  
  data: CareerTrack[] = [];
  selected: CareerTrack | null = null;

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.childForm.controls[this.name()];
  }

  get career() {
    return this.childForm.controls['careerId'];
  }

  private service = inject(CareerTrackService);

  constructor(
    public parentForm: FormGroupDirective
  ) { }

  ngAfterContentInit(): void {
    this.childForm = this.parentForm.form;
    this.childForm.addControl(this.name(), new FormControl({value: '', disabled: this.isDisabled()}));

    this.sub = this.career.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.data = [];
        this.selectOption(null);
      }),
      switchMap((careerId: string) => 
        careerId ? this.service.getByCareer(careerId) : of([])
      )
    ).subscribe((tracks) => {
      this.data = tracks;
      const selectedTrack = _.find(tracks, (t) => t.id === this.control.value) ?? null;
      this.selectOption(selectedTrack);
      this.isLoading = false
    });
  }

  selectDisabled() {
    return this.isDisabled() || this.isLoading;
  }

  selectOption(option: CareerTrack | null) {
    this.selected = option;
    this.control.patchValue(this.selected?.id); 
  }

  hideOptionAll() {
    return !this.showOptionAll();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
