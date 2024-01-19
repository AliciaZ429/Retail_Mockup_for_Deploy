import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <Provider store={store}>
      <ProductPage />
    </Provider>
  );
}
export default App;
