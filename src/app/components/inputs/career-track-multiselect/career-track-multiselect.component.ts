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
  selector: 'app-career-track-multiselect',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgbDropdownModule],
  templateUrl: './career-track-multiselect.component.html',
  styleUrl: './career-track-multiselect.component.scss',
  providers: [CollectionService],
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
  
  chlidForm!: FormGroup;
  
  data: CareerTrack[] = [];
  selected: CareerTrack[] = [];

  sub!: Subscription;

  isLoading: boolean = false;
  loadIcon = faSpinner;
  
  get control() {
    return this.chlidForm.controls[this.name()];
  }

  get career() {
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
    this.chlidForm.addControl(this.name(), new FormControl({value: [], disabled: this.isDisabled()}));

    this.sub = this.career.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((value: string) => this.service.getAll().pipe(
      map((res: CareerTrack[]) => {
        return _.filter(res, (c: CareerTrack) => c.careerId == value)
      })))
    )
    .subscribe((res) => {
      this.data = res;
      _.forEach(this.control.value, (id) => {
        const track = _.find(this.data, (d) => d.id === id) ?? null;
        this.toggleOption(track);
      })
      this.isLoading = false
    })
  }

  inputDisabled(){
    return this.isDisabled() || this.isLoading;
  };

  optionSelected(item: CareerTrack) {
    return this.selected.includes(item);
  }

  toggleOption(option: CareerTrack | null) {
    if(option) {
      if(!this.optionSelected(option)) {
        this.selected.push(option);
      } else {
        _.remove(this.selected, (s) => s.id == option.id);
      }
    }
    
    this.control.patchValue(_.map(this.selected, 'id'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
