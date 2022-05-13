import React from "react";

import Hero from "../../Components/Hero/Hero";
import Products from "../../Components/Products/Products";

const Home = (props) => {
  return (
    <>
      {props.searchText === "" ? <Hero /> : null}

      <Products searchText={props.searchText} />
    </>
  );
};

export default Home;
