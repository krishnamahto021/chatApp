import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const postDetails = (pic) => {
    console.log("hiag");
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
          console.log("ji");
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
      console.log("helo");
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
      console.log(data);
      // if (data.status === 201) {
      clearInput();
      toast.success("Created Account successflyy!!");
      // }
    } catch (err) {
      console.log(`error in the submitting form ! ${err}`);
      toast.error("Internal Server Error!");
    }
  };
  return (
    <>
      <div className="signUpContainer shadow-2xl w-1/3 bg-[#a457c9] block m-auto  rounded-md p-4">
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
            id="profilePic"
            onChange={(e) => postDetails(e.target.files[0])}
          ></input>

          {loading ? (
            <ProgressBar />
          ) : (
            <button
              className="bg-violet-500 hover:bg-violet-600  w-80 rounded-md text-xl  transition-all block m-auto p-4 mt-3"
              type="submit"
            >
              Create your account
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
