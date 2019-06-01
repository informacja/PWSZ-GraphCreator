const width = document.getElementById('app-main').clientWidth;
const height = document.getElementById('app-main').clientHeight;

let route = "{{ path('blog_show', {'slug': 'my-blog-post'})|escape('js') }}";

// set up SVG for D3
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("#app-main")
  .append('svg')
  .on('contextmenu', () => {
    d3.event.preventDefault();
  })
  .attr('width', width)
  .attr('height', height);

// mouse event vars
let selectedNode = null;
let selectedLink = null;
let mousedownLink = null;
let mousedownNode = null;
let mouseupNode = null;

function resetMouseVars() {
  mousedownNode = null;
  mouseupNode = null;
  mousedownLink = null;
}

//Switch Gravity
function switchGravity(status) {
  if (status) {
    gravityStatus = true;
    return d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.id).distance(-500))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('x', d3.forceX(width / 2))
      .force('y', d3.forceY(height / 2))
      .on('tick', tick);
    x
  } else {
    gravityStatus = false;
    return d3.forceSimulation()
      .on('tick', tick);
  }
}


let gravityStatus = true;

// init D3 force layout
var force = switchGravity(gravityStatus);

//Responsive module
$(window).resize(function () {
  const width = document.getElementById('app-main').clientWidth;
  const height = document.getElementById('app-main').clientHeight;
  svg
    .attr('width', width)
    .attr('height', height);
});

// set up initial nodes and links
//  - nodes are known by 'id', not by index in array.
//  - links are always source < target; edge directions are set by 'left' and 'right'.

//  Variable to remember before restart app: nodes, lastNodeId, links,road,gravityStatus
var nodes = [

  // {
  //   id: 0,
  //   x: 403.174,
  //   y: 104
  // },
  // {
  //   id: 1,
  //   x: 303.174,
  //   y: 134
  // },
  // {
  //   id: 2,
  //   x: 303.174,
  //   y: 274
  // },
  // {
  //   id: 3,
  //   x: 203.174,
  //   y: 304
  // },
  // {
  //   id: 4,
  //   x: 403.174,
  //   y: 334
  // },
  // {
  //   id: 5,
  //   x: 303.174,
  //   y: 314
  // }

// {id: 0, reflexive: true, index: 0, x: 558.4707862842586, y: 367.50716557566096},
// {id: 1, reflexive: true, index: 1, x: 563.2124458468292, y: 143.91643240635614},
// {id: 2, reflexive: true, index: 2, x: 508.2490077015699, y: 260.11369822665824},
// {id: 3, reflexive: true, index: 3, x: 402.8606447764752, y: 258.2458273046466 },
// {id: 4, reflexive: true, index: 4, x: 652.1386969379388, y: 428.44456845794275},
// {id: 5, reflexive: true, index: 5, x: 714.2535862472029, y: 262.23901972921607},
// {id: 6, reflexive: true, index: 6, x: 463.49686435360064,y: 429.83869753142073},
// {id: 7, reflexive: true, index: 7, x: 612.726376673452,  y: 259.2764187018464 }

];

// count nodes
let lastNodeId = nodes.length - 1;

var links = [
  // {
  //   source: nodes[0],
  //   target: nodes[1],
  //   left: false,
  //   right: true,
  //   weight: 12
  // },
  // {
  //   source: nodes[1],
  //   target: nodes[2],
  //   left: false,
  //   right: true,
  //   weight: 41
  // },
  // {
  //   source: nodes[3],
  //   target: nodes[2],
  //   left: false,
  //   right: true,
  //   weight: 41
  // },
  // {
  //   source: nodes[1],
  //   target: nodes[4],
  //   left: false,
  //   right: true,
  //   weight: 41
  // },
  // {
  //   source: nodes[5],
  //   target: nodes[0],
  //   left: false,
  //   right: true,
  //   weight: 41
  // }
];

var road = [];

