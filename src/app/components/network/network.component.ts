import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { NetworkService } from './network.service';
import { SubjectService } from '../../api/services/subject.service';
import { Subject, SubjectFilters } from '../../api/models/subject/subject';
import { combineLatest, Subscription, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectFiltersModalComponent } from '../modals/subject-filters-modal/subject-filters-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faLink, faPen, faRefresh, faCirclePlus, faArrowUp, faSitemap, faQuestion, faQuestionCircle, faCircleInfo, faCircleCheck, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { SubjectEditModalComponent } from '../modals/subject-edit-modal/subject-edit-modal.component';
import _ from 'lodash';
import cytoscape, { NodeSingular } from 'cytoscape';
import { StudentSubjectService } from '../../api/services/student-subject.service';
import { StudentSubject } from '../../api/models/subject/subject-subject';
import { StudentSubjectEditModalComponent } from '../modals/student-subject-edit-modal/student-subject-edit-modal.component';
import { SubjectToSubjectModalComponent } from '../modals/subject-to-subject-modal/subject-to-subject-modal.component';
import { UserService } from '../../core/services/user.service';
import { NetworkReferencesModalComponent } from '../modals/network-references-modal/network-references-modal.component';
import { WelcomeModalComponent } from '../modals/welcome-modal/welcome-modal.component';
import { SubjectElectiveSelectModalComponent } from '../modals/subject-elective-select-modal/subject-elective-select-modal.component';

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
  filterIcon = faSitemap;
  refreshIcon = faRefresh;
  viewIcon = faEye;
  createIcon = faCirclePlus;
  editIcon = faPen;
  linkIcon = faLink;
  updateNodeIcon = faCircleUp;
  referenceIcon = faQuestionCircle;
  aboutIcon = faCircleInfo;
  electiveIcon = faCircleCheck;

  networkService = inject(NetworkService);
  studentSubjectService = inject(StudentSubjectService);
  subjectService = inject(SubjectService);
  userService: UserService = inject(UserService);

  form!: FormGroup;
  data: Subject [] = [];
  electives: any[] = [];

  filters: SubjectFilters = {
    universityId: "",
    careerId: "",
    careerTrackId: ""
  } as SubjectFilters;

  selected: Subject = this.subjectService.new();
  subjectToLink: Subject = this.subjectService.new();
  student: StudentSubject = this.studentSubjectService.new();

  linkMode: boolean = false;

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

  startLinkMode() {
    this.resetOpacity();

    this.linkMode = true;
  }
  
  stopLinkMode() {
    this.linkMode = false;
    this.cleanSelected();
  }

  ngAfterViewInit() {
    this.cy = this.networkService.create(this.container);
    this.applyFilters();
  }

  applyFilters() {
    if (this.filters.careerId) {      
      this.electives = [];
      const su = this.subjectService.getAll(this.filters); 
      const sts = this.studentSubjectService.getAll(this.filters);
      
      this.sub = combineLatest([sts, su]).pipe(
        take(1),
      ).subscribe(res => {
        this.student = res[0][0] || this.studentSubjectService.new(this.filters.universityId, this.filters.careerId);
        this.data = res[1];

        const { nodes, links, data } = this.networkService.getDataSet(this.student, res[1]);
        this.cy.elements().remove();
        this.cy.add([...nodes,...links])

        this.electives = data;

        this.cy.fit()
        this.cy.zoom(0.5);
        this.cy.pan({ x: 0, y: 400 })  

        this.cy.on('tap', (event) => {
          const node = this.cy.nodes().children(event.target)[0];
          this.resetOpacity();

          if(node) {
            const subjectSelected = _.find(this.data, (s: Subject) => s.id === node.id()) || this.subjectService.new();
            if(this.linkMode && !this.subjectToLink.id) {
              this.subjectToLink = subjectSelected;
              if (!this.modalService.hasOpenModals()) {
                this.openLinkModal();
              }
            } else {
              this.selected = subjectSelected;
            }
            this.focusNeighbourhood(event);
          }
          else {
            this.stopLinkMode()
          }
        });
      });
    }

  }

  focusNeighbourhood(event: cytoscape.EventObject) {
    const node: NodeSingular = event.target;
    const adjacentEdges = node.connectedEdges();
    const connectedNodes = adjacentEdges.connectedNodes()

    node.addClass('selected')
    adjacentEdges.addClass('show')
    this.cy.nodes().children().not(connectedNodes).not(node).addClass('hide');
    if (this.linkMode) {
      const otherNode = this.cy.filter((e,i) => {
        return e.isNode() && e.data('id') == this.selected.id
      });
      
      otherNode.addClass('selected')
      otherNode.removeClass('hide');      
    }
  }

  resetOpacity() {
    this.cy.edges().removeClass('show');
    this.cy.nodes().children().removeClass('selected');
    this.cy.nodes().children().removeClass('hide');
  }

  cleanSelected() {
    this.resetOpacity();
    this.selected = this.subjectService.new();
    this.subjectToLink = this.subjectService.new();
  }

  openFilterModal() {
    const onModalSuccess = (res: any) => {
      if (res) {
        this.filters = res;
        this.applyFilters();
      }
    }

    const onError = () => { };
    const modalInstance = this.modalService.open(SubjectFiltersModalComponent, { centered: true });    
    modalInstance.componentInstance.filters = this.filters;
    modalInstance.result.then(onModalSuccess, onError);
  }

  openEditModal(readonly: boolean = false, createMode: boolean = false) {
    const onModalSuccess = (res: any) => {
      this.cleanSelected();
      if (res.id) {
        this.applyFilters();
      }
    }

    const onError = () => { };

    const modalInstance = this.modalService.open(SubjectEditModalComponent, { centered: true })
    modalInstance.componentInstance.readonly = readonly;
    if(this.selected.id) {
      modalInstance.componentInstance.title = readonly ? 'Ver' : 'Editar';
      modalInstance.componentInstance.subject = this.selected;
    }
    else {
      const empty = this.subjectService.new();
      modalInstance.componentInstance.title = 'Crear';
      empty.universityId = this.filters.universityId;
      empty.careerId = this.filters.careerId;
      modalInstance.componentInstance.subject = empty;
    }
    modalInstance.result.then(onModalSuccess, onError);
  }

  openUpdateModal() {
    const onModalSuccess = (res: any) => {
      this.cleanSelected();
      if (res.id) {
        this.applyFilters();
      }
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
    const onModalSuccess = (res: any) => {
      this.stopLinkMode();
      this.applyFilters();
    }

    const onError = () => { 
      this.stopLinkMode();
    };

    if(this.linkMode) {
      const modalInstance = this.modalService.open(SubjectToSubjectModalComponent, { centered: true })
      modalInstance.componentInstance.subject_A = this.selected;
      modalInstance.componentInstance.subject_B = this.subjectToLink;
      modalInstance.result.then(onModalSuccess, onError);
    }
  }

  isElective(subject: Subject) {
    return subject.type === 'elective' || subject.type === 'placeholder'
  }

  openElectiveModal() {
    const placeholder = Object.assign({}, this.selected);

    const onModalSuccess = (res: any) => {
      let ref = this.cy.getElementById(placeholder.id);
      let newElem = this.electives.find(e => e.data.id == res.id);
      if (newElem) {
        newElem.position = ref.position();
        newElem.data.parent = ref.data('parent');
        if (ref.data('type') == 'elective') {
          this.cy.remove(ref)
        }
        this.cy.add(newElem)        
        this.cy.add(newElem.data.links)
      }
      this.resetOpacity()
    }

    const onError = () => { 
      // this.stopLinkMode();
    };

    const modalInstance = this.modalService.open(SubjectElectiveSelectModalComponent, { centered: true })
    modalInstance.componentInstance.data = _.map(this.electives, (e) => e.data);
    modalInstance.componentInstance.selected = this.selected;
    modalInstance.result.then(onModalSuccess, onError);
  }

  openReferencesModal() {
    this.modalService.open(NetworkReferencesModalComponent, { centered: true, scrollable: true })
  }

  openWelcomeModal() {
    this.modalService.open(WelcomeModalComponent, { centered: true })
  }

  reset() {
    this.applyFilters();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    this.cy.destroy()
  }
}
