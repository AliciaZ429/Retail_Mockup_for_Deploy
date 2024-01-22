import React, { useEffect, useRef } from "react";
import * as d3 from "d3"; // import d3 library for data visualization

const LineChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [salesData]);

  const drawChart = () => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // define x axis: date of each week
    const x = d3
      .scaleBand()
      .domain(salesData.map((sale) => sale.weekEnding))
      .range([0, width])
      .padding(0.1);

    // define y axis: retail sales of the week
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(salesData, (sale) =>
          Math.max(sale.retailSales, sale.wholesaleSales)
        ),
      ])
      .range([height, 0]);

    const lineRetail = d3
      .line()
      .x((d) => x(d.weekEnding) + x.bandwidth() / 2)
      .y((d) => y(d.retailSales));

    const lineWholesale = d3
      .line()
      .x((d) => x(d.weekEnding) + x.bandwidth() / 2)
      .y((d) => y(d.wholesaleSales));

    svg
      .append("path")
      .datum(salesData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineRetail);

    svg
      .append("path")
      .datum(salesData)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", lineWholesale);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  };

  return <svg ref={chartRef}></svg>;
};

export default LineChart;
