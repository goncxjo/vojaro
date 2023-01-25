import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UniversidadFilters } from 'src/app/api';

@Component({
  selector: 'app-universidades-filter',
  templateUrl: './universidades-filter.component.html',
  styleUrls: ['./universidades-filter.component.scss']
})
export class UniversidadesFilterComponent implements OnInit {
  filterForm = this.buildForm();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.resetModel();
  }

  clearFilters() {
    this.resetModel();
  }

  get formValue() {
    return this.filterForm.value;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      parteNombreSiglas: [''],
    });
  }

  private resetModel() {
    const model = new UniversidadFilters();
    this.filterForm.setValue(model);
  }
}
