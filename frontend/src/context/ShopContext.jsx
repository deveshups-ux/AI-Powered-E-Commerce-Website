import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  let currency = "₹";
  let delivery_fee = 40;

  let getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let value = { products, getProducts, delivery_fee, currency };
  return (
    <>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </>
  );
};

export default ShopContext;
