import { ElementRef, Injectable } from "@angular/core";
import { Subject } from "../../api/models/subject/subject";
import _ from "lodash";
import cytoscape, { EdgeDefinition, ElementDefinition, NodeDataDefinition } from "cytoscape";
import { StudentSubject } from "../../api/models/subject/subject-subject";
import { networkStyles } from "./network.styles";

type NodeStatus = 'approved' | 'regularized' | 'in-progress' | 'available' | 'not-available';

@Injectable()
export class NetworkService {

  create(container: ElementRef<any>) {
    return cytoscape({
      container: container.nativeElement,
      elements: [],
      style: networkStyles,
      zoom: 0.5,
      pan: { x: 0, y: 400 },
      autolock: false,
    });
  }

  getDataSet(student: StudentSubject, subjects: Subject[]) {
    const [electives, regularSubjects] = _.partition(subjects, (s) => s.type === 'elective');
    const nodes: ElementDefinition[] = this.transformSubjectsToNodes(student, regularSubjects);
    
    const edges: EdgeDefinition[] = this.getEdges(subjects);
    const [electivesLinks, links] = _.partition(edges, (l) => 
      electives.some((e) => l.data.id?.includes(`|${e.id}`))
    );

    const electiveNodes = this.transformSubjectsToNodesAsElective(student, electives, electivesLinks);

    return { nodes, links, data: electiveNodes };
  }

  transformSubjectsToNodesAsElective(student: StudentSubject, subjects: Subject[], links: EdgeDefinition[]) {
    return subjects.map((subject: Subject) => {
      const subjectLinks = links.filter((l: EdgeDefinition) => l.data.id?.includes(`|${subject.id}`));
      
      return {
        group: 'nodes',
        data: {
          ...subject,
          links: subjectLinks
        },
        locked: true,
        classes: `${subject.type} center-center multiline-auto ${this.getNodeClass(student, subject)}`,  
      };
    });
  }

  transformSubjectsToNodes(student: StudentSubject, subjects: Subject[]) {
    const xOffset = 300;
    const yOffset = 50;
  
    // Agrupar materias por año
    const subjectsByYear = subjects.reduce<Record<number, Subject[]>>((acc, subject) => {
      acc[subject.year] = acc[subject.year] || [];
      acc[subject.year].push(subject);
      return acc;
    }, {});
  
    return Object.entries(subjectsByYear).flatMap(([year, yearSubjects]) => {
      const yearNum = parseInt(year);
      const totalNodes = yearSubjects.length;
      const totalHeight = (totalNodes - 1) * yOffset;

      const yearNode: ElementDefinition = {
        group: 'nodes',
        data: {
          id: `year-${year}`,
          name: `Año ${year}`
        },
        selectable: false,
        grabbable: false,
        pannable: true,
        classes: 'parent',
      };

      const subjectNodes: ElementDefinition[] = yearSubjects.map((subject, index) => ({
        group: 'nodes',
        data: {
          ...subject,
          parent: `year-${year}`,
        },
        position: {
          x: (yearNum - 1) * xOffset + (index % 2 !== 0 ? 100 : 0),
          y: -totalHeight / 2 + index * yOffset
        },
        grabbable: false,
        pannable: true,
        locked: true,
        classes: `${subject.type} center-center multiline-auto ${this.getNodeClass(student, subject)}`,
      }));

      return [yearNode, ...subjectNodes];
    });
  }

  getNodeClass(student: StudentSubject, subject: Subject): NodeStatus {
    if (!student) return 'not-available';

    const { approved = [], regularized = [], inProgress = [] } = student;
    
    if (approved.includes(subject.id)) return 'approved';
    if (regularized.includes(subject.id)) return 'regularized';
    if (inProgress.includes(subject.id)) return 'in-progress';
    if (student.id && subject.mustApproved.every(id => approved.includes(id))) return 'available';
    
    return 'not-available';
  }

  getEdges(subjects: Subject[]): EdgeDefinition[] {
    return subjects.flatMap((subject) => {
      const approved = subject.mustApproved || [];
      const regularized = (subject.mustRegularize || []).filter(id => !approved.includes(id));

      const createEdge = (sourceId: string, type: 'approved' | 'regularized'): EdgeDefinition | null => {
        const source = subjects.find(s => s.id === sourceId);
        if (!source) return null;

        return {
          group: 'edges',
          data: {
            id: `${sourceId}|${subject.id}`,
            source: sourceId,
            target: subject.id,
          },
          classes: type === 'approved' ? 'multi-unbundled-bezier' : undefined
        };
      };

      return [
        ...approved.map(id => createEdge(id, 'approved')),
        ...regularized.map(id => createEdge(id, 'regularized'))
      ].filter((edge): edge is EdgeDefinition => edge !== null);
    });
  }
}