// init D3 drag support
const drag = d3.drag()
  // Mac Firefox doesn't distinguish between left/right click when Ctrl is held... 
  .filter(() => d3.event.button === 0 || d3.event.button === 2)
  .on('start', (d) => {

    d.fx = d.x;
    d.fy = d.y;
  })
  .on('drag', (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  })
  .on('end', (d) => {

    d.fx = null;
    d.fy = null;
  });

// define arrow markers for graph links
svg.append('svg:defs').append('svg:marker')
  .attr('id', 'end-arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 6)
  .attr('markerWidth', 3)
  .attr('markerHeight', 3)
  .attr('orient', 'auto')
  .append('svg:path')
  .attr('d', 'M0,-5L10,0L0,5')
  .attr('fill', '#000');

svg.append('svg:defs').append('svg:marker')
  .attr('id', 'start-arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 4)
  .attr('markerWidth', 3)
  .attr('markerHeight', 3)
  .attr('orient', 'auto')
  .append('svg:path')
  .attr('d', 'M10,-5L0,0L10,5')
  .attr('fill', '#000');


// line displayed when dragging new nodes
const dragLine = svg.append('svg:path')
  .attr('class', 'link dragline hidden')
  .attr('d', 'M0,0L0,0');

// handles to link and node element groups
let path = svg.append('svg:g').selectAll('path');
let circle = svg.append('svg:g').selectAll('g');
let weight = svg.append('svg:g').selectAll('text');

// to erase
// let a = svg.append("text") 
//     .attr("x", (width / 2))
//     .attr("y", (20))
//     .attr("text-anchor", "middle")
//     .style("font-size", "11px")
//     .style("font-family", "monospace")
//     .style('fill', 'darkOrange')
//     .text("grawitacja");
//
// svg.insert("rect","text")
//     .attr("width", function(d){return 40})
//     .attr("height", function(d){return 40})
//     .style("fill", "lightblue");
//
//
// var textNode = node.filter(function(d) {return (!d.image)})
//
// textNode.append("text")
//     .attr("class", "text")
//     .attr("text-anchor", "middle")
//     .attr("dx", 0)
//     .attr("dy", ".35em")
//     .text(function(d) {
//       return d.name;
//     }).call(getBB);
// textNode.insert("rect","text")
//     .attr("width", function(d){return d.bbox.width})
//     .attr("height", function(d){return d.bbox.height})
//     .style("fill", "yellow");
//
// function getBB(selection) {
//   selection.each(function(d){d.bbox = this.getBBox();})
// }
// update force layout (called automatically each iteration)
function tick() {

  // draw directed edges with proper padding from node centers
  console.log();
  path.attr('d', (d) => {
    const deltaX = d.target.x - d.source.x;
    const deltaY = d.target.y - d.source.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normX = deltaX / dist;
    const normY = deltaY / dist;
    const sourcePadding = d.left ? 17 : 3;
    const targetPadding = d.right ? 17 : 3;
    const sourceX = d.source.x + (sourcePadding * normX);
    const sourceY = d.source.y + (sourcePadding * normY);
    const targetX = d.target.x - (targetPadding * normX);
    const targetY = d.target.y - (targetPadding * normY);

    return `M${sourceX},${sourceY}L${targetX},${targetY}`;

  });
  weight.attr('x', (d) => {
      var x = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).x;
      return x;
    })
    .attr('y', (d) => {
      var y = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).y;
      return y;
    });

  circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
}

function get_class_link(d) {
  // road = [1,3,4]
  // console.log(links.indexOf(d) + " == "  );
  // console.log(road);
  if (road.indexOf(links.indexOf(d)) !== -1)
  {

    return 'link road';
  }
  else{ return 'link'; }

}

// function render() {
//   path = svg.selectAll('path').data([shapeCoords])
//   path.attr('d', function (d) {
//     return line(d) + 'Z'
//   })
//       .style('stroke-width', 1)
//       .style('stroke', 'steelblue');
//   path.enter().append('svg:path').attr('d', function (d) {
//     return line(d) + 'Z'
//   })
//       .style('stroke-width', 1)
//       .style('stroke', 'steelblue');
//   path.exit().remove()
// }

