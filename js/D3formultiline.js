let d3;
let margin = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50
    },
    width = 1300 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

// var	parseDate = d3.time.format("%d-%b-%y").parse;

let x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);
let y = d3.scale.linear().range([height, 0]);

let xAxis = d3.svg.axis().scale(x)
    .orient('bottom');

let yAxis = d3.svg.axis().scale(y)
    .orient('left');

let valueline = d3.svg.line()
    .x(function(d) {
        return x(d.year);
    })
    .y(function(d) {
        return y(d['Rural population (% of total population)']);
    });

let valueline2 = d3.svg.line()
    .x(function(d) {
        return x(d.year);
    })
    .y(function(d) {
        return y(d['Urban population (% of total)']);
    });

let svg = d3.select('#multiline')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.json('multilinechartAswiniK1.json', function(error, data) {
    data.forEach(function(d) {
        d.year = d.year;
        d['Rural population (% of total population)'] = +d['Rural population (% of total population)'];
        d['Urban population (% of total)'] = +d['Urban population (% of total)'];
    });

    x.domain(data.map(function(d) {
        return d.year;
    }));
    // Scale the range of the data
    //  x.domain(d3.extent(data, function(d) { return d.countries; }));
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d['Urban population (% of total)'], d['Rural population (% of total population)']);
    })]);

    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueline(data));

    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'green')
        .attr('d', valueline2(data));


    svg.append('g') // Add the X Axis
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.15em')
        .attr('dy', '-.60em')
        .attr('transform', 'rotate(-75)')
        .style('font-size', '15px');

    svg.append('g') // Add the Y Axis
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0]['Rural population (% of total population)']) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'red')
        .text('Rural');

    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0]['Urban population (% of total)']) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'green')
        .text('Urban');

    // console.log(data.length-1);
    // console.log(data[data.length-1].open);
    // console.log(data[0].open);
    // console.log(y(data[0].open));
    // console.log(y(data[0].close));

});
