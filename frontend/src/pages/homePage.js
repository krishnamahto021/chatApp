import React, { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";

const HomePage = () => {
  const [signUp, setSignUp] = useState("signUp");
  const setSignUpFunction = (p) => {
    setSignUp(p);
  };
  return (
    <>
      <div className="container flex flex-col items-center justify-evenly mt-10 p-3">
        <span className="text-lg font-semibold">
          Connect, Communicate, and Flourish Together!
        </span>
        <div className="switch flex m-4 border-purple-200 transition-colors">
          <button
            className={`font-medium rounded-full p-3 ${
              signUp === "signUp" ? "bg-[#a457c9]" : "bg-white"
            }`}
            onClick={() => setSignUpFunction("signUp")}
          >
            Sign Up
          </button>

          <button
            className={`font-medium rounded-full p-3  ${
              signUp === "signIn" ? "bg-[#a457c9]" : "bg-white"
            }`}
            onClick={() => setSignUpFunction("signIn")}
          >
            Sign In
          </button>
        </div>
        {signUp === "signUp" ? <SignUp /> : <SignIn />}
      </div>
    </>
  );
};

export default HomePage;
