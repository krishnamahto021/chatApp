import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  var token;
  useEffect(() => {
    token = window.location.pathname.split("/").pop(); // so that token whn changed we know it
  });
  async function submitHandler(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = await axios.post(
      `/user/reset-password/${token}`,
      { email, password },
      config
    );
    if (data.status === 200) {
      toast.success("Password Updated Successfully!");
      navigate("/");
    } else if (data.status === 201) {
      toast.error("Token Not Valid");
    } else if (data.status === 202) {
      toast.error("Email Not registered!");
    } else {
      toast.error("Internal Server Error");
    }
  }
  return (
    <div className="shadow-2xl w-1/3 bg-[#a457c9] block m-auto  rounded-md p-4 text-lg font-semibold mt-52">
      <form className="flex flex-col gap-2 p-2 text-lg font-semibold ">
        <label>Email</label>
        <input
          placeholder="Enter your registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded"
          required
        ></input>
        <div className="passwordContainer ">
          <label className="block">Password</label>
          <input
            placeholder="Enter your new Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded w-full"
            required
          ></input>
          <span
            className="cursor-pointer"
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

        <button
          type="submit"
          onClick={submitHandler}
          className="bg-violet-500 hover:bg-violet-600  w-80 rounded-md text-xl  transition-all block m-auto p-4 mt-3"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
