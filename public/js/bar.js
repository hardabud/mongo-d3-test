d3.json("json", function(error, json) {
	if (error) return console.warn(error);
	
	var dataset = json.data;
	var title = json.project;
	
	var margin = {top: 50, right: 20, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
			.range([height, 0]);

	var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

	var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
			
	var graph = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(dataset.map(function(d) { return d.name; }));
	y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

	graph.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	graph.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("value");

	graph.selectAll(".bar")
		.data(dataset)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.name); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); });
		
	svg.append("text")
		.attr("id", "title")
		.text(title)
		.attr("x", width / 2)
		.attr("y", 30)
		.attr("text-anchor", "middle");
});
