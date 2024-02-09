import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.Config";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successfull", {
          position: "top-left",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
        });
      });
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="login w-[75%] flex h-[80vh] mt-5 bg-slate-500 rounded-xl">
        <div className="w-[55%] h-[100%] text-white flex justify-center items-center flex-col">
          <div className="welcomeBg flex justify-center items-center flex-col">
            <h1 className="text-4xl">Welcome!</h1>
            <p>To Our Todo App</p>
            <div className="flex gap-5 mt-3">
              <a href="https://github.com/shahraim" target="blank">
                <i className="cursor-pointer text-[20px] fa-brands fa-github"></i>
              </a>
              <a href="https://shahraim-portfolio.vercel.app/" target="blank">
                <i className="cursor-pointer fa-solid text-[20px] fa-people-arrows"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="h-[100%] w-[45%] mainLogin text-white">
          <form
            onSubmit={handleLogin}
            className="text-center h-[100%] flex flex-col justify-center items-center"
          >
            <h1 className="text-3xl mb-5">Login</h1>
            <div className="px-10 flex flex-col gap-3 w-full items-center ">
              <input
                type="email"
                placeholder="Email"
                className=" text-black input input-bordered input-md w-full max-w-xs"
                ref={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className=" text-black input input-bordered input-md w-full max-w-xs"
                ref={password}
                required
              />
              <div className="flex justify-between items-center gap-3 flex-col">
                <p className="text-sm">
                  Dnt have an account ?
                  <Link
                    className="link link-hover pl-4 text-gray-400 hover:text-yellow-400"
                    to="/register"
                  >
                    register
                  </Link>
                </p>
                <button type="submit" className="btn glass w-full">
                  Login
                </button>
                {/* <button className="btn btn-outline text-white w-full">Login</button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
