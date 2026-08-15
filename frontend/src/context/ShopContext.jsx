import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState({});
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  let currency = "₹";
  let delivery_fee = 40;

  let getProducts = async () => {
    setLoading(true);
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true },
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true },
      );
      console.log("cart response:", result.data); // yeh add karo
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItem[items]) {
          try {
            if (cartItem[items][item] > 0) {
              totalAmount += itemInfo.price * cartItem[items][item];
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData]);

  let value = {
    cartItem,
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
    updateQuantity,
    getCartAmount,
    loading,
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
