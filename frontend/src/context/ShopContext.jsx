import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
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

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItem); //Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
    console.log(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  let value = {
    products,
    getProducts,
    delivery_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addtoCart,
    getCartCount,
    setCartItem,
  };
  return (
    <>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </>
  );
};

export default ShopContext;