// update graph (called when needed)
function restart() {
  //refresh road and weight if path its not empty
  if(path["_groups"][0].length > 0)
  {
    path.remove();
    path = path.data(path).enter().append('svg:path').attr('class', function(d) {return get_class_link(d)}).exit().remove();
  }

  path.length = 0;

  // svg.append('svg:g').selectAll('path').remove(); // nie bangla bo usuwa całkowicie
  // path = svg.append('svg:g').selectAll('path'); //  TODO dupikuje graf :)


  // console.warn(path);
  path = path.data(links);

  // update existing links
  path.classed('selected', (d) => d === selectedLink)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '');

  // remove old links
  path.exit().remove();
  // add new links
  path = path.enter() //TODO nie jest wykonywaniy po zmianie danycb wejściowycn przy usuwaniau puunktow
    .append('svg:path')
      .attr('class', function(d) {
      return get_class_link(d);
    })
    .classed('selected', (d) => d === selectedLink)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
    .on('mousedown', (d) => {
      if (d3.event.ctrlKey) return;
      // select link
      mousedownLink = d;
      selectedLink = (mousedownLink === selectedLink) ? null : mousedownLink;
      selectedNode = null;
      restart();
    })
    .merge(path);

   // path = svg.append("svg:g")
      // .selectAll("line")
      // .data(force.links())
      // .enter().append("svg:path")
      // .attr("class", "link");
      // .style("stroke-width", function (d) { return Math.sqrt(d.value); })
      // .style("stroke", function(d){
        // return color(d.value)
      // });

  // circle (node) group

  // NB: the function arg is crucial here! nodes are known by id, not by index!
  circle = circle.data(nodes, (d) => d.id);

  // update existing nodes ( selected visual states)
  circle.selectAll('circle')
    .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id));

  // remove old nodes
  circle.exit().remove();

  // add new nodes
  const g = circle.enter().append('svg:g');

  g.append('svg:circle')
    .attr('class', 'node')
    .attr('r', 12)
    .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id))
    .style('stroke', (d) => d3.rgb(colors(d.id)).darker().toString())
    .on('mouseover', function (d) {
      if (!mousedownNode || d === mousedownNode) return;
      // enlarge target node
      d3.select(this).attr('transform', 'scale(1.2)');
    })
    .on('mouseout', function (d) {
      if (!mousedownNode || d === mousedownNode) return;
      // unenlarge target node
      d3.select(this).attr('transform', '');
    })
    //Ustawic pod bindy
    .on('mousedown', (d) => {
      if (d3.event.ctrlKey) return;

      // select node
      mousedownNode = d;
      selectedNode = (mousedownNode === selectedNode) ? null : mousedownNode;
      selectedLink = null;

      restart();
    })
    .on('mouseup', function (d) {
      if (!mousedownNode) return;

      // needed by FF
      dragLine
        .classed('hidden', true)
        .style('marker-end', '');

      // check for drag-to-self
      mouseupNode = d;
      if (mouseupNode === mousedownNode) {
        resetMouseVars();
        return;
      }

      // unenlarge target node
      d3.select(this).attr('transform', '');

      // add link to graph (update if exists)
      // NB: links are strictly source < target; arrows separately specified by booleans
      const isRight = mousedownNode.id < mouseupNode.id;
      const source = isRight ? mousedownNode : mouseupNode;
      const target = isRight ? mouseupNode : mousedownNode;

      const oldLink = links.filter(p => p.source.id == source.id && p.target.id == target.id)[0];

      var link = links.filter((l) => l.source === source && l.target === target)[0];
      if (oldLink) link = oldLink;

      if (link) {
        if (isRight) {
          var tmp = source;
          (link) => link.source = target;
          (link) => link.target = tmp;
          (link) => link.left = false;
          (link) => link.right = true;
        } else {
          link.left = true;
          link.right = false;
        }
      } else {
        links.push({
          source,
          target,
          left: !isRight,
          right: isRight
        });
      }

      // select new link
      selectedLink = link;
      selectedNode = null;
      restart();
    });

  // show node IDs
  g.append('svg:text')
    .attr('x', 1)
    .attr('y', 4)
    .attr('class', 'id')
    .text((d) => d.id);

  circle = g.merge(circle);
    // update weight display
  if(weight["_groups"][0].length > 0)
  {
    weight.remove();
    weight = weight.data(links).enter().enter()
    .append('svg:text')
    .attr('class', 'weight')
    .attr('x', (d) => {
      var x = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).x;
      return x;
    })
    .attr('y', (d) => {
      var y = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).y;
      return y;
    })
    .text((d) => {
      if (d.weight === undefined) {
        d.weight = "?";
      }
      return d.weight;
    })
    .merge(weight).exit();
  }

  // start weight display
  weight = weight.data(links);

  weight.exit().remove();

  weight = weight.enter()
    .append('svg:text')
    .attr('class', 'weight')
    .attr('x', (d) => {
      var x = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).x;
      return x;
    })
    .attr('y', (d) => {
      var y = weightXY(d.source.x, d.source.y, d.target.x, d.target.y).y;
      return y;
    })
    .text((d) => {
      if (d.weight === undefined) {
        d.weight = "?";
      }
      return d.weight;
    })
    .merge(weight);

  // set the graph in motion
  force.nodes(nodes);

  force.alphaTarget(0.3).restart();
}

