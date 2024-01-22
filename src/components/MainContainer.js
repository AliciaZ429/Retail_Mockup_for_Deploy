import React, { useRef } from "react";
import LineChart from "./charts/LineChart";
import StackedBarChart from "./charts/StackedBarChart";
import RetailSalesTable from "./charts/RetailSalesTable";

const MainContainer = ({ productData }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} id="charts-container">
      <div id="chart-container">
        <div id="linechart">
          <LineChart salesData={productData[0].sales} />
        </div>
        <div id="barchart">
          <StackedBarChart salesData={productData[0].sales} />
        </div>
      </div>
      <div id="table">
        <RetailSalesTable salesData={productData[0].sales} />
      </div>
    </div>
  );
};

export default MainContainer;
