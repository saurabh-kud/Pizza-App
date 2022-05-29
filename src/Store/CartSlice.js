import { createSlice } from "@reduxjs/toolkit";

const data = JSON.parse(localStorage.getItem("daart"));

const Items = data ? data.Items : 0;
const totalItems = data ? data.totalItems : 0;
const initialState = data ? { Items, totalItems } : {};

const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    add(state, action) {
      const _id = action.payload;

      if (!state.Items) {
        state.Items = {};
      }
      if (state.Items[_id]) {
        state.Items[_id] += 1;
      } else {
        state.Items[_id] = 1;
      }
      if (!state.totalItems) {
        state.totalItems = 1;
      } else {
        state.totalItems += 1;
      }
    },
    decrease: (state, action) => {
      if (state.Items[action.payload] === 1) {
        return;
      }
      state.Items[action.payload] -= 1;
      state.totalItems -= 1;
    },
    remove: (state, action) => {
      const qnt = state.Items[action.payload];
      delete state.Items[action.payload];
      state.totalItems -= qnt;
    },
    setinitial: (state, action) => {
      delete state.totalItems;
      delete state.Items;
    },
  },
});
export const { add, remove, decrease, setinitial } = CartSlice.actions;
export default CartSlice.reducer;