function weightXY(x1, y1, x2, y2) {

  var dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var x2 = (x1 + x2) / 2;
  var y2 = (y1 + y2) / 2;

  var m1 = (y2 - y1) / (x2 - x1);
  var m2 = -1 / m1;
  var c2 = y2 - m2 * x2;
  var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  var v = 16;
  d = d * d + v * v;
  var D = d;
  var z1 = c2 - y1;

  var a = 1 + m2 * m2;
  var b = 2 * m2 * z1 - 2 * x1;
  var c = x1 * x1 + z1 * z1 - D;

  var delta = b * b - 4 * a * c;

  delta = Math.sqrt(delta);

  var x_1 = (-b + delta) / (2 * a);
  var y_1 = m2 * x_1 + c2;

  return {
    x: x_1,
    y: y_1
  };
}

function mousedown() {
  if (mousedownNode) {
    circle.call(drag);
    svg.classed('ctrl', true);
  }
  restart();
}

function mousemove() {
  if (!mousedownNode) return;
}

function mouseup() {
  if (mousedownNode) {
    // hide drag line
    dragLine
      .classed('hidden', true)
      .style('marker-end', '');
  }
  // because :active only works in WebKit?
  svg.classed('active', false);

  // clear mouse event vars
  resetMouseVars();
}

function spliceLinksForNode(node) {
  const toSplice = links.filter((l) => l.source === node || l.target === node);
  for (const l of toSplice) {
    links.splice(links.indexOf(l), 1);
  }
}

// only respond once per keydown
let lastKeyDown = -1;

function keydown() {
  // d3.event.preventDefault();

  if (lastKeyDown !== -1) return;
  lastKeyDown = d3.event.keyCode;

  // ctrl
  if (lastKeyDown === 17) {
    circle.call(drag);
    svg.classed('ctrl', true);
    return;
  }
  if (lastKeyDown === 32) {
    force.stop()
    force = switchGravity(!gravityStatus);
    force.stop()
    restart();
  }
  // if (!selectedNode && !selectedLink) return;

}

function keyup() {
  lastKeyDown = -1;
  // ctrl
  if (d3.event.keyCode === 17) {
    //circle.on('.drag', null);
    svg.classed('ctrl', false);
  }
}

// app starts here
svg.on('mousedown', mousedown)
  .on('mousemove', mousemove)
  .on('mouseup', mouseup);
d3.select(window)
  .on('keydown', keydown)
  .on('keyup', keyup);
restart();


d3.select('#app-main').dispatch('click');