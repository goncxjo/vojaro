import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UniversidadFilters } from 'src/app/api';
import { NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-universidades-filter',
  templateUrl: './universidades-filter.component.html',
  styleUrls: ['./universidades-filter.component.scss']
})
export class UniversidadesFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<UniversidadFilters>();

  filterForm = this.buildForm();

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.resetModel();
  }

  clearFilters() {
    this.resetModel();
    this.applyFilters();
  }

  onSubmit() {
    this.filterForm.markAllAsTouched();
    if (this.filterForm.invalid) {
      this.notificationService.showDanger('Existen campos con información inválida');
      return;
    }
    this.applyFilters();
  }

  get formFields() {
    return this.filterForm.controls;
  }

  private applyFilters() {
    const filters: UniversidadFilters = this.filterForm.value;
    this.filterChanged.emit(filters);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      parteNombreSiglas: [''],
    });
  }

  private resetModel() {
    const model: UniversidadFilters = {
      parteNombreSiglas: null
    };
    this.filterForm.setValue(model);
  }


}
