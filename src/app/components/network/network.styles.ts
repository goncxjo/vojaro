export const networkStyles: cytoscape.StylesheetJson = [
    {
      selector: 'node',
      style: {
        'label': 'data(name)',
        'text-outline-width': 1,
        'text-outline-color': '#fff',
        'padding':'15px'
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
        'background-color': '#a6cbff',
      }
    },
    {
      selector: ".not-available",
      style: {
        'background-color': '#bfc9ca',
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
        'padding':'25px',
      }
    },
    {
      selector: ".final",
      style: {
        "shape": "star"
      }
    },
    {
      selector: ".elective",
      style: {
        "shape": "round-rectangle"
      }
    },
    {
      selector: ".placeholder",
      style: {
        "shape": "round-rectangle",
      }
    },
    {
      selector: ".cross-disciplinary",
      style: {
        "shape": "round-triangle"
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