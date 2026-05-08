import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <button
        className="h-20 w-40"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup Page
      </button>
      <button
        className="h-20 w-40"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login Page
      </button>
    </div>
  );
};

export default Home;
