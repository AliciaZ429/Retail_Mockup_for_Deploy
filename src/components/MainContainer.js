import React, { useRef } from "react";
import LineChart from "./charts/LineChart";
import RetailSalesTable from "./charts/RetailSalesTable";
import PieChart from "./charts/PieChart";

const MainContainer = ({ productData }) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} id="main-container">
      <div id="charts-container">
        <div className="chart" id="linechart">
          <LineChart salesData={productData[0].sales} />
        </div>
        <div className="chart" id="barchart">
          <PieChart salesData={productData[0].sales} />
        </div>
      </div>
      <div id="table">
        <RetailSalesTable salesData={productData[0].sales} />
      </div>
    </div>
  );
};

export default MainContainer;
