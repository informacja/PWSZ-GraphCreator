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

declare var document: Document;
var ta = document.getElementById('textarea_in');
let al = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');
var OriginalString:string = ta.innerHTML;

let regex = new RegExp(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/mig);
var t = regex[Symbol.match](OriginalString);

let num_of_lines:number = OriginalString.split(/\r\n|\r|\n/).length;
let num_of_empty:number = OriginalString.split(/^\s*$/).length;
num_of_lines -= num_of_empty;
console.log("lines: " + num_of_lines);
console.log("match: "+ t.length);
if(num_of_lines != t.length)
{
    alert_area.className += " show";
    info_warning.innerText = num_of_lines - t.length;

}

// al.innerText = typeof (c);
// var StrippedString = OriginalString.test(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/,);
info_success.innerText = t.length.toString();

al.innerHTML = t.toString();
console.log(OriginalString);

links = [
    { source: nodes[2], target: nodes[0], left: false, right: true },
    { source: nodes[1], target: nodes[0], left: false, right: true }
];

restart();
console.log(links);

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