import React, { useContext, useState } from "react";
import Logo from "../assets/vcartlogo.png";
import google from "../assets/google.png";
import {
  IoEyeOutline,
  IoEye,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import Loading from "../components/Loading";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      getCurrentUser();
      setLoading(false);
      toast.success("Login Succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      let response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      let result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      );
      console.log(result.data);
      getCurrentUser();
      setLoading(false);
      toast.success("Login Succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Error");
    }
  };

  return (
    <div className="relative w-[100vw] min-h-[100vh] bg-[#0B0F14] text-white flex flex-col items-center justify-start overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#6060f5]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#E8A33D]/15 blur-[120px]" />

      {/* navbar */}
      <div
        className="relative z-10 w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[38px]" src={Logo} alt="OneCart logo" />
        <h1 className="text-[22px] font-semibold tracking-tight">OneCart</h1>
      </div>

      {/* heading */}
      <div className="relative z-10 w-full flex items-center justify-center flex-col gap-[8px] mt-[10px] mb-[30px] px-[20px] text-center">
        <span className="text-[28px] sm:text-[32px] font-bold tracking-tight">
          Welcome back
        </span>
        <span className="text-[15px] text-[#9AA4AF]">
          Log in to OneCart and pick up where you left off
        </span>
      </div>

      {/* card */}
      <div className="relative z-10 max-w-[420px] w-[90%] bg-[#12161C]/70 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] p-[32px] mb-[40px]">
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-[18px]"
        >
          <button
            type="button"
            onClick={googleSignup}
            className="w-full h-[48px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-[10px] transition-colors duration-200 font-medium"
          >
            <img src={google} alt="" className="w-[18px]" />
            Continue with Google
          </button>

          <div className="w-full flex items-center gap-[12px] text-[12px] text-[#6B7480]">
            <div className="flex-1 h-[1px] bg-white/10" />
            OR
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="w-full flex flex-col gap-[16px]">
            <div className="relative">
              <IoMailOutline className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6B7480]" />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full h-[48px] border border-white/10 focus:border-[#6060f5]/60 rounded-xl bg-white/[0.03] placeholder-[#6B7480] pl-[42px] pr-[16px] text-[15px] outline-none transition-colors duration-200"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <IoLockClosedOutline className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#6B7480]" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={show ? "text" : "password"}
                className="w-full h-[48px] border border-white/10 focus:border-[#6060f5]/60 rounded-xl bg-white/[0.03] placeholder-[#6B7480] pl-[42px] pr-[42px] text-[15px] outline-none transition-colors duration-200"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6B7480] hover:text-white transition-colors"
                tabIndex={-1}
              >
                {show ? (
                  <IoEye className="w-[18px] h-[18px]" />
                ) : (
                  <IoEyeOutline className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#6060f5] hover:bg-[#4f4fe0] disabled:opacity-70 rounded-xl flex items-center justify-center text-[16px] font-semibold transition-colors duration-200 mt-[4px]"
            >
              {loading ? <Loading /> : "Login"}
            </button>

            <p className="flex items-center justify-center gap-[6px] text-[14px] text-[#9AA4AF] mt-[4px]">
              Don't have an account?
              <span
                className="text-[#8888ff] hover:text-[#a5a5ff] font-semibold cursor-pointer transition-colors"
                onClick={() => navigate("/signup")}
              >
                Create one
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
