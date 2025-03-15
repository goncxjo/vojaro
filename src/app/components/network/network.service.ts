import { ElementRef, Injectable } from "@angular/core";
import { Subject } from "../../backend/models/subject/subject";
import _ from "lodash";
import cytoscape from "cytoscape";
import { StudentSubject } from "../../backend/models/subject/subject-subject";

@Injectable()
export class NetworkService {

  create(container: ElementRef<any>) {
    return cytoscape({
      container: container.nativeElement,
      elements: [],
      style: this.getStyles()
    });
  }

  getStyles(): cytoscape.StylesheetJson | Promise<cytoscape.StylesheetJson> | undefined {
    return [
      {
        selector: 'node',
        style: {
          'label': 'data(name)',
          'width': 40,
          'height': 40,
          'background-color': '#BEBEBE',
          'text-outline-width': 1,
          'text-outline-color': '#fff',
        }
      },
      {
        selector: ".center-center",
        style: {
          "font-size": '10',
          "text-valign": "center",
          "text-halign": "center"
        }
      },
      {
        selector: ".multiline-auto",
        style: {
          "text-wrap": "wrap",
          "text-max-width": '100'
        }
      },
      {
        selector: ".approved",
        style: {
          'background-color': '#34a853',
        }
      },
      {
        selector: ".regularized",
        style: {
          'background-color': '#673ab7',
        }
      },
      {
        selector: ".in-progress",
        style: {
          'background-color': '#fbbc05',
        }
      },
      {
        selector: ".available",
        style: {
          'background-color': '#4285f4',
        }
      },
      {
        selector: ".parent",
        style: {
          'background-color': '#F5F5F5',
        }
      },
      {
        selector: ".selected",
        style: {
          'border-color': '#03a9f4',
          'border-width': 4,
          'opacity': 1,
        }
      },
      {
        selector: ".approved",
        style: {
          'background-color': '#00ff00'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 3,
          'opacity': 0,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        },
      },
      {
        selector: 'edge.show',
        style: {
          'opacity': .5,
        },
      },
      {
        selector: 'node.hide',
        style: {
          'opacity': .1,
        },
      },
    ]
  }

  getDataSet(student: StudentSubject, subjects: Subject[]) {
    let nodes = this.transformSubjectsToNodes(student, subjects);
    let links: any[] = this.getEdges(subjects);
    return { nodes, links }
  }

    
  transformSubjectsToNodes(student: StudentSubject, subjects: Subject[]) {
    const xOffset = 200; // Distancia horizontal entre columnas
    const yOffset = 50; // Distancia vertical entre nodos en la columna
  
    // Agrupar nodos por año
    const subjectsByYear: Record<number, Subject[]> = {};
    subjects.forEach(subject => {
      subjectsByYear[subject.year] = subjectsByYear[subject.year] || [];
      subjectsByYear[subject.year].push(subject);
    });
  
    // Generar nodos equilibrados
    const nodes: any[] = [];
    Object.entries(subjectsByYear).forEach(([year, subjects]) => {
      const yearNum = parseInt(year);
      const totalNodes = subjects.length;
      const totalHeight = (totalNodes - 1) * yOffset; // Altura total de la columna
  
      nodes.push({
        group: 'nodes',
        data: {
          id: `year-${year}`,
          name: `Año ${year}`
        },
        selectable: false,
        grabbable: false,
        classes: 'parent',  
      })

      subjects.forEach((subject, index) => {
        const x = (yearNum - 1) * xOffset; // Posición X en base al año
        const y = -totalHeight / 2 + index * yOffset; // Posición Y centrada en y = 0

        const statusApproved = _.find(student?.approved || [], (s: string) => s === subject.id) ? 'approved' : '';
        const statusRegularized = _.find(student?.regularized || [], (s: string) => s === subject.id) ? 'regularized' : '';
        const statusInProgress = _.find(student?.inProgress || [], (s: string) => s === subject.id) ? 'in-progress' : '';
        const statusAvailable = _.every(subject.mustApproved, (id) => _.includes(student?.approved, id)) ? 'available' : '';

        nodes.push({
          group: 'nodes',
          data: {
            ...subject,
            parent: `year-${year}`,
          },
          position: { x, y },
          classes: `center-center multiline-auto ${statusApproved} ${statusRegularized} ${statusInProgress} ${statusAvailable}`,  
        });
      });
    });
  
    return nodes;
  }

  getEdges(subjects: Subject[]): any[] {
    const links: any[] = [];
    subjects.forEach((s: any) => {
      const approved = s.mustApproved || [];
      const regularized = s.mustRegularized || [];
      const realRegularized = _.difference(regularized, approved);
  
      approved.forEach((i: any) => {
        if(_.some(subjects, (x: any) => x.id == i) && _.some(subjects, (x: any) => x.id == i)) {
          const newLink = {
            group: 'edges',
            data: {
              id: `${i}|${s.id}`,
              source: _.find(subjects, (x: any) => x.id == i)?.id,
              target: _.find(subjects, (x: any) => x.id == s.id)?.id,
            }
          }
          links.push(newLink);
        }
      });
  
      realRegularized.forEach((i: any) => {
        if(_.some(subjects, (x: any) => x.id == i) && _.some(subjects, (x: any) => x.id == i)) {
          const newLink = {
            group: 'edges',
            data: {
              id: `${i}|${s.id}`,
              source: _.find(subjects, (x: any) => x.id == i)?.id,
              target: _.find(subjects, (x: any) => x.id == s.id)?.id,
            }
          }
          links.push(newLink);
        }
      });
    });
    return links;
  }

}
