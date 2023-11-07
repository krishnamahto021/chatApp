import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = window.location.pathname.split("/").pop();
  useEffect(() => {
    setIsLoading(true);
    async function verifyUser() {
      const data = await axios.get(`/user/verify-user/${token}`);
      console.log(data);
      if (data.status === 200) {
        toast.success("Email Verified Successfully!");
        navigate("/");
      } else if (data.status === 400) {
        toast.error("Invalid Token");
        navigate("/");
      } else if (data.status === 500) {
        toast.error("Internal Server Error ");
        navigate("/");
      }
    }
    verifyUser();
  }, []);
  {
    isLoading ? <p>Verfifying user...</p> : <p>Verified</p>;
  }
};

export default VerifyUserPage;
