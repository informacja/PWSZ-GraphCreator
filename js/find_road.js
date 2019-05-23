function find_road(arr) {
    // equals
    var tRoad = Array();
    var n = arr.length;
    var m = links.length;
    for(i = 0; i<m; i++){
        for(j = 0; j<n; j+=2 ) {

            if(links[i].source.id == arr[j] && links[i].target.id == arr[j+1] ){
                //console.log(arr[j] + " " + arr[j+1] + " == " + links[i].source.id + " " + links[i].target.id)
                tRoad.push(i);
            }
        }
    }
    console.error(tRoad);
    return tRoad;
}