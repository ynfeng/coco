function renderTeamFrequency(data) {
  let margin = {top: 30, right: 30, bottom: 30, left: 80},
    width = GraphConfig.width - margin.left - margin.right,
    height = GraphConfig.height - margin.top - margin.bottom;

  let svg = d3.select("#code-frequency")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "code-frequency")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  let max_added = d3.max(data, (d) => d.added);
  let max_deleted = d3.max(data, (d) => d.deleted);

  let y1 = d3.scaleLinear()
    .range([height / 2, 0])
    .domain([0, max_added]);

  svg.append("g")
    .attr("transform", "translate(-20,0)")
    .call(d3.axisLeft(y1));

  let y2 = d3.scaleLinear()
    .range([height / 2, height])
    .domain([0, max_deleted]);
  svg.append("g")
    .attr("transform", "translate(-20,0)")
    .call(d3.axisLeft(y2));

  svg.append("path")
    .attr("class", "addition")
    .datum(data)
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", d3.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y1(d.added);
      })
    );

  svg.append("path")
    .attr("class", "addition")
    .datum(data)
    .attr("fill", "#2cbe4e")
    .attr("d", d3.area()
      .x(function (d) {
        return x(d.date);
      })
      .y1(function (d) {
        return y1(d.added);
      })
      .y0(height / 2)
    );

  svg.append("path")
    .attr("class", "deletion")
    .datum(data)
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", d3.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y2(d.deleted);
      })
    );

  svg.append("path")
    .attr("class", "deletion")
    .datum(data)
    .attr("fill", "#cb2431")
    .attr("d", d3.area()
      .x(function (d) {
        return x(d.date);
      })
      .y0(height / 2)
      .y1(function (d) {
        return y2(d.deleted);
      })
    );

  svg.append("circle").attr("cx", 290).attr("cy", 30).attr("r", 6).style("fill", "#2cbe4e")
  svg.append("circle").attr("cx", 290).attr("cy", 60).attr("r", 6).style("fill", "#cb2431")
  svg.append("text")
    .attr("x", 310)
    .attr("y", 30)
    .text("Added")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle")
  svg.append("text")
    .attr("x", 310)
    .attr("y", 60)
    .text("Deleted")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle")
}
