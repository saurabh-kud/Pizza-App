import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import api from "../../api/pizza";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isFetched, setIsFeched] = useState(false);
  const scalton = [10, 12, 45, 96, 78, 15, 19, 79, 36, 74];

  //retrive products
  useEffect(() => {
    if (props.searchText === "") {
      return;
    }

    const searchRes = products.filter((product) => {
      return Object.values(product.name)
        .join(" ")
        .toLowerCase()
        .includes(props.searchText.toLowerCase());
    });
    setSearchProducts(searchRes);
  }, [props.searchText]);

  async function getProducts() {
    try {
      const response = await api.get("/api/products");
      setIsFeched(true);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const val = props.searchText === "" ? products : searchProducts;

  return (
    <div className="container mx-auto px-2 mb-4">
      <h1 className="font-bold mb-10 text-xl">Products</h1>
      <div className=" md:grid md:grid-cols-5 md:gap-24 flex flex-col items-center gap-4  ">
        {!isFetched ? (
          scalton.map((sca, index) => {
            return (
              <div
                key={index}
                className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto"
              >
                <div className="animate-pulse flex flex-col space-x-4">
                  <div className="rounded-full bg-blue-100 h-12 w-12 ml-6"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-100 rounded"></div>
                      <div className="h-4 bg-blue-100 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : val.length ? (
          val.map((product) => {
            return <Product product={product} key={product._id} />;
          })
        ) : (
          <div classNameName="container mx-auto w-full">
            <h1 classNameName="text-xl font-bold text-center">not avilable</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
