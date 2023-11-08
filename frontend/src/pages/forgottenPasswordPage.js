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
    <div>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Enter your Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgottenPasswordPage;
