import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ salesData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [salesData]);

  const drawChart = () => {
    const width = 450;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .range(["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"]);

    const totalRetailSales = d3.sum(salesData, (d) => d.retailSales);

    const seasonalSales = salesData.reduce((acc, cur) => {
      const month = new Date(cur.weekEnding).getMonth();
      const season = getSeason(month);
      acc[season] = (acc[season] || 0) + cur.retailSales;
      return acc;
    }, {});

    const pie = d3.pie().value((d) => d.value);

    const arcs = pie(
      Object.entries(seasonalSales).map(([season, value]) => ({
        season,
        value,
      }))
    );

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const arcLabel = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .append("title")
      .text(
        (d) =>
          `${d.data.season}:${d.data.value} (${(
            (d.data.value / totalRetailSales) *
            100
          ).toFixed(1)}%)`
      );

    // Add labels inside each pie portion
    svg
      .selectAll("text.legend")
      .data(arcs)
      .enter()
      .append("text")
      .attr("class", "legend")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(
        (d) =>
          `${d.data.season}\n ${(
            (d.data.value / totalRetailSales) *
            100
          ).toFixed(1)}%`
      );

    // Add chart title
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 150)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Seasonal Retail Sales");
  };

  // Function to determine the season based on the month
  const getSeason = (month) => {
    switch (month) {
      case 11:
      case 0:
      case 1:
        return "Winter";
      case 2:
      case 3:
      case 4:
        return "Spring";
      case 5:
      case 6:
      case 7:
        return "Summer";
      case 8:
      case 9:
      case 10:
        return "Fall";
      default:
        return "Unknown";
    }
  };

  return <svg ref={chartRef}></svg>;
};

export default PieChart;
