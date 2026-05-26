import React from "react";
import back1 from "../assets/back1.JPG";
import back2 from "../assets/back2.JPG";
import back3 from "../assets/back3.JPG";

const Background = ({ heroCount }) => {
  if (heroCount === 0) {
    return (
      <img
        src={back2}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 1) {
    return (
      <img
        src={back1}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 2) {
    return (
      <img
        src={back3}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 3) {
    return (
      <img
        src={back1}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  }
};

export default Background;
