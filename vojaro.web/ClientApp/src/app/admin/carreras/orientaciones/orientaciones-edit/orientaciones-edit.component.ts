import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { CarreraOrientacion, CarrerasService } from 'src/app/api';
import { NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-carreras-orientaciones-edit',
  templateUrl: './orientaciones-edit.component.html',
  styleUrls: ['./orientaciones-edit.component.scss']
})
export class OrientacionesCarrerasEditComponent implements OnInit {
  carreraId!: number;
  carreraOrientacionId!: number;
  entity!: CarreraOrientacion;

  readonly!: boolean;
  form = this.buildForm();

  constructor(
    private notificationService: NotificationService,
    private service: CarrerasService,
    private formBuilder: FormBuilder,
    private modalService: NgbActiveModal
  ) { }

  ngOnInit() {
    const isCreate = !this.carreraOrientacionId;
    if (isCreate) {
      this.service.newOrientacion(this.carreraId)
      .pipe(take(1))
      .subscribe(data => {
        this.entity = data;
        this.form.patchValue(this.entity);
      });
    } else {
      this.service.getOrientacionById(this.carreraOrientacionId.toString()).subscribe(data => {
        this.entity = data;
        this.form.patchValue(this.entity);
      });
    }

    if (this.readonly) {
      this.form.disable();
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.notificationService.showDanger('Existen campos con información inválida');
      return;
    }

    const entity: CarreraOrientacion = this.form.getRawValue();
    
    this.service.saveOrientacion(entity)
      .subscribe(() => {
        this.notificationService.showSuccess('Orientación guardada correctamente');
        this.modalService.close('ok');
      });
  }

  get formFields() {
    return this.form.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: '', disabled: true}],
      nombre: [''],
      carreraId: [''],
    });
  }

  dismiss(reason?: string) {
    this.modalService.dismiss(reason)
  }
}
