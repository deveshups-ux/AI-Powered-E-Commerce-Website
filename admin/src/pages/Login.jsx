import React, { useContext, useState } from "react";
import Logo from "../assets/vcartlogo.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { adminData, getAdmin } = useContext(adminDataContext);

  const navigate = useNavigate();

  const AdminLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true },
      );

      await getAdmin();
      setLoading(false);
      navigate("/");

      console.log(result.data);
      toast.success("Admin Login successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Admin Login Failed");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer">
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>

        <span className="text-[16px]">
          Welcome to OneCart, Login Your Admin Account
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={AdminLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-center gap-[20px]"
        >
          <div className="w-full flex flex-col gap-[15px] relative">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold outline-none"
              placeholder="Email"
              required
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={show ? "text" : "password"}
                className="w-full h-[50px] border-2 border-[#96969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold outline-none"
                placeholder="Password"
                required
              />

              {!show ? (
                <IoEyeOutline
                  className="w-[22px] h-[22px] absolute top-[14px] right-[15px] cursor-pointer"
                  onClick={() => setShow(true)}
                />
              ) : (
                <IoEye
                  className="w-[22px] h-[22px] absolute top-[14px] right-[15px] cursor-pointer"
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg mt-[20px] text-[17px] font-semibold hover:bg-[#4c4cf0] transition-all">
              {loading ? <Loading /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
