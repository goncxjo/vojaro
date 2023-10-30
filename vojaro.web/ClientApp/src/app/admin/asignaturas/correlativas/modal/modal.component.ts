import { AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Asignatura, AsignaturaFilters, AsignaturasService, PagedData, PageInfo, PageSort, } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-asignaturas-correlativas-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class CorrelativasModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DataTableDirective) dtElements!: QueryList<DataTableDirective>;
  
  form = this.buildForm();
  entity!: Asignatura;
  correlativas: any[] = [];
  readonly!: boolean;
  filters: AsignaturaFilters = new AsignaturaFilters();

  page: PagedData<any> = this.ngDtHelper.getDefaultPagedData();
  pageInfo: PageInfo = this.ngDtHelper.getDefaultParams().pageInfo;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  sort: PageSort[] = [];
  
  isBuscarCollapsed: boolean = false;
  isDetalleCollapsed: boolean = false;
  isSeleccionadosCollapsed: boolean = false;

  seleccionados: any[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private ngDtHelper: AngularDatatablesHelper,
    private service: AsignaturasService,
    private modalService: NgbActiveModal,
    private notificationService: NotificationService,
    private location: Location,
    private renderer: Renderer2, 
  ) { }

  ngOnInit() {
    const that = this;

    this.filters.id = this.entity.id;
    this.filters.cuatrimestre = this.entity.cuatrimestre;
    this.seleccionados = this.correlativas || [];

    this.dtOptions[0] = {
      ...this.ngDtHelper.options,
      ajax: (params: any, callback: any) => {
        this.ngDtHelper.getData(
          that,
          this.service.getPagedCorrelativasDisponibles.bind(this.service),
          params,
          (data: any)=>{
            this.toggleAllAsignaturas();
            callback(data);
          }
        );
      },
      order: [],
      columns: [
        { data: 'selector', orderable: false },
        { data: 'id' },
        { data: 'nombre' },
        { data: 'cuatrimestre' },
        { data: 'cargaHoraria' },
      ]
    };

    this.dtOptions[1] = {
      ...this.ngDtHelper.optionsServerless,
      destroy: true,
      ajax: (params: any, callback: any) => {
        of(that.seleccionados).subscribe(resp => {
          callback({
            recordsTotal: resp.length,
            recordsFiltered: resp.length,
            data: resp
          })
        })
      },
      order: [],
      columns: [
        {
          data: null,
          orderable: false,
          render: function(data, type, item) {
            return `
            <div class="btn-group-sm">
              <button class="btn btn-link" ngbTooltip="Eliminar" item-eliminar-id="${data.id}">
                <i class="fas fa-trash text-danger fa-lg" item-eliminar-id="${data.id}"></i>
              </button>
              </div>
            `;
          }
        },
        { data: 'id' },
        { data: 'nombre' },
        { data: 'cuatrimestre' },
        { data: 'cargaHoraria' },
      ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);

    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("item-eliminar-id")) {
        let id = event.target.getAttribute("item-eliminar-id");
        let asignatura = _.find(this.seleccionados, (asignatura) => {
          return id == asignatura.id;
        })
        this.removeAsignatura(asignatura);
      }
    });

    this.search();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      nombre: [''],
      cuatrimestre: [''],
      cargaHoraria: [''],
    });
  }

  get noData() {
    if (this.page) {
      return this.page.total === 0;
    }
    return true;
  }

  get noDataSelected() {
    if (this.seleccionados) {
      return this.seleccionados.length === 0;
    }
    return true;
  }
  
  dismiss(reason?: string) {
    this.modalService.dismiss(reason)
  }

  applyFilters() {
    this.filters = this.value;
    this.search();
  }

  private search() {
    this.ngDtHelper.reloadByIndex(this.dtElements, 0);
  }

  selectAllAsignaturas() {
    this.seleccionados = _.unionWith(this.seleccionados, this.page.data, (a, b) => {
      return a.id == b.id;
    });
    this.toggleAllAsignaturas();
  }

  toggleAllAsignaturas() {
    this.seleccionados.forEach(i => {
      this.toggleAsignatura(i, true);
    });
  }
  
  selectAsignatura(asignatura: any) {
    this.seleccionados = _.unionWith(this.seleccionados, [asignatura], (a, b) => {
      return a.id == b.id;
    });

    this.toggleAsignatura(asignatura, true);
  }

  removeAsignatura(asignatura: any) {
    _.remove(this.seleccionados, (i) => {
      return i.id == asignatura.id;
    });
    this.toggleAsignatura(asignatura, false);
  }

  toggleAsignatura(asignatura: any, selected: boolean) {
    this.page?.data.forEach(i => {
      if (i.id == asignatura?.id) {
        i.selected = selected;
      }
    });

    this.dtTrigger.next(null);
  }

  get value(): AsignaturaFilters {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.notificationService.showDanger('Existen campos con información inválida');
      return new AsignaturaFilters();
    }
    return this.form.value;
  }

  get formFields() {
    return this.form.controls;
  }

  onSubmit(): void {
    const correlativasSeleccionadas = _.map(this.seleccionados, (s) => {
      return {
        asignaturaId: s.id,
        condicion: {
          id: 3,
          descripcion: 'aprobada'
        } // s.condicionCorrelativa
      };
    });
    if (this.entity.id) {
      this.service
        .actualizarCorrelativas(this.entity.id, correlativasSeleccionadas)
        .pipe(take(1))
        .subscribe((response) => {
          this.modalService.close('ok');
          this.notificationService.showSuccess('Correlativas asignadas correctamente');
        });
    }
  }

  goBack() {
    this.location.back();
  }

  clearFilters() {
    this.resetModel();
  }

  private resetModel() {
    const model = new AsignaturaFilters();
    this.form.setValue(model);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
