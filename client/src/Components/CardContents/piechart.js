import * as d3 from "d3"
import {capitalize} from "@material-ui/core";


const drawPieChart = (props) => {
    let width = 250
    let height = 250
    let margin = 20

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    let svg = d3.select(".pie")
        .attr('width', width)
        .attr('height', height)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    let data = (props.clothesCounted)

    // {name: "jumper", count: 189}
    // "jumper":189,



// set the color scale
    let color = d3.scaleOrdinal()
        .domain(data)
        .range(["#a0d58a", "#73b665", "#58a55f", "#438b4d", "#2d6c5a", "#2d6c5a"])

// Compute the position of each group on the pie:
    let pie = d3.pie()
        .value(function (d) {
            return d.value.count;
        })
    let data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function (d) {
            return (color(d.data.key))
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    let label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius -30);

    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            return  capitalize(d.data.value.name)
        })
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 17)
        .style("font-weight", "bold")
        .style("font-color", "#3b9771")


}


export default drawPieChart;