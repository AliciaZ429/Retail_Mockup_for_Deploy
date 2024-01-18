import {
  FETCH_PRODUCT_DATA_REQUEST,
  FETCH_PRODUCT_DATA_SUCCESS,
} from "../actions/productActions";

const initialState = {
  productData: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle actions based on your requirements
    default:
      return state;
  }
};

export default productReducer;
