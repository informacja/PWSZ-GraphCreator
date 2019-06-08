var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let debug = false;
if (!debug)
    console.info = function (a) { return; };
let text_area = document.getElementById('textarea_in');
let out_debug = document.getElementById('textarea_out');
let info_success = document.getElementById('array_of_success');
let info_warning = document.getElementById('array_of_warning');
let alert_area = document.getElementById('alert_lines');
let weigth_graph = new RegExp(/^(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*[\s]*$/mig);
let empty_line = new RegExp(/^\s*$/mig);
var wg_match;
var wg_numbers = Array();
function wg2nubers() {
    let nums = Array();
    if (wg_match === null)
        return nums;
    for (let str of wg_match) {
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
    for (var i = 0; i < lines.length; i++) {
        if (weigth_graph.test(lines[i].trim())) {
            $("span.tln-line:nth-of-type(" + (i + 1) + ")").css("color", "limegreen");
            console.info(i + ": " + lines[i + 1] + " " + weigth_graph.test(lines[i + 1]));
        }
        else if (empty_line.test(lines[i].trim())) {
            $("span.tln-line:nth-of-type(" + (i + 1) + ")").css("color", "gray");
        }
        else {
            $("span.tln-line:nth-of-type(" + (i + 1) + ")").css("color", "red");
        }
    }
}
function load_input() {
    let OriginalString = text_area.value;
    let em_l = empty_line[Symbol.match](OriginalString);
    let num_of_empty = 0;
    if (em_l !== null)
        num_of_empty = em_l.length;
    wg_match = weigth_graph[Symbol.match](OriginalString.trim());
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
    road = [];
    lastNodeId = nodes.length - 1;
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
        links[i++] = { source: nodes[a[0]], target: nodes[a[1]], left: false, right: true, weight: a[2] };
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.equals = function (array) {
    if (!array)
        return false;
    if (this.length != array.length)
        return false;
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
};
var can_display;
var last_wg = Array();
function parse_draw(wait = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        colorize_line_numbers();
        can_display = wait;
        while (can_display > 0) {
            yield delay(1);
            can_display--;
        }
        load_input();
        if (last_wg.equals(wg_numbers) && wait)
            return;
        last_wg = wg_numbers;
        draw_graph();
        bellman_ford();
        force = switchGravity(true);
        road = find_road(way);
        restart();
        d3.select('#app-main').dispatch('click');
        var n = document.getElementsByClassName("node");
        n[0].setPointerCapture(1);
        console.warn(n[0]);
    });
}
parse_draw();
document.getElementById("textarea_in").addEventListener("input", function () {
    parse_draw(300);
}, false);
var g, bf, way;
way = Array();
function add_edges() {
    g = new jsgraphs.WeightedDiGraph(num_of_vertex().length);
    for (let n of wg_numbers) {
        g.addEdge(new jsgraphs.Edge(n[0], n[1], n[2]));
    }
}
function main_algorithm() {
    way = [];
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
            if (true && v == (g.V - 1)) {
                out_debug.innerHTML += "Najlepsza droga <span >(min)</span>:<br> ";
            }
            for (var i = 0; i < pathT.length; ++i) {
                var e = pathT[i];
                if (v == (g.V - 1)) {
                    out_debug.innerHTML += e.from() + ' -> ' + e.to() + ': ' + e.weight + "<br>";
                    way.push(e.from(), e.to());
                    console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
                }
            }
            if (true && v == (g.V - 1)) {
                out_debug.innerHTML += "Koszt: " + Number(bf.distanceTo(v));
            }
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
function find_road(arr) {
    var tRoad = Array();
    var n = arr.length;
    var m = links.length;
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j += 2) {
            if (links[i].source.id == arr[j] && links[i].target.id == arr[j + 1]) {
                tRoad.push(i);
            }
        }
    }
    console.error(tRoad);
    return tRoad;
}
//# sourceMappingURL=input_parse_draw.js.map