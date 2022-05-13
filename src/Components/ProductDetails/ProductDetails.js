import React, { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/pizza";
import { CartContext } from "../../CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    let _cart = { ...cart };
    if (!_cart.Items) {
      _cart.Items = {};
    }
    if (_cart.Items[product._id]) {
      _cart.Items[product._id] += 1;
    } else {
      _cart.Items[product._id] = 1;
    }
    if (!_cart.totalItems) {
      _cart.totalItems = 1;
    } else {
      _cart.totalItems += 1;
    }
    setCart(_cart);

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  async function getSingleProduct() {
    try {
      const response = await api.get(`/api/products/${param.id}`);
      setIsFetched(true);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getSingleProduct();
  }, [param.id]);

  return isFetched ? (
    <div className="container mx-auto mt-5 p-2 lg:w-1/2 ">
      <button
        className="mb-12 lg:mb-4 font-bold"
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </button>
      <div className="  w-full  p-4">
        <div className="flex flex-col lg:flex-row p-4 border border-black rounded">
          <img
            className="rounded scale-90"
            src={`${product.image}`}
            alt="peproni"
          />
          <div className="lg:flex lg:flex-col lg:gap-12">
            <div className=" text-center">
              <h3 className=" font-bold text-[1rem] py-4 w-full">
                {product.name}
              </h3>
              <span className="text-center bg-slate-200 px-4 rounded-full py-1 text-sm">
                {product.size}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-semibold">₹ {product.price}</span>
              <button
                disabled={isAdding}
                onClick={addToCart}
                className="rounded-full bg-yellow-400 px-3 py-1  hover:bg-yellow-600 text-white font-bold"
              >
                Add{isAdding ? `ed` : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto mt-8 p-2 lg:w-1/2 ">
      <button
        className="mb-12 font-bold"
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </button>
      <div className="border border-blue-300 shadow rounded-md p-4 w-[95%] m-3">
        <div className="animate-pulse flex flex-col  space-x-4">
          <div className="rounded-full bg-blue-100 h-[8rem] w-[8rem] ml-8 mb-2"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-100 rounded"></div>
              <div className="h-4 bg-blue-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
