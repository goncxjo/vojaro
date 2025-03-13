import { ElementRef, Injectable } from "@angular/core";
import { Subject, SubjectList } from "../../backend/models/subject/subject";
import _ from "lodash";
import cytoscape from "cytoscape";
import cytoscapeCxtmenu from "cytoscape-cxtmenu";
// import { defineGraph, defineLink, defineNodeWithDefaults, Graph, GraphController } from "d3-graph-controller";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  create(container: ElementRef<any>) {
    cytoscape.use(cytoscapeCxtmenu);

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
        selector: ".parent",
        style: {
          'background-color': '#F5F5F5',
        }
      },
      {
        selector: ".selected",
        style: {
          'border-color': '#0000ff',
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

  getDataSet(subjects: SubjectList[]) {
    let nodes = this.transformSubjectsToNodes(subjects);
    let links: any[] = this.getEdges(subjects);
    return { nodes, links }
  }

  getEdges(subjects: SubjectList[]): any[] {
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
  
  transformSubjectsToNodes(subjects: any[]) {
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
  
        nodes.push({
          group: 'nodes',
          data: {
            ...subject,
            parent: `year-${year}`,
          },
          position: { x, y },
          classes: 'center-center multiline-auto',  
        });
      });
    });
  
    return nodes;
  }

  // transformSubjectsToNodes(subjects: any[]) {
  //   const xOffset = 400; // Distancia horizontal entre columnas
  //   const yOffset = 100; // Distancia vertical entre nodos
  //   const columnOffset = 200; // Distancia entre las dos columnas del mismo año
  
  //   // Agrupar nodos por año
  //   const subjectsByYear: Record<number, Subject[]> = {};
  //   subjects.forEach(subject => {
  //     subjectsByYear[subject.year] = subjectsByYear[subject.year] || [];
  //     subjectsByYear[subject.year].push(subject);
  //   });
  
  //   // Generar nodos con posiciones
  //   const nodes: any[] = [];
  //   Object.entries(subjectsByYear).forEach(([year, subjects]) => {
  //     const yearNum = parseInt(year);
  
  //     // Calcular cantidad de conexiones para cada nodo
  //     const subjectsWithConnections = subjects.map(subject => ({
  //       ...subject,
  //       connections: (subject.mustApproved?.length || 0) + (subject.mustRegularize?.length || 0),
  //     }));
  
  //     // Ordenar los nodos por cantidad de conexiones, descendente
  //     subjectsWithConnections.sort((a, b) => a.connections - b.connections);
  
  //     // Dividir los nodos en dos columnas
  //     const middle = Math.ceil(subjectsWithConnections.length / 2);
  //     const firstColumn = subjectsWithConnections.slice(0, middle);
  //     const secondColumn = subjectsWithConnections.slice(middle);
  
  //     nodes.push({
  //       group: 'nodes',
  //       data: {
  //         id: `year-${year}`,
  //         name: `Año ${year}`
  //       },
  //       selectable: false,
  //       grabbable: false,
  //     })
      
  //     // Posicionar nodos en la primera columna
  //     firstColumn.forEach((subject, index) => {
  //       const x = (yearNum - 1) * xOffset; // Columna izquierda
  //       const y = -((firstColumn.length - 1) * yOffset) / 2 + index * yOffset; // Centrar en Y
  
  //       nodes.push({
  //         group: 'nodes',
  //         data: {
  //           ...subject,
  //           parent: `year-${year}`
  //         },
  //         position: { x, y },
  //         classes: 'bottom-center multiline-auto',  
  //       });
  //     });
  
  //     // Posicionar nodos en la segunda columna
  //     secondColumn.forEach((subject, index) => {
  //       const x = (yearNum - 1) * xOffset + columnOffset; // Columna derecha
  //       const y = -((secondColumn.length - 1) * yOffset) / 2 + index * yOffset; // Centrar en Y
  
  //       nodes.push({
  //         group: 'nodes',
  //         data: {
  //           ...subject,
  //           parent: `year-${year}`
  //         },
  //         position: { x, y },
  //         classes: 'bottom-center multiline-auto', 
  //       });
  //     });
  //   });
  
  //   return nodes;
  // }
}
