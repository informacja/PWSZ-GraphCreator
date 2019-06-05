var g:any, bf:any, way:Array<number>;
way = Array();

function add_edges() {
    g = new jsgraphs.WeightedDiGraph(num_of_vertex().length);
    for (let n of wg_numbers) {
        g.addEdge(new jsgraphs.Edge(n[0], n[1], n[2]));
    }
}
//
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

// if (!debug)
//     console.log = function(a:any) { return; };  // easy trick, to disable debug


// expect(g.V).to.equal(8);
function main_algorithm() {

    way = [];                               // empty array
    var edgeCount = 0;
    for (var v = 0; v < g.V; ++v) {
        var adj_v = g.adj(v);
        edgeCount += adj_v.length;
    }
// expect(edgeCount).to.equal(16);

    bf = new jsgraphs.BellmanFord(g, 0);
    out_debug.innerHTML = "";
    for (var v = 1; v < g.V; ++v) {
        if (bf.hasPathTo(v)) {
            var pathT = bf.pathTo(v);
            // console.log('=====path from 0 to ' + v + ' start==========');
            if(true && v == (g.V-1)) {
                out_debug.innerHTML += "Najlepsza droga <span >(min)</span>:<br> ";
            }
            for (var i = 0; i < pathT.length; ++i) {
                var e = pathT[i];
                // console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
                if (v == (g.V - 1)) {
                    out_debug.innerHTML += e.from() + ' -> ' + e.to() + ': ' + e.weight+"<br>";
                    way.push( e.from(), e.to() );
                    console.log(e.from() + ' => ' + e.to() + ': ' + e.weight);
                }
            }
            if(true && v == (g.V-1)) {
                out_debug.innerHTML += "Koszt: " + Number(bf.distanceTo(v));
            }
            // console.log('=====path from 0 to ' + v + ' end==========');
            // console.log('=====distance: ' + bf.distanceTo(v) + '=========');

                // out_debug.innerHTML = "Best: " + bf.edgeTo[min_index].v + " -> " + bf.edgeTo[min_index].w + " <br>weight: " + bf.edgeTo[min_index].weight;


        }
    }
}

function show_results() {

    var min_index: number = 0;   // index
    var val = Number.MAX_VALUE;   // val
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

function bellman_ford(){
    add_edges();
    main_algorithm();
    // show_results();
}