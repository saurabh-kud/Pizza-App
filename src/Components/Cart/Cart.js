import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../CartContext";
const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [priceFetched, setPriceFetched] = useState(false);
  let total = 0;
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  async function getCartProducts() {
    try {
      axios({
        method: "post",
        url: "https://ecom-rest-apis.herokuapp.com/api/products/cart-items",

        headers: {
          "Content-Type": "application/json",
        },

        data: JSON.stringify({ ids: Object.keys(cart.Items) }),
      }).then((responce) => {
        setCartProducts(responce.data);

        setPriceFetched(true);
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (!cart.Items) {
      setPriceFetched(true);
      return;
    }

    if (priceFetched) {
      return;
    }

    getCartProducts();
  }, [cart, priceFetched]);

  const getqty = (productId) => {
    return cart.Items[productId];
  };

  const getPrice = (cartProduct) => {
    const price = cartProduct.price * getqty(cartProduct._id);
    total += price;
    return price;
  };

  const increase = (productId) => {
    const _cart = { ...cart };
    _cart.Items[productId] += 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrease = (productId) => {
    if (cart.Items[productId] === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.Items[productId] -= 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qnt = _cart.Items[productId];
    delete _cart.Items[productId];
    _cart.totalItems -= qnt;
    setCart(_cart);
    const updatedCartList = cartProducts.filter(
      (cartProduct) => cartProduct._id !== productId
    );
    setCartProducts(updatedCartList);
  };

  const handleOrder = () => {
    setCart({});
    setPriceFetched(true);
    navigate(`/sucess/${new Date().getTime().toString()}`);
  };

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
                      decrease(cartProduct._id);
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
