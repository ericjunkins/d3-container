import * as d3 from "d3";

function Chart(config, data){
    var width = config.width,
        height = config.height,
        id = config.id,
        svg


    let margin = (config.margin ? 
        config.margin : 
        {top: 0, bottom: 0, left: 0, right: 0}
    )

    function chart(){
        initialize();
        drawChart();
    }

    const initialize = () => {
        svg = d3.select('#' + id).select('svg')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }
    
    const drawChart = () =>{
        var circ = svg.selectAll('circle').data([{id: 'test-circ'}])
        circ
            .attr('cx', width/2)
            .attr('cy', height/2)
            .attr('r', Math.min(width, height) * 0.45)
            .attr('fill', getRandomColor())

        circ.enter()
            .append('circle')
            .attr('id', d=> d.id)
            .attr('cx', width/2)
            .attr('cy', height/2)
            .attr('r', Math.min(width, height) * 0.45)
            .attr('fill', getRandomColor())
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    chart.data = function(value) {
        if (!arguments.length) return data;
        if (value !== data){
            drawChart();
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
        chart.width(w);
        chart.height(h);
        drawChart();
        return chart;
    }

    return chart;
}

export default Chart;
