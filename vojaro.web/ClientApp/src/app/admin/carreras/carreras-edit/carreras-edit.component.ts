import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Carrera, CarrerasService, Universidad } from 'src/app/api';
import { NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-carreras-edit',
  templateUrl: './carreras-edit.component.html',
  styleUrls: ['./carreras-edit.component.scss']
})
export class CarrerasEditComponent implements OnInit {
  readonly!: boolean;
  form = this.buildForm();
  entity!: Carrera;
  universidad!: Universidad;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location,
    private service: CarrerasService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.entity = data['entity'];
      this.readonly = data['readonly'];

      const isCreate = !this.entity?.id;
      this.form.patchValue(this.entity);

      if (this.readonly) {
        this.form.disable();
      }
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.notificationService.showDanger('Existen campos con información inválida');
      return;
    }

    const entity: Carrera = this.form.getRawValue();
    entity.universidadId = entity.universidad?.id;
    entity.departamentoId = entity.departamento?.id;

    this.service.save(entity)
      .subscribe(() => {
        this.notificationService.showSuccess('Carrera guardada correctamente');
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }

  get formFields() {
    return this.form.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [{ value: '', disabled: true}],
      nombre: [''],
      universidad: [''],
      departamento: ['']
    });
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
  }

  onUniversidadChange(universidad: Universidad) {
    this.universidad = universidad;
  }

}