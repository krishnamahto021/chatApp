import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [loading, setLoading] = useState(false);

  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast.error("Please select the image");
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dfkat6fdh");
      const uploadImage = async () => {
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dfkat6fdh/image/upload",
            data
          );

          const imageUrl = response.data.url.toString();
          setProfileImage(imageUrl);
          console.log(imageUrl);
          setLoading(false);
          toast.success(`Image uploaded Successfully!`);
        } catch (error) {
          // console.error(error);
          toast.error(`Image not uploaded!! `);
          setLoading(false);
        }
      };

      uploadImage();
    }
  };

  const clearInput = () => {
    setEmail("");
    setPassowrd("");
    document.getElementById("profilePic").value = ""; // we can't clear the ip feilds for the file directly
    setName("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "/user/sign-up",
        {
          name,
          email,
          password,
          profileImage,
        },
        config
      );
      if (data.status === 201) {
        clearInput();
        toast.success("Check Mail to verify to verify your Email");
      } else if (data.status === 200) {
        toast.error("Account Already Exists!");
        clearInput();
      }
    } catch (err) {
      console.log(`error in the submitting form ! ${err}`);
      toast.error("Internal Server Error!");
    }
  };

  return (
    <>
      <div className="signUpContainer shadow-2xl w-3/4 bg-[#a457c9] block m-auto  rounded-md p-4 md:w-2/3 lg:w-1/3 ">
        <form
          className="flex flex-col gap-2 p-2 text-lg font-semibold "
          onSubmit={submitHandler}
        >
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
                <AiFillEye className="inline  -m-8 text-xl md:-m-10" />
              ) : (
                <AiFillEyeInvisible className="inline  -m-8 text-xl md:-m-10" />
              )}
            </span>
          </div>

          <label>Profile pic</label>
          <input
            type="file"
            accept="image/*"
            id="profilePic"
            onChange={(e) => postDetails(e.target.files[0])}
          ></input>

          {loading ? (
            <ProgressBar />
          ) : (
            <button
              className="bg-violet-500 hover:bg-violet-600  w-fit rounded-md text-xl  transition-all block m-auto p-4 mt-3 md:w-72"
              type="submit"
            >
              Create your account
            </button>
          )}
        </form>
        <hr></hr>
        <div className="bg-violet-500 hover:bg-violet-600  w-fit rounded-md   transition-all block m-auto p-3 mt-3 text-lg font-semibold md:w-72">
          <Link
            to={"https://chatapp-inyr.onrender.com/user/auth/google"}
            className="flex justify-evenly items-center"
          >
            <span className="ml-2 font-semibold">Sign Up or Sign in</span>
            <FcGoogle className="text-4xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
