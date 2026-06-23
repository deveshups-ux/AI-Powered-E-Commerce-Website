import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import razorpay from "../assets/razorpay.png";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true },
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.messege);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative">
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={formData.firstName}
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
            />

            <input
              name="lastName"
              onChange={onChangeHandler}
              value={formData.lastName}
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="email"
              onChange={onChangeHandler}
              value={formData.email}
              type="email"
              placeholder="Email address"
              className="w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="street"
              onChange={onChangeHandler}
              value={formData.street}
              type="text"
              placeholder="Street"
              className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="city"
              onChange={onChangeHandler}
              value={formData.city}
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
              required
            />

            <input
              name="state"
              onChange={onChangeHandler}
              value={formData.state}
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="pinCode"
              onChange={onChangeHandler}
              value={formData.pinCode}
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
            <input
              name="country"
              onChange={onChangeHandler}
              value={formData.country}
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              name="phone"
              onChange={onChangeHandler}
              value={formData.phone}
              type="tel"
              placeholder="Phone"
              className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border border-[#80808049] ml-[30px] mt-[20px]"
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>
      <div className="w-full lg:w-1/2 min-h-full flex items-center justify-center gap-[30px]">
        <div className="w-[90%] lg:w-[70%] h-full lg:h-[70%] flex flex-col items-center justify-center gap-[10px]">
          <CartTotal />
          <div className="py-[10px]">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="w-full h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-0 justify-center gap-[50px]">
            {/* Razorpay Button */}
            <button
              onClick={() => setMethod("razorpay")}
              className={`w-[150px] h-[50px] rounded-sm ${method === "razorpay" ? "border-[5px] border-blue-900 rounded-sm" : ""}`}
            >
              <img
                src={razorpay}
                className="w-[100%] h-[100%] object-fill rounded-sm"
                alt=""
              />
            </button>

            {/* Cash on Delivery Button */}
            <button
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === "cod" ? "border-[5px] border-blue-900 rounded-sm" : ""}`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
