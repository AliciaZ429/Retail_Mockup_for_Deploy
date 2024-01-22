import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RetailSalesTable = ({ salesData }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    drawTable();
  }, [salesData]);

  const formatCurrency = d3.format("$,.0f");

  const drawTable = () => {
    const columns = [
      { label: "Week Ending", key: "weekEnding" },
      { label: "Retail Sales", key: "retailSales" },
      { label: "Wholesale Sales", key: "wholesaleSales" },
      { label: "Units Sold", key: "unitsSold" },
      { label: "Retailer Margin", key: "retailerMargin" },
    ];

    const table = d3.select(tableRef.current);

    table.selectAll("*").remove();

    // Create table header
    const header = table.append("thead").append("tr");

    header
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
      .text((column) => column.label)
      .style("border", "1px solid #ddd")
      .style("padding", "8px 30px")
      .style("background-color", "#063970")
      .style("color", "white")
      .style("text-align", "center");

    // Create table rows
    const rows = table
      .append("tbody")
      .selectAll("tr")
      .data(salesData)
      .enter()
      .append("tr");

    // Fill in table cells
    rows
      .selectAll("td")
      .data((row) =>
        columns.map((column) => ({
          column,
          value:
            column.key === "weekEnding" || column.key === "unitsSold"
              ? row[column.key]
              : formatCurrency(row[column.key]),
        }))
      )
      .enter()
      .append("td")
      .text((d) => d.value)
      .style("border", "1px solid #ddd")
      .style("padding", "8px")
      .style("text-align", "center");

    rows.style("background-color", (d, i) =>
      i % 2 === 0 ? "#f9f9f9" : "#abdbe3"
    );
  };

  return <table ref={tableRef}></table>;
};

export default RetailSalesTable;
