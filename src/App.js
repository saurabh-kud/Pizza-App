import React, { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./Pages/Products/ProductsPage";
import CartPage from "./Pages/Cart/CartPage";
import Header from "./Components/Header/Header";
import ProductDetaisPage from "./Pages/ProductDetaisPage/ProductDetaisPage";
import Sucess from "./Components/Sucess/Sucess";
import { Provider, useSelector } from "react-redux";
import store from "./Store/Store";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };
  store.subscribe(() => {
    const car = store.getState();

    window.localStorage.setItem("daart", JSON.stringify(car.cart));
  });

  return (
    <Provider store={store}>
      <Router>
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
      </Router>
    </Provider>
  );
}

export default App;
