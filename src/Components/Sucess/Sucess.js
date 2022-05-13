import React from "react";
import { useParams } from "react-router-dom";

const Sucess = () => {
  const param = useParams();

  return (
    <div className="container mx-auto my-5 flex flex-col items-center  lg:w-1/2 w-full">
      <h1 className="text-xl font-bold text-center flex items-center justify-center gap-2">
        Order Successfully placed
        <img
          src="/Images/celebration.png"
          alt="celebration"
          className="h-8 w-8"
        />
      </h1>
      <h1 className="text-sm font-bold text-center my-4">
        your Order id is: {param.id}
      </h1>
      <h1 className="text-sm font-bold text-center my-4">
        Your Order is on the way
      </h1>
      <img
        className="text-center  "
        src="/Images/on_the_way.gif"
        alt="on the way"
      />
    </div>
  );
};

export default Sucess;
