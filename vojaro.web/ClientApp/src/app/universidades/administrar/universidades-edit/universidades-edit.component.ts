import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Universidad, UniversidadesService } from 'src/app/api';
import { NotificationService } from 'src/app/shared';
import { DepartamentosUniversidadesComponent } from '../../departamentos/departamentos.component';
import { SedesUniversidadesComponent } from '../../sedes/sedes.component';

@Component({
  selector: 'app-universidades-edit',
  templateUrl: './universidades-edit.component.html',
  styleUrls: ['./universidades-edit.component.scss']
})
export class UniversidadesEditComponent implements OnInit {
  @ViewChild('sedes')
  sedesComponent!: SedesUniversidadesComponent;
  @ViewChild('departamentos')
  departamentosComponent!: DepartamentosUniversidadesComponent;

  readonly!: boolean;
  form = this.buildForm();
  entity!: Universidad;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location,
    private service: UniversidadesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.entity = data['entity'];
      this.readonly = data['readonly'];

      const isCreate = !this.entity.id;
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

    const entity: Universidad = this.form.getRawValue();

    this.service.save(entity)
      .subscribe(() => {
        this.notificationService.showSuccess('Universidad guardada correctamente');
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
      siglas: [''],
      nombre: [''],
      sedes: [''],
      departamentos: ['']
    });
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
  }
}
