import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16 ">
      <div className="container mx-auto flex md:flex-row flex-col-reverse  justify-between items-center">
        <div className="w-1/2  broder border-black ">
          <h6 className="text-lg text-center md:text-left">
            <em>are you hungry?</em>
          </h6>
          <h1 className="md:text-6xl text-3xl text-center md:text-left font-bold">
            Don't wait !
          </h1>
          <h1 className="text-center md:text-left">
            <button
              onClick={() => {
                navigate("/products");
              }}
              className="rounded-full  bg-yellow-400 px-6 mt-4 py-2 hover:bg-yellow-600 text-white font-bold"
            >
              Order now
            </button>
          </h1>
        </div>
        <div className="md:w-1/2  mb-4 md:mb-0 ">
          <img
            src="/Images/pizza.png"
            alt="pizza"
            className="md:w-4/5 w-[90%]  mx-auto md:mx-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
