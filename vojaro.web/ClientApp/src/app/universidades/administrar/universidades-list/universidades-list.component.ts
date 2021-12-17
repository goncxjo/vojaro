import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UniversidadFilters, UniversidadesService, PageSort, PagedData, PageInfo } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';


@Component({
  selector: 'app-universidades-list',
  templateUrl: './universidades-list.component.html',
  styleUrls: ['./universidades-list.component.scss']
})
export class UniversidadesListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  pageInfo: PageInfo = this.ngDtHelper.getDefaultParams().pageInfo;
  page: PagedData<any> = this.ngDtHelper.getDefaultPagedData();
  sort: PageSort[] = [];
  filters: UniversidadFilters = {
    parteNombreSiglas: null
  };
  
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => dtInstance.draw());
  }

  filterChanged(newFilters: UniversidadFilters) {
    this.filters = newFilters;
    this.search();
  }

  private search() {
    this.service.getPaged(this.pageInfo, this.filters, this.sort).subscribe((response: any) => {      
      this.page = response;  
    });
  }

}
