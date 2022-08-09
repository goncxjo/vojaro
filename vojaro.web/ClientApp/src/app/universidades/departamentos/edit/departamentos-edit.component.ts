import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UniversidadesService } from 'src/app/api';
import { Departamento } from 'src/app/api/models/departamento';
import { NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-departamentos-edit',
  templateUrl: './departamentos-edit.component.html',
  styleUrls: ['./departamentos-edit.component.scss']
})
export class DepartamentosUniversidadesEditComponent implements OnInit, OnDestroy {
  universidadId!: number;
  departamentoId!: number;
  entity!: Departamento;

  readonly!: boolean;
  form = this.buildForm();
  subs!: Subscription;

  constructor(
    private notificationService: NotificationService,
    private service: UniversidadesService,
    private formBuilder: FormBuilder,
    private modalService: NgbActiveModal
  ) { }

  ngOnInit() {
    const isCreate = !this.departamentoId;
    if (isCreate) {
      this.subs = this.service.newDepartamento(this.universidadId).subscribe(data => {
        this.entity = data;
        this.form.patchValue(this.entity);
      });
    } else {
      this.subs = this.service.getDepartamentoById(this.departamentoId.toString()).subscribe(data => {
        this.entity = data;
        this.form.patchValue(this.entity);
      });
    }

    if (this.readonly) {
      this.form.disable();
    }
  }

  ngOnDestroy(): void {
    if(this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.notificationService.showDanger('Existen campos con información inválida');
      return;
    }

    const entity: Departamento = this.form.getRawValue();
    
    this.service.saveDepartamento(entity)
      .subscribe(() => {
        this.notificationService.showSuccess('Departamento guardado correctamente');
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
      universidadId: [''],
    });
  }

  dismiss(reason?: string) {
    this.modalService.dismiss(reason)
  }
}
