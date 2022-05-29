import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import CartFetchReducer from "./CartFetch";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    cartFetch: CartFetchReducer,
  },
});
export default store;
