import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RetailSalesTable = ({ salesData }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    drawTable();
  }, [salesData]);

  const drawTable = () => {
    const columns = [
      "weekEnding",
      "retailSales",
      "wholesaleSales",
      "unitsSold",
      "retailerMargin",
    ];

    const table = d3.select(tableRef.current);

    table.selectAll("*").remove();

    // Create table header
    table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
      .text((column) => column);

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
      .data((row) => columns.map((column) => ({ column, value: row[column] })))
      .enter()
      .append("td")
      .text((d) => d.value);
  };

  return <table ref={tableRef}></table>;
};

export default RetailSalesTable;
