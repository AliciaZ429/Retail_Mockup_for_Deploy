import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productReducer from "../reducers/productReducer";

// Apply middleware
const middleware = [thunk];

const store = createStore(productReducer, applyMiddleware(...middleware));

export default store;
