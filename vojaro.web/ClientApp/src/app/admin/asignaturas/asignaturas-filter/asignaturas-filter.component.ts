import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignaturaFilters, Carrera, Universidad } from 'src/app/api';

@Component({
  selector: 'app-asignaturas-filter',
  templateUrl: './asignaturas-filter.component.html',
  styleUrls: ['./asignaturas-filter.component.scss']
})
export class AsignaturasFilterComponent implements OnInit {
  filterForm = this.buildForm();
  universidad!: Universidad;
  carrera!: Carrera;

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
      carrera: [''],
      carreraOrientacion: [''],
      anio: [''],
      cuatrimestre: [''],
    });
  }

  private resetModel() {
    const model = new AsignaturaFilters();
    this.filterForm.setValue(model);
  }

  onUniversidadChange(universidad: Universidad) {
    this.universidad = universidad;
  }

  onCarreraChange(carrera: Carrera) {
    this.carrera = carrera;
  }
}
