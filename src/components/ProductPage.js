import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/actions/productActions";
import LineChart from "./LineChart";
import RetailSalesTable from "./RetailSalesTable";
import "./ProductPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productData, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

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
          <LineChart salesData={productData.sales} />
          <RetailSalesTable salesData={productData.sales} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
