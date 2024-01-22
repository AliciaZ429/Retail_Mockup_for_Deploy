import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [salesData]);

  const drawChart = () => {
    const margin = { top: 20, right: 10, bottom: 30, left: 50 };
    const width = 450;
    const height = 300;

    const uniqueMonths = Array.from(
      new Set(salesData.map((d) => d3.timeFormat("%b")(new Date(d.weekEnding))))
    );

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(uniqueMonths)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(salesData, (d) => d.retailSales)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(uniqueMonths)
      .range(["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"]);

    const stackedData = d3
      .stack()
      .keys(uniqueMonths)
      .value((d, key) => d[key] || 0)(salesData);

    svg
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d3.timeFormat("%b")(new Date(d.data.weekEnding))))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    // Add axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b"))
      );

    svg.append("g").call(
      d3.axisLeft(y).tickFormat((d) => {
        return d3.format(".1s")(d).replace("G", "B");
      })
    );
  };

  return <svg ref={chartRef}></svg>;
};

export default StackedBarChart;
