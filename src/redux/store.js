import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProductData } from "./productSlice";

const store = configureStore({
  reducer: { product: productReducer },
});

// Dispatch the fetchProductData thunk to fetch initial data
store.dispatch(fetchProductData());

export default store;
