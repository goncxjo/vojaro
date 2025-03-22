import { Component, AfterContentInit, inject, input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';
import { CareerTrack } from '../../../api/models/career-track/career-track';
import { CareerTrackService } from '../../../api/services/career-track.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-career-track-multiselect',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './career-track-multiselect.component.html',
  styleUrl: './career-track-multiselect.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ]
})
export class CareerTrackMultiSelectComponent implements AfterContentInit {
  name = input<string>('');
  isDisabled = input<boolean>(false);
  
  childForm!: FormGroup;
  
  data: CareerTrack[] = [];
  selected: CareerTrack[] = [];

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
    this.childForm.addControl(this.name(), new FormControl({value: [], disabled: this.isDisabled()}));

    this.sub = this.career.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.data = [];
        this.selected = [];
        this.control.patchValue([]);
      }),
      switchMap((careerId: string) => 
        careerId ? this.service.getByCareer(careerId) : of([])
      )
    ).subscribe((tracks) => {
      this.data = tracks;
      const selectedIds = this.control.value || [];
      this.selected = tracks.filter((track) => selectedIds.includes(track.id));
      this.isLoading = false;
    });
  }

  inputDisabled() {
    return this.isDisabled() || this.isLoading;
  }

  optionSelected(item: CareerTrack) {
    return this.selected.includes(item);
  }

  toggleOption(option: CareerTrack | null) {
    if (!option) return;

    if (this.optionSelected(option)) {
      this.selected = this.selected.filter((s) => s.id !== option.id);
    } else {
      this.selected.push(option);
    }
    
    this.control.patchValue(this.selected.map(s => s.id));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
