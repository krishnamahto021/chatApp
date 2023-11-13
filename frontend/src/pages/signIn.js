import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "/user/sign-in",
        { email, password },
        config
      );

      if (data.status === 200) {
        toast.success("Signed In successfull!! ");
        console.log(data.data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.data.user));
        navigate("/user/chat");
      } else if (data.status === 201) {
        toast.error("Email not verified ");
      } else if (data.status === 202) {
        toast.error("Password invalid!!");
      } else {
        toast.error("Email not registered!");
      }
    } catch (err) {
      toast.error(`Internal server Error!!`);
      console.log("errror in signing up the user", err);
    }
  };

  return (
    <>
      <div className="signInContainer shadow-2xl w-3/4 bg-[#a457c9] block m-auto  rounded-md p-4 md:w-2/3 lg:w-1/3 ">
        <form
          className="flex flex-col gap-2 p-2 text-lg font-semibold "
          onSubmit={submitHandler}
        >
          <label>Email</label>
          <input
            placeholder="Enter your Email "
            className="rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>

          <div className="password-container ">
            <label className="block">Password</label>
            <input
              placeholder="Enter your Password"
              className="rounded-md p-2 w-full"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              required
            ></input>
            <span
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? (
                <AiFillEye className="inline  -m-8 text-xl md:-m-10" />
              ) : (
                <AiFillEyeInvisible className="inline  -m-8 text-xl md:-m-10" />
              )}
            </span>
          </div>

          <button className="bg-violet-500 hover:bg-violet-600  w-52 rounded-md text-xl  transition-all block m-auto p-4 mt-3 md:w-72">
            Log In
          </button>
          <Link
            to={"/user/forgotten-password"}
            className="text-gray-800 hover:text-gray-900"
          >
            Forgotten Password ?{" "}
          </Link>
        </form>
        <hr></hr>
        <div className="bg-violet-500 hover:bg-violet-600  w-fit rounded-md   transition-all block m-auto p-3 mt-3 text-lg font-semibold md:w-72">
          <Link
            to={"https://chatapp-inyr.onrender.com/user/auth/google"}
            className="flex justify-evenly items-center"
          >
            <span className="ml-2 ">Sign Up or Sign in</span>
            <FcGoogle className="text-4xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
