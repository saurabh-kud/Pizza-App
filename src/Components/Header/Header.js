import React, { useContext, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";

const Header = (props) => {
  const [text, setText] = useState("");
  const textEl = useRef();
  const { cart } = useContext(CartContext);

  const handleChange = () => {
    setText(textEl.current.value);
    props.handleSearch(textEl.current.value);
  };

  return (
    <div className="container mx-auto  flex items-center py-2 justify-between border-b-[0.1rem] shadow-[box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3)] ">
      <Link to="/">
        <img style={{ height: "2.8rem" }} src="/Images/logo.png" alt="logo" />
      </Link>
      {/* //searchbar */}
      <div className=" hidden gap-2 items-center h-6 w-[20rem]  px-3 py-5 border bg-slate-100  rounded-lg  w-60 max-w-xs md:flex ">
        <FaSearch className="opacity-50" />
        <input
          ref={textEl}
          className="outline-none bg-slate-100"
          type="text"
          placeholder="search..."
          onChange={handleChange}
          value={text}
        ></input>
      </div>
      <ul className="flex items-center justify-between">
        <Link to="/">
          <li className="font-bold hover:text-slate-500">Home</li>
        </Link>
        <Link to="/products">
          <li className="ml-6 font-bold hover:text-slate-500">Products</li>
        </Link>
        <Link to="/cart">
          <li className="ml-6">
            <div className="flex items-center font-semibold  justify-between bg-yellow-400 hover:bg-yellow-600 px-2 gap-1 py-0.5 rounded-full ">
              <span>{cart.totalItems ? cart.totalItems : 0}</span>
              <img src="/Images/cart.png" alt="cart" />
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
