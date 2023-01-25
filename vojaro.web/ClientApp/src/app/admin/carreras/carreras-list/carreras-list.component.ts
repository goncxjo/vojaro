import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UniversidadFilters, CarrerasService, PageSort, PagedData, PageInfo } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { CarrerasFilterComponent } from '../carreras-filter/carreras-filter.component';

@Component({
  selector: 'app-carreras-list',
  templateUrl: './carreras-list.component.html',
  styleUrls: ['./carreras-list.component.scss']
})
export class CarrerasListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  @ViewChild('carrerasFilter')
  entityFilters!: CarrerasFilterComponent;

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
    private service: CarrerasService,
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
        { data: 'universidad' },
        { data: 'departamento' },
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
