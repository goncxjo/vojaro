import { AfterContentInit, AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import {
  defineGraph,
  defineGraphConfig,
  Graph,
  GraphController,
} from 'd3-graph-controller'
import 'd3-graph-controller/default.css'
import { NetworkService } from '../../core/services/network.service';
import { SubjectService } from '../../backend/services/subject.service';
import { Subject, SubjectFilters } from '../../backend/models/subject/subject';
import _ from 'lodash';

@Component({
  selector: 'app-network',
  imports: [],
  templateUrl: './network.component.html',
  styleUrl: './network.component.scss',
  standalone: true
})
export class NetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('graph') container!: ElementRef;


  all: any[] = []


  controller!: any;
  graph!: Graph;
  
  networkService = inject(NetworkService);
  subjectService = inject(SubjectService);
  

  ngOnInit() {
    this.subjectService.getAll({
      careerId: 'clpONiwraXiYuLTTIYpT',
      universityId: 'LvXJZ7m6rmFEKcG7hKZj'
    } as SubjectFilters).subscribe((res) => {
      const { nodes, links } = this.networkService.getDataSet(res);
      
      this.graph = defineGraph({
        nodes: nodes,
        links: links,
      });

      this.controller = new GraphController(this.container.nativeElement, this.graph, defineGraphConfig())
    })
  }

  add() {
    // _.forEach(this.all, (s) => {
    //   this.subjectService.create(s)
    // })
  }
  
  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.controller.shutdown()
  }
}
