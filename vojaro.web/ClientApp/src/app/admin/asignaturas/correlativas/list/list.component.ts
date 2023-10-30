import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { AsignaturaFilters, Asignatura, AsignaturasService } from 'src/app/api';
import { AngularDatatablesHelper, NotificationService } from 'src/app/shared';
import { CorrelativasModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-asignaturas-correlativas-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CorrelativasListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  @Input() asignatura!: Asignatura;
  @Input() readonly!: boolean;

  filters: AsignaturaFilters = new AsignaturaFilters();
  correlativas: any[] = [];

  dtOptions: DataTables.Settings = this.ngDtHelper.optionsServerless;
  dtTrigger: Subject<any> = new Subject<any>();

  get noData() {
    if (this.correlativas) {
      return this.correlativas.length === 0;
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
    
    this.dtOptions.columns = [
        // { data: 'acciones', orderable: false },
        { data: 'id' },
        { data: 'nombre' },
        { data: 'cuatrimestre' },
        { data: 'cargaHoraria' },
        { data: 'condicionCorrelativa' },
      ];
  }
  
  ngAfterViewInit(): void {    
    setTimeout(() => this.search(), 0);
    this.dtTrigger.next(null);
  }

  search() {
    this.service.getCorrelativas(this.asignatura?.id).subscribe(res => {
      this.correlativas = res;
    })
  }

  remove() {
    console.log('pendiente accion eliminar')
  }

  
  openEdit(id: number = 0) {
    const onSuccess = () => {
      setTimeout(() => this.search(), 0);
    }
    
    const onError = () => { };
    
    const modalInstance = this.modalService.open(CorrelativasModalComponent, { size: 'xl' });
    modalInstance.componentInstance.readonly = this.readonly;
    modalInstance.componentInstance.entity = this.asignatura;
    modalInstance.componentInstance.correlativas = _.clone(this.correlativas);

    modalInstance.result.then(onSuccess, onError);
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
