import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/productSlice";
import MainContainer from "./MainContainer";
import "./ProductPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const { productData, loading, error } = useSelector((state) => state.product);

  if (loading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

  const { image, brand, title, tags, subtitle } = productData[0];

  return (
    <div id="body">
      <div style={{ display: "flex" }}>
        <div id="sidebar">
          <img src={image} alt={title} />
          <h2>{title}</h2>
          <p>{brand}</p>
          <p>{subtitle}</p>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        <div id="main-content">
          <MainContainer productData={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
