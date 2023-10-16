import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  return (
    <>
      <div className="signUpContainer shadow-2xl w-1/3 bg-[#a457c9] block m-auto  rounded-md p-4">
        <form className="flex flex-col gap-2 p-2 text-lg font-semibold ">
          <label>Name</label>
          <input
            placeholder="Enter your Name"
            className="rounded-md p-2 border-white focus:border-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>

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
                <AiFillEye className="inline  -m-12 text-xl" />
              ) : (
                <AiFillEyeInvisible className="inline  -m-12 text-xl" />
              )}
            </span>
          </div>

          <label>Profile pic</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          ></input>

          <button className="bg-violet-500 hover:bg-violet-600  w-80 rounded-md text-xl  transition-all block m-auto p-4 mt-3">
            Create your account
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
