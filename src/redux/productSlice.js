import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an asynchronous thunk for fetching data
export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("assets/data.json");
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define initial state
const initialState = {
  productData: null,
  loading: false,
  error: null,
};

// Create a productSlice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling the pending state
    builder.addCase(fetchProductData.pending, (state) => {
      state.loading = true;
    });

    // Handling the fulfilled state
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.productData = action.payload || [];
      state.error = null;
    });

    // Handling the rejected state
    builder.addCase(fetchProductData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the reducer
export default productSlice.reducer;
