import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase.Config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        userId: user.uid,
      });
      toast.success("Welcome", {
        position: "top-left",
      });
      navigate("/");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error during registration: ", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
    }
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
            onSubmit={handleRegister}
            className="text-center h-[100%] flex flex-col justify-center items-center"
          >
            <h1 className="text-3xl mb-5">Sign Up</h1>
            <div className="px-10 flex flex-col gap-3 w-full items-center ">
              <input
                type="text"
                placeholder="Name"
                className=" text-black input input-bordered input-md w-full max-w-xs"
                ref={name}
                required
              />
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
                  already have an account ?
                  <Link
                    className="link link-hover pl-4 text-gray-400 hover:text-yellow-400"
                    to="/login"
                  >
                    login
                  </Link>
                </p>
                <button type="submit" className="btn glass w-full">
                  Sign Up
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
