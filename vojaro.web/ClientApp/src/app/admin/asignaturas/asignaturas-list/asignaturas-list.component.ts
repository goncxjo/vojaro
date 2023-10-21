import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsignaturasFilterComponent } from '../asignaturas-filter/asignaturas-filter.component';
import { DataTableDirective } from 'angular-datatables';
import { AsignaturaFilters, AsignaturasService, PageInfo, PageSort, PagedData } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';

@Component({
  selector: 'app-asignaturas-list',
  templateUrl: './asignaturas-list.component.html',
  styleUrls: ['./asignaturas-list.component.scss']
})
export class AsignaturasListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  @ViewChild('asignaturasFilter')
  entityFilters!: AsignaturasFilterComponent;

  pageInfo: PageInfo = this.ngDtHelper.getDefaultParams().pageInfo;
  page: PagedData<any> = this.ngDtHelper.getDefaultPagedData();
  sort: PageSort[] = [];
  filters = new AsignaturaFilters();
  
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
        { data: 'esInterdisciplinaria' },
        { data: 'carrera' },
        { data: 'universidad' },
        { data: 'fechaCreacion' },
        { data: 'fechaUltimaModificacion' },
      ]
    };
  }
  
  ngAfterViewInit(): void {    
    this.search();
  }

  private search() {
    this.ngDtHelper.reload(this.dtElement);
  }

  applyFilters() {
    this.filters = this.entityFilters.formValue;
    this.search();
  }

  remove() {
    console.log('pendiente accion eliminar')
  }
}
