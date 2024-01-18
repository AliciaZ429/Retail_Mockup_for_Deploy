import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/actions/productActions";
import LineChart from "./LineChart";
import RetailSalesTable from "./RetailSalesTable";

const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    <div>
      <LineChart />
      <RetailSalesTable />
    </div>
  );
};

export default ProductPage;
