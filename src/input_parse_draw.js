let debug = false;
if (!debug)
    console.info = function (a) { return; };
let text_area = document.getElementById('textarea_in');
let out_debug = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');
var wg_match;
var wg_numbers = Array();
function wg2nubers() {
    let nums = Array();
    if (wg_match === null)
        return nums;
    for (let str of wg_match) {
        var numbers = str.match(/\d+\.*\d*/g).map(Number);
        nums.push(numbers);
    }
    wg_numbers = nums;
    console.log(wg_numbers);
    return nums;
}
function load_input() {
    let OriginalString = text_area.value;
    let weigth_graph = new RegExp(/^(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*$/mig);
    let empty_line = new RegExp(/^\s*$/mig);
    let em_l = empty_line[Symbol.match](OriginalString);
    let num_of_empty = 0;
    if (em_l !== null)
        num_of_empty = em_l.length;
    wg_match = weigth_graph[Symbol.match](OriginalString);
    wg2nubers();
    console.info("wg_numbers: " + wg_numbers);
    let count_of_match = 0;
    if (wg_match !== null)
        count_of_match = wg_match.length;
    let num_of_lines = OriginalString.split(/\r\n|\r|\n/).length;
    console.info("all lines : " + num_of_lines);
    num_of_lines -= num_of_empty;
    console.info("lines without empty: " + num_of_lines);
    console.info("match: " + count_of_match);
    if (num_of_lines != count_of_match) {
        alert_area.className += " show";
        info_warning.innerText = String(num_of_lines - count_of_match);
    }
    else {
        alert_area.className = alert_area.className.replace("show", "");
        info_warning.innerText = "";
    }
    info_success.innerText = count_of_match.toString();
    out_debug.innerHTML = wg_match.toLocaleString().replace(/,/g, '<br>');
}
function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}
function num_of_vertex() {
    let graph_ids = Array();
    let i = 0;
    for (let a of wg_numbers) {
        graph_ids[i++] = a[0];
        graph_ids[i++] = a[1];
    }
    console.info("All vertex: " + graph_ids);
    let unique = removeDups(graph_ids);
    console.info("Unique of vertex: " + unique);
    return unique;
}
function draw_graph() {
    links = [];
    nodes = [];
    nodes.length = 0;
    while (nodes.length > 0) {
        nodes.pop();
    }
    nodes.splice(0, nodes.length);
    console.warn(nodes);
    lastNodeId = 0;
    var arr = num_of_vertex();
    if (arr !== null)
        lastNodeId = Number(arr[arr.length - 1]);
    let i = 0;
    for (let a of arr) {
        nodes[i++] = { id: Number(a), reflexive: true };
    }
    i = 0;
    for (let a of wg_match) {
        a = a.split(" ");
        links[i++] = { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true };
    }
}
function parse_draw() {
    load_input();
    draw_graph();
    restart();
    bellman_ford();
}
parse_draw();
var g, bf;
function add_edges() {
    g = new jsgraphs.WeightedDiGraph(num_of_vertex().length);
    for (let n of wg_numbers) {
        g.addEdge(new jsgraphs.Edge(n[0], n[1], n[2]));
    }
}
function main_algorithm() {
    var edgeCount = 0;
    for (var v = 0; v < g.V; ++v) {
        var adj_v = g.adj(v);
        edgeCount += adj_v.length;
    }
    bf = new jsgraphs.BellmanFord(g, 0);
    out_debug.innerHTML = "";
    for (var v = 1; v < g.V; ++v) {
        if (bf.hasPathTo(v)) {
            var pathT = bf.pathTo(v);
            console.log('=====path from 0 to ' + v + ' start==========');
            for (var i = 0; i < pathT.length; ++i) {
                var e = pathT[i];
                console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
                if (v == (g.V - 1)) {
                    out_debug.innerHTML += e.from() + ' -> ' + e.to() + ': ' + e.weight + "<br>";
                }
            }
            if (true && v == (g.V - 1)) {
                out_debug.innerHTML += "Koszt: " + Number(bf.distanceTo(v));
            }
            console.log('=====path from 0 to ' + v + ' end==========');
            console.log('=====distance: ' + bf.distanceTo(v) + '=========');
        }
    }
}
function show_results() {
    var min_index = 0;
    var val = Number.MAX_VALUE;
    for (var v = 1; v < g.V; ++v) {
        if (val > bf.cost[v]) {
            val = bf.cost[v];
            min_index = v;
        }
    }
    console.log(bf);
    out_debug.innerHTML = "Best: " + bf.edgeTo[min_index].v + " -> " + bf.edgeTo[min_index].w + " <br>weight: " + bf.edgeTo[min_index].weight;
    console.log(bf.edgeTo[min_index]);
}
function bellman_ford() {
    add_edges();
    main_algorithm();
}
//# sourceMappingURL=input_parse_draw.js.map