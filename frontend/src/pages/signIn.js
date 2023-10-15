import React from 'react'

const SignIn = () => {
  return (
    <>
      <div className="signInContainer shadow-2xl w-1/3 bg-[#a457c9] block m-auto  rounded-md p-4">
        <form className="flex flex-col gap-2 p-2 text-lg font-semibold ">


          <label>Email</label>
          <input
            placeholder="Enter your Email "
            className="rounded-md p-2"
            required
          ></input>

          <label>Password</label>
          <input
            placeholder="Enter your Password"
            className="rounded-md p-2"
            required
          ></input>

          <button className="bg-violet-500 hover:bg-violet-600  w-80 rounded-md text-xl  transition-all block m-auto p-4 mt-3">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn
