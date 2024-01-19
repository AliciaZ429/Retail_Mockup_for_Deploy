import axios from "axios";

// action types: request and success
export const FETCH_PRODUCT_DATA_REQUEST = "FETCH_PRODUCT_DATA_REQUEST";
export const FETCH_PRODUCT_DATA_SUCCESS = "FETCH_PRODUCT_DATA_SUCCESS";
export const FETCH_PRODUCT_DATA_FAILURE = "FETCH_PRODUCT_DATA_FAILURE";

// Action Creators
const fetchProductDataRequest = () => ({
  type: FETCH_PRODUCT_DATA_REQUEST,
});

const fetchProductDataSuccess = (data) => ({
  type: FETCH_PRODUCT_DATA_SUCCESS,
  payload: data,
});

const fetchProductDataFailure = (error) => ({
  type: FETCH_PRODUCT_DATA_FAILURE,
  payload: error,
});

export const fetchProductData = () => async (dispatch) => {
  // Fetch data from assets
  dispatch(fetchProductDataRequest());

  try {
    const response = await axios.get("assets/data.json");
    const data = response.data;

    dispatch(fetchProductDataSuccess(data));
  } catch (error) {
    dispatch(fetchProductDataFailure(error.message));
  }
};
