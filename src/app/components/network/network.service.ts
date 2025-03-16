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
          'text-outline-width': 1,
          'text-outline-color': '#fff',
          'padding':'2px'
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
          'background-color': '#8affc7',
        }
      },
      {
        selector: ".regularized",
        style: {
          'background-color': '#fff977',
        }
      },
      {
        selector: ".in-progress",
        style: {
          'background-color': '#ffb58c',
        }
      },
      {
        selector: ".available",
        style: {
          'background-color': '	#a6cbff',
        }
      },
      {
        selector: ".parent",
        style: {
          'shape': 'round-rectangle',
          'background-color': 'whitesmoke',
          'background-opacity': 0.2,
          'border-style': 'dashed',
          'border-dash-offset': 28,
          // 'border-width': 1,
          'border-cap': 'round',
          'border-join': 'round',
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
        selector: 'edge',
        style: {
          'width': 3,
          'opacity': 0,
          'target-arrow-color': '#343a40',
          'target-arrow-shape': 'triangle',
          'target-distance-from-node': 2,
          'curve-style': 'bezier',
          'line-fill': "linear-gradient"
          
        },
      },
      {
        selector: 'edge.show',
        style: {
          'opacity': 1,
        },
      },
      {
        selector: 'node.hide',
        style: {
          'opacity': .1,
        },
      }, {
        "selector": "edge.multi-unbundled-bezier",
        "style": {
          "curve-style": "unbundled-bezier",
          "control-point-distances": [40, -40],
          "control-point-weights": [0.250, 0.75]
        }
      },  {
        "selector": "edge.taxi",
        "style": {
          "curve-style": "taxi",
          "taxi-direction": "rightward",
          "taxi-turn": 20,
          "taxi-turn-min-distance": 5,
          "taxi-radius": 10
        }
      }
    ]
  }

  getDataSet(student: StudentSubject, subjects: Subject[]) {
    let nodes = this.transformSubjectsToNodes(student, subjects);
    let links: any[] = this.getEdges(subjects);
    return { nodes, links }
  }

    
  transformSubjectsToNodes(student: StudentSubject, subjects: Subject[]) {
    const xOffset = 300; // Distancia horizontal entre columnas
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
        const x = (yearNum - 1) * xOffset + (index % 2 != 0 ? 100 : 1); // Posición X en base al año
        const y = -totalHeight / 2 + index * yOffset; // Posición Y centrada en y = 0

        let nodeClass = '';
        
        if(_.find(student?.approved || [], (s: string) => s === subject.id)) {
          nodeClass = 'approved'
        }
        else if(_.find(student?.regularized || [], (s: string) => s === subject.id)) {
          nodeClass = 'regularized'
        }
        else if(_.find(student?.inProgress || [], (s: string) => s === subject.id)) {
          nodeClass = 'in-progress'
        }
        else if(student && _.every(subject.mustApproved, (id) => _.includes(student.approved, id))) {
          nodeClass =  'available'
        }
        else {
          nodeClass =  'not-available'
        }

        nodes.push({
          group: 'nodes',
          data: {
            ...subject,
            parent: `year-${year}`,
          },
          position: { x, y },
          classes: `center-center multiline-auto ${nodeClass}`,  
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
            },
            classes: 'multi-unbundled-bezier'
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
