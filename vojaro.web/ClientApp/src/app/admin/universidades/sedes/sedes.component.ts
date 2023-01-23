import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { PagedData, PageInfo, PageSort, UniversidadesService, UniversidadFilters } from 'src/app/api';
import { Sede } from 'src/app/api/models/sede';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { SedesUniversidadesEditComponent } from './edit/sedes-edit.component';

@Component({
  selector: 'app-sedes-universidades',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesUniversidadesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  @Input() universidadId!: number;
  @Input() readonly!: boolean;

  filters: UniversidadFilters = new UniversidadFilters();
  entity!: Sede;

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
          this.service.getPagedSedes.bind(this.service),
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

  openEdit(id: number = 0) {
    const modalInstance = this.modalService.open(
      SedesUniversidadesEditComponent,
      { size: 'xl', ariaLabelledBy: 'app-sedes-modal' }
    );
    (<SedesUniversidadesEditComponent>modalInstance.componentInstance).readonly = this.readonly;
    (<SedesUniversidadesEditComponent>modalInstance.componentInstance).sedeId = id;
    (<SedesUniversidadesEditComponent>modalInstance.componentInstance).universidadId = this.universidadId;

    modalInstance.result.then(
      (result) => {
        this.search();
      }, (reason) => {
      }
    );
  }
}
