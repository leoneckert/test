function init(){
    var the_textarea = document.createElement('textarea') 
    the_textarea.id = "the_textarea";
    var w = 700;
    var h = 200;
    the_textarea.style.width = String(w) + "px";
    the_textarea.style.height = String(h) + "px";
    the_textarea.style.marginLeft = String(window.innerWidth/2 - w/2) + "px";
    the_textarea.style.fontSize = "1.5em";
    document.getElementById("textarea_wrapper").appendChild(the_textarea);

    
    window.addEventListener("keydown", dealWithKeyboard, false);
    // window.addEventListener("keypress", dealWithKeyboard, false);
    window.addEventListener("keyup", dealWithKeyboard, false);
    
    var first = true;
    var startTime = null;

    var spaceCircles = [];
    function dealWithKeyboard(e) {
        // gets called when any of the keyboard events are overheard
        if(e.type == "keydown" || e.type == "keyup"){
            console.log(e.type);
            console.log(e.keyCode);
            console.log(e.timeStamp);
            console.log("------");


            var time = Date.now();
            if(first){
                first = false;
                startTime = time;
            }
            console.log("seconds", time - startTime);
            if(e.type == "keydown"){
                
                spaceCircles.push({
                    'down': time - startTime,
                    'up': null,
                    'value': e.keyCode
                });
                console.log(spaceCircles);
                // updateGraph();
            }else{
                for(var i = spaceCircles.length - 1; i >= 0; i--){
                    if(spaceCircles[i]['value'] == e.keyCode){
                        spaceCircles[i].up = time - startTime;
                        break;
                    }
                } 
            }
        }
    }
    var timebar = [0];
    var startingTime = Date.now()/100;
    // var spaceCircles = [30, 70, 110];
    var svgContainer = d3.select("#viz_wrapper").append("svg")
                                        .attr("width", window.innerWidth)
                                        .attr("height", 400)
                                        .style("border", "1px solid black");


   function updateGraph(){
        // var circles = svgContainer.selectAll("rect")
        //                           .data(spaceCircles)
        //                           .enter()
        //                           .append("rect");
        // var circleAttributes = circles
        //                        .attr("x", function(d) {
        //                            return d['down'];
        //                        })
        //                        .attr("y", function(d) {
        //                            return d['value'] * 3;
        //                        })
        //                        .attr("width", function(d) {
        //                            if(d['up'] == null){
        //                                return (Date.now() - startTime) - d['down'];
        //                            }else{
        //                                 return d['up'] -  d['down']   ;
        //                            }
        //                        })
        //                        .attr("height", 3)
        //                        .attr("fill", "black")
        //                        .attr("opacity", 0.5);
       var bar = svgContainer.selectAll("rect")
                            .data(timebar)
                            .enter()
                            .append("rect");
        var barAttributes = bar
                            .attr("x", function(){
                                return Date.now()/100 - startingTime
                            })
                            .attr("y", 0)
                            .attr("width", 2)
                            .attr("height", 400);
   }   
    
    var interval = setInterval(function(){
        // console.log("updating");
        // console.log(Date.now()/100);
        // console.log(startingTime);
        // console.log(Date.now()/100 - startingTime);
        updateGraph();
    }, 5);


    // var circleAttributes = circles
    //                        .attr("x", function (d) { return d; })
    //                        .attr("y", function (d) { return d; })
    //                        .attr("width", 20)
    //                        .attr("height", 5);
    // var circleSelection = svgSelection.append("circle")
    //                                   .attr("cx", 25)
    //                                   .attr("cy", 25)
    //                                   .attr("r", 25)
    // 5                                  .style("fill", "purple");
// var data = [4, 8, 15, 16, 23, 42];
//
// var width = 420,
//     barHeight = 20;
//
// var x = d3.scaleLinear()
//     .domain([0, d3.max(data)])
//     .range([0, width]);
//
// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", barHeight * data.length);
//
// var bar = chart.selectAll("g")
//     .data(data)
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
//
// bar.append("rect")
//     .attr("width", x)
//     .attr("height", barHeight - 1);
//
// bar.append("text")
//     .attr("x", function(d) { return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });
//
}

window.addEventListener("load", init);
