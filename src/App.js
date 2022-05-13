import React, { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./Pages/Products/ProductsPage";
import CartPage from "./Pages/Cart/CartPage";
import Header from "./Components/Header/Header";
import ProductDetaisPage from "./Pages/ProductDetaisPage/ProductDetaisPage";
import { CartContext } from "./CartContext";
import Sucess from "./Components/Sucess/Sucess";

function App() {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}
  );
  const [searchText, setSearchText] = useState("");
  //setting items into local storange
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Header handleSearch={handleSearch} />

          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route
              path="/products"
              element={<ProductsPage searchText={searchText} />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductDetaisPage />} />
            <Route path="/sucess/:id" element={<Sucess />} />
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
