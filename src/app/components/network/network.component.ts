import { AfterContentInit, AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import {
  defineGraph,
  defineGraphConfig,
  Graph,
  GraphConfig,
  GraphController,
  GraphLink,
  GraphNode,
} from 'd3-graph-controller'
import 'd3-graph-controller/default.css'
import { NetworkService } from '../../core/services/network.service';
import { SubjectService } from '../../backend/services/subject.service';
import { Subject, SubjectFilters, SubjectList } from '../../backend/models/subject/subject';
import _ from 'lodash';
import { Observable, switchMap, take, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubjectFilterComponent } from '../subject-filters/subject-filters.component';

@Component({
  selector: 'app-network',
  imports: [JsonPipe, AsyncPipe, ReactiveFormsModule, SubjectFilterComponent],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss',
  standalone: true,
})
export class NetworkComponent implements OnDestroy {
  @ViewChild('graph') container!: ElementRef;
  @ViewChild('subjectFilters') filters!: SubjectFilterComponent;

  all: any[] = []

  subject_A$: Observable<Subject> | undefined;
  subject_B$: Observable<Subject> | undefined;
  
  controller!: GraphController;
  graph!: Graph;
  config!: any;

  networkService = inject(NetworkService);
  subjectService = inject(SubjectService);

  form!: FormGroup;
  data: SubjectList[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  private buildForm(): FormGroup {
    return this.formBuilder.group({});
  }

  getFilters() {
    return this.filters?.childForm?.getRawValue() ?? { name: '' }
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  createGraph(res: any) {
    const { nodes, links } = this.networkService.getDataSet(res);
      
    this.graph = defineGraph({
      nodes: nodes,
      links: links,
    });

    this.config = defineGraphConfig({
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

    this.controller = new GraphController(this.container.nativeElement, this.graph, this.config)
  }

  add() {
    // _.forEach(this.all, (s) => {
    //   this.subjectService.create(s)
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

    this.filters.childForm.valueChanges.pipe(
      switchMap((res: any) => this.subjectService.getAll(res))
    ).subscribe((res: any) => {
      console.log(res)
      this.createGraph(res)
    })
  }

  ngOnDestroy() {
    this.controller.shutdown()
  }
}
