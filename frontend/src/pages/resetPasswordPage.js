import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const token = window.location.pathname.split("/").pop();
    const data = await axios.post(`/user/reset-password/${token}`,{email,password},config);
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
    <div>
      <form>
        <label>Email</label>
        <input
          placeholder="Enter your registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="Enter your new Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" onClick={submitHandler}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
