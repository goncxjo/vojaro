import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import _ from 'lodash';
import { Item } from '../../../api/models/item.type';

@Component({
  selector: 'app-subject-elective-select-modal',
  imports: [ToastrModule, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './subject-elective-select-modal.component.html',
  styleUrl: './subject-elective-select-modal.component.scss'
})
export class SubjectElectiveSelectModalComponent {
  form!: FormGroup;

  selected: Item | null = null;
  data: Item[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      subject: ''
    });
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  ngAfterViewInit() {
    if (this.selected) { 
      this.form.patchValue(this.selected);
      this.form.controls['subject'].patchValue(this.selected)
    }
  }

  selectOption(option: Item | null) {
    const op = _.find(this.data, (c) => c.id === option?.id && option['type'] == 'elective') ?? null;
    this.selected = op;
    this.form.controls['subject'].patchValue(this.selected?.id); 
  }
}
