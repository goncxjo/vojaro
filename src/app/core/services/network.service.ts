import { Injectable } from "@angular/core";
import { SubjectList } from "../../backend/models/subject/subject";
import _ from "lodash";
import { defineLink, defineNodeWithDefaults } from "d3-graph-controller";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  getDataSet(subjects: SubjectList[]) {
    let links: any[] = [];
    let nodes = subjects.map((s: any) => this.generateNode(s));
    subjects.forEach((s: any) => this.feedLinks(links, s, subjects, nodes));

    return { nodes, links }
  }
  
  generateNode(subject: any) {
    return defineNodeWithDefaults({
      type: 'node',
      id: subject.id,
      label: {
        color: 'black',
        fontSize: '1rem',
        text: subject.name,
      },
    })
  }

  feedLinks(links: any[], subject: any, subjects: any[], nodes: any[]) {
    const approved = subject.mustApproved || [];
    const regularized = subject.mustRegularized || [];
    const realRegularized = _.difference(regularized, approved);

    approved.forEach((i: any) => {
      if(subjects.find(x => x.id == i)) {
        const newLink = defineLink({
          source: _.find(nodes, (x: any) => x.id == i),
          target: _.find(nodes, (x: any) => x.id == subject.id),
          color: 'gray',
          label: false,
        })
        links.push(newLink);
      }
    });

    realRegularized.forEach((i: any) => {
      if(subjects.find(x => x.id == i)) {
        const newLink = defineLink({
          source: _.find(nodes, (x: any) => x.id == i),
          target: _.find(nodes, (x: any) => x.id == subject.id),
          color: 'gray',
          label: false,
        })
        links.push(newLink);
      }
    });
  }
}
