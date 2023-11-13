import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgottenPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const data = await axios.post(
      "/user/forgotten-password",
      { email },
      config
    );
    if (data.status === 200) {
      toast.success("Reset Email Sent!");
      navigate("/");
    } else if (data.status === 201) {
      toast.error("Email not verified");
      navigate("/");
    } else if (data.status === 202) {
      toast.error("Email Not Registered");
      navigate("/");
    } else {
      toast.error("Internal Server error");
      navigate("/");
    }
  }
  return (
    <div className=" shadow-2xl w-3/4  bg-[#a457c9] block m-auto  rounded-md p-4 text-lg font-semibold mt-52 md:w-2/3 lg:w-1/3">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 content-evenly "
      >
        <label>Email</label>
        <input
          placeholder="Enter your Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded "
          required
        ></input>
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600  w-52 rounded-md text-xl  transition-all block m-auto p-4 mt-3 md:w-72 "
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgottenPasswordPage;
