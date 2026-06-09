import React, { useContext, useState, useEffect } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";
import Title from "./Title";

const BestSeller = () => {
  let { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestSeller);
    setBestSeller(filterProduct.slice(0, 5));
  }, [products]);
  return (
    <div>
      <div className="h-[8%] w-[100%] text-center mt-[50px] ">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved | Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            id={item._id}
            image={item.image1}
            price={item.price}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default BestSeller;
