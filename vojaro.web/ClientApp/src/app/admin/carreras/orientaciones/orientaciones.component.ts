import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { CarreraFilters, CarreraOrientacion, CarrerasService, PagedData, PageInfo, PageSort, UniversidadesService, UniversidadFilters } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { OrientacionesCarrerasEditComponent } from './orientaciones-edit/orientaciones-edit.component';

@Component({
  selector: 'app-carreras-orientaciones',
  templateUrl: './orientaciones.component.html',
  styleUrls: ['./orientaciones.component.scss']
})
export class OrientacionesCarrerasComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  @Input() carreraId!: number;
  @Input() readonly!: boolean;

  filters: CarreraFilters = new CarreraFilters();
  entity!: CarreraOrientacion;

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
    private service: CarrerasService,
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
          this.service.getPagedOrientaciones.bind(this.service),
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
    this.filters.id = this.carreraId;
    this.ngDtHelper.reload(this.dtElement);
  }

  remove() {
    console.log('pendiente accion eliminar')
  }

  
  openEdit(id: number = 0) {
    const onSuccess = () => {
      setTimeout(() => this.ngDtHelper.reload(this.dtElement), 0);
    }
    
    const onError = () => { };
    
    const modalInstance = this.modalService.open(OrientacionesCarrerasEditComponent, { size: 'xl' });
    modalInstance.componentInstance.readonly = this.readonly;
    modalInstance.componentInstance.carreraId = this.carreraId;
    modalInstance.componentInstance.carreraOrientacionId = id;

    modalInstance.result.then(onSuccess, onError);


  }
}
