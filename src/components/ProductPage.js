import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/productSlice";
import LineChart from "./LineChart";
import RetailSalesTable from "./RetailSalesTable";
import "./ProductPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching fetchProductData");
    dispatch(fetchProductData());
  }, [dispatch]);

  const { productData, loading, error } = useSelector((state) => state.product);

  if (loading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

  console.log("this is productdata", productData);

  const { image, brand, title, tags } = productData[0];

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* Left Sidebar */}
        <div style={{ width: "200px", marginRight: "20px" }}>
          <img src={image} alt={title} style={{ width: "100%" }} />
          <p>{brand}</p>
          <h2>{title}</h2>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div>
          <LineChart salesData={productData[0].sales} />
          <RetailSalesTable salesData={productData[0].sales} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
