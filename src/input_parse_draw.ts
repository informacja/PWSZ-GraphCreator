// import * as fs from "fs";

// fs.readFileSync('input_parse_draw.ts', 'utf8');
// var trigger = "2",
// 	regexp = new RegExp('^[1-9]\d{0,2}$'),
// 	test = regexp.test(trigger);
// console.log(test + ""); // will display true

// function test(a:number):string|number {	
// 	return String(a) + 2; 			// zwraca a + 2
// }

// console.log(test(2));
// var fs = require('fs');

// import {deflateRaw} from "zlib";

// import {isNumber} from "util";

declare var document: Document;

let  debug = false;
if (!debug)
    console.info = function(a:any) { return; };  // easy disable debug

let text_area = document.getElementById('textarea_in');
let out_debug = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');

var wg_match:any;
var wg_numbers:Array<number> = Array();

function wg2nubers():Array<number>
{
    let nums = Array();
    if(wg_match === null)
        return nums;

    for( let str of wg_match)
    {
        var numbers = str.match(/\d+\.*\d*/g).map(Number);
        nums.push(numbers);
    }
    wg_numbers = nums;
    console.info(wg_numbers);
    return nums;
}

function load_input()
{
    let OriginalString:string = text_area.value;
    // let weigth_graph = new RegExp(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/mig);
    let weigth_graph = new RegExp(/^(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*$/mig);// one line
    let empty_line = new RegExp(/^\s*$/mig);

    let em_l = empty_line[Symbol.match](OriginalString);
    let num_of_empty: number = 0;
    if (em_l !== null)
        num_of_empty = em_l.length;

    wg_match = weigth_graph[Symbol.match](OriginalString);
    // wg_numbers =
    wg2nubers();
    console.info( "wg_numbers: " + wg_numbers );

    let count_of_match:number = 0;
    if( wg_match !== null )
        count_of_match = wg_match.length;

    let num_of_lines: number = OriginalString.split(/\r\n|\r|\n/).length;

    console.info ("all lines : " + num_of_lines);
    num_of_lines -= num_of_empty;
    console.info ("lines without empty: " + num_of_lines);
    console.info ("match: " + count_of_match);
    if (num_of_lines != count_of_match) {
        alert_area.className += " show";
        info_warning.innerText = String(num_of_lines - count_of_match);
    }
    else {
        alert_area.className = alert_area.className.replace("show","");
        info_warning.innerText = "";
    }

    info_success.innerText = count_of_match.toString();
    out_debug.innerHTML = wg_match.toLocaleString().replace(/,/g,'<br>');
    // console.info ( wg_match.toString().replace(/,/,'\n') );
}


function removeDups(names:any):Array<string> {
    let unique:any = {};
    names.forEach(function(i:number) {
        if(!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

function num_of_vertex():Array<string>
{
    let graph_ids = Array();
    let i = 0;
    for( let a of wg_numbers )
    {
        graph_ids[i++] = a[0];
        graph_ids[i++] = a[1];
    }
    console.info ("All vertex: " + graph_ids);

    let unique = removeDups(graph_ids);
    console.info ("Unique of vertex: " + unique);

    return unique;
}

function draw_graph()
{
    links = []; // clear array
    nodes = []; // clear array
    nodes.length = 0;
    while(nodes.length > 0) { nodes.pop(); }
    nodes.splice(0, nodes.length);
    // console.warn( nodes );
    // restart();

    lastNodeId = 0;

    // jak wyzerować?
    // console.info ("links: " + links);

    var arr = num_of_vertex();

    if( arr !== null )
        lastNodeId = Number(arr[arr.length-1]);

    let i = 0;
    for( let a of arr )
    {
        nodes[i++] = { id: Number(a), reflexive: true };
    }

    i = 0;
    for( let a of wg_match )
    {
        a = a.split(" ");
        links[i++] =  { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true } ;
    }
    // console.info(nodes);
    // console.info(links);
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
// Object.defineProperty(Array.prototype, "equals", {enumerable: false});

var can_display:number;
var last_wg=Array();
async function parse_draw( wait:number = 0) {

    can_display = wait;
    while(can_display > 0)
    {
        await delay(1);
        can_display--;
    }

    load_input();

    if(last_wg.equals(wg_numbers) && wait)      // prevent redundant refresh graph on change
        return;
    last_wg = wg_numbers;

    draw_graph();
    restart();
    bellman_ford();
}

parse_draw();

document.getElementById("textarea_in").addEventListener("input", function () {
    parse_draw(300);
}, false);



// npm install js-graph-algorithms
// var jsgraphs = require('js-graph-algorithms');
// g.node(2).label = 'Hello';
// g.edge(4, 5).label = 'World'; // edge from node 4 to node 5
//
// console.log(g.V); // display 13, which is the number of vertices in g
// console.log(g.adj(0)); // display the adjacency list which are directed edges from vertex 0


// npm run start