function init(){

    drawTextArea();
    window.addEventListener("keydown", dealWithKeyboard, false);
    window.addEventListener("keyup", dealWithKeyboard, false);

        
    var numKeyCodes = 230;    
    var colorScale = d3.scaleLinear()
                                .domain([48, 90])
                                .range([0,1]);
    var bar_height = 2;
    var w = window.innerWidth;
    var h = numKeyCodes * bar_height;
    var padding = 30;
    var svg = null; 
    var xScale = d3.scaleLinear()
                         .domain([0, d3.max(strokes, function(d) { return d.rel_up; })])
                         .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
                    .domain([0, numKeyCodes])
                    .range([h - padding,padding]);
    var xAxisScale = d3.scaleLinear()
                         .domain([0, d3.max(strokes, function(d) { return d.rel_up; })])
                         .range([padding, w - padding]);

    var xAxis = d3.axisBottom()
                  .scale(xAxisScale);

    function updateGraph(){
        xScale.domain([0, d3.max(strokes, function(d) { return d.rel_up; })]);

        xAxisScale.domain([0, d3.max(strokes, function(d) { return d.rel_up; })]);

        //update existing rects:
        svg.selectAll("rect").data(strokes)
                        .transition()
                        .ease(d3.easeLinear)
                        .attr("x", function(d){  return xScale(d.rel_down)  })
                        .attr("opacity", opacity)
                        .attr("width", function(d){
                            if(d.rel_up == null){
                                console.log("NUULLLLL");
                                return xScale( Date.now() - start_ts ) - xScale(d.rel_down);
                            }else{
                                return xScale(d.rel_up) - xScale(d.rel_down) ;
                            }
                        });
        //add new rects:
        svg.selectAll("rect")
                        .data(strokes)
                        .enter()
                        .append("rect")
                        .attr("x", function(d){  return xScale(d.rel_down)  })            
                        .attr("y", function(d){  return yScale(d.key) })
                        .attr("fill", function(){
                            if(color_variable == -1){ 
                                return "black" 
                            }else{
                                return d3.interpolateCool(color_variable);
                            }
                        })
                        .attr("opacity", opacity)
                        .attr("height", 8*bar_height)
                        .attr("width", function(d){ 
                            console.log(d);
                            console.log( xScale(d.rel_up - d.rel_down));
                            console.log( xScale(d.rel_up) - xScale(d.rel_down) );
                            // return xScale(d.rel_up - d.rel_down)
                            if(d.rel_up == null){
                                return xScale( Date.now() - start_ts ) - xScale(d.rel_down);
                            }else{
                                return xScale(d.rel_up) - xScale(d.rel_down) ;
                            }
                        });

        
        svg.selectAll(".keylabel")
                        .data(strokes).transition().ease(d3.easeLinear)
                        .attr("x", function(d){
                            if(d.rel_up == null){
                                return xScale(d.rel_down) + ( (xScale( Date.now() - start_ts ) - xScale(d.rel_down)) * 0.5 ) 
                            }else{
                                return xScale(d.rel_down) + ( (xScale(d.rel_up) - xScale(d.rel_down)) * 0.5 ) 
                            }
                        });
        
        //add new text:
        svg.selectAll(".keylabel")
                        .data(strokes)
                        .enter()
                        .append("text")
                        .attr('class', 'keylabel')
                        .text(function(d){ 
                            if(!(d.key > 48 && d.key < 90)){
                                return d.key;
                            }else{  
                                return d.value 
                            }
                        })
                        .attr("x", function(d){
                            if(d.rel_up == null){
                                return xScale(d.rel_down) + ( (xScale( Date.now() - start_ts ) - xScale(d.rel_down)) * 0.5 ) 
                            }else{
                                return xScale(d.rel_down) + ( (xScale(d.rel_up) - xScale(d.rel_down)) * 0.5 ) 
                            }
                        })
                        .attr("y", function(d){ return yScale(d.key) + 12 })
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        // .attr("fill",
                        // .style("fill", function(d){
                        //     console.log(d.key);
                        //     console.log(Rgb(d.key));
                        //     // return "rgb(" + String(255) + "," + String(rGb(d.key)) + ", 0)"
                        // })
                        .attr("font-size", "11px")
                        .attr("fill", function(d){
                            if((d.key > 48 && d.key < 90)){
                                // return "red";
                                // return d3.rgb( Rgb(d.key) , rGb(d.key), rgB(d.key));
                                return d3.interpolateWarm( colorScale(d.key) );
                            }else{
                                return "black";
                            }
                        });
        svg.select(".x.axis")
            .transition()
            .ease(d3.easeLinear)
            .call(xAxis);
    }
    function showGraph(){
        console.log(strokes);
        document.getElementById("viz_wrapper").innerHTML = ""; 

        svg = d3.select("#viz_wrapper")
                    .append('svg')
                    .attr("width", w)
                    // .style("border", "solid")
                    .attr("height", h);



        var rects = svg.selectAll("rect")
                        .data(strokes)
                        .enter()
                        .append("rect")
                        .attr("x", function(d){  return xScale(d.rel_down)  })            
                        .attr("y", function(d){  return yScale(d.key) })
                        // .attr("fill", "red")
                        .attr("opacity", opacity)
                        .attr("height", 8*bar_height)
                        .attr("width", function(d){ 
                            console.log(d);
                            console.log( xScale(d.rel_up - d.rel_down));
                            console.log( xScale(d.rel_up) - xScale(d.rel_down) );
                            // return xScale(d.rel_up - d.rel_down)
                        
                            if(d.rel_up == null){
                                console.log("NUULLLLL");
                                return xScale( Date.now() - start_ts ) - xScale(d.rel_down);
                            }else{
                                return xScale(d.rel_up) - xScale(d.rel_down) ;
                            }
                        });

        var texts = svg.selectAll("text")
                        .data(strokes)
                        .enter()
                        .append("text")
                        .attr('class', 'keylabel')
                        .text(function(d){ 
                            if(!(d.key > 48 && d.key < 90)){
                                return d.key;
                            }else{  
                                return d.value 
                            }
                        })
                        .attr("x", function(d){ return xScale(d.rel_down) + ( (xScale(d.rel_up) - xScale(d.rel_down)) * 0.5 ) })
                        .attr("y", function(d){ return yScale(d.key) + 12 })
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", function(d){
                            if((d.key > 48 && d.key < 90)){
                                return "red";
                            }else{  
                                return "black"; 
                            }
                        });

        
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("class", "x axis")
            .call(xAxis);

    }



    showGraph();    

    function updateWithNewWidth(w){
        svg.attr("width", w);
        xScale = d3.scaleLinear()
                         .range([padding, w - padding]);
        xAxisScale = d3.scaleLinear()
                         .domain([0, d3.max(strokes, function(d) { return d.rel_up; })])
                         .range([padding, w - padding]);
        xAxis = d3.axisBottom()
                  .scale(xAxisScale);
        updateGraph();
    }

    document.getElementById("saveButton").addEventListener("click", function(){
        // this code snippet is great and comes from here: http://bl.ocks.org/Rokotyan/0556f8facbaf344507cdc45dc3622177
         
            w = d3.max(strokes, function(d) { return d.rel_up; })/2 + 2*padding;
            updateWithNewWidth(w);
            // timeout just to make sure the width changed
            setTimeout(function(){


                var svg_w =  d3.select('svg').node().getAttribute('width'); 
                var svg_h =  d3.select('svg').node().getAttribute('height'); 
                var svgString = getSVGString(d3.select('svg').node());
                svgString2Image(svgString, 4*svg_w, 4*svg_h, 'png', save ); // passes Blob and filesize String to the callback

                function save(dataBlob,filesize){
                        saveAs(dataBlob,'keystroke_pattern.png'); // FileSaver.js function
                        setTimeout(function(){
                            updateWithNewWidth(window.innerWidth);
                        }, 1500);
                    }

            }, 500);
           

    });
    window.addEventListener("resize", function(){
        

        w = window.innerWidth;

        svg.attr("width", w);

        xScale = d3.scaleLinear()
                         .range([padding, w - padding]);

        xAxisScale = d3.scaleLinear()
                         .domain([0, d3.max(strokes, function(d) { return d.rel_up; })])
                         .range([padding, w - padding]);

        xAxis = d3.axisBottom()
                  .scale(xAxisScale);
        
        updateGraph();
    });
    function set_back_time(){
        first = true;
        overlay_count += 1;
        opacity = opacity_starting / overlay_count;
        // color_variable = Math.random();
    }
    
    document.getElementById("overlay_button").addEventListener('click', function(){
        set_back_time();
    });
    document.getElementById("overlay_checkbox").addEventListener('click', function(){
        enter_overlay_function = document.getElementById("overlay_checkbox").checked;
        console.log("checkbox", document.getElementById("overlay_checkbox").checked);
    })
    function updateColor(){
        console.log(document.getElementById("color_slider").value, "COLOR");
        var new_c = document.getElementById("color_slider").value;
        if(new_c == 0){
            color_variable = -1;
            document.getElementById("color_prompt").style.color = "black";
        }else{
            color_variable = new_c;
            document.getElementById("color_prompt").style.color = d3.interpolateCool(new_c);
        }
    }

    // document.getElementById("color_slider").addEventListener("oninput", updateColor);
    document.getElementById("color_slider").addEventListener("input", function(){
        updateColor();
    });
    function dealWithKeyboard(e) {
        // gets called when any of the keyboard events are overheard
        if((e.type == "keydown" || e.type == "keyup") && document.activeElement.id == "the_textarea"){
           
            if(first){
                first = false;
                start_ts = Date.now();
            }
            if(e.type == "keydown" && !current_downs[e.keyCode]){
                strokes.push(
                    {
                        down: Date.now(),
                        rel_down: Date.now() - start_ts,
                        up: null,
                        rel_up: null,
                        key: e.keyCode,
                        value: String.fromCharCode(e.keyCode).toLowerCase()
                    }
                );
                current_downs[e.keyCode] = true;
            }else if(e.type == "keyup"){
                current_downs[e.keyCode] = false;
                for(var i = strokes.length - 1; i >= 0; i--){
                    if(strokes[i].up == null && strokes[i].key == e.keyCode){
                        // console.log("updating", strokes[i]);
                        strokes[i].up = Date.now();
                        strokes[i].rel_up = Date.now() - start_ts; 
                        break;
                    }
                }
                console.log(strokes);
                console.log("Length of strokes:", strokes.length);
                updateGraph();
                if(e.keyCode == 13 && enter_overlay_function){
                    set_back_time();
                }
                

                // the following block is jsut to create visuals for slides with people typing the word "new york" multiple times



                if(document.getElementById("the_textarea").value.length >= 8){

                    console.log(document.getElementById("the_textarea").value);
                    w = d3.max(strokes, function(d) { return d.rel_up; })/2 + 2*padding;
                    updateWithNewWidth(w);
                    // timeout just to make sure the width changed
                    setTimeout(function(){


                        var svg_w =  d3.select('svg').node().getAttribute('width');
                        var svg_h =  d3.select('svg').node().getAttribute('height');
                        var svgString = getSVGString(d3.select('svg').node());
                        svgString2Image(svgString, 4*svg_w, 4*svg_h, 'png', save ); // passes Blob and filesize String to the callback

                        function save(dataBlob,filesize){
                                saveAs(dataBlob,'keystroke_pattern.png'); // FileSaver.js function
                                setTimeout(function(){
                                    document.getElementById("the_textarea").value = ""
                                    strokes = [];
                                    set_back_time();
                                    opacity = opacity_starting;
                                    updateWithNewWidth(window.innerWidth);
                                }, 1500);
                            }

                    }, 500);
                }





            }
        }

    }
}

window.addEventListener("load", init);


var first = true;
var strokes = [];
var start_st = null;
var current_downs = {};
var opacity_starting = 0.5;
var opacity = opacity_starting;
var overlay_count = 1;
var enter_overlay_function = false;
var color_variable = -1;

function drawTextArea(){
    
    var the_textarea = document.createElement('textarea') 
    the_textarea.id = "the_textarea";
    var w = 700;
    var h = 200;
    // the_textarea.style.width = String(w) + "px";
    // the_textarea.style.height = String(h) + "px";
    // the_textarea.style.marginLeft = String(window.innerWidth/2 - w/2) + "px";
    the_textarea.style.fontSize = "1.5em";
    the_textarea.style.color = "red";
    document.getElementById("textarea_wrapper").appendChild(the_textarea);
}



