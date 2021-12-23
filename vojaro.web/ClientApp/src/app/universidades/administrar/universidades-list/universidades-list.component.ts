import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UniversidadFilters, UniversidadesService, PageSort, PagedData, PageInfo } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { UniversidadesFilterComponent } from '../universidades-filter/universidades-filter.component';


@Component({
  selector: 'app-universidades-list',
  templateUrl: './universidades-list.component.html',
  styleUrls: ['./universidades-list.component.scss']
})
export class UniversidadesListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  @ViewChild('universidadesFilter')
  entityFilters!: UniversidadesFilterComponent;

  pageInfo: PageInfo = this.ngDtHelper.getDefaultParams().pageInfo;
  page: PagedData<any> = this.ngDtHelper.getDefaultPagedData();
  sort: PageSort[] = [];
  filters = new UniversidadFilters();
  
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
        { data: 'siglas' },
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
        dtInstance.ajax.reload();
      }
    });
  }

  applyFilters() {
    this.filters = this.entityFilters.formValue;
    this.search();
  }

  remove() {
    console.log('pendiente accion eliminar')
  }
}
