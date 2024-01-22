import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [salesData]);

  const drawChart = () => {
    // parse date format
    const parseDate = d3.timeParse("%Y-%m-%d");

    const width = 450;
    const height = 300;
    const margin = { top: 20, right: 10, bottom: 30, left: 50 };

    const formattedSalesData = salesData.map((d) => ({
      ...d,
      weekEnding: parseDate(d.weekEnding),
    }));

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // define x axis: date of each week
    const x = d3
      .scaleTime()
      .domain(d3.extent(formattedSalesData, (sale) => sale.weekEnding))
      .range([0, width]);

    // define y axis: retail sales of the week
    const y = d3.scaleLinear().domain([0, 1000000]).range([height, 0]);

    const lineRetail = d3
      .line()
      .x((d) => x(d.weekEnding))
      .y((d) => y(d.retailSales));

    const lineWholesale = d3
      .line()
      .x((d) => x(d.weekEnding))
      .y((d) => y(d.wholesaleSales));

    svg
      .append("path")
      .datum(formattedSalesData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineRetail);

    svg
      .append("path")
      .datum(formattedSalesData)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", lineWholesale);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
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

export default LineChart;
