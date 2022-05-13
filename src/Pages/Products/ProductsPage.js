import React from "react";

import Products from "../../Components/Products/Products";

const ProductsPage = (props) => {
  return (
    <>
      <Products searchText={props.searchText} />
    </>
  );
};

export default ProductsPage;
