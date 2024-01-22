import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [salesData]);

  const drawChart = () => {
    const margin = { top: 20, right: 10, bottom: 30, left: 60 };
    const width = 500;
    const height = 300;

    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(salesData.map((d) => d.weekEnding))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    console.log(x.range());

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(salesData, (d) => d.retailSales)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(salesData.map((d) => d.weekEnding))
      .range(["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"]); // Use different colors for each week

    svg
      .selectAll("rect")
      .data(salesData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.weekEnding))
      .attr("y", (d) => y(d.retailSales))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.retailSales))
      .attr("fill", (d) => color(d.weekEnding));

    // Add axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);
  };

  return <svg ref={chartRef}></svg>;
};

export default StackedBarChart;
