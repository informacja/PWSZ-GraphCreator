// import * as fs from "fs";

// fs.readFileSync('input_parse_draw.ts', 'utf8');
// var trigger = "2",
// 	regexp = new RegExp('^[1-9]\d{0,2}$'),
// 	test = regexp.test(trigger);
// console.log(test + ""); // will display true

declare var document: Document;

let  debug = false;
if (!debug)
    console.info = function(a:any) { return; };  // easy trick, to disable debug

let text_area = document.getElementById('textarea_in');
let out_debug = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');

let weigth_graph:RegExp = new RegExp(/^(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*[\s]*$/mig);// one line
let empty_line:RegExp = new RegExp(/^\s*$/mig);

var wg_match:any;                           // vertex are passed validation
var wg_numbers:Array<number> = Array();     //

function wg2nubers():Array<number>
{
    let nums = Array();
    if(wg_match === null)
        return nums;

    for( let str of wg_match)
    {
        str = str.trim();
        var numbers = str.match(/\d+\.*\d*/g).map(Number);
        nums.push(numbers);
    }
    wg_numbers = nums;
    console.info(wg_numbers);
    return nums;
}

function colorize_line_numbers() {
    var lines = text_area.value.split('\n');
    for(var i:number = 0; i < lines.length; i++) {
        //code here using lines[i] which will give you each line
        if ( weigth_graph.test(lines[i].trim()) ) {
            $("span.tln-line:nth-of-type(" + (i+1) + ")").css("color", "limegreen");
            // line bellow is needed to colors works propely :)
            console.info(i + ": " + lines[i + 1] + " " + weigth_graph.test(lines[i + 1])); //IMPORTANT: don't comment
        } else if ( empty_line.test(lines[i].trim()) ){
            $("span.tln-line:nth-of-type(" + (i+1) + ")").css("color", "gray");
        }else {
            $("span.tln-line:nth-of-type(" + (i+1) + ")").css("color", "red");
        }
    }
}

function load_input()
{
    let OriginalString:string = text_area.value;
    // let weigth_graph = new RegExp(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/mig);

    let em_l = empty_line[Symbol.match](OriginalString);
    let num_of_empty: number = 0;
    if (em_l !== null)
        num_of_empty = em_l.length;

    wg_match = weigth_graph[Symbol.match](OriginalString.trim());
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
    nodes = [];
    road  = [];

    lastNodeId = nodes.length - 1;

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
        links[i++] =  { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true, weight: a[2] } ;
        // wagi

    }
    // console.info(nodes);
    // console.info(links);
}

// ---------------------------------------------------------------------------------------------------------------------

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

// this.getModelString = function () {
//     var modelString = '';
//
//     _states.forEach(function (state) {
//         if (state) {
//             modelString += 'A' + Object.keys(state.assignment).join();
//             modelString += 'S' + state.successors.join();
//         }
//         modelString += ';';
//     });
//
//     return modelString;
// };

// function showLinkDialog() {
//     linkInputElem.value = 'http://rkirsling.github.com/modallogic/?model=' + model.getModelString();
//
//     backdrop.classed('inactive', false);
//     setTimeout(function() { backdrop.classed('in', true); linkDialog.classed('inactive', false); }, 0);
//     setTimeout(function() { linkDialog.classed('in', true); }, 150);
// }

//
// this.loadFromModelString = function (modelString) {
//     var regex = /^(?:;|(?:A|A(?:\w+,)*\w+)(?:S|S(?:\d+,)*\d+);)+$/;
//     if (!regex.test(modelString)) return;
//
//     _states = [];
//
//     var self = this,
//         successorLists = [],
//         inputStates = modelString.split(';').slice(0, -1);
//
//     // restore states
//     inputStates.forEach(function (state) {
//         if (!state) {
//             _states.push(null);
//             successorLists.push(null);
//             return;
//         }
//
//         var stateProperties = state.match(/A(.*)S(.*)/).slice(1, 3)
//             .map(function (substr) { return (substr ? substr.split(',') : []); });
//
//         var assignment = {};
//         stateProperties[0].forEach(function (propvar) { assignment[propvar] = true; });
//         _states.push({assignment: assignment, successors: []});
//
//         var successors = stateProperties[1].map(function (succState) { return +succState; });
//         successorLists.push(successors);
//     });
//
//     // restore transitions
//     successorLists.forEach(function (successors, source) {
//         if (!successors) return;
//
//         successors.forEach(function (target) {
//             self.addTransition(source, target);
//         });
//     });
// };


// let weigth_graph = new RegExp(/^(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*$/mig);// one line
// let empty_line = new RegExp(/^\s*$/mig);
// ---------------------------------------------------------------------------------------------------------------------

var can_display:number;
var last_wg=Array();

async function parse_draw( wait:number = 0) {

    colorize_line_numbers();

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
    // restart();
    bellman_ford();
    force = switchGravity(true);
    road = find_road(way);

    restart()
    // update_road();
    // kolorowanie drogi

    d3.select('#app-main').dispatch('click');
    var n = document.getElementsByClassName("node");
    n[0].setPointerCapture(1);
    console.warn(n[0]);
    // n[0].dispatch('click');
    // circle.class node
}

parse_draw();

document.getElementById("textarea_in").addEventListener("input", function () {
    parse_draw(300);
}, false);



