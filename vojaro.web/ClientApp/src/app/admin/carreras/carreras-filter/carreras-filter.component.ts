import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarreraFilters, Universidad } from 'src/app/api';

@Component({
  selector: 'app-carreras-filter',
  templateUrl: './carreras-filter.component.html',
  styleUrls: ['./carreras-filter.component.scss']
})
export class CarrerasFilterComponent implements OnInit {
  filterForm = this.buildForm();
  universidad!: Universidad;

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
      nombre: [''],
      universidad: [''],
      departamento: [''],
    });
  }

  private resetModel() {
    const model = new CarreraFilters();
    this.filterForm.setValue(model);
  }

  onUniversidadChange(universidad: Universidad) {
    this.universidad = universidad;
  }
}
