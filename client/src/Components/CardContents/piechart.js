import * as d3 from "d3"
import {capitalize} from "@material-ui/core";


const drawPieChart = (props) => {
    let width = 150
    let height = 150
    let margin = 4

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


    console.log("pie props")
    console.log( props.theme.palette.primary.main)
// set the color scale
    let color = d3.scaleOrdinal()
        .domain(data)
        .range([props.theme.palette.primary.main, props.theme.palette.primary.dark, props.theme.palette.primary.light, props.theme.palette.secondary.main, props.theme.palette.secondary.dark,  props.theme.palette.secondary.light])

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


    let label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 40);

    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            return capitalize(d.data.value.name)
        })
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 10)
        .style("font-weight", "bold")
        .style("fill", "#FFF")


}


export default drawPieChart;