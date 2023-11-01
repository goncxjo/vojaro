import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Asignatura, AsignaturasService, Universidad } from 'src/app/api';
import { NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-asignaturas-edit',
  templateUrl: './asignaturas-edit.component.html',
  styleUrls: ['./asignaturas-edit.component.scss']
})
export class AsignaturasEditComponent implements OnInit {
  readonly!: boolean;
  form = this.buildForm();
  entity: Asignatura = {} as Asignatura;
  isCreate: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location,
    private service: AsignaturasService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.entity = data['entity'];
      this.readonly = data['readonly'];

      this.isCreate = !this.entity?.id;
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

    const entity: Asignatura = this.form.getRawValue();

    this.service.save(entity)
      .subscribe((result) => {
        this.notificationService.showSuccess('Asignatura guardada correctamente');
        if (this.isCreate) {
          this.router.navigate([`admin/asignaturas/${result.id}/editar`]);
        } else {
          this.goBack();
        }
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
      codigo: [''],
      cuatrimestre: [''],
      cargaHoraria: [''],
      carrera: [''],
      universidad: [''],
    });
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
  }


  onUniversidadChange(universidad: Universidad) {
    this.entity.universidad = universidad;
  }
}