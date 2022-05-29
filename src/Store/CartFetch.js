import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const CartFetchThunk = createAsyncThunk(
  "getCart/CartFetch",

  async (data) => {
    const responce = await axios({
      method: "post",
      url: "https://ecom-rest-apis.herokuapp.com/api/products/cart-items",

      headers: {
        "Content-Type": "application/json",
      },

      data: JSON.stringify({ ids: data }),
    }).then((responce) => {
      return responce.data;
    });
    return responce;
  }
);

const CartFetch = createSlice({
  name: "Cartget",
  initialState: {
    cartList: [],
  },

  reducers: {
    deleteList: (state) => {
      state.cartList.length = 0;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(CartFetchThunk.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(CartFetchThunk.fulfilled, (state, { payload }) => {
        console.log("sucess");
        return { ...state, cartList: payload };
      })
      .addCase(CartFetchThunk.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const getCart = (state) => {
  const { cartFetch } = { ...state };

  return cartFetch.cartList;
};
export const { deleteList } = CartFetch.actions;
export default CartFetch.reducer;
