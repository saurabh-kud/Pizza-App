import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../../Store/CartSlice";

const Product = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispach = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();

    dispach(add(product._id));

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="border border-black rounded p-4 md:border-none md:p-0">
        <img
          className="rounded  hover:transform hover:scale-50 "
          src={`${product.image}`}
          alt="peproni"
        />
        <div className=" text-center">
          <h3 className=" font-bold text-[1rem] py-2 w-full">{product.name}</h3>
          <span className="text-center bg-slate-200 px-4 rounded-full py-1 text-sm">
            {product.size}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold">₹ {product.price}</span>
          <button
            disabled={isAdding}
            className={`
              ${
                isAdding ? `bg-yellow-600` : `bg-yellow-400`
              } rounded-full  px-3 py-1  hover:bg-yellow-600 text-white font-bold `}
            onClick={(e) => {
              addToCart(e);
            }}
          >
            Add{isAdding ? `ed` : ""}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
