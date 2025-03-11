import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { defineGraphConfig, Graph, GraphController, GraphNode } from 'd3-graph-controller'
import { NetworkService } from '../../core/services/network.service';
import { SubjectService } from '../../backend/services/subject.service';
import { Subject, SubjectFilters, SubjectList } from '../../backend/models/subject/subject';
import _ from 'lodash';
import { Observable, Subscription, take, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectFiltersModalComponent } from '../subject-filters-modal/subject-filters-modal.component';

@Component({
  selector: 'app-network',
  imports: [],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss',
  standalone: true,
})
export class NetworkComponent implements OnDestroy {
  @ViewChild('graph') container!: ElementRef;

  all: Subject[] = [];
  
  subject_A$: Observable<Subject> | undefined;
  subject_B$: Observable<Subject> | undefined;
  sub!: Subscription;

  controller!: GraphController;
  graph!: Graph;
  config: any = defineGraphConfig({
    zoom: {
      initial: .5,
      max: 2,
      min: 0.1,
    },
    simulation: {
      forces: {
        centering: {
          enabled: false,
          strength: 10,
        },
        link: {
          strength: 0,
        },
      },
    },
    callbacks: {
      nodeClicked: (node: GraphNode) => {
        if (!this.subject_A$ || this.subject_B$) {
          this.subject_A$ = this.subjectService.getById(node.id).pipe(take(1));
          this.subject_B$ = undefined;
        } else {
          this.subject_B$ = this.subjectService.getById(node.id).pipe(take(1));
        }
      },
    },
  });

  networkService = inject(NetworkService);
  subjectService = inject(SubjectService);

  form!: FormGroup;
  data: SubjectList[] = [];

  filters: SubjectFilters = {} as SubjectFilters;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({});
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  add() {
    // _.forEach(this.all, (s) => {
    //   this.subjectService.create(s)
    //   console.log(s)
    // })
  }

  edit() {
    // _.forEach(this.all, (s) => {
    //   this.subjectService.create(s)
    // })
  }

  link(a: Subject, b: Subject, mustRegularize: boolean, mustAproved: boolean) {
    if(!b.mustRegularize) {
      b.mustRegularize = [];
    }
    if(!b.mustApproved) {
      b.mustApproved = [];
    }

    if (mustRegularize) {
      b.mustRegularize.push(a.id)
    }
    if (mustAproved) {
      b.mustApproved.push(a.id)
    }
    this.subjectService.update(b);
  }

  ngAfterViewInit() {
    // this.applyFilters();
  }

  applyFilters() {
    console.log(this.filters)

    this.sub = this.subjectService.getAll(this.filters).pipe(
      take(1),
      tap((res: any) => {
        this.networkService.draw(res, this.container.nativeElement, this.graph, this.config)
      })
    ).subscribe()

    
  }
  
  openFilterModal() {
    const onModalSuccess = (res: any) => {
      console.log(res)
      if (!res) {
        return;
      }
      this.filters = res;
      this.applyFilters();
    }

    const onError = () => { };
    const modalInstance = this.modalService.open(SubjectFiltersModalComponent, { centered: true })
    modalInstance.result.then(onModalSuccess, onError);
  }  
  
  openEditModal() {

  }

  openLinkModal() {

  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    this.controller.shutdown()
  }
}
