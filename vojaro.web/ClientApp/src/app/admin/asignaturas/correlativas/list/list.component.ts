import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { AsignaturaFilters, Asignatura, AsignaturasService, PagedData, PageInfo, PageSort } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { CorrelativasModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-asignaturas-correlativas-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CorrelativasListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  @Input() asignatura!: Asignatura;
  @Input() readonly!: boolean;

  filters: AsignaturaFilters = new AsignaturaFilters();
  entity!: Asignatura;

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
    private service: AsignaturasService,
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
          this.service.getPaged.bind(this.service),
          params,
          callback
        );
      },
      columns: [
        { data: 'acciones', orderable: false },
        { data: 'id' },
        { data: 'nombre' },
        { data: 'cuatrimestre' },
        { data: 'cargaHoraria' },
      ]
    };
  }
  
  ngAfterViewInit(): void {    
    this.search();
  }

  private search() {
    this.filters.id = this.asignatura.id;
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
    
    const modalInstance = this.modalService.open(CorrelativasModalComponent, { size: 'xl' });
    modalInstance.componentInstance.readonly = this.readonly;
    modalInstance.componentInstance.carreraId = this.asignatura.carreraId;
    modalInstance.componentInstance.asignaturaId = this.asignatura.id;

    modalInstance.result.then(onSuccess, onError);


  }
}
