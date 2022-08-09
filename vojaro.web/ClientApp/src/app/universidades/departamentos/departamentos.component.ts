import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { PagedData, PageInfo, PageSort, UniversidadesService, UniversidadFilters } from 'src/app/api';
import { Departamento } from 'src/app/api/models/departamento';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { DepartamentosUniversidadesEditComponent } from './edit/departamentos-edit.component';

@Component({
  selector: 'app-departamentos-universidades',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosUniversidadesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  @Input() universidadId!: number;
  @Input() readonly!: boolean;

  filters: UniversidadFilters = new UniversidadFilters();
  entity!: Departamento;

  pageInfo: PageInfo = this.ngDtHelper.getDefaultParams().pageInfo;
  page: PagedData<any> = this.ngDtHelper.getDefaultPagedData();
  sort: PageSort[] = [];
  
  dtOptions: DataTables.Settings = {};

  get noData() {
    if (this.page) {
      return this.page.total === 0;
    }
    return true;
  }

  constructor(
    private service: UniversidadesService,
    private notificationService: NotificationService,
    private ngDtHelper: AngularDatatablesHelper,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const that = this;
    
    this.dtOptions = {
      ...this.ngDtHelper.options,
      ajax: (params: any, callback: any) => {
        this.ngDtHelper.getData(
          that,
          this.service.getPagedDepartamentos.bind(this.service),
          params,
          callback
        );
      },
      columns: [
        { data: 'acciones', orderable: false },
        { data: 'id' },
        { data: 'nombre' },
        { data: 'fechaCreacion' },
        { data: 'fechaUltimaModificacion' },
      ]
    };
  }
  
  ngAfterViewInit(): void {    
    this.search();
  }

  private search() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(dtInstance) {
        this.filters.id = this.universidadId;
        dtInstance.ajax.reload();
      }
    });
  }

  add() {
    // this.entity = this.entityForm.formValue;
    this.search();
  }

  remove() {
    console.log('pendiente accion eliminar')
  }

  openEdit() {
    const modalInstance = this.modalService.open(
      DepartamentosUniversidadesEditComponent,
      { size: 'xl', ariaLabelledBy: 'app-departamentos-modal' }
    );
    (<DepartamentosUniversidadesEditComponent>modalInstance.componentInstance).readonly = this.readonly;
    (<DepartamentosUniversidadesEditComponent>modalInstance.componentInstance).universidadId = this.universidadId;

    modalInstance.result.then(
      (result) => {
        this.search();
      }
    );
  }
}
