import {
  FETCH_PRODUCT_DATA_REQUEST,
  FETCH_PRODUCT_DATA_SUCCESS,
  FETCH_PRODUCT_DATA_FAILURE,
} from "../actions/productActions";

const initialState = {
  productData: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle actions based on data fetching status
    case FETCH_PRODUCT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        productData: action.payload,
        error: null,
      };

    case FETCH_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
