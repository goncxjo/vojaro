import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { NetworkService } from './network.service';
import { SubjectService } from '../../backend/services/subject.service';
import { Subject, SubjectFilters, SubjectList } from '../../backend/models/subject/subject';
import { combineLatest, forkJoin, Subscription, take, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectFiltersModalComponent } from '../subject-filters-modal/subject-filters-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter, faEye, faPlus, faLink, faPen, faRefresh, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { SubjectEditModalComponent } from '../subject-edit-modal/subject-edit-modal.component';
import _ from 'lodash';
import cytoscape, { NodeSingular } from 'cytoscape';
import { StudentSubjectService } from '../../backend/services/student-subject.service';
import { SubjectStateSelectComponent } from '../subject-state-select/subject-state-select.component';
import { StudentSubject } from '../../backend/models/subject/subject-subject';
import { StudentSubjectEditModalComponent } from '../student-subject-edit-modal/student-subject-edit-modal.component';

@Component({
  selector: 'app-network',
  imports: [FontAwesomeModule],
  providers: [NetworkService],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss',
  standalone: true,
})
export class NetworkComponent implements OnDestroy {
  @ViewChild('graph', { static: true }) container!: ElementRef;
  filterIcon = faFilter;
  editIcon = faPen;
  linkIcon = faLink;
  refreshIcon = faRefresh;
  updateNodeIcon = faCircleUp;

  networkService = inject(NetworkService);
  studentSubjectService = inject(StudentSubjectService);
  subjectService = inject(SubjectService);

  form!: FormGroup;
  data: Subject [] = [];

  filters: SubjectFilters = {
    universityId: "LvXJZ7m6rmFEKcG7hKZj",
    careerId: "clpONiwraXiYuLTTIYpT",
  } as SubjectFilters;

  all: Subject[] = [];

  selected!: Subject | null;
  student!: StudentSubject | null;

  sub!: Subscription;
  
  cy!: cytoscape.Core;


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

  link(a: Subject, b: Subject, mustRegularize: boolean, mustAproved: boolean) {
    if (!b.mustRegularize) {
      b.mustRegularize = [];
    }
    if (!b.mustApproved) {
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
    this.cy = this.networkService.create(this.container);
    this.applyFilters();
  }

  applyFilters() {
    const su = this.subjectService.getAll(this.filters); 
    const sts = this.studentSubjectService.getAll(this.filters);

    this.sub = combineLatest([sts, su]).pipe(
      take(1),
    ).subscribe(res => {
      this.student = res[0][0];
      this.data = res[1];
      const { nodes, links } = this.networkService.getDataSet(this.student, res[1]);
      this.cy.elements().remove();
      this.cy.add([...nodes,...links])

      this.cy.reset();
      this.cy.pan({
        x: 0,
        y: 500 
      });

      this.cy.on('tap', (event) => {
        const node = this.cy.nodes().children(event.target)[0];
        this.resetOpacity()
        if(node) {
          this.selected = _.find(this.data, (s: SubjectList) => s.id === node.id()) || null;
          this.focusNeighbourhood(event);
        }
        else {
          this.selected = null;        
        }
      });

      // this.cy.nodes().children().on('mouseover', this.focusNeighbourhood.bind(this));
      // this.cy.nodes().children().on('mouseout', this.resetOpacity.bind(this));
    });
  }

  focusNeighbourhood(event: cytoscape.EventObject) {
    const node: NodeSingular = event.target;
    const adjacentEdges = node.connectedEdges();
    const connectedNodes = adjacentEdges.connectedNodes()

    node.addClass('selected')
    adjacentEdges.addClass('show')
    this.cy.nodes().children().not(connectedNodes).not(node).addClass('hide');
  }

  resetOpacity() {
    this.cy.edges().removeClass('show');
    this.cy.nodes().children().removeClass('selected');
    this.cy.nodes().children().removeClass('hide');
  }

  cleanSelected() {
    this.selected = null;
  }

  openFilterModal() {
    const onModalSuccess = (res: any) => {
      if (res) {
        this.filters = res;
        this.applyFilters();
      }
    }

    const onError = () => { };
    const modalInstance = this.modalService.open(SubjectFiltersModalComponent, { centered: true })
    modalInstance.result.then(onModalSuccess, onError);
  }

  openEditModal() {
    const onModalSuccess = (res: any) => {
      this.applyFilters();
    }

    const onError = () => { };

    if(this.selected) {
      const modalInstance = this.modalService.open(SubjectEditModalComponent, { centered: true })
      modalInstance.componentInstance.subject = this.selected;
      modalInstance.result.then(onModalSuccess, onError);
    }
  }

  openUpdateModal() {
    const onModalSuccess = (res: any) => {
      this.applyFilters();
    }

    const onError = () => { };

    if(this.selected) {
      const modalInstance = this.modalService.open(StudentSubjectEditModalComponent, { centered: true })
      modalInstance.componentInstance.subject = this.selected;
      modalInstance.componentInstance.entity = this.student;
      modalInstance.result.then(onModalSuccess, onError);
    }
  }

  openLinkModal() {

  }

  reset() {
    this.cy.reset();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    this.cy.destroy()
  }
}
