import * as d3 from "d3";

function Chart(config, data){    
    let margin = (config.margin ? 
        config.margin : 
        {top: 50, bottom: 100, left: 50, right: 50}
    )

    var width = config.width - margin.left - margin.right,
        height = config.height - margin.top - margin.bottom,
        id = config.id,
        svg,
        xScale,
        yScale,
        labels,
        xAxisCall,
        yAxisCall,
        x_axis = d3.axisBottom(),
        y_axis = d3.axisLeft(),
        dur = 1000

    function chart(){
        initialize();
        updateScales();
        drawChart();
    }

    const initialize = () => {
        svg = d3.select('#' + id).select('svg')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        labels = svg.append('g')
        xAxisCall = labels.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(" + 0 + "," + height + ")")

        yAxisCall = labels.append('g')
            .attr('class', 'axis')

    }

    const updateScales = (resizing=false) => {
        xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, d=> d.x)])

        yScale = d3.scaleLinear()
            .range([height, 0])
            .domain(d3.extent(data, d=> d.y))

        x_axis.scale(xScale);
        y_axis.scale(yScale);

        xAxisCall
            .attr("transform", "translate(" + 0 + "," + height + ")")

        xAxisCall.transition().duration(resizing ? 0 : dur).call(x_axis)
        yAxisCall.transition().duration(resizing ? 0 : dur).call(y_axis)

    }
    
    const drawChart = (resizing=false) =>{
        var scatter = svg.selectAll('.dots')
            .data(data, d=>d.x)
        scatter
            .transition().duration(resizing ? 0 : dur)
            .attr('cx', d=> xScale(d.x))
            .attr('cy', d=> yScale(d.y))

        scatter.enter()
            .append('circle')
            .attr('class', 'dots')
            .attr('cx', d=> xScale(d.x))
            .attr('cy', d=> yScale(yScale.domain()[0]))
            .attr('fill', 'steelblue')
            .attr('r', 5)
            .transition().duration(resizing ? 0 : dur)
            .attr('cy', d=> yScale(d.y))


    }

    chart.data = function(value) {
        if (!arguments.length) return data;
        if (value !== data){
            data = value;
            updateScales(false)
            drawChart(false);
        }
        return chart;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    }

    chart.size = function(w, h){
        if (!arguments.length) return {width: width, height: height}
        chart.width(w - margin.left - margin.right);
        chart.height(h - margin.top - margin.bottom);
        updateScales(true);
        drawChart(true);
        return chart;
    }

    return chart;
}

export default Chart;
