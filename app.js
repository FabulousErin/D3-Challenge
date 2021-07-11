
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 60, left: 60 },
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")    
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data.csv", function (data) {
    console.log('data array', [data])
    //console.log(data)
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 30])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .text("Lack Healthcare (%)");   

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([7, 25])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("In Poverty (%)");   

    console.log('dots for data!!', data)
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            console.log('D!!! making the dots', d.healthcare)
            return x(parseFloat(d.healthcare));
        })
        .attr("cy", function (d) { return y(parseFloat(d.poverty)); })
        .attr("r", 12)
        .style("fill", "#83a8c3")


    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("text").text(function (d) {
            return d.abbr;
        })
        .attr("x", function (d) {
            return x(parseFloat(d.healthcare) - 0.4);
        })
        .attr("y", function (d) {
            return y(parseFloat(d.poverty) - 0.3);
        })
        .style("font-size","10px")
        .attr("fill", "white");


})


