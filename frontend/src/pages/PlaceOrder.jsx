import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import razorpay from "../assets/razorpay.png";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative">
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form action="" className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]">
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
            />

            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Street"
              className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
              required
            />

            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]"
              required
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
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
