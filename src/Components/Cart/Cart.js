import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartFetchThunk, deleteList, getCart } from "../../Store/CartFetch";

import { add, remove, decrease, setinitial } from "../../Store/CartSlice";

const Cart = () => {
  let total = 0;
  const items = useSelector((state) => state.cart);
  const dispach = useDispatch();

  const [priceFetched, setPriceFetched] = useState(false);

  let newList = items.Items ? Object.keys(items.Items) : [];

  const navigate = useNavigate();

  useEffect(() => {
    dispach(CartFetchThunk(newList));
  }, []);

  const cartProducts = useSelector(getCart);

  const getqty = (productId) => {
    return items.Items[productId];
  };

  const getPrice = (cartProduct) => {
    const price = cartProduct.price * getqty(cartProduct._id);
    total += price;
    return price;
  };

  const increase = (productId) => {
    dispach(add(productId));
  };

  const decreases = (productId) => {
    dispach(decrease(productId));
  };

  const handleDelete = (productId) => {
    newList = newList.filter((id) => id !== productId);
    dispach(CartFetchThunk(newList));
    dispach(remove(productId));
  };

  const handleOrder = () => {
    dispach(setinitial());

    dispach(deleteList());

    // setPriceFetched(true);
    navigate(`/sucess/${new Date().getTime().toString()}`);
  };

  setTimeout(() => setPriceFetched(true), 400);

  return !priceFetched ? (
    <div className="container mx-auto  lg:w-1/2 w-full px-1 ">
      <h1 className="my-12  font-bold">Cart items</h1>
      <ul>
        <div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto my-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-100 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-100 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-100 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-100 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  ) : !cartProducts.length ? (
    <div className="container mx-auto mt-4 w-1/2">
      <h1 className="font-bold text-xl text-center">Cart is empty</h1>
      <img
        className="mx-auto w-1/2 mt-12"
        src="/images/empty-cart.png"
        alt="empty"
      />
    </div>
  ) : (
    <div className="container mx-auto  lg:w-1/2 w-full px-1 ">
      <h1 className="my-12  font-bold">Cart items</h1>
      <ul>
        {cartProducts.map((cartProduct) => {
          return (
            <li className="my-8" key={cartProduct._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <img
                    alt={cartProduct.name}
                    className="h-[4rem] w-[4rem]  rounded"
                    src={`${cartProduct.image}`}
                  />
                  <h3 className="font-bold w-[8rem]">{cartProduct.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      decreases(cartProduct._id);
                    }}
                    className="rounded-full bg-yellow-400 px-4 py-1  hover:bg-yellow-600 text-white font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold">{getqty(cartProduct._id)}</span>
                  <button
                    onClick={() => {
                      increase(cartProduct._id);
                    }}
                    className="rounded-full bg-yellow-400 px-4 py-1  hover:bg-yellow-600 text-white font-bold"
                  >
                    +
                  </button>
                </div>
                <div>
                  <span>₹ {getPrice(cartProduct)}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleDelete(cartProduct._id);
                    }}
                    className="rounded-full border border-black px-3 py-1  hover:bg-red-800 hover:text-white  font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> ₹ {total}
      </div>
      <div className="text-right mt-4">
        <button
          onClick={handleOrder}
          className="rounded-full bg-yellow-400 px-3 py-1  hover:bg-yellow-600 text-white font-bold"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
