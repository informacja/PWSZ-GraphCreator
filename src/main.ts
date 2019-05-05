// import * as fs from "fs";

// fs.readFileSync('main.ts', 'utf8');
// var trigger = "2",
// 	regexp = new RegExp('^[1-9]\d{0,2}$'),
// 	test = regexp.test(trigger);
// console.log(test + ""); // will display true

// function test(a:number):string|number {	
// 	return String(a) + 2; 			// zwraca a + 2
// }

// console.log(test(2));
// var fs = require('fs');

// fs.readFile('in.txt', 'utf8', function (err, data) {
// 	if (err) throw err;
// 	console.log(data);
// });
// var value = parseFloat(
//   (<HTMLInputElement>document.getElementById("myValue")).value
// );
// var unit = (<HTMLInputElement>document.getElementById("myUnit")).value;
// myObject: MyObject = new MyObject(value, unit);
// declare var window: Window;
// let foo = () => null;
// var toType = function(obj:Object) {
//     return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
// };
// import {deflateRaw} from "zlib";

// import {isNumber} from "util";

declare var document: Document;

let  debug = true;
if (debug)
    console.debug = function(a:any) { console.log(a) };  // easy disable debug

let text_area = document.getElementById('textarea_in');
let al = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');

var wg_match:any;
var wg_match1:Array<number>;

function load_input()
{
    let OriginalString:string = text_area.value;
    let weigth_graph = new RegExp(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/mig);
    let empty_line = new RegExp(/^\s*$/mig);

    let em_l = empty_line[Symbol.match](OriginalString);
    let num_of_empty: number = 0;
    if (em_l !== null)
        num_of_empty = em_l.length;

    wg_match = weigth_graph[Symbol.match](OriginalString);
    wg_match1 = wg_match.isPrototypeOf(1)
    let count_of_match:number = 0;
    if( wg_match !== null )
        count_of_match = wg_match.length;

    let num_of_lines: number = OriginalString.split(/\r\n|\r|\n/).length;

    console.debug("all lines : " + num_of_lines);
    num_of_lines -= num_of_empty;
    console.debug("lines without empty: " + num_of_lines);
    console.debug("match: " + count_of_match);
    if (num_of_lines != count_of_match) {
        alert_area.className += " show";
        info_warning.innerText = String(num_of_lines - count_of_match);
    }
    else {
        alert_area.className = alert_area.className.replace("show","");
        info_warning.innerText = "";
    }

    info_success.innerText = count_of_match.toString();
    al.innerHTML = wg_match.toString();
    console.debug( wg_match.toString().replace('.','\n') );
}


function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
        if(!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

function num_of_vertex():Array<number>
{
    let graph_ids = Array("");
    let i = 0;
    for( let a of wg_match )
    {
        a = a.match("\d");
        console.debug(a);
        graph_ids[i++] = a[0];
        graph_ids[i++] = a[1];
    }
    console.debug("sum of vertex: " + graph_ids);

    let unique = removeDups(graph_ids);
    console.debug("unique of vertex: " + unique);

    return unique;
}

function draw_graph()
{
    links = Array(null);

    // let num_of_ver:number = num_of_vertex();

    var arr = num_of_vertex();
    console.log(arr);
    // lastNodeId = (num_of_vertex()).length;

    nodes = [
        { id: 0, reflexive: false },
        { id: 1, reflexive: true },
        { id: 2, reflexive: true },
        { id: 3, reflexive: true },
        { id: 4, reflexive: false }
    ];
    // nodes = Array(null);
    let i = 0;
    for( let a of wg_match )
    {
        a = a.split(" ");
        links[i++] =  { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true } ;
    }

    i = 0;
    for( let a of wg_match )
    {
        a = a.split(" ");
        links[i++] =  { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true } ;
    }

    console.debug(nodes);
    console.debug(links);
}

function execute() {
    load_input();
    draw_graph();
    restart();
}

execute();

// restart();
// window.onload = () => {
// 		console.log("dddsd");
    // HTMLElement el = document.getElementById('content');
    // var greeter = new Greeter(el);
    // greeter.start();
// }
// const el: HTMLElement | null = document.getElementById("textarea_in");

// if (el) {
//   const definitelyAnElement: HTMLElement = el;
//   console.log(el.innerHTML);
// }

// npm install js-graph-algorithms
// var jsgraphs = require('js-graph-algorithms');
// var g = new jsgraphs.WeightedDiGraph(8); // 8 is the number vertices in the graph
// g.addEdge(new jsgraphs.Edge(0, 7, 0.16));
// g.addEdge(new jsgraphs.Edge(2, 3, 0.17));
// g.addEdge(new jsgraphs.Edge(1, 7, 0.19));
// g.addEdge(new jsgraphs.Edge(0, 2, 0.26));
// g.addEdge(new jsgraphs.Edge(5, 7, 0.28));
// g.addEdge(new jsgraphs.Edge(1, 3, 0.29));
// g.addEdge(new jsgraphs.Edge(1, 5, 0.32));
// g.addEdge(new jsgraphs.Edge(2, 7, 0.34));
// g.addEdge(new jsgraphs.Edge(4, 5, 0.35));
// g.addEdge(new jsgraphs.Edge(1, 2, 0.36));
// g.addEdge(new jsgraphs.Edge(4, 7, 0.37));
// g.addEdge(new jsgraphs.Edge(0, 4, 0.38));
// g.addEdge(new jsgraphs.Edge(6, 2, 0.4));
// g.addEdge(new jsgraphs.Edge(3, 6, 0.52));
// g.addEdge(new jsgraphs.Edge(6, 0, 0.58));
// g.addEdge(new jsgraphs.Edge(6, 4, 0.93));
//
// g.node(2).label = 'Hello';
// g.edge(4, 5).label = 'World'; // edge from node 4 to node 5
//
// console.log(g.V); // display 13, which is the number of vertices in g
// console.log(g.adj(0)); // display the adjacency list which are directed edges from vertex 0



// npm run start