import React, { useState } from "react";
import logo from "../assets/vcartlogo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdCollections } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const Nav = () => {
  let { userData, getCurrentUser } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async (req, res) => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]">
        <img src={logo} alt="" className="w-[30px] " />
        <h1 className="text-[25px] text-[black] font-sans">OneCart</h1>
      </div>
      <div className="w-[50%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            HOME
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            COLLECTIONS
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            ABOUT
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            CONTACT
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <IoSearchCircleOutline
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        {showSearch && (
          <IoSearchCircleSharp
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}
        {!userData && (
          <FaCircleUser
            onClick={() => setShowProfile((prev) => !prev)}
            className="w-[29px] h-[29px] text-[#000000] cursor-pointer"
          />
        )}

        {userData && (
          <div
            onClick={() => setShowProfile((prev) => !prev)}
            className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center"
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <MdOutlineShoppingCart className="w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block" />
        <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block">
          10
        </p>
      </div>
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[70px] left-0 right-0 flex items-center justify-center shadow-inner">
          <input
            type="text"
            placeholder="Search Here"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[20px] placeholder:text-gray-300 text-white text-[18px] outline-none"
          />
        </div>
      )}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="w-full h-full flex flex-col items-start justify-around text-[17px] py-[10px] text-white">
            {!userData && (
              <li
                onClick={() => navigate("/login")}
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              >
                Login
              </li>
            )}
            {userData && (
              <li
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              >
                LogOut
              </li>
            )}
            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">
              Orders
            </li>
            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">
              About
            </li>
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden">
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px]">
          <IoMdHome className="w-[30px] h-[30px] text-[white] md:hidden" />
          Home
        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px]">
          <MdCollections className="w-[30px] h-[30px] text-[white] md:hidden" />
          Collections
        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px]">
          <MdContacts className="w-[30px] h-[30px] text-[white] md:hidden" />
          Contact
        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px]">
          <MdOutlineShoppingCart className="w-[30px] h-[30px] text-[white] md:hidden" />
          Cart
        </button>
      </div>
    </div>
  );
};

export default Nav;
